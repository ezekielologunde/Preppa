/* PREPPA — My Hub: create meal/plan, bid, accept request, payout, analytics. On window. */

/* photo placeholder that "fills" on tap (simulated upload) */
function PhotoPick({ grad, setGrad }){
  const GRADS = ['var(--g4)','var(--g1)','var(--g6)','var(--g3)','var(--g7)','var(--g8)'];
  if(grad){
    return (
      <button className="kphoto filled" style={{ background:grad }} onClick={()=>setGrad(GRADS[(GRADS.indexOf(grad)+1)%GRADS.length])}>
        <span className="cam"><KIcon name="camera" size={18}/></span>
      </button>
    );
  }
  return (
    <button className="kphoto" onClick={()=>setGrad(GRADS[0])}>
      <KIcon name="camera" size={26}/>
      <span>Add a photo of your dish</span>
    </button>
  );
}

function SuccessBurst({ title, body, btn, onDone }){
  return (
    <div className="kburst">
      <div className="ring"><KIcon name="check" size={48}/></div>
      <h2>{title}</h2>
      <p>{body}</p>
      <button className="kbtn kbtn-pri kbtn-block" style={{ marginTop:28, maxWidth:300 }} onClick={onDone}>{btn}</button>
    </div>
  );
}

/* ============================ CREATE MEAL ============================ */
function CreateMealFlow({ ctx }){
  const [grad, setGrad] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [serves, setServes] = useState(2);
  const [cat, setCat] = useState('Comfort');
  const [diet, setDiet] = useState([]);
  const [done, setDone] = useState(false);
  const CATS = ['Comfort','Pasta','Healthy','Soul food','Halal','Dessert','Seafood'];
  const DIETS = ['Vegetarian','Gluten-free','Halal','Dairy-free','Nut-free'];
  const toggleD = d => setDiet(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const valid = name.trim() && price;

  if(done) return <div className="kpage"><SuccessBurst title="Meal published" body={`${name} is now live on your menu — customers near you can order it right away.`} btn="Done" onDone={ctx.nav.pop}/></div>;

  return (
    <div className="ksheet">
      <KTop title="Add a meal" onBack={ctx.nav.pop}/>
      <div className="body">
        <div className="kfield"><PhotoPick grad={grad} setGrad={setGrad}/></div>
        <div className="kfield"><label>Dish name</label><input className="kinput" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Family Lasagna Tray"/></div>
        <div className="kfield"><label>Description <span className="hint">tell the story</span></label><textarea className="kinput" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Layered fresh pasta, slow-simmered ragù, three cheeses…"/></div>
        <div style={{ display:'flex', gap:12 }}>
          <div className="kfield" style={{ flex:1 }}><label>Price</label>
            <div className="kmoneywrap"><span className="sign">$</span><input className="kinput money-in" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value.replace(/[^0-9.]/g,''))} placeholder="0.00"/></div>
          </div>
          <div className="kfield" style={{ flex:1 }}><label>Serves</label>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:50, padding:'0 6px 0 14px', background:'var(--bg-2)', borderRadius:13 }}>
              <span style={{ fontSize:15, fontWeight:800 }}>{serves}</span>
              <Stepper sm value={serves} onDec={()=>setServes(Math.max(1,serves-1))} onInc={()=>setServes(serves+1)}/>
            </div>
          </div>
        </div>
        <div className="kfield"><label>Category</label>
          <div className="kchoices">{CATS.map(c=><button key={c} className={'kchoice'+(cat===c?' on':'')} onClick={()=>setCat(c)}>{c}</button>)}</div>
        </div>
        <div className="kfield"><label>Dietary <span className="hint">optional</span></label>
          <div className="kchoices">{DIETS.map(d=><button key={d} className={'kchoice'+(diet.includes(d)?' on':'')} onClick={()=>toggleD(d)}>{diet.includes(d)&&<KIcon name="check" size={13}/>}{d}</button>)}</div>
        </div>
        <div className="kfield"><label>Daily quantity <span className="hint">how many you can make</span></label><input className="kinput" inputMode="numeric" placeholder="e.g. 12 trays per day"/></div>
      </div>
      <div className="kdock">
        <button className="kbtn kbtn-pri kbtn-block" disabled={!valid} style={{ opacity:valid?1:.5 }} onClick={()=>valid&&setDone(true)}>Publish meal</button>
      </div>
    </div>
  );
}

/* ============================ CREATE MEAL PLAN ============================ */
function CreatePlanFlow({ ctx }){
  const [grad, setGrad] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState(3);
  const [cadence, setCadence] = useState('week');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const valid = name.trim() && price;
  if(done) return <div className="kpage"><SuccessBurst title="Plan created" body={`${name} is live. Customers can subscribe and you’ll earn ${money(Number(price)||0)} per ${cadence}, automatically.`} btn="Back to plans" onDone={()=>{ ctx.nav.pop(); }}/></div>;
  return (
    <div className="ksheet">
      <KTop title="Create a meal plan" onBack={ctx.nav.pop}/>
      <div className="body">
        <div className="kfield"><PhotoPick grad={grad} setGrad={setGrad}/></div>
        <div className="kfield"><label>Plan name</label><input className="kinput" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Weeknight Italian Box"/></div>
        <div className="kfield"><label>What subscribers get</label><textarea className="kinput" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Three chef-cooked dinners delivered every week, rotating menu…"/></div>
        <div style={{ display:'flex', gap:12 }}>
          <div className="kfield" style={{ flex:1 }}><label>Price</label>
            <div className="kmoneywrap"><span className="sign">$</span><input className="kinput money-in" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value.replace(/[^0-9.]/g,''))} placeholder="0.00"/></div>
          </div>
          <div className="kfield" style={{ flex:1 }}><label>Meals included</label>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:50, padding:'0 6px 0 14px', background:'var(--bg-2)', borderRadius:13 }}>
              <span style={{ fontSize:15, fontWeight:800 }}>{count}</span>
              <Stepper sm value={count} onDec={()=>setCount(Math.max(1,count-1))} onInc={()=>setCount(count+1)}/>
            </div>
          </div>
        </div>
        <div className="kfield"><label>Billing cadence</label>
          <div className="kseg">
            {['week','2 weeks','month'].map(c=><button key={c} className={cadence===c?'on':''} onClick={()=>setCadence(c)}>Per {c}</button>)}
          </div>
        </div>
        <div className="kcard" style={{ margin:'22px 0 0', background:'var(--primary-l)', border:'none' }}>
          <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
            <KIcon name="spark" size={20} style={{ color:'var(--primary)', flex:'none', marginTop:1 }}/>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--primary-d)', lineHeight:1.5 }}>Subscriptions create steady, recurring income. Plans with 3+ meals see the highest sign-up rates.</div>
          </div>
        </div>
      </div>
      <div className="kdock">
        <div className="tot"><div className="l">Per {cadence}</div><div className="v">{money(Number(price)||0)}</div></div>
        <button className="kbtn kbtn-pri kbtn-block" disabled={!valid} style={{ opacity:valid?1:.5, flex:1 }} onClick={()=>valid&&setDone(true)}>Publish plan</button>
      </div>
    </div>
  );
}

/* ============================ SEND A QUOTE ============================ */
function BidFlow({ ctx, id }){
  const r = caterById(id) || CATER_OPEN[0];
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);
  const valid = amount;
  if(done) return <div className="kpage"><SuccessBurst title="Quote sent" body={`Your fixed ${money(Number(amount)||0)} quote for “${r.title}” is in. It’s final — no back-and-forth. You’ll be notified if ${r.host.split('·')[0].split(' ')[0]} books you.`} btn="Back to requests" onDone={ctx.nav.pop}/></div>;
  return (
    <div className="ksheet">
      <KTop title="Send a quote" onBack={ctx.nav.pop}/>
      <div className="body">
        <div className="kcard" style={{ margin:'18px 0 0' }}>
          <div className="top" style={{ display:'flex', gap:10, alignItems:'center' }}><span className="badge" style={{ fontSize:10, fontWeight:900, letterSpacing:'.05em', textTransform:'uppercase', padding:'3px 9px', borderRadius:7, background:'var(--purple-l)', color:'var(--purple)' }}>{r.type}</span></div>
          <div style={{ fontSize:17, fontWeight:900, letterSpacing:'-.03em', marginTop:10 }}>{r.title}</div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--soft)', marginTop:3 }}>{r.host}</div>
          <div className="facts" style={{ marginTop:13 }}>
            <span className="kfact"><KIcon name="calendar" size={14}/>{r.date}</span>
            <span className="kfact"><KIcon name="users" size={14}/>{r.guests} guests</span>
            <span className="kfact budget"><KIcon name="wallet" size={14}/>{r.budget}</span>
          </div>
        </div>
        <div className="kfield"><label>Your fixed quote <span className="hint">budget {r.budget}</span></label>
          <div className="kmoneywrap"><span className="sign">$</span><input className="kinput money-in" inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} placeholder="0.00" style={{ fontSize:18, fontWeight:800 }}/></div>
        </div>
        <div className="kfield"><label>Pitch <span className="hint">why you?</span></label><textarea className="kinput" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Hi! I’d love to cook for your event. Here’s what I’m thinking for the menu…"/></div>
        <div className="kfield"><label>Proposed menu <span className="hint">optional</span></label><button className="kbtn kbtn-ghost kbtn-block" style={{ height:50, justifyContent:'flex-start', paddingLeft:16 }} onClick={()=>ctx.toast('Attach menu — demo','utensils')}><KIcon name="utensils" size={16}/>Attach a sample menu</button></div>
      </div>
      <div className="kdock">
        <div className="tot"><div className="l">Your quote</div><div className="v">{money(Number(amount)||0)}</div></div>
        <button className="kbtn kbtn-pri kbtn-block" disabled={!valid} style={{ opacity:valid?1:.5, flex:1 }} onClick={()=>valid&&setDone(true)}>Send quote</button>
      </div>
    </div>
  );
}

/* ============================ ACCEPT DIRECT REQUEST ============================ */
function CaterRequestDetail({ ctx, id }){
  const r = CATER_INCOMING.find(x=>x.id===id) || CATER_INCOMING[0];
  const [done, setDone] = useState(false);
  if(done) return <div className="kpage"><SuccessBurst title="Request accepted" body={`You’re booked with ${r.host.split('·')[0]} for ${r.date}. We’ve started a chat so you can finalize the details.`} btn="Open chat" onDone={()=>{ ctx.nav.pop(); ctx.toast('Chat with '+r.host.split('·')[0],'chat'); }}/></div>;
  return (
    <div className="kpage" style={{ background:'var(--bg)' }}>
      <KTop title="Catering request" onBack={ctx.nav.pop}/>
      <div className="kscroll" style={{ paddingTop:18, paddingBottom:120 }}>
        <div style={{ padding:'0 20px' }}>
          <span style={{ fontSize:10, fontWeight:900, letterSpacing:'.05em', textTransform:'uppercase', padding:'3px 9px', borderRadius:7, background:'var(--purple-l)', color:'var(--purple)' }}>{r.type}</span>
          <div style={{ fontSize:23, fontWeight:900, letterSpacing:'-.035em', marginTop:12 }}>{r.title}</div>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--soft)', marginTop:4 }}>Requested by {r.host}</div>
        </div>
        <div className="kcard" style={{ marginTop:18 }}>
          <div className="kbreakrow"><span className="l"><span className="ic ic-purple"><KIcon name="calendar" size={15}/></span>Date</span><span className="v">{r.date}</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-amber"><KIcon name="users" size={15}/></span>Guests</span><span className="v">{r.guests}</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-green"><KIcon name="wallet" size={15}/></span>Budget</span><span className="v">{r.budget}</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-blue"><KIcon name="pin2" size={15}/></span>Location</span><span className="v">{r.loc}</span></div>
        </div>
        <div className="ksec tight"><h3>Their message</h3></div>
        <div style={{ margin:'0 20px', padding:'15px 16px', background:'var(--surface)', border:'1px solid var(--border-2)', borderRadius:16, fontSize:14.5, fontWeight:500, color:'var(--ink-2)', lineHeight:1.55 }}>“{r.msg}”</div>
        <div style={{ height:10 }}/>
      </div>
      <div className="kdock" style={{ gap:10 }}>
        <button className="kbtn kbtn-ghost" style={{ flex:1, justifyContent:'center', height:52 }} onClick={()=>{ ctx.nav.pop(); ctx.toast('Request declined','x'); }}>Decline</button>
        <button className="kbtn kbtn-pri" style={{ flex:2, justifyContent:'center', height:52 }} onClick={()=>setDone(true)}><KIcon name="check" size={17}/>Accept request</button>
      </div>
    </div>
  );
}

/* ============================ PAYOUT ============================ */
function PayoutFlow({ ctx }){
  const [amount, setAmount] = useState(String(BALANCE.available.toFixed(2)));
  const [done, setDone] = useState(false);
  const valid = Number(amount)>0 && Number(amount)<=BALANCE.available;
  if(done) return <div className="kpage"><SuccessBurst title="Payout on the way" body={`${money(Number(amount))} is heading to your Chase account ending 4242. It usually lands in 1–2 business days.`} btn="Done" onDone={ctx.nav.pop}/></div>;
  return (
    <div className="ksheet">
      <KTop title="Request payout" onBack={ctx.nav.pop}/>
      <div className="body">
        <div className="kbal" style={{ margin:'18px 0 0' }}>
          <div className="l">Available to pay out</div>
          <div className="v">{money(BALANCE.available)}</div>
        </div>
        <div className="kfield"><label>Amount</label>
          <div className="kmoneywrap"><span className="sign">$</span><input className="kinput money-in" inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} style={{ fontSize:20, fontWeight:900 }}/></div>
          <button className="kbtn kbtn-ghost kbtn-sm" style={{ marginTop:10 }} onClick={()=>setAmount(String(BALANCE.available.toFixed(2)))}>Pay out everything</button>
        </div>
        <div className="kfield"><label>To</label>
          <div className="kcard" style={{ margin:0 }}>
            <div className="kplan">
              <div className="ic" style={{ background:'var(--bg-2)', color:'var(--ink)' }}><KIcon name="bank" size={20}/></div>
              <div className="b"><div className="nm">Chase •••• 4242</div><div className="mt">1–2 business days · no fee</div></div>
              <KIcon name="check" size={18} style={{ color:'var(--green)' }}/>
            </div>
          </div>
        </div>
      </div>
      <div className="kdock">
        <button className="kbtn kbtn-pri kbtn-block" disabled={!valid} style={{ opacity:valid?1:.5 }} onClick={()=>valid&&setDone(true)}>Request {money(Number(amount)||0)}</button>
      </div>
    </div>
  );
}

/* ============================ ANALYTICS ============================ */
function AnalyticsScreen({ ctx }){
  const A = ANALYTICS;
  return (
    <div className="kpage" style={{ background:'var(--bg)' }}>
      <KTop title="Analytics" sub="Last 8 weeks" onBack={ctx.nav.pop}/>
      <div className="kscroll" style={{ paddingTop:16, paddingBottom:40 }}>
        <div className="kchart">
          <div className="hd">
            <div><div className="l">Revenue</div><div className="v">{money(A.revenue.reduce((s,v)=>s+v,0))}</div></div>
            <div className="d"><KIcon name="trendUp" size={14}/>Trending up</div>
          </div>
          <Bars data={A.revenue}/>
          <div className="kxaxis">{['8w','7w','6w','5w','4w','3w','2w','now'].map((w,i)=><span key={i}>{w}</span>)}</div>
        </div>

        <div className="ktiles" style={{ marginTop:16 }}>
          <StatTile ic="box"     cls="ic-amber"  v={A.orders} l="Orders this month"/>
          <StatTile ic="dollar"  cls="ic-green"  v={money(A.aov)} l="Avg order value"/>
          <StatTile ic="repeat"  cls="ic-purple" v={`${A.repeat}%`} l="Repeat customers"/>
          <StatTile ic="star"    cls="ic-blue"   v={A.rating} l={`Rating · ${ME.reviews}`}/>
          <StatTile ic="repeat"  cls="ic-green"  v={money(MY_PLANS.reduce((s,p)=>s+p.subs*p.price,0))} l="Recurring · weekly"/>
          <StatTile ic="users"   cls="ic-amber"  v={MY_PLANS.reduce((s,p)=>s+p.subs,0)} l="Plan subscribers"/>
        </div>

        <div className="ksec"><h3>Top meals</h3><span className="cnt">by orders</span></div>
        <div className="kcard" style={{ padding:'6px 4px' }}>
          {A.top.map((t,i)=>(
            <div key={i} className="kmeal">
              <div className="top"><span>{t.name}</span><span className="sold">{t.sold} sold</span></div>
              <div className="track"><div className="fill" style={{ width:t.pct+'%' }}/></div>
            </div>
          ))}
        </div>

        <div className="ksec"><h3>How customers find you</h3></div>
        <div className="kbreak">
          <div className="kbreakrow"><span className="l"><span className="ic ic-blue"><KIcon name="eye" size={15}/></span>Profile views</span><span className="v">{A.views.toLocaleString()}</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-amber"><KIcon name="box" size={15}/></span>Views → orders</span><span className="v">{A.conv}%</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-green"><KIcon name="repeat" size={15}/></span>Repeat order rate</span><span className="v">{A.repeat}%</span></div>
          <div className="kbreakrow"><span className="l"><span className="ic ic-purple"><KIcon name="users" size={15}/></span>New customers · 30d</span><span className="v">38</span></div>
        </div>
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

Object.assign(window, { CreateMealFlow, CreatePlanFlow, BidFlow, CaterRequestDetail, PayoutFlow, AnalyticsScreen, SuccessBurst });
