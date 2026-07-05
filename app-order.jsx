/* PREPPA — order flow: MealDetail, Cart, Checkout, COD handoff, Tracking */

const FOUNDING = new Set(['maria','amara']);
const ADDONS = [
  { key:'cornbread', name:'Honey cornbread (6)', cook:'denise', price:6.0, grad:'var(--g4)' },
  { key:'lemonade',  name:'Sparkling lemonade',  cook:'maria',  price:3.5, grad:'var(--g8)' },
];

/* shared price summary */
function useTotals(cart, tip, mode){
  const subtotal = cart.reduce((s,l)=>s+l.price*l.qty,0);
  const hasFounder = cart.some(l=>FOUNDING.has(l.cook));
  const serviceFull = Math.round(subtotal*0.10*100)/100;
  const service = hasFounder ? 0 : serviceFull;
  const deliveryFull = mode==='pickup' ? 0 : 2.99;
  const delivery = 0; // free-delivery reward applied
  const total = subtotal + service + delivery + tip;
  return { subtotal, service, serviceFull, hasFounder, delivery, deliveryFull, total, tip };
}
function Summary({ t, mode }){
  return (
    <div className="summary">
      <div className="sumrow"><span>Subtotal</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(t.subtotal)}</span></div>
      <div className="sumrow free">
        <span>{mode==='pickup'?'Pickup':'Delivery'}</span>
        <span>{t.deliveryFull>0 && <span className="strike">{money(t.deliveryFull)}</span>}Free</span>
      </div>
      <div className={'sumrow'+(t.hasFounder?' free':'')}>
        <span>Service fee {t.hasFounder && <span className="mini-tag" style={{ marginLeft:6 }}>Founding cook</span>}</span>
        <span>{t.hasFounder ? <><span className="strike">{money(t.serviceFull)}</span>$0.00</> : money(t.service)}</span>
      </div>
      {t.tip>0 && <div className="sumrow"><span>Tip · 100% to cook</span><span style={{ color:'var(--ink)', fontWeight:800 }}>{money(t.tip)}</span></div>}
      <div className="sumrow total"><span>Total</span><b>{money(t.total)}</b></div>
    </div>
  );
}

/* ============================ MEAL DETAIL ============================ */
function MealDetailScreen({ ctx, id }){
  const m = mealById(id); const c = COOKS[m.cook];
  const [qty, setQty] = useState(1);
  const [adds, setAdds] = useState([]);
  const { fav, toggleFav } = ctx;
  const toggleAdd = k => setAdds(p=>p.includes(k)?p.filter(x=>x!==k):[...p,k]);
  const addPrice = adds.reduce((s,k)=>s+ADDONS.find(a=>a.key===k).price,0);
  const lineTotal = m.price*qty + addPrice;

  const add = () => {
    ctx.addToCart({ key:m.id, name:m.name, cook:m.cook, price:m.price, grad:m.grad }, qty);
    adds.forEach(k=>{ const a=ADDONS.find(x=>x.key===k); ctx.addToCart(a,1); });
    ctx.toast(`Added ${qty} × ${m.name}`,'check',true);
    ctx.nav.pop();
  };
  return (
    <div className="layer in">
      <div className="scroll pb-cta" style={{ background:'var(--surface)' }}>
        <Ph grad={m.grad} className="dhero">
          <div className="topbar">
            <button className="ib" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button>
            <div style={{ display:'flex', gap:10 }}>
              <button className="ib" onClick={()=>ctx.toast('Share — demo','share')}><Icon name="share" size={18}/></button>
              <button className="ib" onClick={()=>toggleFav(m.id)}><Icon name={fav.has(m.id)?'heartFill':'heart'} size={18} style={{ color:fav.has(m.id)?'var(--primary)':'var(--ink)' }}/></button>
            </div>
          </div>
          {m.match && <span className="tagbadge" style={{ top:'auto', bottom:38, left:18, height:24 }}><Icon name="check" size={11}/>Matches your taste</span>}
        </Ph>

        <div className="dsheet">
          <div className="d-title">{m.name}</div>
          <div className="d-meta">
            <span className="m star"><Icon name="star" size={15}/>{m.rating} <span style={{ color:'var(--muted)', fontWeight:600 }}>({m.reviews})</span></span>
            <span className="m"><Icon name="clock" size={15}/>{m.time}</span>
            <span className="m"><Icon name="walk" size={15}/>{m.dist}</span>
          </div>

          <button className="cookrow" style={{ width:'100%', textAlign:'left' }} onClick={()=>ctx.push({ type:'store', cook:m.cook })}>
            <Avatar cook={m.cook} size={46}/>
            <div className="b">
              <div className="nm">{c.name} <Icon name="shield" size={15} className="vchk"/></div>
              <div className="mt">{c.cuisine} · PrepScore {c.prepscore} · {c.reviews} reviews</div>
            </div>
            <span className="go"><Icon name="chevRight" size={16}/></span>
          </button>

          <div className="d-section-t">About this meal</div>
          <p className="d-desc">{m.desc}</p>

          <div className="facts">
            <div className="fact"><b>{m.kcal}</b><span>calories</span></div>
            <div className="fact"><b>Serves {m.serves}</b><span>portion</span></div>
            <div className="fact"><b>{m.time}</b><span>ready in</span></div>
          </div>

          <div className="d-section-t">Make it a meal</div>
          {ADDONS.map(a=>(
            <button key={a.key} className={'opt'+(adds.includes(a.key)?' on':'')} style={{ width:'100%' }} onClick={()=>toggleAdd(a.key)}>
              <span className="ck">{adds.includes(a.key) && <Icon name="check" size={14}/>}</span>
              <span className="t">{a.name}</span>
              <span className="pr">+{money(a.price)}</span>
            </button>
          ))}

          <div className="d-section-t">Portion</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:14.5, fontWeight:700, color:'var(--soft)' }}>How many servings?</span>
            <Stepper value={qty} onDec={()=>setQty(Math.max(1,qty-1))} onInc={()=>setQty(qty+1)}/>
          </div>
        </div>
      </div>

      <div className="dock">
        <div className="total"><div className="l">Total</div><div className="v">{money(lineTotal)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={add}><Icon name="cart" size={18}/>Add to cart</button>
      </div>
    </div>
  );
}

/* ============================ CART ============================ */
function CartScreen({ ctx }){
  const { cart, setQty, removeLine, tip, setTip } = ctx;
  const t = useTotals(cart, tip, ctx.mode);
  const TIPS = [0,2,3,5];
  if(cart.length===0){
    return (
      <div className="layer in">
        <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Your cart</h2></div>
        <div className="empty"><div className="ico"><Icon name="cart" size={32}/></div><h3>Your cart is empty</h3><p>Find something homemade from a cook near you.</p>
          <button className="btn btn-pri" style={{ marginTop:18 }} onClick={()=>{ ctx.nav.pop(); ctx.nav.tab('home'); }}>Browse meals</button>
        </div>
      </div>
    );
  }
  return (
    <div className="layer in">
      <div className="thdr">
        <button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button>
        <h2>Your cart</h2><span className="sub">{ctx.cartCount} item{ctx.cartCount!==1?'s':''}</span>
      </div>
      <div className="scroll pb-cta">
        {cart.map(l=>{
          const cook = COOKS[l.cook];
          return (
            <div key={l.key} className="cartrow">
              <Ph grad={l.grad} className="ph"/>
              <div className="b">
                <div className="nm">{l.name}</div>
                <div className="chef">by {cook.name}</div>
                <div className="price">{money(l.price*l.qty)}</div>
              </div>
              {l.qty<=1
                ? <button className="icon-btn" onClick={()=>removeLine(l.key)} style={{ width:34, height:34 }}><Icon name="x" size={16} style={{ color:'var(--muted)' }}/></button>
                : <Stepper sm value={l.qty} onDec={()=>setQty(l.key,l.qty-1)} onInc={()=>setQty(l.key,l.qty+1)}/>}
              {l.qty>1 ? null : null}
            </div>
          );
        })}

        <div style={{ height:12 }}/>
        {t.hasFounder && (
          <div className="founder"><Icon name="shield" size={20}/><p>Your order includes a <b>founding cook</b> — their service fee is waived for 60 days.</p></div>
        )}

        <div className="block">
          <div className="block-t">Add a tip · goes 100% to the cook</div>
          <div className="tips">
            {TIPS.map(v=><button key={v} className={'tip'+(tip===v?' on':'')} onClick={()=>setTip(v)}>{v===0?'None':money(v)}</button>)}
          </div>
        </div>

        <Summary t={t} mode={ctx.mode}/>
      </div>

      <div className="dock">
        <div className="total"><div className="l">Total</div><div className="v">{money(t.total)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>ctx.push({ type:'checkout' })}>Checkout<Icon name="arrow" size={18}/></button>
      </div>
    </div>
  );
}

/* ============================ CHECKOUT ============================ */
function CheckoutScreen({ ctx }){
  const { cart, tip, mode } = ctx;
  const t = useTotals(cart, tip, mode);
  const [pay, setPay] = useState('online');
  const place = () => {
    if(pay==='cod'){ ctx.push({ type:'cod' }); }
    else { ctx.placeOrder('paid'); ctx.push({ type:'track', flow:'paid' }); }
  };
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Checkout</h2></div>
      <div className="scroll pb-cta">
        <div className="block">
          <div className="block-t">{mode==='pickup'?'Pick up from':'Deliver to'}</div>
          <div className="addr">
            <span className="pin"><Icon name="pin" size={20}/></span>
            <div className="b">
              {mode==='pickup'
                ? <><b>Maria’s Kitchen</b><p>Pick up · 412 Elm St · ready ~25 min</p></>
                : <><b>Home · 88 Highland Ave NE</b><p>Apt 4 · Leave at door · Atlanta, GA 30312</p></>}
            </div>
            <button className="icon-btn" onClick={()=>ctx.toast('Edit address — demo')} style={{ width:34, height:34 }}><Icon name="chevRight" size={16}/></button>
          </div>
        </div>

        <div className="block">
          <div className="block-t">Payment</div>
          <button className={'pay'+(pay==='online'?' on':'')} style={{ width:'100%', textAlign:'left' }} onClick={()=>setPay('online')}>
            <span className="ico"><Icon name="card" size={20}/></span>
            <div className="b"><b>Pay online <span className="mini-tag" style={{ background:'var(--green-l)', color:'var(--green)' }}>Stripe</span></b><p>Visa •••• 4242 · secure checkout</p></div>
            <span className="radio"/>
          </button>
          <button className={'pay'+(pay==='cod'?' on':'')} style={{ width:'100%', textAlign:'left' }} onClick={()=>setPay('cod')}>
            <span className="ico"><Icon name="cash" size={20}/></span>
            <div className="b"><b>Cash on delivery <span className="mini-tag">QR verified</span></b><p>Confirm exact amount with a QR + 6-digit code</p></div>
            <span className="radio"/>
          </button>
        </div>

        {pay==='cod' && (
          <div className="founder" style={{ margin:'14px 16px 0', background:'var(--purple-l)', borderColor:'rgba(124,58,237,.2)' }}>
            <Icon name="qr" size={20} style={{ color:'var(--purple)' }}/>
            <p style={{ color:'#5b21b6' }}>At handoff, you and your cook scan a QR and match a 6-digit code so the cash amount is confirmed by both sides.</p>
          </div>
        )}

        <Summary t={t} mode={mode}/>
      </div>

      <div className="dock">
        <div className="total"><div className="l">Total</div><div className="v">{money(t.total)}</div></div>
        <button className="btn btn-pri" style={{ flex:1 }} onClick={place}>
          {pay==='cod' ? 'Place order' : `Pay ${money(t.total)}`}
        </button>
      </div>
    </div>
  );
}

/* faux QR */
function FauxQR(){
  const N=13; const cells=[];
  const finder=(r,c)=> (r<3&&c<3)||(r<3&&c>=N-3)||(r>=N-3&&c<3);
  for(let r=0;r<N;r++) for(let c=0;c<N;c++){
    const on = finder(r,c) ? ((r===0||r===2||c===0||c===2||r===N-1||r===N-3||c===N-1||c===N-3) ? true : (r===1&&c===1)||(r===1&&c===N-2)||(r===N-2&&c===1)) || (r<3&&c<3&&(r===1&&c===1))
      : (((r*7 + c*13 + (r^c)*5) % 3)===0);
    cells.push(on);
  }
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${N},1fr)`, gap:2, width:'100%', height:'100%' }}>
      {cells.map((on,i)=><div key={i} style={{ background:on?'#0E0E10':'transparent', borderRadius:1 }}/>)}
    </div>
  );
}

/* ============================ COD HANDOFF ============================ */
function CODHandoff({ ctx }){
  const t = useTotals(ctx.cart, ctx.tip, ctx.mode);
  const [stage, setStage] = useState(0); // 0 show code, 1 matched, 2 success
  const code = ['4','8','1','2','0','6'];
  const filled = stage>=1;

  if(stage===2){
    return (
      <div className="layer in">
        <div className="burst">
          <div className="ring"><Icon name="check" size={52}/></div>
          <h2>Handoff confirmed</h2>
          <p>You and {COOKS.maria.name} both confirmed <b>{money(t.total)}</b> in cash. Enjoy your meal! 🍽️</p>
          <button className="btn btn-pri btn-block btn-lg" style={{ marginTop:26 }} onClick={()=>{ ctx.placeOrder('cod'); ctx.nav.replace({ type:'track', flow:'cod' }); }}>View order</button>
        </div>
      </div>
    );
  }
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={ctx.nav.pop}><Icon name="chevLeft" size={20}/></button><h2>Cash handoff</h2><span className="sub">Order #PR-2048</span></div>
      <div className="cod">
        <div className="cod-amt"><div className="l">Amount to pay in cash</div><div className="v">{money(t.total)}</div></div>

        <div className="qrbox">
          <FauxQR/>
          {stage===0 && <div className="scan"/>}
        </div>
        <p style={{ fontSize:13.5, color:'var(--soft)', fontWeight:600, margin:'14px auto 0', maxWidth:280, lineHeight:1.5 }}>
          {stage===0 ? <>Show this QR to <b style={{ color:'var(--ink)' }}>{COOKS.maria.name}</b>. They scan it to lock the exact amount.</> : <>Amount matched on both phones. Hand over the cash to complete your order.</>}
        </p>

        <div className="cod-code">
          <div className="l">Backup 6-digit code</div>
          <div className="digits">{code.map((d,i)=><div key={i} className={'digit'+(filled?' fill':'')}>{d}</div>)}</div>
        </div>

        <div className="cod-steps">
          <div className={'s'+(stage>=1?' done':' on')}><span className="dot">{stage>=1?<Icon name="check" size={11}/>:'1'}</span>Code shown</div>
          <span className="line"/>
          <div className={'s'+(stage>=1?' on':'')}><span className="dot">2</span>Confirm</div>
        </div>
      </div>

      <div className="dock" style={{ flexDirection:'column', alignItems:'stretch', gap:10 }}>
        {stage===0
          ? <button className="btn btn-dark btn-block btn-lg" onClick={()=>setStage(1)}><Icon name="qr" size={18}/>Cook scanned my code</button>
          : <button className="btn btn-pri btn-block btn-lg" onClick={()=>setStage(2)}><Icon name="check" size={18}/>Confirm {money(t.total)} paid</button>}
        <p style={{ textAlign:'center', fontSize:12, color:'var(--muted)', fontWeight:600, margin:0 }}>Only confirm once cash has changed hands.</p>
      </div>
    </div>
  );
}

/* ============================ TRACKING ============================ */
function TrackingScreen({ ctx, flow }){
  const cod = flow==='cod';
  const STEPS = [
    { t:'Order confirmed', p:'Maria accepted your order', st:'done' },
    { t:'Cooking now', p:'Fresh on the stove', st: cod?'done':'active' },
    { t: ctx.mode==='pickup'?'Ready for pickup':'Out for delivery', p: ctx.mode==='pickup'?'Head to Maria’s Kitchen':'On the way to you', st: cod?'done':'pending' },
    { t: cod?'Handed off · paid in cash':'Delivered', p: cod?'Confirmed by QR + code':'Leave a review to earn points', st: cod?'done':'pending' },
  ];
  return (
    <div className="layer in">
      <div className="thdr"><button className="icon-btn" onClick={()=>{ ctx.nav.reset(); }}><Icon name="chevLeft" size={20}/></button><h2>{cod?'Order complete':'Track order'}</h2><span className="sub">#PR-2048</span></div>
      <div className="scroll">
        <div className="trk-map">
          <div className="trk-route"/>
          <div className="trk-pin" style={{ left:30, top:48, background:'var(--ink)' }}><Icon name="chefhat" size={16}/></div>
          <div className="trk-pin" style={{ right:46, top:48, background:'var(--primary)' }}><Icon name="home" size={16}/></div>
        </div>
        <div className="trk-card">
          <div className="trk-eta">
            <div className="b">
              <div className="l">{cod?'Status':'Estimated arrival'}</div>
              <div className="v">{cod?'Completed':'5:32 PM'}</div>
            </div>
            <div className="pill"><span className="blip"/>{cod?'Delivered':'Live'}</div>
          </div>

          <div className="steps">
            {STEPS.map((s,i)=>(
              <div key={i} className={'tstep '+s.st}>
                <div className="rail">
                  <div className="node">{s.st==='done'?<Icon name="check" size={15}/>:s.st==='active'?<Icon name="chefhat" size={15}/>:<span style={{ width:7,height:7,borderRadius:'50%',background:'currentColor' }}/>}</div>
                  {i<STEPS.length-1 && <div className="bar"/>}
                </div>
                <div className="tb"><b>{s.t}</b><p>{s.p}</p></div>
              </div>
            ))}
          </div>

          <button className="cookrow" style={{ width:'100%', textAlign:'left', marginTop:4 }} onClick={()=>ctx.push({ type:'chat', cook:'maria' })}>
            <Avatar cook="maria" size={46}/>
            <div className="b"><div className="nm">{COOKS.maria.name} <Icon name="shield" size={15} className="vchk"/></div><div className="mt">Your cook · usually replies in minutes</div></div>
            <span className="go"><Icon name="chat" size={16}/></span>
          </button>

          <div style={{ display:'flex', gap:10, marginTop:14 }}>
            {!cod && <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>ctx.toast('Order help — demo','help')}>Get help</button>}
            <button className="btn btn-pri" style={{ flex:1 }} onClick={()=>{ ctx.nav.reset(); ctx.nav.tab('home'); }}>{cod?'Back to home':'Done'}</button>
          </div>
          <div className="pb-nav"/>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MealDetailScreen, CartScreen, CheckoutScreen, CODHandoff, TrackingScreen });
