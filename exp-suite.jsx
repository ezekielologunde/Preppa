/* PREPPA — Experiences: services hub, request flow, quotes (fixed-price, customer picks). On window. */

/* ---------- service catalog ---------- */
const SERVICES = [
  { id:'cookhome', name:'Cook at My Place', sub:'A private chef cooks in your kitchen', ico:'chefhat', cls:'amber', premium:true,
    sizeLbl:'Guests', notesPh:'Tell them about the occasion, cuisine you love, dietary needs…', budgets:['$150–250','$250–400','$400+'] },
  { id:'catering', name:'Catering & Events', sub:'Parties, offices, celebrations', ico:'users', cls:'purple',
    sizeLbl:'Guests', notesPh:'Describe the event — plated or buffet, cuisines, timing…', budgets:['$300–600','$600–1,200','$1,200+'] },
  { id:'grocery',  name:'Grocery Run', sub:'A Preppa shops & delivers your list', ico:'bag', cls:'green',
    notesPh:'Paste your grocery list here — brands and swaps welcome…', budgets:['Under $50','$50–120','$120+'] },
  { id:'bulk',     name:'Bulk & Meal Prep', sub:'Trays & weekly prep at scale', ico:'grid', cls:'blue',
    sizeLbl:'Portions', notesPh:'What do you need cooked, how many portions, packaging…', budgets:['$100–250','$250–500','$500+'] },
  { id:'errand',   name:'Quick Errands', sub:'Pickups, drop-offs & market runs', ico:'bolt', cls:'red',
    notesPh:'What needs picking up or dropping off, and where…', budgets:['Under $25','$25–50','$50+'] },
];
const svcById = id => SERVICES.find(s=>s.id===id);

/* ---------- seed + quote generation ---------- */
const SEED_REQUESTS = [
  { id:'REQ-104', svc:'cookhome', title:'Anniversary dinner for two', when:'Sat, Jul 12 · 7:00 PM',
    loc:'Home · 88 Highland Ave NE', size:'2 guests', budget:'$250–400', status:'quoted',
    notes:'A 4-course Italian night for our anniversary. Open to menu ideas!',
    quotes:[
      { cook:'denise', amount:280, note:'I’d love to do this — 4 courses, my braised short rib as the main, and a plated dessert. I bring everything and leave your kitchen spotless.' },
      { cook:'maria',  amount:265, note:'Ciao! Fresh handmade pasta course, secondi, and tiramisu to finish. I can shop day-of for the freshest ingredients.' },
      { cook:'lucia',  amount:240, note:'A Oaxacan twist on date night — mole tasting, handmade tortillas, mezcal pairing notes. Something you won’t forget.' },
    ] },
];
const QUOTE_POOL = {
  cookhome:['denise','maria','lucia'], catering:['maria','amara'], grocery:['david','sana'],
  bulk:['amara','denise'], errand:['david','sana'],
};
const QUOTE_NOTES = {
  cookhome:['I’d love to cook for you — menu tailored to the occasion, and I handle all the shopping.','Happy to take this on! I’ll send a sample menu once we chat.'],
  catering:['I can absolutely handle this size — plated or family-style, your call.','This is right in my wheelhouse. Deposit reserves your date.'],
  grocery:['I shop at the Freedom Farmers Market every morning — can add your list to my run.','I can have this shopped and dropped within 2 hours.'],
  bulk:['I batch-cook trays every week — can scale to your count with labeled packaging.','Happy to do this as a weekly standing order too, if useful.'],
  errand:['I’m out on runs every afternoon — easy add.','Can do this today between my lunch and dinner windows.'],
};
function genQuotes(req){
  const pool = QUOTE_POOL[req.svc] || ['maria','david'];
  const base = { 'Under $25':20,'$25–50':38,'Under $50':42,'$50–120':85,'$120+':140,'$50+':60,
    '$100–250':180,'$250–500':360,'$500+':560,'$150–250':210,'$250–400':300,'$400+':450,
    '$300–600':480,'$600–1,200':900,'$1,200+':1400 }[req.budget] || 120;
  return pool.slice(0,2).map((c,i)=>({ cook:c, amount:Math.round(base*(0.9+i*0.18)), note:QUOTE_NOTES[req.svc][i] }));
}

/* ============================ EXPERIENCES TAB ============================ */
function SvcCard({ s, ctx }){
  return (
    <button className={'xsvc t-'+s.cls} onClick={()=>ctx.push({ type:'newRequest', svc:s.id })}>
      {s.premium && <span className="prem">Premium</span>}
      <span className={'ico '+s.cls}><Icon name={s.ico} size={21}/></span>
      <span className="nm">{s.name}</span>
      <span className="sb">{s.sub}</span>
    </button>
  );
}
function ReqStatusChip({ r }){
  if(r.status==='booked') return <span className="xchip booked"><Icon name="check" size={11}/>Booked</span>;
  if(r.status==='quoted') return <span className="xchip quoted"><span className="blip"/>{`${r.quotes.length} quote${r.quotes.length!==1?'s':''}`}</span>;
  return <span className="xchip open"><span className="blip"/>Finding cooks</span>;
}
function ExperiencesScreen({ ctx }){
  const reqs = ctx.requests;
  return (
    <div className="hpage" data-screen-label="Experiences">
      <header className="hhdr">
        <div className="hhdr-top">
          <h1 className="hpagetitle">Experiences</h1>
          <div className="hicons">
            <button className="hibtn" onClick={()=>ctx.push({ type:'notifs' })}><Icon name="bell" size={19}/>{ctx.notifCount>0 && <span className="dot"/>}</button>
          </div>
        </div>
        <div className="hgreet" style={{ marginTop:10 }}>
          <p style={{ marginTop:0 }}>Your local cooks, beyond dinner. Post a request, compare fixed quotes, pick your Preppa.</p>
        </div>
      </header>
      <div className="scroll pb-nav">
        {reqs.length>0 && <>
          <div className="hsec"><h3>Your requests</h3></div>
          {reqs.map(r=>(
            <button key={r.id} className="xreq" onClick={()=>ctx.push({ type:'quotes', id:r.id })}>
              <div className="top"><span className="xchip quoted" style={{ background:'var(--bg-2)', color:'var(--soft)' }}>{svcById(r.svc).name}</span><ReqStatusChip r={r}/></div>
              <div className="ttl">{r.title}</div>
              <div className="mt">{r.when} · {r.budget}</div>
              <div className="foot">{r.status==='booked' ? <>View booking<Icon name="chevRight" size={15}/></> : r.status==='quoted' ? <>Review quotes<Icon name="chevRight" size={15}/></> : <>View request<Icon name="chevRight" size={15}/></>}</div>
            </button>
          ))}
          <div style={{ height:8 }}/>
        </>}
        <div className="hsec"><h3>Book a service</h3></div>
        <div className="xgrid">{SERVICES.map(s=><SvcCard key={s.id} s={s} ctx={ctx}/>)}</div>
        <div className="hsec"><h3>Classes &amp; supper clubs</h3></div>
        <div className="exprail">{EXPERIENCES.map(e=><ExpCard key={e.id} e={e} ctx={ctx}/>)}</div>
        <div className="h-end"/>
      </div>
    </div>
  );
}

/* ============================ NEW REQUEST ============================ */
function ServiceRequestFlow({ ctx, svc }){
  const s = svcById(svc);
  const [when, setWhen] = useState('');
  const [size, setSize] = useState(s.id==='bulk'?20:2);
  const [budget, setBudget] = useState(null);
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(null);
  const valid = when.trim() && budget;

  const post = () => {
    const req = { id:'REQ-'+(200+Math.floor(Math.random()*700)), svc:s.id,
      title: s.sizeLbl ? `${s.name} · ${size} ${s.sizeLbl.toLowerCase()}` : s.name,
      when, loc:'Home · 88 Highland Ave NE', size:s.sizeLbl?`${size} ${s.sizeLbl.toLowerCase()}`:null,
      budget, notes, status:'open', quotes:[] };
    ctx.addRequest(req);
    setDone(req);
  };
  if(done) return (
    <div className="layer in">
      <div className="burst">
        <div className="ring"><Icon name="check" size={52}/></div>
        <h2>Request posted</h2>
        <p>Verified Preppas near you are being notified. Fixed-price quotes usually arrive within minutes — you pick who to book.</p>
        <button className="btn btn-pri btn-block btn-lg" style={{ marginTop:26 }} onClick={()=>ctx.nav.replace({ type:'quotes', id:done.id })}>View my request</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop:10 }} onClick={ctx.nav.pop}>Done</button>
      </div>
    </div>
  );
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>{s.name}</h2></div>
      <div className="scroll pb-cta">
        <div className="block">
          <div className="block-t">When</div>
          <input className="kinput" value={when} onChange={e=>setWhen(e.target.value)} placeholder={s.id==='grocery'||s.id==='errand'?'e.g. Today, before 5 PM':'e.g. Sat, Jul 12 · 7:00 PM'}/>
        </div>
        {s.sizeLbl && (
          <div className="block">
            <div className="block-t">{s.sizeLbl}</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:14.5, fontWeight:700, color:'var(--soft)' }}>How many?</span>
              <Stepper value={size} onDec={()=>setSize(Math.max(1,size-(s.id==='bulk'?5:1)))} onInc={()=>setSize(size+(s.id==='bulk'?5:1))}/>
            </div>
          </div>
        )}
        <div className="block">
          <div className="block-t">Budget</div>
          <div className="daychips">{s.budgets.map(b=><button key={b} className={'daychip'+(budget===b?' on':'')} onClick={()=>setBudget(b)}>{b}</button>)}</div>
        </div>
        <div className="block">
          <div className="block-t">Where</div>
          <div className="addr">
            <span className="pin"><Icon name="pin" size={20}/></span>
            <div className="b"><b>Home · 88 Highland Ave NE</b><p>Apt 4 · Atlanta, GA 30312</p></div>
            <button className="icon-btn" style={{ width:34, height:34 }} onClick={()=>ctx.toast('Edit address — demo')}><Icon name="chevRight" size={16}/></button>
          </div>
        </div>
        <div className="block">
          <div className="block-t">Details</div>
          <textarea className="kinput" value={notes} onChange={e=>setNotes(e.target.value)} placeholder={s.notesPh}/>
        </div>
        <div className="founder" style={{ margin:'4px 16px 0' }}>
          <Icon name="shield" size={20}/>
          <p>Quotes are <b>fixed prices</b> from verified Preppas — no haggling, no surprises. Payment is held by Preppa until the job is done.</p>
        </div>
      </div>
      <div className="dock">
        <button className="btn btn-pri btn-block" disabled={!valid} style={{ opacity:valid?1:.5, flex:1 }} onClick={()=>valid&&post()}>Post request</button>
      </div>
    </div>
  );
}

/* ============================ QUOTES / BOOKING ============================ */
function RequestQuotesScreen({ ctx, id }){
  const r = ctx.requests.find(x=>x.id===id);
  const [sel, setSel] = useState(null);       // quote being paid
  const [paid, setPaid] = useState(false);
  if(!r) return null;
  const s = svcById(r.svc);
  const FEE = 4.99;

  if(paid && sel){
    const c = COOKS[sel.cook];
    return (
      <div className="layer in">
        <div className="burst">
          <div className="ring"><Icon name="check" size={52}/></div>
          <h2>You’re booked!</h2>
          <p><b>{c.name}</b> is confirmed for {r.when} — <b>{money(sel.amount+FEE)}</b> paid and held until the job’s done. We’ve opened a chat to plan details.</p>
          <button className="btn btn-pri btn-block btn-lg" style={{ marginTop:26 }} onClick={()=>ctx.nav.replace({ type:'chat', cook:sel.cook })}>Open chat</button>
          <button className="btn btn-ghost btn-block" style={{ marginTop:10 }} onClick={ctx.nav.pop}>Done</button>
        </div>
      </div>
    );
  }

  if(sel){
    const c = COOKS[sel.cook];
    const total = sel.amount + FEE;
    return (
      <div className="layer in">
        <div className="thdr"><button className="icon-btn" onClick={()=>setSel(null)}><Icon name="chevLeft" size={20}/></button><h2>Confirm booking</h2></div>
        <div className="scroll pb-cta">
          <div className="block">
            <button className="cookrow" style={{ width:'100%', textAlign:'left' }} onClick={()=>ctx.push({ type:'chat', cook:sel.cook })}>
              <Avatar cook={sel.cook} size={46}/>
              <div className="b"><div className="nm">{c.name} <Icon name="shield" size={15} className="vchk"/></div><div className="mt">{c.cuisine} · PrepScore {c.prepscore}</div></div>
              <span className="go"><Icon name="chat" size={16}/></span>
            </button>
          </div>
          <div className="block">
            <div className="block-t">{r.title}</div>
            <div className="xfacts">
              <span className="xfact"><Icon name="calendar" size={14}/>{r.when}</span>
              {r.size && <span className="xfact"><Icon name="users" size={14}/>{r.size}</span>}
              <span className="xfact"><Icon name="pin" size={14}/>{r.loc}</span>
            </div>
          </div>
          <div className="block">
            <div className="block-t">Payment</div>
            <div className="pay on" style={{ width:'100%' }}>
              <span className="ico"><Icon name="card" size={20}/></span>
              <div className="b"><b>Visa •••• 4242</b><p>Held securely · released when the job is done</p></div>
              <span className="radio"/>
            </div>
          </div>
          <div className="summary">
            <div className="sumrow"><span>{c.name}’s fixed quote</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(sel.amount)}</span></div>
            <div className="sumrow"><span>Booking &amp; protection fee</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(FEE)}</span></div>
            <div className="sumrow total"><span>Total</span><b>{money(total)}</b></div>
          </div>
        </div>
        <div className="dock">
          <div className="total"><div className="l">Total</div><div className="v">{money(total)}</div></div>
          <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>{ ctx.acceptQuote(r.id, sel); setPaid(true); }}>Pay {money(total)}</button>
        </div>
      </div>
    );
  }

  const booked = r.status==='booked' && r.booked;
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>{s.name}</h2><span className="sub">{r.id}</span></div>
      <div className="scroll" style={{ paddingBottom:30 }}>
        <div className="block" style={{ paddingBottom:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <div style={{ fontSize:19, fontWeight:900, letterSpacing:'-.03em' }}>{r.title}</div>
            <ReqStatusChip r={r}/>
          </div>
          <div className="xfacts" style={{ marginTop:12 }}>
            <span className="xfact"><Icon name="calendar" size={14}/>{r.when}</span>
            {r.size && <span className="xfact"><Icon name="users" size={14}/>{r.size}</span>}
            <span className="xfact"><Icon name="tag" size={14}/>{r.budget}</span>
          </div>
          {r.notes && <div className="xquote" style={{ margin:'12px 0 0', padding:0, border:'none' }}><div className="note" style={{ marginTop:0 }}>“{r.notes}”</div></div>}
        </div>

        {booked ? (
          <>
            <div className="hsec"><h3>Your booking</h3></div>
            <div className="xquote" style={{ borderColor:'var(--green)' }}>
              <div className="hd">
                <span role="button" style={{ cursor:'pointer' }} onClick={()=>ctx.push({ type:'store', cook:r.booked.cook })}><Avatar cook={r.booked.cook} size={44}/></span>
                <div className="b">
                  <div className="nm">{COOKS[r.booked.cook].name} <Icon name="shield" size={14} className="vchk" style={{ color:'var(--green)' }}/></div>
                  <div className="mt">Confirmed · paid &amp; protected</div>
                </div>
                <div className="pr"><b>{money(r.booked.amount+4.99)}</b><span>paid</span></div>
              </div>
              <div className="acts">
                <button className="btn btn-ghost" style={{ flex:1, height:44, fontSize:14 }} onClick={()=>ctx.push({ type:'chat', cook:r.booked.cook })}><Icon name="chat" size={16}/>Chat</button>
                <button className="btn btn-ghost" style={{ flex:1, height:44, fontSize:14 }} onClick={()=>ctx.toast('Booking help — demo','help')}>Get help</button>
              </div>
            </div>
          </>
        ) : r.quotes.length===0 ? (
          <div style={{ marginTop:18 }}>
            <div className="xwait">
              <div className="ring"><Icon name="clock" size={24}/></div>
              <h4>Waiting for quotes</h4>
              <p>Verified Preppas near you are reviewing your request. Fixed quotes usually land within minutes.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="hsec"><h3>Quotes</h3><span style={{ fontSize:12.5, fontWeight:700, color:'var(--muted)' }}>Fixed prices · you pick</span></div>
            {[...r.quotes].sort((a,b)=>a.amount-b.amount).map((q,i)=>{
              const c = COOKS[q.cook];
              return (
                <div key={q.cook} className="xquote">
                  <div className="hd">
                    <span role="button" style={{ cursor:'pointer' }} onClick={()=>ctx.push({ type:'store', cook:q.cook })}><Avatar cook={q.cook} size={44}/></span>
                    <div className="b">
                      <div className="nm">{c.name} <Icon name="shield" size={14} className="vchk" style={{ color:'var(--green)' }}/></div>
                      <div className="mt"><Icon name="star" size={11} style={{ color:'var(--star)', verticalAlign:'-1px' }}/> {c.rating} · PrepScore {c.prepscore} · {c.dist}</div>
                    </div>
                    <div className="pr"><b>{money(q.amount)}</b><span>fixed</span></div>
                  </div>
                  <div className="note">“{q.note}”</div>
                  <div className="acts">
                    <button className="btn btn-ghost" style={{ height:44, fontSize:14 }} onClick={()=>ctx.push({ type:'chat', cook:q.cook })}><Icon name="chat" size={16}/></button>
                    <button className="btn btn-pri" style={{ flex:1, height:44, fontSize:14.5 }} onClick={()=>setSel(q)}>Accept &amp; book · {money(q.amount)}</button>
                  </div>
                </div>
              );
            })}
            <p style={{ margin:'6px 32px 0', fontSize:12, color:'var(--muted)', fontWeight:600, textAlign:'center', lineHeight:1.5 }}>Prices are final — Preppas quote once, you choose. Payment is protected until the job is done.</p>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { SERVICES, svcById, SEED_REQUESTS, genQuotes, ExperiencesScreen, ServiceRequestFlow, RequestQuotesScreen });
