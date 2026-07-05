/* PREPPA — entry & tab screens: Onboarding, Home, Explore, Feed, Notifications, Chat, Experience, Profile */

/* ============================ ONBOARDING ============================ */
function Onboarding({ onDone }){
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const GOALS = [
    { id:'daily',  ico:'home',    t:'Daily meals',        s:'Fresh dinners from cooks near me' },
    { id:'prep',   ico:'repeat',  t:'Meal-prep the week', s:'A weekly box, dropped on schedule' },
    { id:'health', ico:'leaf',    t:'Eat healthier',      s:'High-protein, balanced, fresh' },
    { id:'events', ico:'gift',    t:'Events & experiences', s:'Book a chef, class or supper club' },
  ];
  const CUIS = ['Italian','West African','Halal','Mexican','Soul food','Desi','Healthy','Seafood','Vegan','BBQ','Desserts','Comfort'];
  const toggleCuis = c => setCuisines(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c]);
  return (
    <div className="ob fade-in">
      <div className="ob-top">
        {step>0 ? <button className="icon-btn" onClick={()=>setStep(step-1)}><Icon name="chevLeft" size={20}/></button> : <span style={{ width:42 }}/>}
        <div className="ob-prog">{[0,1,2].map(i=><i key={i} className={i<=step?'on':''}/>)}</div>
        <button className="ob-skip" onClick={onDone}>Skip</button>
      </div>
      {step===0 && (
        <div className="ob-body fade-in">
          <div style={{ flex:1 }}/>
          <div className="ob-mark"><Icon name="flame" size={38} color="#fff"/></div>
          <h1>Real food from <span className="g">real local cooks.</span></h1>
          <p className="lead">Order homemade meals, watch cooks live, and book prep experiences — all from verified neighbors who love to cook.</p>
          <div style={{ flex:1 }}/>
          <div className="ob-foot"><button className="btn btn-pri btn-block btn-lg" onClick={()=>setStep(1)}>Get started</button></div>
        </div>
      )}
      {step===1 && (
        <div className="ob-body fade-in">
          <h1 style={{ marginTop:6 }}>What brings you to Preppa?</h1>
          <p className="lead" style={{ marginBottom:4 }}>Pick your main goal — we’ll tune your feed from minute one.</p>
          <div className="goals">
            {GOALS.map(g=>(
              <button key={g.id} className={'goal'+(goal===g.id?' on':'')} onClick={()=>setGoal(g.id)}>
                <span className="ico"><Icon name={g.ico} size={22}/></span>
                <span className="b"><b>{g.t}</b><p>{g.s}</p></span>
                <span className="ck">{goal===g.id && <Icon name="check" size={14}/>}</span>
              </button>
            ))}
          </div>
          <div style={{ flex:1 }}/>
          <div className="ob-foot"><button className="btn btn-pri btn-block btn-lg" disabled={!goal} onClick={()=>setStep(2)}>Continue</button></div>
        </div>
      )}
      {step===2 && (
        <div className="ob-body fade-in">
          <h1 style={{ marginTop:6 }}>What do you love to eat?</h1>
          <p className="lead">Choose a few cuisines. You can change these anytime.</p>
          <div className="cuis">{CUIS.map(c=>(<button key={c} className={'c'+(cuisines.includes(c)?' on':'')} onClick={()=>toggleCuis(c)}>{c}</button>))}</div>
          <div style={{ flex:1 }}/>
          <div className="ob-foot"><button className="btn btn-pri btn-block btn-lg" onClick={onDone}>{cuisines.length ? `Start exploring · ${cuisines.length} picked` : 'Start exploring'}</button></div>
        </div>
      )}
    </div>
  );
}

/* ============================ shared cards ============================ */
function MealCardLg({ m, ctx, showMatch }){
  const c = COOKS[m.cook];
  const quick = (e)=>{ e.stopPropagation(); ctx.addToCart({ key:m.id, name:m.name, cook:m.cook, price:m.price, grad:m.grad },1); ctx.toast(`Added ${m.name}`,'check',true); };
  return (
    <button className="mcard lg" onClick={()=>ctx.push({ type:'meal', id:m.id })}>
      <Ph grad={m.grad} className="ph">
        {showMatch && m.match && <span className="tagbadge"><Icon name="check" size={11}/>Match</span>}
        <span className={'heart'+(ctx.fav.has(m.id)?' on':'')} role="button" onClick={(e)=>{ e.stopPropagation(); ctx.toggleFav(m.id); }}>
          <Icon name={ctx.fav.has(m.id)?'heartFill':'heart'} size={15}/>
        </span>
        <span className="qadd" role="button" onClick={quick}><Icon name="plus" size={18}/></span>
      </Ph>
      <div className="mcard-b">
        <div className="nm">{m.name}</div>
        <div className="cookline">
          <span className="av" style={{ background:c.grad }}>{c.initial}</span>
          <span className="cn">{c.name}</span>
          <Icon name="shield" size={13} className="vchk"/>
        </div>
        <div className="priceline">
          <span className="pr">{money(m.price)}</span>
          <span className="rt"><Icon name="star" size={13}/>{m.rating} · {m.time}</span>
        </div>
      </div>
    </button>
  );
}
function DropCard({ id, ctx }){
  const m = mealById(id), c = COOKS[m.cook];
  return (
    <button className="dropcard" onClick={()=>ctx.push({ type:'meal', id })}>
      <Ph grad={m.grad} className="ph"/>
      <span className="cookchip"><span className="av" style={{ background:c.grad }}>{c.initial}</span><b>{c.kitchen}</b></span>
      <span className="drop-badge"><Icon name="bolt" size={13}/>Drop · {m.time}</span>
      <span className="body">
        <span className="t">{m.name}</span>
        <span className="meta"><span style={{ display:'flex', alignItems:'center', gap:4 }}><Icon name="star" size={13}/>{m.rating}</span><span style={{ display:'flex', alignItems:'center', gap:4 }}><Icon name="walk" size={13}/>{m.dist}</span><span>Serves {m.serves}</span></span>
        <span className="row"><span className="price">{money(m.price)}</span><span className="order"><Icon name="cart" size={16}/>Order now</span></span>
      </span>
    </button>
  );
}
function ExpCard({ e, ctx }){
  const c = COOKS[e.cook];
  return (
    <button className="expcard" onClick={()=>ctx.push({ type:'exp', id:e.id })}>
      <Ph grad={e.grad} className="ph">
        <span className="etag"><Icon name={e.ico} size={13}/>{e.tag}</span>
        <span className="ehost"><span className="av" style={{ background:c.grad }}>{c.initial}</span><b>{c.name}</b></span>
      </Ph>
      <div className="ebody">
        <div className="t">{e.title}</div>
        <div className="s">{e.sub}</div>
        <div className="when"><Icon name="calendar" size={13}/>{e.when}</div>
        <div className="foot"><span className="pr">{money(e.price)}<small> /seat</small></span><span className="spots">{e.spots}</span></div>
      </div>
    </button>
  );
}

/* ============================ HOME (calm hub) ============================ */
function greetWord(){ const h=new Date().getHours(); return h<12?'Good morning':h<18?'Good afternoon':'Good evening'; }

/* Today's drop — one clean white card, the single hero of the page */
function HeroDrop({ id, ctx }){
  const m = mealById(id), c = COOKS[m.cook];
  const add = (e)=>{ e.stopPropagation(); ctx.addToCart({ key:m.id, name:m.name, cook:m.cook, price:m.price, grad:m.grad },1); ctx.toast(`Added ${m.name}`,'check',true); };
  return (
    <button className="hhero" onClick={()=>ctx.push({ type:'meal', id })}>
      <Ph grad={m.grad} className="img">
        <span className="eyebrow"><Icon name="bolt" size={13}/>Today’s drop</span>
        <span className={'heart'+(ctx.fav.has(m.id)?' on':'')} role="button" onClick={(e)=>{ e.stopPropagation(); ctx.toggleFav(m.id); }}>
          <Icon name={ctx.fav.has(m.id)?'heartFill':'heart'} size={15}/>
        </span>
      </Ph>
      <div className="hhero-b">
        <div className="t">{m.name}</div>
        <div className="cook"><span className="av" style={{ background:c.grad }}>{c.initial}</span>{c.kitchen}<Icon name="shield" size={13} className="vchk"/></div>
        <div className="meta">
          <span><Icon name="star" size={14} style={{ color:'var(--star)' }}/>{m.rating}</span>
          <span><Icon name="walk" size={14}/>{m.dist}</span>
          <span><Icon name="clock" size={14}/>{m.time}</span>
        </div>
        <div className="foot">
          <span className="price">{money(m.price)}</span>
          <span className="order" role="button" onClick={add}><Icon name="plus" size={17}/>Add to bag</span>
        </div>
      </div>
    </button>
  );
}

function HomeScreen({ ctx }){
  const { mode, setMode, cartCount, push, notifCount } = ctx;
  const MODES = [
    { id:'delivery', t:'Delivery', ico:'truck' },
    { id:'pickup',   t:'Pickup',   ico:'bag' },
  ];
  const picks = MEALS.filter(m=>m.id!=='lasagna').slice(0,4);
  return (
    <div className="hpage">
      <div className="scroll pb-nav">
      <header className="hhdr">
        <div className="hhdr-top">
          <div className="hhdr-logo" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:30, height:30, borderRadius:10, background:'var(--primary)', display:'grid', placeItems:'center', boxShadow:'0 4px 10px -3px rgba(242,107,29,.55)', flexShrink:0 }}>
              <Icon name="flame" size={16} color="#fff"/>
            </span>
            <span style={{ fontSize:18, fontWeight:900, letterSpacing:'-.04em', color:'var(--ink)' }}>preppa</span>
          </div>
          <div className="hicons">
            <button className="hibtn" onClick={()=>push({ type:'notifs' })}><Icon name="bell" size={19}/>{notifCount>0 && <span className="dot"/>}</button>
            <button className="hibtn" onClick={()=>push({ type:'cart' })}><Icon name="cart" size={19}/>{cartCount>0 && <span className="dot"/>}</button>
          </div>
        </div>
        <button className="hloc" style={{ marginTop:14 }} onClick={()=>ctx.toast('Change location coming soon','pin')}>
          <span className="l">{mode==='pickup'?'Pick up in':'Deliver to'}</span>
          <span className="v"><Icon name="pin" size={15}/>Atlanta, GA<Icon name="chevDown" size={15} className="chev"/></span>
        </button>
        <div className="hgreet">
          <h1>{greetWord()}, <span className="hgrad">Jordan</span></h1>
          <p>What sounds good tonight?</p>
        </div>
        <div className="hmode" style={{ display:(ctx.tweaks?.showModeToggle ?? true) ? undefined : 'none' }}>{MODES.map(m=>(<button key={m.id} className={mode===m.id?'on':''} onClick={()=>setMode(m.id)}><Icon name={m.ico} size={15}/>{m.t}</button>))}</div>
      </header>
      <div className="hstick">
        <button className="hsearch" onClick={()=>ctx.nav.tab('explore')}><Icon name="search" size={18}/>Search meals, cooks, cuisines…</button>
      </div>

        <div className="hsec"><h3>Today’s drop</h3></div>
        <HeroDrop id="lasagna" ctx={ctx}/>

        <div className="hsec"><h3>Fresh near you</h3><a onClick={()=>ctx.nav.tab('explore')}>See all</a></div>
        <div className="mgrid lg">{picks.map(m=><MealCardLg key={m.id} m={m} ctx={ctx}/>)}</div>

        <div className="hsec"><h3>Prep experiences</h3><a onClick={()=>ctx.nav.tab('exps')}>See all</a></div>
        <div className="exprail">{EXPERIENCES.slice(0,4).map(e=><ExpCard key={e.id} e={e} ctx={ctx}/>)}</div>

        <button className="hchef" onClick={()=>ctx.push({ type:'newRequest', svc:'cookhome' })}>
          <span className="ic" style={{ background:'linear-gradient(135deg,#FF8A4C,var(--primary))', color:'#fff', boxShadow:'0 6px 14px -6px rgba(242,107,29,.5)' }}><Icon name="chefhat" size={22}/></span>
          <span className="b"><b>Cook at My Place</b><p>A private chef in your kitchen — compare fixed quotes</p></span>
          <Icon name="chevRight" size={18} className="go"/>
        </button>
        <button className="hchef" style={{ marginTop:10 }} onClick={()=>ctx.push({ type:'mealplans' })}>
          <span className="ic" style={{ background:'linear-gradient(135deg,#A855F7,var(--purple))', color:'#fff', boxShadow:'0 6px 14px -6px rgba(124,58,237,.5)' }}><Icon name="repeat" size={22}/></span>
          <span className="b"><b>Weekly meal plans</b><p>Subscribe to a cook’s box — pause or swap anytime</p></span>
          <Icon name="chevRight" size={18} className="go"/>
        </button>
        <div className="h-end"/>
      </div>
    </div>
  );
}

/* ============================ EXPLORE ============================ */
function ExploreScreen({ ctx }){
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All','Comfort','Healthy','Halal','Mexican','Seafood','Soul food'];
  const list = MEALS.filter(m=>{
    const okCat = cat==='All' || m.tags.some(t=>t.toLowerCase().includes(cat.toLowerCase()));
    const okQ = !q || m.name.toLowerCase().includes(q.toLowerCase()) || COOKS[m.cook].name.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });
  return (
    <div className="hpage">
      <header className="hhdr">
        <div className="hhdr-top">
          <h1 className="hpagetitle">Explore</h1>
          <div className="hicons">
            <button className="hibtn" onClick={()=>ctx.toast('Filters coming soon','sliders')}><Icon name="sliders" size={18}/></button>
          </div>
        </div>
        <div className="hsearch">
          <Icon name="search" size={18}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search meals, cooks, cuisines…"/>
        </div>
      </header>
      <div className="scroll pb-nav">
        <div className="chips">{cats.map(c=><button key={c} className={'chip'+(cat===c?' on':'')} onClick={()=>setCat(c)}>{c}</button>)}</div>
        <div className="sec"><h3>{list.length} result{list.length!==1?'s':''}</h3></div>
        {list.length===0
          ? <div className="empty"><div className="ico"><Icon name="search" size={30}/></div><h3>No matches</h3><p>Try another cuisine or clear your search.</p></div>
          : <div className="mgrid lg">{list.map(m=><MealCardLg key={m.id} m={m} ctx={ctx} showMatch/>)}</div>}
      </div>
    </div>
  );
}

/* ============================ FEED (video reels) ============================ */
function FeedScreen({ ctx }){
  const [liked, setLiked] = useState({});
  return (
    <div className="feedpage">
      <div className="feedscroll">
        {FEED.map(f=>{
          const c = COOKS[f.cook], m = mealById(f.meal), isLiked = !!liked[f.id];
          return (
            <div className="reel" key={f.id}>
              <Ph grad={f.grad} className="media"/>
              <span className="playbtn"><Icon name="play" size={26}/></span>
              <div className="rtop">
                <span className={'live'+(f.live?'':' reel')}>{f.live ? <><span className="blip"/>LIVE</> : 'REEL'}</span>
                <span className="feedlabel">Feed</span>
              </div>
              <div className="rright">
                <button className={'ract'+(isLiked?' liked':'')} onClick={()=>setLiked(p=>({ ...p, [f.id]:!p[f.id] }))}><span className="b"><Icon name={isLiked?'heartFill':'heart'} size={24}/></span><span className="ct">{f.likes}</span></button>
                <button className="ract" onClick={()=>ctx.toast('Comments — demo','comment')}><span className="b"><Icon name="comment" size={22}/></span><span className="ct">{f.comments}</span></button>
                <button className="ract" onClick={()=>ctx.toast('Shared (demo)','share')}><span className="b"><Icon name="share" size={20}/></span><span className="ct">Share</span></button>
                <button className="ract" onClick={()=>ctx.toast('Saved to your list','bookmark')}><span className="b"><Icon name="bookmark" size={20}/></span><span className="ct">Save</span></button>
              </div>
              <div className="rbottom">
                <div className="rcook">
                  <span className="av" style={{ background:c.grad, cursor:'pointer' }} role="button" onClick={()=>ctx.push({ type:'store', cook:f.cook })}>{c.initial}</span>
                  <div style={{ flex:1 }}><div className="nm">{c.name} <Icon name="shield" size={14} style={{ color:'#fff' }}/></div></div>
                  <button className="follow" onClick={()=>ctx.toast(`Following ${c.name}`,'check',true)}>Follow</button>
                </div>
                <div className="rcap">{f.caption}</div>
                {m && (
                  <button className="rorder" onClick={()=>ctx.push({ type:'meal', id:m.id })}>
                    <Ph grad={m.grad} className="oi"/>
                    <div className="ob"><div className="on">{m.name}</div><div className="op">by {c.name} · {money(m.price)}</div></div>
                    <span className="obtn"><Icon name="cart" size={15}/>Order</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ NOTIFICATIONS (alerts + messages) ============================ */
function NotificationsScreen({ ctx }){
  const [tab, setTab] = useState('alerts');
  const unreadAlerts = NOTIFS.filter(n=>n.unread).length;
  const unreadMsgs = CONVERSATIONS.reduce((s,c)=>s+(c.unread?1:0),0);
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Notifications</h2></div>
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border-2)' }}>
        <div className="segtabs">
          <button className={'segtab'+(tab==='alerts'?' on':'')} onClick={()=>setTab('alerts')}>Alerts {unreadAlerts>0 && <span className="c">{unreadAlerts}</span>}</button>
          <button className={'segtab'+(tab==='messages'?' on':'')} onClick={()=>setTab('messages')}>Messages {unreadMsgs>0 && <span className="c">{unreadMsgs}</span>}</button>
        </div>
      </div>
      <div className="scroll">
        {tab==='alerts' ? NOTIFS.map((n,i)=>(
          <div key={i} className={'notif'+(n.unread?' unread':'')}>
            <span className={'ico '+n.cls}><Icon name={n.ico} size={19}/></span>
            <div className="b"><b>{n.title}</b><p>{n.body}</p></div>
            <span className="tm">{n.time}</span>
            {n.unread && <span className="udot"/>}
          </div>
        )) : CONVERSATIONS.map((cv,i)=>{
          const c = COOKS[cv.cook];
          return (
            <button key={i} className="conv" style={{ width:'100%', textAlign:'left' }} onClick={()=>ctx.push({ type:'chat', cook:cv.cook })}>
              <div className="av" style={{ background:c.grad }}>{c.initial}{cv.online && <span className="on"/>}</div>
              <div className="b">
                <div className="top"><span className="nm">{c.name}</span><span className="tm">{cv.time}</span></div>
                <div className={'msg'+(cv.unread?' unread':'')}>{cv.msg}</div>
              </div>
              {cv.unread>0 && <span className="unreaddot"/>}
            </button>
          );
        })}
        <div style={{ padding:'24px 16px', textAlign:'center' }}><p style={{ fontSize:12.5, color:'var(--muted)', fontWeight:600, margin:0 }}>Messages are kept on Preppa for your safety.</p></div>
      </div>
    </div>
  );
}

/* ============================ CHAT ============================ */
function ChatScreen({ ctx, cook }){
  const c = COOKS[cook];
  const bubbles = [
    { me:false, t:'Hi! Your order is in the oven now 🔥' },
    { me:false, t:'I’ll ping you when it’s boxed — about 20 min.' },
    { me:true,  t:'Amazing, thank you! Cash on delivery is fine?' },
    { me:false, t:'Of course. We’ll confirm the amount with the QR code at handoff 👍' },
  ];
  return (
    <div className="layer in" style={{ background:'var(--bg)' }}>
      <div className="thdr">
        <button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button>
        <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
          <Avatar cook={cook} size={36} radius={12}/>
          <div><h2 style={{ fontSize:16 }}>{c.name}</h2><div className="sub" style={{ color:'var(--green)' }}>● Online now</div></div>
        </div>
        <button className="icon-btn" onClick={()=>ctx.toast('Calling… (demo)','phone')}><Icon name="phone" size={18}/></button>
      </div>
      <div className="scroll" style={{ padding:'16px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ textAlign:'center', fontSize:11, color:'var(--muted)', fontWeight:700, margin:'4px 0 8px' }}>TODAY</div>
        {bubbles.map((b,i)=>(
          <div key={i} style={{ alignSelf:b.me?'flex-end':'flex-start', maxWidth:'78%', background:b.me?'var(--primary)':'var(--surface)', color:b.me?'#fff':'var(--ink)', border:b.me?'none':'1px solid var(--border-2)', padding:'11px 14px', borderRadius:b.me?'18px 18px 4px 18px':'18px 18px 18px 4px', fontSize:14, fontWeight:500, lineHeight:1.45, boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>{b.t}</div>
        ))}
      </div>
      <div className="dock" style={{ gap:10 }}>
        <div className="search solo" style={{ flex:1, marginTop:0, background:'var(--bg-2)' }}>Message {c.name.split(' ')[0]}…</div>
        <button className="btn btn-pri" style={{ width:52, padding:0, height:48 }} onClick={()=>ctx.toast('Demo only — messaging is read-only')}><Icon name="send" size={20}/></button>
      </div>
    </div>
  );
}

/* ============================ EXPERIENCE DETAIL ============================ */
function ExperienceScreen({ ctx, id }){
  const e = expById(id), c = COOKS[e.cook];
  const includes = ['All ingredients & equipment','Hands-on guidance from your host','A full meal to enjoy','Recipes to take home'];
  return (
    <div className="layer in">
      <div className="scroll pb-cta" style={{ background:'var(--surface)' }}>
        <Ph grad={e.grad} className="dhero">
          <div className="topbar">
            <button className="ib" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button>
            <button className="ib" onClick={()=>ctx.toast('Share — demo','share')}><Icon name="share" size={18}/></button>
          </div>
          <span className="tagbadge purple" style={{ top:'auto', bottom:38, left:18, height:24 }}><Icon name={e.ico} size={11}/>{e.tag}</span>
        </Ph>
        <div className="dsheet">
          <div className="d-title">{e.title}</div>
          <div className="d-meta">
            <span className="m"><Icon name="calendar" size={15} style={{ color:'var(--primary)' }}/>{e.when}</span>
            <span className="m"><Icon name="users" size={15}/>{e.spots}</span>
          </div>
          <button className="cookrow" style={{ width:'100%', textAlign:'left' }} onClick={()=>ctx.push({ type:'store', cook:e.cook })}>
            <Avatar cook={e.cook} size={46}/>
            <div className="b"><div className="nm">Hosted by {c.name} <Icon name="shield" size={15} className="vchk"/></div><div className="mt">{c.cuisine} · PrepScore {c.prepscore}</div></div>
            <span className="go"><Icon name="chevRight" size={16}/></span>
          </button>
          <div className="d-section-t">About this experience</div>
          <p className="d-desc">{e.sub}. Join {c.name} for an intimate, hands-on evening — small group, big flavor, and a story behind every dish. Hosted in a verified home kitchen.</p>
          <div className="d-section-t">What’s included</div>
          {includes.map((it,i)=>(
            <div key={i} className="opt on" style={{ pointerEvents:'none' }}><span className="ck"><Icon name="check" size={14}/></span><span className="t">{it}</span></div>
          ))}
        </div>
      </div>
      <div className="dock">
        <div className="total"><div className="l">Per seat</div><div className="v">{money(e.price)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>{ ctx.toast(`Seat reserved for ${e.title} ✨`,'check',true); ctx.nav.pop(); }}><Icon name="ticket" size={18}/>Reserve a seat</button>
      </div>
    </div>
  );
}

/* ============================ PROFILE ============================ */
function ProfileScreen({ ctx }){
  const { push } = ctx;
  const rows = [
    { ico:'ticket', cls:'amber', t:'Your orders', act:()=> ctx.lastOrder ? push({ type:'track', flow:ctx.lastOrder }) : ctx.toast('No orders yet — let’s fix that 🍽️') },
    { ico:'repeat', cls:'amber', t:'Meal plans & subscriptions', act:()=>push({ type:'mealplans' }) },
    { ico:'calendar', cls:'purple', t:'Your experiences', act:()=>ctx.nav.tab('exps') },
    { ico:'pin',    cls:'blue',  t:'Addresses', act:()=>ctx.toast('Addresses — demo') },
    { ico:'card',   cls:'pink',  t:'Payment methods', act:()=>ctx.toast('Payments — demo') },
    { ico:'gift',   cls:'green', t:'Rewards & referrals', act:()=>ctx.toast('Invite a friend, you both get free delivery 🎁') },
    { ico:'shield', cls:'purple',t:'PrepPlus membership', act:()=>ctx.toast('PrepPlus — coming soon ✨') },
    { ico:'help',   cls:'',      t:'Help & safety', act:()=>ctx.toast('Help center — demo') },
  ];
  return (
    <div className="page">
      <div className="scroll pb-nav">
        <div className="prof-hero">
          <div className="thdr" style={{ padding:'4px 0 0', border:'none', background:'transparent', justifyContent:'flex-end' }}>
            <button className="icon-btn" onClick={()=>ctx.toast('Settings — demo','settings')}><Icon name="settings" size={18}/></button>
          </div>
          <div className="prof-av" style={{ background:'var(--g4)' }}>J</div>
          <div className="prof-name">Jordan Miller</div>
          <div className="prof-sub">Member since 2024 · Atlanta, GA</div>
        </div>
        <div className="rewards">
          <div className="top"><div><div className="lbl">Preppa Rewards</div><div className="pts">340 pts</div></div><div className="star"><Icon name="trophy" size={20}/></div></div>
          <div className="prog"><i style={{ width:'68%' }}/></div>
          <div className="hint">160 pts to your next <b style={{ color:'#fff' }}>free delivery</b> reward.</div>
        </div>
        <div className="cookbanner">
          <div className="av"><Icon name="chefhat" size={26}/></div>
          <div className="b"><b>Become a Preppa</b><p>Cook for your neighbors and keep 85% — 0% fees for 60 days.</p></div>
          <button className="icon-btn" style={{ background:'#fff' }} onClick={()=>ctx.toast('Apply to cook — demo 👩‍🍳')}><Icon name="arrow" size={18}/></button>
        </div>
        <div className="plist" style={{ marginBottom:8 }}>
          {rows.map((r,i)=>(<button key={i} className="prow" style={{ width:'100%', textAlign:'left' }} onClick={r.act}><span className={'ico '+r.cls}><Icon name={r.ico} size={19}/></span><span className="t">{r.t}</span><Icon name="chevRight" size={18} className="chev" style={{ color:'var(--muted)' }}/></button>))}
        </div>
        <button className="prow" style={{ width:'calc(100% - 32px)', margin:'0 16px', borderRadius:18, border:'1px solid var(--border-2)', background:'var(--surface)' }} onClick={ctx.resetOnboarding}>
          <span className="ico"><Icon name="repeat" size={19}/></span><span className="t" style={{ color:'var(--soft)' }}>Replay onboarding</span><Icon name="chevRight" size={18} style={{ color:'var(--muted)' }}/>
        </button>
        <div style={{ textAlign:'center', padding:'20px' }}><span style={{ fontSize:12, color:'var(--muted)', fontWeight:700 }}>preppa · v1.0 — prototype</span></div>
      </div>
    </div>
  );
}

Object.assign(window, { Onboarding, MealCardLg, DropCard, ExpCard, HomeScreen, ExploreScreen, FeedScreen, NotificationsScreen, ChatScreen, ExperienceScreen, ProfileScreen });
