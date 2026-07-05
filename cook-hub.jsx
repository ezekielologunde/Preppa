/* PREPPA — My Hub: Hub landing (two directions) + Orders. On window. */

/* ---------- availability toggle (pinned in header) ---------- */
function AvailToggle({ on, onToggle }){
  return (
    <button className={'kavail '+(on?'on':'off')} onClick={onToggle} aria-label="toggle availability">
      <span className="stat"><span className="blip"/>{on?'Open':'Paused'}</span>
      <span className="knob"><KIcon name={on?'power':'pause'} size={15}/></span>
    </button>
  );
}

function HubHeader({ ctx }){
  return (
    <header className="khdr">
      <div className="khdr-row">
        <div className="who">
          <span className="av" style={{ background:ME.grad }}>{ME.initial}</span>
          <div className="t">
            <div className="e">My Hub</div>
            <div className="n">{ME.kitchen}<KIcon name="shield" size={15} className="vchk"/></div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:9, flex:'none' }}>
          <AvailToggle on={ctx.avail} onToggle={ctx.toggleAvail}/>
          <button className="icon" onClick={()=>ctx.toast('No new alerts','bell')}><KIcon name="bell" size={19}/><span className="dot"/></button>
        </div>
      </div>
    </header>
  );
}

/* ---------- build the action queue ---------- */
function useQueue(ctx){
  const items = [];
  if(!ctx.avail){
    items.push({ k:'paused', kind:'warn', tag:'Paused', icCls:'ic-amber', ic:'pause',
      ttl:'Your kitchen is paused', mt:'New customers can’t order until you reopen.',
      btn:'Reopen', go:()=>ctx.toggleAvail(), btnCls:'kbtn-dark' });
  }
  ORDERS.filter(o=>o.status==='new' && !ctx.acted.includes(o.id)).forEach(o=>{
    const m = myMeal(o.meal);
    items.push({ k:o.id, kind:'new', tag:'New order', icCls:'ic-amber', ic:'box',
      ttl:`${o.qty}× ${m.name}`, mt:<><b>{o.cust}</b> · {money(o.total)} · {o.mode==='pickup'?'Pickup':'Delivery'}</>,
      when:o.when, btn:'Accept', go:()=>{ ctx.acceptOrder(o.id); ctx.toast(`Accepted ${o.id} — now cooking`,'check',true); }, btnCls:'kbtn-pri',
      sub:{ label:'Decline', go:()=>{ ctx.acceptOrder(o.id); ctx.toast(`Declined ${o.id}`,'x'); } } });
  });
  CATER_INCOMING.forEach(r=>{
    items.push({ k:r.id, kind:'cater', tag:'Catering request', icCls:'ic-purple', ic:'users',
      ttl:r.title, mt:<><b>{r.host}</b> · {r.guests} guests · {r.budget}</>,
      when:r.date.split('·')[0], btn:'Respond', go:()=>ctx.push({ type:'caterReq', id:r.id }), btnCls:'kbtn-dark' });
  });
  const won = MY_BIDS.find(b=>b.status==='accepted');
  if(won) items.push({ k:won.id, kind:'win', tag:'Quote chosen', icCls:'ic-green', ic:'trophy',
    ttl:won.title, mt:<>Your <b>{money(won.amount)}</b> quote was chosen — confirm to schedule.</>,
    btn:'Confirm', go:()=>ctx.toast('Event confirmed 🎉','check',true), btnCls:'kbtn-pri' });
  return items;
}

function ActionCard({ it }){
  return (
    <div className={'kact '+it.kind}>
      <div className={'ic '+it.icCls}><KIcon name={it.ic} size={20}/></div>
      <div className="b">
        <div className="top"><span className={'tag tag-'+it.kind}>{it.tag}</span>{it.when && <span className="when">{it.when}</span>}</div>
        <div className="ttl">{it.ttl}</div>
        <div className="mt">{it.mt}</div>
      </div>
      <div className="act">
        <button className={'kbtn '+it.btnCls} onClick={it.go}>{it.btn}</button>
        {it.sub && <button className="kbtn kbtn-ghost kbtn-sm" onClick={it.sub.go}>{it.sub.label}</button>}
      </div>
    </div>
  );
}

/* ---------- shortcuts ---------- */
const SHORTCUTS = [
  { type:'orders',     ic:'box',      cls:'ic-amber',  l:'Orders' },
  { type:'catering',   ic:'users',    cls:'ic-purple', l:'Requests' },
  { type:'money',      ic:'wallet',   cls:'ic-green',  l:'Earnings' },
  { type:'menu',       ic:'utensils', cls:'ic-ink',    l:'My menu' },
  { type:'createMeal', ic:'plus',     cls:'ic-amber',  l:'Add meal' },
  { type:'analytics',  ic:'bars',     cls:'ic-blue',   l:'Analytics' },
];
function Shortcuts({ ctx }){
  return (
    <div className="kgrid">
      {SHORTCUTS.map(s=>(
        <button key={s.type} className="kshort" onClick={()=>ctx.push({ type:s.type })}>
          <span className={'ic '+s.cls}><KIcon name={s.ic} size={19}/></span>
          <span className="l">{s.l}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- balance strip ---------- */
function BalanceStrip({ ctx }){
  return (
    <div className="kbal">
      <button className="pay" onClick={()=>ctx.push({ type:'payout' })}><KIcon name="bank" size={15}/>Pay out</button>
      <div className="l">Available balance</div>
      <div className="v">{money(BALANCE.available)}</div>
      <div className="sub">
        <div className="it"><b>{money(BALANCE.today)}</b><span>Today · {BALANCE.todayOrders} orders</span></div>
        <div className="it"><b>{money(BALANCE.pending)}</b><span>Pending</span></div>
      </div>
    </div>
  );
}

/* ============================ HUB SCREEN ============================ */
function HubScreen({ ctx }){
  const queue = useQueue(ctx);
  const dir = ctx.dir || 'focus';

  const Queue = (
    <>
      <div className="ksec"><h3>Needs your attention{queue.length>0 && <span className="cnt">{queue.length}</span>}</h3></div>
      {queue.length>0
        ? <div className="kqueue">{queue.map(it=><ActionCard key={it.k} it={it}/>)}</div>
        : <div className="kqueue"><div className="kempty"><div className="ring"><KIcon name="check" size={28}/></div><h4>All caught up</h4><p>No orders or requests waiting. Nicely done.</p></div></div>}
    </>
  );

  return (
    <div className="kpage">
      <HubHeader ctx={ctx}/>
      <div className="kscroll">
        {dir==='focus' ? (
          <>
            <BalanceStrip ctx={ctx}/>
            {Queue}
            <div className="ksec"><h3>This week</h3><a onClick={()=>ctx.push({ type:'analytics' })}>Analytics</a></div>
            <div className="ktiles">
              <StatTile ic="wallet"  cls="ic-green"  v={money(BALANCE.week)} l="Earnings" d="↑ vs last wk" dDir="up" onClick={()=>ctx.push({ type:'money' })}/>
              <StatTile ic="box"     cls="ic-amber"  v="34" l="Orders" d="6 today" dDir="flat" onClick={()=>ctx.push({ type:'orders' })}/>
            </div>
            <div className="ksec"><h3>Shortcuts</h3></div>
            <Shortcuts ctx={ctx}/>
          </>
        ) : (
          <>
            <BalanceStrip ctx={ctx}/>
            <div className="ksec tight"><h3>Today</h3></div>
            <div className="ktiles">
              <StatTile ic="wallet" cls="ic-green"  v={money(BALANCE.today)} l="Earnings today" onClick={()=>ctx.push({ type:'money' })}/>
              <StatTile ic="box"    cls="ic-amber"  v={BALANCE.todayOrders} l="Orders today" onClick={()=>ctx.push({ type:'orders' })}/>
              <StatTile ic="star"   cls="ic-blue"   v={ME.rating} l={`${ME.reviews} reviews`} onClick={()=>ctx.push({ type:'analytics' })}/>
              <StatTile ic="trendUp"cls="ic-purple" v={`${ANALYTICS.repeat}%`} l="Repeat rate" d="Analytics" dDir="flat" onClick={()=>ctx.push({ type:'analytics' })}/>
            </div>
            {Queue}
            <div className="ksec"><h3>Shortcuts</h3></div>
            <Shortcuts ctx={ctx}/>
          </>
        )}
        <div style={{ height:8 }}/>
      </div>
    </div>
  );
}

/* ============================ ORDERS ============================ */
function OrdersScreen({ ctx, back }){
  const [seg, setSeg] = useState('active');
  const active = ORDERS.filter(o=>o.status!=='done');
  const past   = ORDERS.filter(o=>o.status==='done');
  const list = seg==='active' ? active : past;
  const groups = seg==='past'
    ? [['Yesterday', past.filter(o=>o.day==='yesterday')], ['Earlier', past.filter(o=>o.day==='earlier')]]
    : [[null, active]];
  return (
    <div className="kpage">
      <header className="khdr">
        <div className="khdr-row">
          {back && <button className="icon" onClick={ctx.nav.pop} style={{ marginRight:2 }}><KIcon name="chevLeft" size={20}/></button>}
          <div className="who"><div className="t"><div className="e">My Hub</div><div className="n">Orders</div></div></div>
          <AvailToggle on={ctx.avail} onToggle={ctx.toggleAvail}/>
        </div>
        <div className="kseg" style={{ marginTop:16 }}>
          <button className={seg==='active'?'on':''} onClick={()=>setSeg('active')}>Active · {active.length}</button>
          <button className={seg==='past'?'on':''} onClick={()=>setSeg('past')}>History</button>
        </div>
      </header>
      <div className="kscroll" style={{ paddingTop:14 }}>
        {list.length===0 && <div className="kempty" style={{ marginTop:40 }}><div className="ring"><KIcon name="box" size={28}/></div><h4>Nothing here yet</h4><p>New orders will appear the moment they come in.</p></div>}
        {groups.map(([label, items], gi)=> items.length>0 && (
          <React.Fragment key={gi}>
            {label && <div className="kday">{label}</div>}
            {items.map(o=><OrderRow key={o.id} o={o} ctx={ctx} onClick={()=>ctx.push({ type:'order', id:o.id })}/>)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HubScreen, OrdersScreen, AvailToggle, useQueue });
