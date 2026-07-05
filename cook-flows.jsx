/* PREPPA — My Hub flows: Catering, Money, Menu, Plans, Order detail. On window. */

/* shared secondary header with back */
function KTop({ title, sub, onBack, right }){
  return (
    <header className="thdr" style={{ paddingLeft:16, paddingRight:16 }}>
      <button className="icon-btn" onClick={onBack}><KIcon name="chevLeft" size={20}/></button>
      <h2>{title}</h2>
      {sub && <span className="sub">{sub}</span>}
      {right}
    </header>
  );
}

/* ============================ CATERING ============================ */
function ReqCard({ r, ctx, mode }){
  return (
    <div className="kreq">
      <div className="top">
        <span className="badge">{r.type}</span>
        <span className="post">{r.posted || r.date}</span>
      </div>
      <div className="ttl">{r.title}</div>
      <div className="host">{r.host}</div>
      <div className="facts">
        <span className="kfact"><KIcon name="calendar" size={14}/>{r.date}</span>
        {r.guests != null && <span className="kfact"><KIcon name="users" size={14}/>{r.guests} guests</span>}
        <span className="kfact"><KIcon name="pin2" size={14}/>{r.loc}</span>
        <span className="kfact budget"><KIcon name="wallet" size={14}/>{r.budget}</span>
      </div>
      {mode==='incoming' && r.msg && <div className="msg">“{r.msg}”</div>}
      <div className="foot">
        {mode==='open' && <span className="bids"><KIcon name="users" size={14}/>{`${r.bids} quote${r.bids!==1?'s':''} so far`}</span>}
        {mode==='open'
          ? <button className="kbtn kbtn-pri" onClick={()=>ctx.push({ type:'bid', id:r.id })}><KIcon name="tag" size={15}/>Send quote</button>
          : <>
              <button className="kbtn kbtn-ghost" style={{ flex:1, justifyContent:'center', height:44 }} onClick={()=>ctx.toast('Declined request','x')}>Decline</button>
              <button className="kbtn kbtn-pri" style={{ flex:1, justifyContent:'center', height:44 }} onClick={()=>ctx.push({ type:'caterReq', id:r.id })}>Review &amp; accept</button>
            </>}
      </div>
    </div>
  );
}

function CateringScreen({ ctx, back }){
  const [seg, setSeg] = useState('open');
  return (
    <div className="kpage">
      <header className="khdr">
        <div className="khdr-row">
          {back && <button className="icon" onClick={ctx.nav.pop} style={{ marginRight:2 }}><KIcon name="chevLeft" size={20}/></button>}
          <div className="who"><div className="t"><div className="e">My Hub</div><div className="n">Requests &amp; events</div></div></div>
          <AvailToggle on={ctx.avail} onToggle={ctx.toggleAvail}/>
        </div>
        <div className="kseg" style={{ marginTop:16 }}>
          <button className={seg==='open'?'on':''} onClick={()=>setSeg('open')}>Open</button>
          <button className={seg==='incoming'?'on':''} onClick={()=>setSeg('incoming')}>Requests · {CATER_INCOMING.length}</button>
          <button className={seg==='bids'?'on':''} onClick={()=>setSeg('bids')}>My quotes</button>
        </div>
      </header>
      <div className="kscroll" style={{ paddingTop:16 }}>
        {seg==='open' && <>
          <div style={{ padding:'0 20px 6px', fontSize:13, fontWeight:600, color:'var(--soft)' }}>Open requests near you — send one fixed quote. The customer picks.</div>
          {CATER_OPEN.map(r=><ReqCard key={r.id} r={r} ctx={ctx} mode="open"/>)}
        </>}
        {seg==='incoming' && <>
          <div style={{ padding:'0 20px 6px', fontSize:13, fontWeight:600, color:'var(--soft)' }}>Customers who requested <b>you</b> directly.</div>
          {CATER_INCOMING.map(r=><ReqCard key={r.id} r={r} ctx={ctx} mode="incoming"/>)}
        </>}
        {seg==='bids' && <div style={{ paddingTop:4 }}>
          {MY_BIDS.map(b=>(
            <div key={b.id} className="kreq" style={{ paddingTop:14, paddingBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div className="b" style={{ flex:1, minWidth:0 }}>
                  <div className="ttl" style={{ fontSize:15, marginTop:0 }}>{b.title}</div>
                  <div className={'kmybid '+b.status} style={{ marginTop:9 }}>
                    <KIcon name={b.status==='accepted'?'check':b.status==='declined'?'x':'clock'} size={15}/>
                    {b.status==='accepted'?'Accepted':b.status==='declined'?'Not selected':'Awaiting decision'}
                    <span className="amt">{money(b.amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

/* ============================ MONEY / EARNINGS ============================ */
function MoneyScreen({ ctx, back }){
  return (
    <div className="kpage">
      <header className="khdr">
        <div className="khdr-row">
          {back && <button className="icon" onClick={ctx.nav.pop} style={{ marginRight:2 }}><KIcon name="chevLeft" size={20}/></button>}
          <div className="who"><div className="t"><div className="e">My Hub</div><div className="n">Earnings</div></div></div>
          <AvailToggle on={ctx.avail} onToggle={ctx.toggleAvail}/>
        </div>
      </header>
      <div className="kscroll" style={{ paddingTop:4 }}>
        <BalanceStrip ctx={ctx}/>
        <div className="ktiles" style={{ marginTop:14 }}>
          <StatTile ic="trendUp" cls="ic-green" v={money(BALANCE.week)}  l="This week"/>
          <StatTile ic="bars"    cls="ic-blue"  v={money(BALANCE.month)} l="This month"/>
        </div>

        <div className="kcard" style={{ marginTop:18 }}>
          <div className="kplan">
            <div className="ic" style={{ background:'var(--bg-2)', color:'var(--ink)' }}><KIcon name="bank" size={22}/></div>
            <div className="b"><div className="nm">Chase •••• 4242</div><div className="mt">Default payout · 1–2 business days</div></div>
            <button className="kbtn kbtn-ghost kbtn-sm" onClick={()=>ctx.toast('Manage payout methods','bank')}>Manage</button>
          </div>
        </div>
        <div style={{ padding:'0 20px' }}>
          <button className="kbtn kbtn-pri kbtn-block" onClick={()=>ctx.push({ type:'payout' })}><KIcon name="bank" size={17}/>Request payout · {money(BALANCE.available)}</button>
        </div>

        <div className="ksec"><h3>Recent activity</h3><a onClick={()=>ctx.toast('Full statement — demo','info')}>Statement</a></div>
        <div className="kledger">
          {LEDGER.map((e,i)=>(
            <div key={i} className="kentry">
              <div className={'ic '+e.cls}><KIcon name={e.ic} size={17}/></div>
              <div className="b"><div className="nm">{e.nm}</div><div className="mt">{e.mt}</div></div>
              <div className={'amt '+(e.pos?'pos':'neg')}>{e.pos?'+':'−'}{money(Math.abs(e.amt))}</div>
            </div>
          ))}
        </div>
        <div style={{ height:12 }}/>
      </div>
    </div>
  );
}

/* ============================ MENU / LISTINGS ============================ */
function MenuScreen({ ctx, back }){
  const [meals, setMeals] = useState(MY_MEALS);
  const toggle = id => setMeals(ms=>ms.map(m=>m.id===id?{...m, status:m.status==='live'?'paused':'live'}:m));
  const live = meals.filter(m=>m.status==='live').length;
  return (
    <div className="kpage">
      <header className="khdr">
        <div className="khdr-row">
          {back && <button className="icon" onClick={ctx.nav.pop} style={{ marginRight:2 }}><KIcon name="chevLeft" size={20}/></button>}
          <div className="who"><div className="t"><div className="e">My Hub</div><div className="n">My menu</div></div></div>
          <button className="kbtn kbtn-pri" onClick={()=>ctx.push({ type:'createMeal' })}><KIcon name="plus" size={16}/>Add meal</button>
        </div>
      </header>
      <div className="kscroll" style={{ paddingTop:14 }}>
        <div style={{ padding:'0 20px 8px', fontSize:13, fontWeight:600, color:'var(--soft)' }}>{live} live · {meals.length} total dishes</div>
        {meals.map(m=>{
          const ST = { live:['live','Live'], paused:['paused','Paused'], soldout:['prep','Sold out'] };
          const [cls,lbl] = ST[m.status];
          return (
            <div key={m.id} className="krow">
              <Ph grad={m.grad} className="ph"/>
              <div className="b">
                <div className="nm">{m.name}</div>
                <div className="mt"><KIcon name="star" size={12} style={{ color:'var(--star)', verticalAlign:'-2px' }}/> {m.rating} · {m.sold} sold · {money(m.price)}</div>
                <span className={'kstat '+cls}>{cls==='live'&&<span className="blip"/>}{lbl}</span>
              </div>
              <div className="r" style={{ display:'flex', flexDirection:'column', gap:7, alignItems:'flex-end' }}>
                <button className="kbtn kbtn-ghost kbtn-sm" onClick={()=>ctx.toast('Edit '+m.name,'edit')}><KIcon name="edit" size={14}/>Edit</button>
                <button className="kbtn kbtn-ghost kbtn-sm" onClick={()=>toggle(m.id)}>{m.status==='live'?'Pause':'Make live'}</button>
              </div>
            </div>
          );
        })}

        <div className="ksec"><h3>Meal plans</h3><a onClick={()=>ctx.push({ type:'plans' })}>Manage</a></div>
        {MY_PLANS.map(p=>(
          <div key={p.id} className="kcard" style={{ marginBottom:10 }}>
            <div className="kplan">
              <div className="ic" style={{ background:p.grad }}><KIcon name="repeat" size={20}/></div>
              <div className="b"><div className="nm">{p.name}</div><div className="mt">{p.meals} · {p.subs} subscribers</div></div>
              <div className="pr"><b>{money(p.price)}</b><span>/{p.per}</span></div>
            </div>
          </div>
        ))}
        <div style={{ padding:'2px 20px 0' }}>
          <button className="kbtn kbtn-ghost kbtn-block" onClick={()=>ctx.push({ type:'createPlan' })}><KIcon name="plus" size={16}/>Create a meal plan</button>
        </div>
        <div style={{ height:14 }}/>
      </div>
    </div>
  );
}

/* ============================ PLANS (manage subscriptions) ============================ */
function PlansScreen({ ctx }){
  const totalSubs = MY_PLANS.reduce((s,p)=>s+p.subs,0);
  const mrr = MY_PLANS.reduce((s,p)=>s+p.subs*p.price,0);
  return (
    <div className="kpage" style={{ background:'var(--bg)' }}>
      <KTop title="Meal plans" sub={`${totalSubs} subscribers`} onBack={ctx.nav.pop}/>
      <div className="kscroll" style={{ paddingTop:16 }}>
        <div className="kbal" style={{ marginTop:0 }}>
          <div className="l">Recurring revenue · monthly</div>
          <div className="v">{money(mrr*4.3).replace('.90','').replace(/\.\d+/,'')}</div>
          <div className="sub"><div className="it"><b>{totalSubs}</b><span>Active subscribers</span></div><div className="it"><b>{MY_PLANS.length}</b><span>Plans</span></div></div>
        </div>
        <div className="ksec"><h3>Your plans</h3><a onClick={()=>ctx.push({ type:'subscribers' })}>Subscribers &amp; prep</a></div>
        {MY_PLANS.map(p=>(
          <div key={p.id} className="kcard">
            <div className="kplan">
              <div className="ic" style={{ background:p.grad }}><KIcon name="repeat" size={20}/></div>
              <div className="b"><div className="nm">{p.name}</div><div className="mt">{p.meals} delivered weekly</div></div>
              <div className="pr"><b>{money(p.price)}</b><span>/{p.per}</span></div>
            </div>
            <div style={{ display:'flex', gap:18, marginTop:14, paddingTop:14, borderTop:'1px solid var(--border-2)' }}>
              <div><div style={{ fontSize:18, fontWeight:900, letterSpacing:'-.03em' }}>{p.subs}</div><div style={{ fontSize:11.5, fontWeight:700, color:'var(--muted)' }}>Subscribers</div></div>
              <div><div style={{ fontSize:18, fontWeight:900, letterSpacing:'-.03em' }}>{money(p.subs*p.price)}</div><div style={{ fontSize:11.5, fontWeight:700, color:'var(--muted)' }}>Per week</div></div>
              <button className="kbtn kbtn-ghost kbtn-sm" style={{ marginLeft:'auto', alignSelf:'center' }} onClick={()=>ctx.toast('Edit '+p.name,'edit')}><KIcon name="edit" size={14}/>Edit</button>
            </div>
          </div>
        ))}
        <div style={{ padding:'2px 20px 0' }}>
          <button className="kbtn kbtn-pri kbtn-block" onClick={()=>ctx.push({ type:'createPlan' })}><KIcon name="plus" size={16}/>New meal plan</button>
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

/* ============================ ORDER DETAIL ============================ */
function OrderDetail({ ctx, id }){
  const o = ORDERS.find(x=>x.id===id) || ORDERS[0];
  const m = myMeal(o.meal);
  const [status, setStatus] = useState(o.status);
  const FLOW = ['new','prep','ready','done'];
  const LABELS = { new:'New', prep:'Preparing', ready:'Ready', done:'Completed' };
  const NEXT = { new:'prep', prep:'ready', ready:'done' };
  const NEXTLBL = { new:'Accept & start cooking', prep:'Mark ready', ready:o.mode==='pickup'?'Mark picked up':'Mark delivered' };
  const idx = FLOW.indexOf(status);
  return (
    <div className="kpage" style={{ background:'var(--bg)' }}>
      <KTop title={'Order '+o.id} sub={o.when} onBack={ctx.nav.pop}/>
      <div className="kscroll" style={{ paddingTop:16, paddingBottom:120 }}>
        <div className="kcard">
          <div className="kplan">
            <Ph grad={m.grad} style={{ width:54, height:54, borderRadius:15, flex:'none' }}/>
            <div className="b"><div className="nm">{o.qty}× {m.name}</div><div className="mt">{o.mode==='pickup'?'Pickup':'Delivery'} · {LABELS[status]}</div></div>
            <div className="pr"><b>{money(o.total)}</b></div>
          </div>
        </div>

        <div className="kcard">
          <div className="ct">Customer</div>
          <div className="kplan">
            <div className="ic" style={{ background:'var(--g8)' }}>{o.cust[0]}</div>
            <div className="b"><div className="nm">{o.cust}</div><div className="mt">{o.mode==='pickup'?'Picking up · 412 Elm St':'88 Highland Ave NE · Apt 4'}</div></div>
            <button className="icon-btn" style={{ width:38, height:38 }} onClick={()=>ctx.toast('Message '+o.cust,'chat')}><KIcon name="chat" size={16}/></button>
          </div>
        </div>

        <div className="kcard">
          <div className="ct">Progress</div>
          {FLOW.map((s,i)=>(
            <div key={s} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 0' }}>
              <span style={{ width:26, height:26, borderRadius:'50%', display:'grid', placeItems:'center', flex:'none',
                background:i<=idx?'var(--green)':'var(--bg-2)', color:i<=idx?'#fff':'var(--muted)' }}>
                {i<=idx?<KIcon name="check" size={14}/>:<span style={{ width:6,height:6,borderRadius:'50%',background:'currentColor' }}/>}</span>
              <span style={{ fontSize:14, fontWeight:i===idx?900:700, color:i<=idx?'var(--ink)':'var(--muted)' }}>{LABELS[s]}</span>
            </div>
          ))}
        </div>
        <div style={{ height:8 }}/>
      </div>
      {NEXT[status] && (
        <div className="kdock">
          <button className="kbtn kbtn-pri kbtn-block" onClick={()=>{ setStatus(NEXT[status]); ctx.toast(NEXTLBL[status],'check',true); }}>{NEXTLBL[status]}</button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { KTop, CateringScreen, MoneyScreen, MenuScreen, PlansScreen, OrderDetail });
