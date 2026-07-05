/* PREPPA — Meal plans & subscriptions: customer browse/subscribe/build/manage + prepper subscribers. On window. */

/* ---------- plans offered by cooks (customer-facing marketplace) ---------- */
const MARKET_PLANS = [
  { id:'weeknight', cook:'maria',  name:'Weeknight Italian Box', price:48, per:'week', meals:3, grad:'var(--g4)',
    desc:'Three chef-cooked dinners delivered every week — rotating pasta, bakes and one lighter dish.',
    items:['Family Lasagna Tray','Sunday Meatballs','Eggplant Parmigiana'] },
  { id:'protein',   cook:'david',  name:'High-Protein Reset',    price:42, per:'week', meals:3, grad:'var(--g3)',
    desc:'Lean, macro-balanced dinners — grilled fish, bowls and greens. 40g+ protein each.',
    items:['Honey Garlic Salmon','Rainbow Poke Bowl','Charred Greens Bowl'] },
  { id:'soul',      cook:'denise', name:'Sunday Soul Table',     price:36, per:'week', meals:1, grad:'var(--g6)',
    desc:'One big family tray every Sunday — slow-braised comfort that feeds four.',
    items:['Slow-Braised Short Rib tray','Honey Cornbread (6)'] },
  { id:'halal',     cook:'sana',   name:'Halal Family Box',      price:54, per:'week', meals:4, grad:'var(--g8)',
    desc:'Four halal-certified dinners for the family, spiced to order.',
    items:['Chicken Biryani Box','Karahi Night','Daal + Naan','Kofta Curry'] },
];
const marketPlanById = id => MARKET_PLANS.find(p=>p.id===id);
const PLAN_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sun'];

/* ============================ CUSTOMER: PLANS HUB ============================ */
function MealPlansScreen({ ctx }){
  const sub = ctx.subscription;
  const [swapping, setSwapping] = useState(false);
  const paused = sub && sub.status==='paused';
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Meal plans</h2></div>
      <div className="scroll" style={{ paddingBottom:30 }}>
        {sub ? (
          <>
            <div style={{ height:16 }}/>
            <div className="mysub">
              <div className="top">
                <div>
                  <div className="lbl">Your plan</div>
                  <div className="nm">{sub.name}</div>
                </div>
                <span className="xchip" style={{ background:paused?'rgba(255,255,255,.14)':'var(--green)', color:'#fff', position:'relative', zIndex:1 }}>{paused?'Paused':'Active'}</span>
              </div>
              <div className="mt">{sub.cook ? 'by '+COOKS[sub.cook].name : 'Built by you'} · {money(sub.price)}/{sub.per}</div>
              <div className="next">
                <Icon name="truck" size={17}/>
                {paused ? 'Deliveries paused — resume anytime'
                  : sub.skipNext ? `Next week skipped · resumes ${sub.day} after`
                  : `Next box: ${sub.day} · 5–7 PM`}
              </div>
            </div>

            <div className="hsec"><h3>This week’s meals</h3></div>
            <div className="mlist">
              {sub.items.map((it,i)=>(
                <div key={i} className="mrow">
                  <span className="ico"><Icon name="chefhat" size={17}/></span>
                  <span className="t">{it}</span>
                  {swapping && <button className="daychip" style={{ height:32 }} onClick={()=>{
                    const alt = MEALS.find(m=>!sub.items.includes(m.name));
                    ctx.updateSub({ items: sub.items.map((x,xi)=>xi===i?alt.name:x) });
                    setSwapping(false); ctx.toast(`Swapped for ${alt.name}`,'check',true);
                  }}>Swap</button>}
                </div>
              ))}
            </div>

            <div className="hsec"><h3>Manage</h3></div>
            <div className="mlist">
              <button className="mrow" onClick={()=>{ ctx.updateSub({ status: paused?'active':'paused' }); ctx.toast(paused?'Plan resumed':'Plan paused — no charges while paused', paused?'check':'pause', paused); }}>
                <span className="ico"><Icon name={paused?'repeat':'clock'} size={17}/></span>
                <span className="t">{paused?'Resume plan':'Pause plan'}<small>{paused?'Pick up right where you left off':'Stop deliveries & billing anytime'}</small></span>
                <span className={'msw'+(paused?' on':'')}><i/></span>
              </button>
              <button className="mrow" onClick={()=>{ ctx.updateSub({ skipNext: !sub.skipNext }); ctx.toast(sub.skipNext?'Next delivery restored':'Next week skipped — you won’t be charged','check',true); }}>
                <span className="ico"><Icon name="calendar" size={17}/></span>
                <span className="t">Skip next week<small>{sub.skipNext?'Skipped — tap to undo':'One tap, no charge for that week'}</small></span>
                <span className={'msw'+(sub.skipNext?' on':'')}><i/></span>
              </button>
              <button className="mrow" onClick={()=>setSwapping(s=>!s)}>
                <span className="ico"><Icon name="repeat" size={17}/></span>
                <span className="t">Swap a meal<small>{swapping?'Tap “Swap” next to a meal above':'Trade any meal in this week’s box'}</small></span>
                <Icon name="chevRight" size={17} style={{ color:'var(--muted)' }}/>
              </button>
            </div>

            <div className="hsec"><h3>Delivery &amp; billing</h3></div>
            <div className="mlist">
              <div className="mrow" style={{ flexWrap:'wrap' }}>
                <span className="ico"><Icon name="truck" size={17}/></span>
                <span className="t">Delivery day</span>
                <div className="daychips" style={{ width:'100%', paddingTop:10 }}>
                  {PLAN_DAYS.map(d=><button key={d} className={'daychip'+(sub.day===d?' on':'')} onClick={()=>{ ctx.updateSub({ day:d }); ctx.toast('Deliveries moved to '+d,'check',true); }}>{d}</button>)}
                </div>
              </div>
              <button className="mrow" onClick={()=>ctx.toast('Payment methods — demo','card')}>
                <span className="ico"><Icon name="card" size={17}/></span>
                <span className="t">Visa •••• 4242<small>{paused?'No upcoming charge':'Next charge: '+(sub.skipNext?'in 2 weeks':'Mon')+' · '+money(sub.price)}</small></span>
                <Icon name="chevRight" size={17} style={{ color:'var(--muted)' }}/>
              </button>
              <button className="mrow" onClick={()=>{ ctx.cancelSub(); ctx.toast('Plan cancelled — we’ll miss you','x'); }}>
                <span className="ico" style={{ color:'var(--red)' }}><Icon name="x" size={17}/></span>
                <span className="t" style={{ color:'var(--red)' }}>Cancel plan</span>
              </button>
            </div>
            <div className="hsec"><h3>More plans near you</h3></div>
          </>
        ) : (
          <>
            <div style={{ padding:'20px 16px 4px' }}>
              <h1 style={{ margin:0, fontSize:24, fontWeight:900, letterSpacing:'-.035em' }}>Dinner on autopilot</h1>
              <p style={{ margin:'6px 0 0', fontSize:14, color:'var(--soft)', fontWeight:600, lineHeight:1.5 }}>Subscribe to a weekly box from a cook you love — or build your own. Pause, skip or swap anytime.</p>
            </div>
            <div className="hsec"><h3>Plans from cooks near you</h3></div>
          </>
        )}

        {MARKET_PLANS.map(p=>{
          const c = COOKS[p.cook];
          return (
            <button key={p.id} className="plancard" onClick={()=>ctx.push({ type:'planDetail', id:p.id })}>
              <div className="bar" style={{ background:p.grad }}/>
              <div className="b">
                <Avatar cook={p.cook} size={42}/>
                <div className="m">
                  <div className="nm">{p.name}</div>
                  <div className="mt">{c.name} · {p.meals} meal{p.meals!==1?'s':''}/wk · <Icon name="star" size={11} style={{ color:'var(--star)', verticalAlign:'-1px' }}/> {c.rating}</div>
                </div>
                <div className="pr"><b>{money(p.price)}</b><span>/{p.per}</span></div>
              </div>
            </button>
          );
        })}

        <button className="xsvc wide" style={{ width:'calc(100% - 32px)', margin:'4px 16px 0' }} onClick={()=>ctx.push({ type:'buildPlan' })}>
          <span className="ico amber"><Icon name="plus" size={20}/></span>
          <span className="b"><span className="nm">Build your own plan</span><span className="sb">Pick any meals, set your schedule — 10% off every box</span></span>
          <Icon name="chevRight" size={18} className="go"/>
        </button>
      </div>
    </div>
  );
}

/* ============================ CUSTOMER: PLAN DETAIL / SUBSCRIBE ============================ */
function PlanDetailScreen({ ctx, id }){
  const p = marketPlanById(id); const c = COOKS[p.cook];
  const [day, setDay] = useState('Thu');
  const [stage, setStage] = useState('info'); // info | pay | done
  if(stage==='done') return (
    <div className="layer in">
      <div className="burst">
        <div className="ring"><Icon name="check" size={52}/></div>
        <h2>You’re subscribed!</h2>
        <p>First <b>{p.name}</b> arrives <b>{day}</b>, 5–7 PM. Pause, skip or swap meals anytime — no lock-in.</p>
        <button className="btn btn-pri btn-block btn-lg" style={{ marginTop:26 }} onClick={()=>ctx.nav.replace({ type:'mealplans' })}>Manage my plan</button>
      </div>
    </div>
  );
  if(stage==='pay') return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={()=>setStage('info')}><Icon name="chevLeft" size={20}/></button><h2>Confirm subscription</h2></div>
      <div className="scroll pb-cta">
        <div className="block">
          <div className="block-t">{p.name} · every {day}</div>
          <div className="xfacts">
            <span className="xfact"><Icon name="chefhat" size={14}/>{c.name}</span>
            <span className="xfact"><Icon name="repeat" size={14}/>{`${p.meals} meal${p.meals!==1?'s':''}/week`}</span>
            <span className="xfact"><Icon name="truck" size={14}/>{day} · 5–7 PM</span>
          </div>
        </div>
        <div className="block">
          <div className="block-t">Payment</div>
          <div className="pay on" style={{ width:'100%' }}>
            <span className="ico"><Icon name="card" size={20}/></span>
            <div className="b"><b>Visa •••• 4242</b><p>Billed weekly · cancel anytime</p></div>
            <span className="radio"/>
          </div>
        </div>
        <div className="summary">
          <div className="sumrow"><span>Weekly box</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(p.price)}</span></div>
          <div className="sumrow free"><span>Delivery</span><span>Free for subscribers</span></div>
          <div className="sumrow total"><span>Per week</span><b>{money(p.price)}</b></div>
        </div>
      </div>
      <div className="dock">
        <div className="total"><div className="l">Per week</div><div className="v">{money(p.price)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>{ ctx.subscribe({ name:p.name, cook:p.cook, price:p.price, per:'week', items:p.items, day, status:'active', skipNext:false }); setStage('done'); }}>Subscribe · {money(p.price)}/wk</button>
      </div>
    </div>
  );
  return (
    <div className="layer in">
      <div className="scroll pb-cta" style={{ background:'var(--surface)' }}>
        <Ph grad={p.grad} className="dhero">
          <div className="topbar"><button className="ib" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button></div>
          <span className="tagbadge" style={{ top:'auto', bottom:38, left:18, height:24 }}><Icon name="repeat" size={11}/>Weekly plan</span>
        </Ph>
        <div className="dsheet">
          <div className="d-title">{p.name}</div>
          <div className="d-meta"><span className="m"><Icon name="repeat" size={15} style={{ color:'var(--primary)' }}/>{`${p.meals} meal${p.meals!==1?'s':''} every week`}</span></div>
          <button className="cookrow" style={{ width:'100%', textAlign:'left' }} onClick={()=>ctx.push({ type:'store', cook:p.cook })}>
            <Avatar cook={p.cook} size={46}/>
            <div className="b"><div className="nm">{c.name} <Icon name="shield" size={15} className="vchk"/></div><div className="mt">{c.cuisine} · PrepScore {c.prepscore}</div></div>
            <span className="go"><Icon name="chevRight" size={16}/></span>
          </button>
          <div className="d-section-t">About this plan</div>
          <p className="d-desc">{p.desc}</p>
          <div className="d-section-t">In a typical week</div>
          {p.items.map((it,i)=>(
            <div key={i} className="opt on" style={{ pointerEvents:'none' }}><span className="ck"><Icon name="check" size={14}/></span><span className="t">{it}</span></div>
          ))}
          <div className="d-section-t">Delivery day</div>
          <div className="daychips">{PLAN_DAYS.map(d=><button key={d} className={'daychip'+(day===d?' on':'')} onClick={()=>setDay(d)}>{d}</button>)}</div>
          <p style={{ margin:'16px 0 0', fontSize:12.5, color:'var(--muted)', fontWeight:600, lineHeight:1.5 }}>Pause, skip a week, or swap meals anytime. No commitment — cancel whenever.</p>
        </div>
      </div>
      <div className="dock">
        <div className="total"><div className="l">Per week</div><div className="v">{money(p.price)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>setStage('pay')}>Subscribe<Icon name="arrow" size={18}/></button>
      </div>
    </div>
  );
}

/* ============================ CUSTOMER: BUILD YOUR OWN ============================ */
function BuildPlanFlow({ ctx }){
  const [picked, setPicked] = useState({});           // id -> true
  const [day, setDay] = useState('Thu');
  const [stage, setStage] = useState('pick');         // pick | schedule | done
  const ids = Object.keys(picked).filter(k=>picked[k]);
  const sum = ids.reduce((s,id)=>s+mealById(id).price,0);
  const price = Math.round(sum*0.9*100)/100;          // 10% bundle discount
  const valid = ids.length>=2;

  if(stage==='done') return (
    <div className="layer in">
      <div className="burst">
        <div className="ring"><Icon name="check" size={52}/></div>
        <h2>Your plan is live</h2>
        <p>{ids.length} meals, every <b>{day}</b> — <b>{money(price)}/week</b> (10% bundle discount applied). Manage it anytime.</p>
        <button className="btn btn-pri btn-block btn-lg" style={{ marginTop:26 }} onClick={()=>ctx.nav.replace({ type:'mealplans' })}>Manage my plan</button>
      </div>
    </div>
  );
  if(stage==='schedule') return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={()=>setStage('pick')}><Icon name="chevLeft" size={20}/></button><h2>Schedule</h2><span className="sub">{ids.length} meals</span></div>
      <div className="scroll pb-cta">
        <div className="block">
          <div className="block-t">Delivery day</div>
          <div className="daychips">{PLAN_DAYS.map(d=><button key={d} className={'daychip'+(day===d?' on':'')} onClick={()=>setDay(d)}>{d}</button>)}</div>
        </div>
        <div className="block">
          <div className="block-t">Payment</div>
          <div className="pay on" style={{ width:'100%' }}>
            <span className="ico"><Icon name="card" size={20}/></span>
            <div className="b"><b>Visa •••• 4242</b><p>Billed weekly · cancel anytime</p></div>
            <span className="radio"/>
          </div>
        </div>
        <div className="summary">
          <div className="sumrow"><span>{ids.length} meals weekly</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(sum)}</span></div>
          <div className="sumrow free"><span>Bundle discount</span><span>−{money(sum-price)}</span></div>
          <div className="sumrow free"><span>Delivery</span><span>Free for subscribers</span></div>
          <div className="sumrow total"><span>Per week</span><b>{money(price)}</b></div>
        </div>
      </div>
      <div className="dock">
        <div className="total"><div className="l">Per week</div><div className="v">{money(price)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>{ ctx.subscribe({ name:'My weekly box', cook:null, price, per:'week', items:ids.map(id=>mealById(id).name), day, status:'active', skipNext:false }); setStage('done'); }}>Start plan · {money(price)}/wk</button>
      </div>
    </div>
  );
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Build your plan</h2><span className="sub">pick 2+</span></div>
      <div className="scroll pb-cta">
        <p style={{ margin:'14px 16px 6px', fontSize:13.5, color:'var(--soft)', fontWeight:600, lineHeight:1.5 }}>Choose the meals you want every week. Mix cooks freely — we bundle the deliveries.</p>
        {MEALS.map(m=>{
          const on = !!picked[m.id];
          return (
            <button key={m.id} className={'pickrow'+(on?' on':'')} onClick={()=>setPicked(p=>({ ...p, [m.id]:!p[m.id] }))}>
              <Ph grad={m.grad} className="ph"/>
              <div className="b">
                <div className="nm">{m.name}</div>
                <div className="mt">{COOKS[m.cook].name} · {money(m.price)}</div>
              </div>
              <span className="ck">{on && <Icon name="check" size={14}/>}</span>
            </button>
          );
        })}
      </div>
      <div className="dock">
        <div className="total"><div className="l">{ids.length} meals · 10% off</div><div className="v">{money(price)}/wk</div></div>
        <button className="btn btn-pri" style={{ flex:1, opacity:valid?1:.5 }} disabled={!valid} onClick={()=>valid&&setStage('schedule')}>Next<Icon name="arrow" size={18}/></button>
      </div>
    </div>
  );
}

/* ============================ PREPPER: SUBSCRIBERS & PREP ============================ */
const SUBSCRIBERS = [
  { name:'Jordan M.',  plan:'Weeknight Italian Box', since:'Mar 2026', day:'Thu', status:'active', grad:'var(--g8)' },
  { name:'The Okafors',plan:'Weeknight Italian Box', since:'Jan 2026', day:'Thu', status:'active', grad:'var(--g3)' },
  { name:'Priya S.',   plan:'Weeknight Italian Box', since:'May 2026', day:'Thu', status:'active', grad:'var(--g7)' },
  { name:'Dana L.',    plan:'Family Sunday Tray',    since:'Feb 2026', day:'Sun', status:'active', grad:'var(--g1)' },
  { name:'Marcus T.',  plan:'Family Sunday Tray',    since:'Jun 2026', day:'Sun', status:'paused', grad:'var(--g6)' },
  { name:'Grace M.',   plan:'Weeknight Italian Box', since:'Apr 2026', day:'Thu', status:'skip',   grad:'var(--g5)' },
];
function SubscribersScreen({ ctx }){
  const mrr = MY_PLANS.reduce((s,p)=>s+p.subs*p.price,0);
  return (
    <div className="kpage" style={{ background:'var(--bg)' }}>
      <KTop title="Subscribers" sub={`${MY_PLANS.reduce((s,p)=>s+p.subs,0)} active`} onBack={ctx.nav.pop}/>
      <div className="kscroll" style={{ paddingTop:16, paddingBottom:30 }}>
        <div className="kcard" style={{ marginTop:0 }}>
          <div className="ct">This week’s prep</div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-amber"><KIcon name="box" size={15}/></span>Thu · Weeknight Italian</span><span className="v">24 boxes · 72 meals</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-purple"><KIcon name="utensils" size={15}/></span>Sun · Family Sunday Tray</span><span className="v">11 trays</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-green"><KIcon name="wallet" size={15}/></span>Recurring · weekly</span><span className="v">{money(mrr)}</span></div>
          <div style={{ marginTop:12, padding:'11px 13px', background:'var(--primary-l)', borderRadius:12, fontSize:12.5, fontWeight:600, color:'var(--primary-d)', lineHeight:1.5 }}>
            2 subscribers skipped next week — prep 22 boxes for Thursday, not 24.
          </div>
        </div>
        <div className="ksec"><h3>Subscribers</h3></div>
        <div style={{ margin:'0 20px', borderRadius:18, overflow:'hidden', border:'1px solid var(--border-2)' }}>
          {SUBSCRIBERS.map((s,i)=>(
            <div key={i} className="subrow">
              <span className="av" style={{ background:s.grad }}>{s.name[0]}</span>
              <div className="b">
                <div className="nm">{s.name}</div>
                <div className="mt">{s.plan} · since {s.since}</div>
              </div>
              <span className={'xchip '+(s.status==='active'?'booked':s.status==='paused'?'open':'quoted')}>
                {s.status==='active'?s.day:s.status==='paused'?'Paused':'Skipping'}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding:'14px 20px 0' }}>
          <button className="kbtn kbtn-ghost kbtn-block" onClick={()=>ctx.toast('Message all subscribers — demo','mega')}><KIcon name="mega" size={16}/>Message all subscribers</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MARKET_PLANS, marketPlanById, MealPlansScreen, PlanDetailScreen, BuildPlanFlow, SubscribersScreen, SUBSCRIBERS });
