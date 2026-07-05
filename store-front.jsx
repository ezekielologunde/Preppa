/* PREPPA — Prepper storefront: public kitchen page (menu, plans, experiences, reviews). On window. */

const STORE_REVIEWS = [
  { name:'Jordan M.',   grad:'var(--g8)', stars:5, time:'2 days ago',
    text:'Ordered for the third week running. Tastes like someone’s grandmother is looking out for you.' },
  { name:'The Okafors', grad:'var(--g3)', stars:5, time:'1 week ago',
    text:'Fed the whole family with one tray. Warm at pickup, spotless packaging, lovely note inside.' },
  { name:'Priya S.',    grad:'var(--g7)', stars:4, time:'2 weeks ago',
    text:'Really good — portion was generous. Delivery ran ten minutes late but they messaged ahead.' },
];
const STORE_SPECIALTIES = {
  maria:['Fresh pasta','Slow ragù','Tiramisu'], david:['High-protein','Seafood','Meal prep'],
  amara:['Jollof','Open-fire','Party trays'],   denise:['Braises','Soul classics','Baking'],
  lucia:['Mole','Handmade tortillas','Mezcal nights'], sana:['Dum biryani','Halal-certified','Family boxes'],
};

function CookStoreScreen({ ctx, cook }){
  const c = COOKS[cook];
  const meals = MEALS.filter(m=>m.cook===cook);
  const plans = MARKET_PLANS.filter(p=>p.cook===cook);
  const exps  = EXPERIENCES.filter(e=>e.cook===cook);
  const [following, setFollowing] = useState(false);
  const follow = () => { setFollowing(f=>!f); ctx.toast(following?`Unfollowed ${c.name}`:`Following ${c.name} — you’ll see their drops first`, following?'x':'check', !following); };
  return (
    <div className="layer in" data-screen-label={"Storefront · "+c.kitchen}>
      <div className="scroll" style={{ background:'var(--bg)', paddingBottom:30 }}>
        <Ph grad={c.grad} className="sfhero">
          <div className="topbar">
            <button className="ib" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button>
            <button className="ib" onClick={()=>ctx.toast('Share kitchen — demo','share')}><Icon name="share" size={18}/></button>
          </div>
          <span className="sfopen"><span className="blip"/>Open now · closes 9 PM</span>
        </Ph>

        <div className="sfhead">
          <div className="sfav" style={{ background:c.grad }}>{c.initial}</div>
          <div className="sfname">{c.kitchen} <Icon name="shield" size={17} className="vchk"/></div>
          <div className="sfsub">{c.name} · {c.cuisine} · {c.dist}</div>
          <div className="sftags">
            <span className="sftag hot"><Icon name="flame" size={12}/>PrepScore {c.prepscore}</span>
            {(STORE_SPECIALTIES[cook]||[]).map(t=><span key={t} className="sftag">{t}</span>)}
          </div>
          <div className="sfstats">
            <div className="s"><b><Icon name="star" size={14} style={{ color:'var(--star)', verticalAlign:'-1.5px' }}/> {c.rating}</b><span>{c.reviews} reviews</span></div>
            <div className="s"><b>1.2k</b><span>Followers</span></div>
            <div className="s"><b>96%</b><span>On time</span></div>
          </div>
          <div className="sfbtns">
            <button className={'btn '+(following?'btn-ghost':'btn-pri')} style={{ flex:1, height:46 }} onClick={follow}>
              <Icon name={following?'check':'plus'} size={17}/>{following?'Following':'Follow'}
            </button>
            <button className="btn btn-ghost" style={{ flex:1, height:46 }} onClick={()=>ctx.push({ type:'chat', cook })}><Icon name="chat" size={17}/>Message</button>
          </div>
        </div>

        {meals.length>0 && <>
          <div className="hsec"><h3>On the menu</h3><a onClick={()=>ctx.toast('Full menu — demo')}>{`${meals.length} dish${meals.length!==1?'es':''}`}</a></div>
          <div className="mgrid lg">{meals.map(m=><MealCardLg key={m.id} m={m} ctx={ctx}/>)}</div>
        </>}

        {plans.length>0 && <>
          <div className="hsec"><h3>Weekly plans</h3></div>
          {plans.map(p=>(
            <button key={p.id} className="plancard" onClick={()=>ctx.push({ type:'planDetail', id:p.id })}>
              <div className="bar" style={{ background:p.grad }}/>
              <div className="b">
                <span className="ico" style={{ width:42, height:42, borderRadius:13, background:p.grad, display:'grid', placeItems:'center', color:'#fff', flex:'none' }}><Icon name="repeat" size={19}/></span>
                <div className="m">
                  <div className="nm">{p.name}</div>
                  <div className="mt">{`${p.meals} meal${p.meals!==1?'s':''}/wk`} · pause or swap anytime</div>
                </div>
                <div className="pr"><b>{money(p.price)}</b><span>/{p.per}</span></div>
              </div>
            </button>
          ))}
        </>}

        {exps.length>0 && <>
          <div className="hsec"><h3>Experiences</h3></div>
          <div className="exprail">{exps.map(e=><ExpCard key={e.id} e={e} ctx={ctx}/>)}</div>
        </>}

        <div className="hsec"><h3>Reviews</h3><a onClick={()=>ctx.toast('All reviews — demo')}>See all {c.reviews}</a></div>
        {STORE_REVIEWS.map((r,i)=>(
          <div key={i} className="sfreview">
            <div className="hd">
              <span className="av" style={{ background:r.grad }}>{r.name[0]}</span>
              <div className="b"><div className="nm">{r.name}</div><div className="mt">{r.time}</div></div>
              <Stars n={r.stars} size={13}/>
            </div>
            <p>{r.text}</p>
          </div>
        ))}

        <button className="hchef" style={{ margin:'14px 20px 0' }} onClick={()=>ctx.push({ type:'newRequest', svc:'cookhome' })}>
          <span className="ic" style={{ background:'var(--primary)', color:'#fff' }}><Icon name="chefhat" size={22}/></span>
          <span className="b"><b>Book {c.name.replace(/^Chef\s+/,'').split(' ')[0]} for your place</b><p>Private dinners &amp; events — get a fixed quote</p></span>
          <Icon name="chevRight" size={18} className="go"/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { CookStoreScreen, STORE_REVIEWS });
