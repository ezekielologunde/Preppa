/* PREPPA — My Hub (cook side): extra icons, mock data, shared atoms. On window. */

/* ---------- extra icons (delegate to base Icon for the rest) ---------- */
const KSTROKE = { fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' };
const KPATHS = {
  edit:     ['M12 20h9','M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z'],
  eye:      ['M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z','M12 9a3 3 0 100 6 3 3 0 000-6z'],
  trendUp:  ['M3 17l6-6 4 4 8-8','M15 7h6v6'],
  wallet:   ['M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z','M16 12h.01','M3 9h18'],
  bank:     ['M3 10l9-6 9 6','M4 10v8M20 10v8M8 10v8M12 10v8M16 10v8','M3 20h18'],
  mega:     ['M3 11v2a1 1 0 001 1h2l4 4V6L6 10H4a1 1 0 00-1 1z','M16 8a5 5 0 010 8','M19 5a9 9 0 010 14'],
  pause:    ['M8 5h3v14H8zM13 5h3v14h-3z'],
  bars:     ['M4 20V10M10 20V4M16 20v-7M22 20H2'],
  utensils: ['M4 3v7a2 2 0 002 2h0a2 2 0 002-2V3','M6 12v9','M16 3c-1.5 0-3 2-3 5s1 4 3 4v9'],
  camera:   ['M4 7h3l2-2h6l2 2h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z','M12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z'],
  box:      ['M21 8l-9-5-9 5 9 5 9-5z','M3 8v8l9 5 9-5V8','M12 13v8'],
  spark:    ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'],
  power:    ['M12 4v8','M7.5 7a7 7 0 109 0'],
  pin2:     ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z','M12 10a2.6 2.6 0 100-.01'],
  reorder:  ['M3 6h18M3 12h18M3 18h18'],
};
function KIcon({ name, size=22, color, style }){
  if(KPATHS[name]){
    return <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, ...style }}>{KPATHS[name].map((d,i)=><path key={i} d={d} {...KSTROKE}/>)}</svg>;
  }
  return <Icon name={name} size={size} color={color} style={style}/>;
}

/* ---------- cook identity ---------- */
const ME = { id:'maria', name:'Chef Maria', kitchen:"Maria's Kitchen", initial:'M', grad:'var(--g4)', rating:4.9, reviews:312, prepscore:98 };

/* ---------- meals I sell (listings) ---------- */
const MY_MEALS = [
  { id:'lasagna',  name:'Family Lasagna Tray', price:13.5, grad:'var(--g4)', status:'live',   sold:142, rating:4.9, serves:2 },
  { id:'meatballs',name:'Sunday Meatballs',    price:12.0, grad:'var(--g6)', status:'live',   sold:88,  rating:4.8, serves:2 },
  { id:'eggplant', name:'Eggplant Parmigiana', price:11.5, grad:'var(--g1)', status:'live',   sold:54,  rating:4.9, serves:1 },
  { id:'tiramisu', name:'Tiramisu Cups (2)',   price:8.5,  grad:'var(--g7)', status:'soldout',sold:47,  rating:5.0, serves:2 },
  { id:'minestra', name:'Tuscan Minestrone',   price:9.0,  grad:'var(--g3)', status:'paused', sold:31,  rating:4.7, serves:1 },
];
const myMeal = id => MY_MEALS.find(m=>m.id===id);

/* ---------- orders ---------- */
const ORDERS = [
  { id:'PR-2051', meal:'lasagna',  qty:2, cust:'Jordan A.',  total:27.00, mode:'delivery', status:'new',  when:'3 min ago',  day:'today' },
  { id:'PR-2050', meal:'tiramisu', qty:1, cust:'Priya S.',   total:8.50,  mode:'pickup',   status:'new',  when:'12 min ago', day:'today' },
  { id:'PR-2049', meal:'meatballs',qty:2, cust:'Marcus T.',  total:24.00, mode:'delivery', status:'prep', when:'28 min ago', day:'today' },
  { id:'PR-2048', meal:'eggplant', qty:1, cust:'Dana L.',    total:11.50, mode:'pickup',   status:'ready',when:'40 min ago', day:'today' },
  { id:'PR-2045', meal:'lasagna',  qty:3, cust:'The Okafors',total:40.50, mode:'delivery', status:'done', when:'Yesterday',  day:'yesterday' },
  { id:'PR-2043', meal:'meatballs',qty:1, cust:'Sofia R.',   total:12.00, mode:'pickup',   status:'done', when:'Yesterday',  day:'yesterday' },
  { id:'PR-2040', meal:'eggplant', qty:2, cust:'Liam K.',    total:23.00, mode:'delivery', status:'done', when:'Mon',        day:'earlier' },
  { id:'PR-2038', meal:'tiramisu', qty:4, cust:'Grace M.',   total:34.00, mode:'pickup',   status:'done', when:'Sun',        day:'earlier' },
];

/* ---------- requests board: open (quote), incoming (accept), my quotes ---------- */
const CATER_OPEN = [
  { id:'EVT-118', type:'Catering', title:'Office lunch for 25', host:'Lena · Northwind Studio', date:'Fri, Jun 12', guests:25, budget:'$400–600', loc:'Midtown · 3.2 km', cuisine:'Italian', posted:'2h ago', bids:4 },
  { id:'EVT-127', type:'Cook at my place', title:'Date-night dinner for 4', host:'Marcus T.', date:'Fri, Jul 10 · 7 PM', guests:4, budget:'$250–400', loc:'Old Fourth Ward · 2.4 km', cuisine:'Italian', posted:'3h ago', bids:3 },
  { id:'EVT-128', type:'Grocery run', title:'Weekly shop for family of 5', host:'Grace M.', date:'Tomorrow AM', guests:null, budget:'$35 + groceries', loc:'Poncey-Highland · 1.1 km', cuisine:null, posted:'4h ago', bids:1 },
  { id:'EVT-121', type:'Class',    title:'Pasta-making class for 8', host:'Dana W.', date:'Flexible', guests:8, budget:'$420', loc:'Your kitchen', cuisine:'Hands-on', posted:'5h ago', bids:2 },
  { id:'EVT-129', type:'Bulk order', title:'60 lunch boxes · team retreat', host:'Raj · Atlas Fintech', date:'Thu, Jul 16', guests:60, budget:'$540–700', loc:'Buckhead · 6 km', cuisine:'Mixed', posted:'1d ago', bids:5 },
  { id:'EVT-132', type:'Errand', title:'Farmers-market pickup', host:'Dana L.', date:'Sat morning', guests:null, budget:'$20', loc:'Freedom Farmers Mkt', cuisine:null, posted:'1d ago', bids:2 },
  { id:'EVT-124', type:'Event',    title:'Backyard graduation party', host:'The Bells', date:'Sat, Jun 28', guests:35, budget:'$700–900', loc:'Decatur · 8 km', cuisine:'Family-style', posted:'1d ago', bids:6 },
];
const caterById = id => [...CATER_OPEN, ...CATER_INCOMING.map(r=>({...r}))].find(r=>r.id===id);
const CATER_INCOMING = [
  { id:'REQ-44', type:'Private chef', title:'Anniversary dinner for two', host:'Olivia P.', date:'Sat, Jun 14 · 7 PM', guests:2, budget:'$300', loc:'Inman Park', cuisine:'Italian',
    msg:'We loved your lasagna last month — could you do a 4-course Italian anniversary night for us? Open to your menu suggestions.' },
  { id:'REQ-47', type:'Catering', title:'Corporate quarterly dinner', host:'Raj · Atlas Fintech', date:'Wed, Jun 18', guests:40, budget:'$1,200', loc:'Buckhead office', cuisine:'Mixed, halal options',
    msg:'Need a seated dinner for 40 with vegetarian + halal options. Plates, not buffet. Can you handle this size?' },
];
const MY_BIDS = [
  { id:'EVT-118', title:'Office lunch for 25', amount:520, status:'pending' },
  { id:'EVT-201', title:'Wine-pairing supper club', amount:780, status:'accepted' },
  { id:'EVT-190', title:'Holiday cookie workshop', amount:300, status:'declined' },
];

/* ---------- money ---------- */
const BALANCE = { available:842.50, pending:156.00, lifetime:18420, today:84.50, todayOrders:6, week:612.00, month:2480.00 };
const LEDGER = [
  { ic:'box',    cls:'ic-amber', nm:'Order #PR-2049 · Sunday Meatballs', mt:'Today · 11:42 AM',  amt:24.30,  pos:true },
  { ic:'gift',   cls:'ic-green', nm:'Tip from Jordan A.',                 mt:'Today · 10:05 AM',  amt:3.00,   pos:true },
  { ic:'bank',   cls:'ic-ink',   nm:'Payout to •••• 4242',                mt:'Yesterday',         amt:-500.00,pos:false },
  { ic:'box',    cls:'ic-amber', nm:'Order #PR-2045 · Family Lasagna',    mt:'Yesterday',         amt:48.60,  pos:true },
  { ic:'users',  cls:'ic-purple',nm:'Catering deposit · Graduation party',mt:'Mon',               amt:150.00, pos:true },
  { ic:'repeat', cls:'ic-red',   nm:'Refund · #PR-2041',                  mt:'Sun',               amt:-12.50, pos:false },
];

/* ---------- meal plans / subscriptions I offer ---------- */
const MY_PLANS = [
  { id:'weeknight', name:'Weeknight Italian Box', price:48, per:'week', meals:'3 meals', subs:24, grad:'var(--g4)', status:'live' },
  { id:'sunday',    name:'Family Sunday Tray',    price:36, per:'week', meals:'1 large tray', subs:11, grad:'var(--g6)', status:'live' },
];

/* ---------- analytics ---------- */
const ANALYTICS = {
  revenue:  [380, 420, 510, 460, 540, 600, 580, 612],     // last 8 weeks
  weeks:    ['','','','','','','','wk'],
  orders:96, aov:15.80, repeat:42, rating:4.9, views:1840, conv:11,
  top:[
    { name:'Family Lasagna Tray', sold:142, pct:100 },
    { name:'Sunday Meatballs',    sold:88,  pct:62 },
    { name:'Eggplant Parmigiana', sold:54,  pct:38 },
    { name:'Tiramisu Cups',       sold:47,  pct:33 },
  ],
};

/* ============================ SHARED ATOMS ============================ */
function StatTile({ ic, cls, v, l, d, dDir, onClick }){
  return (
    <button className="ktile" onClick={onClick}>
      <div className={'ic '+cls}><KIcon name={ic} size={18}/></div>
      <div className="v">{v}</div>
      <div className="l">{l}</div>
      {d && <div className={'d '+(dDir||'flat')}>{dDir==='up'&&<KIcon name="trendUp" size={12}/>}{d}</div>}
    </button>
  );
}

function Bars({ data, height=120 }){
  const max = Math.max(...data);
  return (
    <div className="kbars" style={{ height }}>
      {data.map((v,i)=><div key={i} className="bar" style={{ height:`${Math.max(6,(v/max)*100)}%` }}/>)}
    </div>
  );
}

function OrderRow({ o, ctx, onClick }){
  const m = myMeal(o.meal);
  const ST = { new:['new','New'], prep:['prep','Preparing'], ready:['ready','Ready'], done:['done','Completed'] };
  const [cls,lbl] = ST[o.status];
  return (
    <button className="krow" style={{ width:'calc(100% - 40px)', textAlign:'left' }} onClick={onClick}>
      <Ph grad={m.grad} className="ph"/>
      <div className="b">
        <div className="nm">{m.name}</div>
        <div className="mt">{o.cust} · {o.qty}× · {o.mode==='pickup'?'Pickup':'Delivery'}</div>
        <span className={'kstat '+cls}>{cls==='new'&&<span className="blip"/>}{lbl}</span>
      </div>
      <div className="r">
        <div className="amt">{money(o.total)}</div>
        <div className="mt" style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{o.when}</div>
      </div>
    </button>
  );
}

Object.assign(window, {
  KIcon, ME, MY_MEALS, myMeal, ORDERS, CATER_OPEN, CATER_INCOMING, caterById, MY_BIDS,
  BALANCE, LEDGER, MY_PLANS, ANALYTICS, StatTile, Bars, OrderRow,
});
