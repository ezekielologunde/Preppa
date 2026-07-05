/* PREPPA — Premium onboarding + auth flow: welcome → email → code → goal → cuisines → finish.
   Simulated latency (spinners), inline validation, OTP error + retry, recoverable setup error. On window. */

const OB_DEMO_CODE = '481206';

function ObTop({ steps, at, onBack, onSkip }){
  return (
    <div className="obx-top">
      {onBack ? <button className="obx-back" onClick={onBack}><Icon name="chevLeft" size={20}/></button> : <span style={{ width:42 }}/>}
      <div className="obx-prog">{steps.map((s,i)=><i key={s} className={i<=at?'on':''}/>)}</div>
      {onSkip ? <button className="obx-skip" onClick={onSkip}>Skip</button> : <span style={{ width:30 }}/>}
    </div>
  );
}

/* ---------- welcome ---------- */
function ObWelcome({ go }){
  return (
    <>
      <div style={{ flex:.7 }}/>
      <div className="obx-orbs">
        <div className="obx-orb o1"><span className="tag">Maria’s lasagna · 1.2 km</span></div>
        <div className="obx-orb o2"><span className="tag">Live now 🔥</span></div>
        <div className="obx-orb o3"><span className="tag">4.9 ★</span></div>
      </div>
      <div className="obx-mark"><Icon name="flame" size={38} color="#fff"/></div>
      <h1>Real food from <span className="g">real local cooks.</span></h1>
      <p className="lead" style={{ color:'rgba(255,255,255,.62)' }}>Homemade meals, private chefs, weekly boxes and more — from verified neighbors who love to cook.</p>
      <div style={{ flex:1 }}/>
      <button className="obtn obtn-pri" onClick={()=>go('auth','signup')}>Create account</button>
      <button className="obtn obtn-glass" style={{ marginTop:10 }} onClick={()=>go('auth','signin')}>Sign in</button>
      <p className="obx-legal">By continuing you agree to Preppa’s Terms &amp; Food Safety Standards.</p>
    </>
  );
}

/* ---------- email auth ---------- */
function ObAuth({ mode, onBack, onNext }){
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(false);
  const bad = () => { setShake(true); setTimeout(()=>setShake(false), 420); };
  const submit = () => {
    if(busy) return;
    if(!/^\S+@\S+\.\S+$/.test(email.trim())){ setErr('That doesn’t look like an email — check for typos.'); bad(); return; }
    setErr(null); setBusy(true);
    setTimeout(()=>{ setBusy(false); onNext(email.trim()); }, 1400);   // simulated network latency
  };
  return (
    <>
      <h1 style={{ marginTop:26 }}>{mode==='signin' ? 'Welcome back.' : 'Create your account.'}</h1>
      <p className="lead">{mode==='signin' ? 'Sign in to your kitchen feed.' : 'Sixty seconds, then dinner’s sorted.'}</p>
      <div style={{ marginTop:26, display:'flex', flexDirection:'column', gap:10 }}>
        <button className="obtn obtn-glass" onClick={()=>{ setBusy(true); setTimeout(()=>onNext('jordan@icloud.com'), 1200); }}><Icon name="lock" size={18}/>Continue with Apple</button>
        <button className="obtn obtn-glass" onClick={()=>{ setBusy(true); setTimeout(()=>onNext('jordan@gmail.com'), 1200); }}><Icon name="globe" size={18}/>Continue with Google</button>
      </div>
      <div className="obx-div">OR</div>
      <div className={'obx-field'+(shake?' obshake':'')} style={{ marginTop:0 }}>
        <label>Email address</label>
        <input className={'obx-input'+(err?' err':'')} type="email" inputMode="email" autoComplete="email"
          value={email} onChange={e=>{ setEmail(e.target.value); if(err) setErr(null); }}
          onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="you@example.com"/>
        {err && <div className="obx-err"><Icon name="info" size={15}/>{err}</div>}
      </div>
      <div style={{ flex:1 }}/>
      <button className="obtn obtn-pri" onClick={submit} disabled={busy}>
        {busy ? <><span className="obspin"/>Sending code…</> : <>Continue<Icon name="arrow" size={18}/></>}
      </button>
    </>
  );
}

/* ---------- OTP code ---------- */
function ObCode({ email, onNext }){
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const [cool, setCool] = useState(0);
  const [resent, setResent] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ ref.current && ref.current.focus(); },[]);
  useEffect(()=>{ if(cool<=0) return; const t=setTimeout(()=>setCool(cool-1),1000); return ()=>clearTimeout(t); },[cool]);
  useEffect(()=>{
    if(code.length!==6 || busy) return;
    setBusy(true);
    setTimeout(()=>{                                     // simulated verify latency
      if(code===OB_DEMO_CODE){ onNext(); }
      else { setBusy(false); setErr(true); setShake(true); setTimeout(()=>setShake(false),420); setCode(''); }
    }, 1100);
  },[code, busy]);
  const resend = () => { setCool(24); setResent(true); setErr(false); setTimeout(()=>setResent(false), 2400); };
  return (
    <>
      <h1 style={{ marginTop:26 }}>Check your inbox.</h1>
      <p className="lead">We sent a 6-digit code to <b style={{ color:'#fff' }}>{email}</b>.</p>
      <div className={'otp'+(err?' err':'')+(shake?' obshake':'')} onClick={()=>ref.current&&ref.current.focus()}>
        <input ref={ref} value={code} inputMode="numeric" autoComplete="one-time-code"
          onChange={e=>{ setCode(e.target.value.replace(/\D/g,'').slice(0,6)); if(err) setErr(false); }}/>
        {Array.from({ length:6 }).map((_,i)=>(
          <div key={i} className={'box'+(i===code.length && !busy?' live':'')}>{code[i]||''}</div>
        ))}
      </div>
      {err && <div className="obx-err" style={{ marginTop:12 }}><Icon name="info" size={15}/>That code didn’t match. Check the digits and try again.</div>}
      {busy && <div className="obx-err" style={{ marginTop:12, color:'rgba(255,255,255,.6)' }}><span className="obspin" style={{ width:15, height:15 }}/>Verifying…</div>}
      <div className="obx-hint">Demo hint: the code is {OB_DEMO_CODE}.</div>
      <div style={{ flex:1 }}/>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'0 0 4px' }}>
        <span style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,.45)' }}>{resent ? 'Code re-sent ✓' : 'Didn’t get it?'}</span>
        {!resent && <button className="obx-resend" disabled={cool>0} onClick={resend}>{cool>0?`Resend in ${cool}s`:'Resend code'}</button>}
      </div>
    </>
  );
}

/* ---------- goal ---------- */
const OB_GOALS = [
  { id:'daily',  ico:'home',   grad:'linear-gradient(135deg,#FF8A4C,#F26B1D)', t:'Daily meals',          s:'Fresh dinners from cooks near me' },
  { id:'prep',   ico:'repeat', grad:'linear-gradient(135deg,#A855F7,#7C3AED)', t:'Meal-prep the week',   s:'A weekly box, dropped on schedule' },
  { id:'health', ico:'leaf',   grad:'linear-gradient(135deg,#34D399,#16A34A)', t:'Eat healthier',        s:'High-protein, balanced, fresh' },
  { id:'events', ico:'gift',   grad:'linear-gradient(135deg,#FB7185,#EC4899)', t:'Events & experiences', s:'Book a chef, class or supper club' },
];
function ObGoal({ onNext }){
  const [goal, setGoal] = useState(null);
  return (
    <>
      <h1 style={{ marginTop:26 }}>What brings you to <span className="g">Preppa</span>?</h1>
      <p className="lead">Pick your main goal — we’ll tune your feed from minute one.</p>
      <div style={{ marginTop:14 }}>
        {OB_GOALS.map(g=>(
          <button key={g.id} className={'obx-goal'+(goal===g.id?' on':'')} onClick={()=>setGoal(g.id)}>
            <span className="ico" style={{ background:g.grad }}><Icon name={g.ico} size={21}/></span>
            <span style={{ flex:1 }}><b>{g.t}</b><p>{g.s}</p></span>
            <span className="ck">{goal===g.id && <Icon name="check" size={13}/>}</span>
          </button>
        ))}
      </div>
      <div style={{ flex:1 }}/>
      <button className="obtn obtn-pri" disabled={!goal} onClick={()=>goal&&onNext()}>Continue<Icon name="arrow" size={18}/></button>
    </>
  );
}

/* ---------- cuisines ---------- */
const OB_CUIS = ['Italian','West African','Halal','Mexican','Soul food','Desi','Healthy','Seafood','Vegan','BBQ','Desserts','Comfort'];
function ObCuisine({ onNext }){
  const [sel, setSel] = useState([]);
  const toggle = c => setSel(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  return (
    <>
      <h1 style={{ marginTop:26 }}>What do you <span className="g">love</span> to eat?</h1>
      <p className="lead">Choose a few cuisines. You can change these anytime.</p>
      <div className="obx-cuis">{OB_CUIS.map(c=><button key={c} className={'c'+(sel.includes(c)?' on':'')} onClick={()=>toggle(c)}>{c}</button>)}</div>
      <div style={{ flex:1 }}/>
      <button className="obtn obtn-pri" onClick={onNext}>{sel.length ? `Start exploring · ${sel.length} picked` : 'Start exploring'}</button>
    </>
  );
}

/* ---------- finishing (latency + recoverable error) ---------- */
const OB_FIN = ['Personalizing your feed', 'Finding verified cooks nearby', 'Securing your account'];
function ObFinish({ onDone }){
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const tried = useRef(false);
  useEffect(()=>{
    if(failed) return;
    if(idx>=OB_FIN.length){ const t=setTimeout(onDone, 700); return ()=>clearTimeout(t); }
    const t = setTimeout(()=>{
      if(idx===2 && !tried.current){ tried.current = true; setFailed(true); }   // demo: one recoverable failure
      else setIdx(i=>i+1);
    }, 950);
    return ()=>clearTimeout(t);
  },[idx, failed]);
  return (
    <div className="obx-fin">
      <div className="obx-mark" style={{ width:64, height:64, borderRadius:20 }}><Icon name="flame" size={32} color="#fff"/></div>
      <h1 style={{ fontSize:26, marginTop:22 }}>Setting up your kitchen…</h1>
      <div className="obx-steps">
        {OB_FIN.map((s,i)=>{
          const done = i<idx, live = i===idx && !failed, fail = i===idx && failed;
          return (
            <div key={s} className={'obx-step'+(done?' on done':live?' on':fail?' on fail':'')}>
              <span className="st">{done?<Icon name="check" size={14}/>:fail?<Icon name="x" size={14}/>:live?<span className="obspin" style={{ width:14, height:14 }}/>:<span style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.3)' }}/>}</span>
              {s}{done?' ✓':''}
            </div>
          );
        })}
      </div>
      {failed && (
        <div className="obx-errcard">
          <b><Icon name="info" size={16}/>Connection hiccup</b>
          <p>We couldn’t reach the server just now. Your progress is saved — try again.</p>
          <button className="obtn obtn-glass" style={{ height:44, marginTop:12, fontSize:14.5 }} onClick={()=>setFailed(false)}><Icon name="repeat" size={16}/>Retry</button>
        </div>
      )}
    </div>
  );
}

/* ---------- shell ---------- */
function OnboardingFlow({ onDone }){
  const [step, setStep] = useState('welcome');   // welcome | auth | code | goal | cuisine | finish
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const STEPS = ['auth','code','goal','cuisine'];
  const at = STEPS.indexOf(step);
  const back = { auth:'welcome', code:'auth', goal:'code', cuisine:'goal' }[step];
  return (
    <div className="obx">
      <div className="obx-inner fade-in" key={step}>
        {step!=='welcome' && step!=='finish' &&
          <ObTop steps={STEPS} at={at} onBack={()=>setStep(back)} onSkip={step==='goal'||step==='cuisine' ? ()=>setStep('finish') : null}/>}
        {step==='welcome' && <ObWelcome go={(s,m)=>{ setMode(m); setStep(s); }}/>}
        {step==='auth'    && <ObAuth mode={mode} onNext={e=>{ setEmail(e); setStep('code'); }}/>}
        {step==='code'    && <ObCode email={email} onNext={()=>setStep(mode==='signin'?'finish':'goal')}/>}
        {step==='goal'    && <ObGoal onNext={()=>setStep('cuisine')}/>}
        {step==='cuisine' && <ObCuisine onNext={()=>setStep('finish')}/>}
        {step==='finish'  && <ObFinish onDone={onDone}/>}
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingFlow });
