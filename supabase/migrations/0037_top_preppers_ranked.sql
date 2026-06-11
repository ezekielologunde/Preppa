-- 0037 — "Top Local Preppers" reputation ranking. SECURITY DEFINER function
-- top_preppers_ranked(p_limit) returning approved kitchens (that have a live
-- meal) ordered by a composite score: Bayesian-smoothed rating (prior pulls
-- low-review kitchens toward the platform mean) + log-scaled completed-order
-- volume + repeat-buyer rate. Aggregate-only, granted to anon for public
-- discovery — the visible surface of the trust/reputation moat.
create or replace function public.top_preppers_ranked(p_limit integer default 10)
returns table (
  id uuid, display_name text, verified boolean, specialties text[],
  average_rating numeric, total_reviews integer, from_price numeric,
  image_url text, score numeric, rank integer
)
language sql
stable security definer
set search_path to 'public'
as $function$
  with prior as (select 4.8::numeric as m, 12::numeric as c),
  base as (
    select
      pp.id, pp.display_name, pp.verified, pp.specialties,
      coalesce(rs.average_rating, 0)::numeric as avg_rating,
      coalesce(rs.total_reviews, 0)::int      as reviews,
      (select count(*) from orders o
         where o.prepper_id = pp.id and o.status = 'completed')::int as completed,
      (select count(distinct o.customer_id) from orders o
         where o.prepper_id = pp.id and o.status = 'completed')::int as uniq,
      (select count(*) from (
         select o.customer_id from orders o
           where o.prepper_id = pp.id and o.status = 'completed'
           group by o.customer_id having count(*) > 1) r)::int as repeat_cust,
      (select min(m.base_price) from meals m
         where m.prepper_id = pp.id and m.status = 'published')::numeric as from_price,
      (select mi.url from meals m
         join meal_images mi on mi.meal_id = m.id
         where m.prepper_id = pp.id and m.status = 'published'
         order by m.created_at asc limit 1) as image_url
    from prepper_profiles pp
    left join prepper_rating_summary rs on rs.prepper_id = pp.id
    where pp.status = 'approved'
      and exists (select 1 from meals m where m.prepper_id = pp.id and m.status = 'published')
  ),
  scored as (
    select b.*,
      ( ( ((select c from prior) * (select m from prior) + b.avg_rating * b.reviews)
          / ((select c from prior) + b.reviews) )
        + 0.20 * ln(1 + b.completed)
        + 0.40 * (case when b.uniq > 0 then b.repeat_cust::numeric / b.uniq else 0 end)
      )::numeric as score
    from base b
  )
  select
    s.id, s.display_name, s.verified, s.specialties,
    s.avg_rating, s.reviews, s.from_price, s.image_url,
    round(s.score, 4),
    (row_number() over (order by s.score desc, s.reviews desc))::int
  from scored s
  order by s.score desc, s.reviews desc
  limit greatest(p_limit, 1);
$function$;

grant execute on function public.top_preppers_ranked(integer) to anon, authenticated, service_role;
