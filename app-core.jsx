/* PREPPA core — icon set, mock data, small shared atoms. Exposed on window. */
const { useState, useEffect, useRef } = React;

/* ----------------------------- ICONS ----------------------------- */
const STROKE = { fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' };
const PATHS = {
  pin:        ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z','M12 10a2.6 2.6 0 100-.01'],
  chevDown:   ['M6 9l6 6 6-6'],
  chevRight:  ['M9 6l6 6-6 6'],
  chevLeft:   ['M15 6l-6 6 6 6'],
  bell:       ['M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9','M13.7 21a2 2 0 01-3.4 0'],
  cart:       ['M3 3h2l2.4 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 7H6','M9 22a1 1 0 100-2 1 1 0 000 2','M20 22a1 1 0 100-2 1 1 0 000 2'],
  search:     ['M11 4a7 7 0 100 14 7 7 0 000-14z','M20 20l-3.5-3.5'],
  home:       ['M3 11l9-8 9 8','M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5'],
  compass:    ['M12 3a9 9 0 100 18 9 9 0 000-18z','M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z'],
  chat:       ['M21 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h13a2 2 0 012 2z'],
  user:       ['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2','M12 3a4 4 0 100 8 4 4 0 000-8z'],
  plus:       ['M12 5v14','M5 12h14'],
  minus:      ['M5 12h14'],
  clock:      ['M12 3a9 9 0 100 18 9 9 0 000-18z','M12 7v5l3.5 2'],
  arrow:      ['M5 12h14','M13 6l6 6-6 6'],
  walk:       ['M5 12h14M5 12l4-4M5 12l4 4'],
  shield:     ['M12 3l8 4v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V7z','M9 12l2 2 4-4'],
  check:      ['M5 12l4.5 4.5L19 7'],
  leaf:       ['M11 20A7 7 0 014 13c0-6 7-9 16-9 0 9-4 14-9 14z','M9 17c2-3 5-5 8-6'],
  tag:        ['M20.6 13.4L13 21l-9-9V4h8l8.6 8.6a1.4 1.4 0 010 2z','M7.5 7.5h.01'],
  truck:      ['M1 3h13v10H1z','M14 7h4l3 3v3h-7','M5.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3','M18 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3'],
  bag:        ['M5 8h14l-1 12a1 1 0 01-1 1H7a1 1 0 01-1-1L5 8z','M8.5 8V6a3.5 3.5 0 017 0v2'],
  chefhat:    ['M7 21h10','M6 14a4 4 0 01-1-7.9A4.5 4.5 0 0112 4a4.5 4.5 0 017 2.1A4 4 0 0118 14','M6 14v4a1 1 0 001 1h10a1 1 0 001-1v-4'],
  card:       ['M2 5h20v14H2z','M2 10h20'],
  cash:       ['M2 6h20v12H2z','M12 9a3 3 0 100 6 3 3 0 000-6','M5 9h.01M19 15h.01'],
  lock:       ['M5 11h14v10H5z','M8 11V8a4 4 0 018 0v3'],
  qr:         ['M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z','M14 14h3v3M20 14v6h-6M17 20h3'],
  share:      ['M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8','M16 6l-4-4-4 4','M12 2v14'],
  info:       ['M12 3a9 9 0 100 18 9 9 0 000-18z','M12 11v5','M12 8h.01'],
  gift:       ['M4 11h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1z','M2 7h20v4H2z','M12 7v14','M12 7S11 3 8.5 3a2.5 2.5 0 000 5','M12 7s1-4 3.5-4a2.5 2.5 0 010 5'],
  ticket:     ['M3 7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4z','M13 5v14'],
  repeat:     ['M17 2l4 4-4 4','M3 11V9a4 4 0 014-4h14','M7 22l-4-4 4-4','M21 13v2a4 4 0 01-4 4H3'],
  settings:   ['M12 8a4 4 0 100 8 4 4 0 000-8z','M19.4 13a7.9 7.9 0 000-2l2-1.6-2-3.4-2.4 1a8 8 0 00-1.7-1l-.4-2.5H9.1l-.4 2.5a8 8 0 00-1.7 1l-2.4-1-2 3.4L2.6 11a7.9 7.9 0 000 2l-2 1.6 2 3.4 2.4-1a8 8 0 001.7 1l.4 2.5h5.8l.4-2.5a8 8 0 001.7-1l2.4 1 2-3.4z'],
  help:       ['M12 3a9 9 0 100 18 9 9 0 000-18z','M9.5 9a2.5 2.5 0 014.9.7c0 1.7-2.4 2.3-2.4 2.3','M12 16h.01'],
  logout:     ['M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4','M16 17l5-5-5-5','M21 12H9'],
  x:          ['M6 6l12 12M18 6L6 18'],
  trophy:     ['M7 4h10v5a5 5 0 01-10 0z','M7 6H4v2a3 3 0 003 3','M17 6h3v2a3 3 0 01-3 3','M9 21h6','M12 14v3'],
  heart:      ['M12 20s-7-4.4-7-9.3A4 4 0 0112 7a4 4 0 017 3.7C19 15.6 12 20 12 20z'],
  map:        ['M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z','M9 3v15','M15 6v15'],
  sliders:    ['M4 6h16M4 12h16M4 18h16','M9 6v0M15 12v0M7 18v0'],
  flag:       ['M4 21V4h13l-1.5 4L17 12H4'],
  phone:      ['M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 11.5a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z'],
  video:      ['M3 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2z','M15 9.5l6-3.5v12l-6-3.5z'],
  bookmark:   ['M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z'],
  comment:    ['M21 11.5a8.5 8.5 0 01-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1121 11.5z'],
  send:       ['M22 2L11 13','M22 2l-7 20-4-9-9-4z'],
  calendar:   ['M4 5h16v16H4z','M4 9h16','M8 3v4','M16 3v4'],
  users:      ['M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2','M10 11a4 4 0 100-8 4 4 0 000 8','M21 21v-2a4 4 0 00-3-3.9','M16 3.1a4 4 0 010 7.8'],
  bolt:       ['M13 2L4 14h7l-1 8 9-12h-7z'],
  grid:       ['M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'],
  globe:      ['M12 3a9 9 0 100 18 9 9 0 000-18z','M3 12h18','M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z'],
  dollar:     ['M12 1.5v21','M17 5.5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6'],
  plus2:      ['M12 5v14','M5 12h14'],
};
const FILLED = {
  star:   'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z',
  flame:  'M35 60 A 10 10 0 0 0 45 50 C 45 44 43 41 39 35 C 34 25 36 17 45 9 C 47 19 53 28 61 34 C 69 41 73 50 73 59 A 28 28 0 1 1 17 59 C 17 54 19 49 22 46 A 10 10 0 0 0 35 60 Z',
  heartFill:'M12 21s-7.5-4.7-9.9-9.2C.6 8.5 2.1 5 5.4 5c2 0 3.3 1.1 4.1 2.3l1.4 2 1.4-2C13.1 6.1 14.4 5 16.6 5c3.3 0 4.8 3.5 3.3 6.8C19.5 16.3 12 21 12 21z',
  home:   'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  play:   'M8 5v14l11-7z',
  bookmarkFill:'M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z',
};
function Icon({ name, size=22, color, style }){
  if(name==='flame'){
    return <svg width={size} height={size} viewBox="0 0 100 100" style={style}><path fill={color||'currentColor'} d={FILLED.flame}/></svg>;
  }
  if(FILLED[name]){
    return <svg width={size} height={size} viewBox="0 0 24 24" style={style}><path fill={color||'currentColor'} d={FILLED[name]}/></svg>;
  }
  const ds = PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, ...style }}>
      {ds.map((d,i)=><path key={i} d={d} {...STROKE}/>)}
    </svg>
  );
}

/* ----------------------------- DATA ----------------------------- */
const COOKS = {
  maria:  { name:'Chef Maria',  kitchen:"Maria's Kitchen",   initial:'M', grad:'var(--g4)', cuisine:'Italian comfort', rating:4.9, reviews:312, dist:'1.2 km', verified:true,  prepscore:98 },
  david:  { name:'Chef David',  kitchen:"David's Table",      initial:'D', grad:'var(--g3)', cuisine:'Healthy & seafood', rating:4.8, reviews:204, dist:'0.8 km', verified:true,  prepscore:95 },
  amara:  { name:'Amara O.',    kitchen:"Amara's Kitchen",    initial:'A', grad:'var(--g1)', cuisine:'West African', rating:4.9, reviews:412, dist:'0.6 km', verified:true,  prepscore:97 },
  denise: { name:'Denise R.',   kitchen:"Denise's Soul Food", initial:'D', grad:'var(--g6)', cuisine:'Soul food', rating:4.9, reviews:540, dist:'1.6 km', verified:true,  prepscore:99 },
  lucia:  { name:'Lucia R.',    kitchen:"Cocina de Lucia",    initial:'L', grad:'var(--g7)', cuisine:'Oaxacan', rating:4.7, reviews:198, dist:'2.1 km', verified:true,  prepscore:94 },
  sana:   { name:'Sana K.',     kitchen:"Sana's Halal Home",  initial:'S', grad:'var(--g8)', cuisine:'Halal & Desi', rating:4.8, reviews:276, dist:'1.4 km', verified:true,  prepscore:96 },
};
const MEALS = [
  { id:'lasagna', name:'Family Lasagna Tray', cook:'maria', price:13.5, grad:'var(--g4)', rating:4.9, reviews:312, time:'25m', dist:'1.2 km',
    tags:['Comfort','Pasta'], match:true, kcal:680, serves:2,
    desc:'Layered fresh pasta, slow-simmered beef ragù and three cheeses, baked golden. Travels in a sealed oven-ready tray — reheat and serve.' },
  { id:'salmon', name:'Honey Garlic Salmon', cook:'david', price:9.75, grad:'var(--g3)', rating:4.8, reviews:204, time:'30m', dist:'0.8 km',
    tags:['Healthy','Seafood'], match:true, kcal:420, serves:1,
    desc:'Pan-seared salmon glazed in honey-garlic, over herbed jasmine rice with charred greens. High protein, gluten-free.' },
  { id:'jollof', name:'Smoky Jollof & Chicken', cook:'amara', price:12.0, grad:'var(--g1)', rating:4.9, reviews:412, time:'20m', dist:'0.6 km',
    tags:['West African','Spicy'], match:false, kcal:610, serves:1,
    desc:'Party-style smoky jollof rice with grilled marinated chicken and fried plantain. A neighborhood favorite that sells out fast.' },
  { id:'shortrib', name:'Slow-Braised Short Rib', cook:'denise', price:16.5, grad:'var(--g6)', rating:4.9, reviews:540, time:'35m', dist:'1.6 km',
    tags:['Comfort','Soul food'], match:true, kcal:720, serves:1,
    desc:'Fork-tender short rib braised for six hours, creamy mash and buttered greens. Rich, deeply savory Sunday cooking any day.' },
  { id:'tacos', name:'Oaxacan Mole Tacos', cook:'lucia', price:11.0, grad:'var(--g7)', rating:4.7, reviews:198, time:'25m', dist:'2.1 km',
    tags:['Mexican','Vegan opt.'], match:false, kcal:540, serves:1,
    desc:'House mole negro over three soft-corn tacos with pickled onion and queso fresco. Mild heat, deep complexity.' },
  { id:'biryani', name:'Chicken Biryani Box', cook:'sana', price:12.75, grad:'var(--g8)', rating:4.8, reviews:276, time:'30m', dist:'1.4 km',
    tags:['Halal','Desi'], match:true, kcal:650, serves:1,
    desc:'Fragrant dum biryani layered with saffron basmati and tender chicken, raita and salan on the side. Halal-certified kitchen.' },
  { id:'poke', name:'Rainbow Poke Bowl', cook:'david', price:10.5, grad:'var(--g5)', rating:4.7, reviews:142, time:'20m', dist:'0.8 km',
    tags:['Healthy','Fresh'], match:false, kcal:480, serves:1,
    desc:'Ahi tuna, edamame, mango and avocado over sushi rice with sesame-soy dressing. Bright, clean and filling.' },
  { id:'cornbread', name:'Honey Cornbread (6)', cook:'denise', price:6.0, grad:'var(--g4)', rating:5.0, reviews:88, time:'15m', dist:'1.6 km',
    tags:['Sides','Baked'], match:false, kcal:240, serves:6,
    desc:'Six warm honey-butter cornbread squares. The perfect add-on to any soul food order.' },
];
const mealById = id => MEALS.find(m=>m.id===id);

const CONVERSATIONS = [
  { cook:'maria',  msg:'Your lasagna is in the oven now! 🔥', time:'2m', unread:2, online:true },
  { cook:'amara',  msg:'Thanks for the 5 stars — see you next week!', time:'1h', unread:0, online:true },
  { cook:'david',  msg:'I can do a no-rice swap, no problem.', time:'3h', unread:0, online:false },
  { cook:'denise', msg:'New short rib drop goes live Friday 6pm.', time:'1d', unread:0, online:false },
];

/* ----------------------------- ATOMS ----------------------------- */
const money = n => '$' + n.toFixed(2);

function Ph({ grad, children, style, className }){
  return <div className={className} style={{ background:grad, ...style }}>{children}</div>;
}
function Avatar({ cook, size=46, radius=14, fontSize }){
  const c = COOKS[cook];
  return <div style={{ width:size, height:size, borderRadius:radius, background:c.grad, display:'grid', placeItems:'center',
    color:'#fff', fontWeight:900, fontSize:fontSize||size*0.4, flex:'none' }}>{c.initial}</div>;
}
function Stepper({ value, onDec, onInc, sm }){
  return (
    <div className={'stepper'+(sm?' sm':'')}>
      <button onClick={onDec} aria-label="decrease"><Icon name="minus" size={sm?15:18}/></button>
      <span className="n">{value}</span>
      <button onClick={onInc} aria-label="increase"><Icon name="plus" size={sm?15:18}/></button>
    </div>
  );
}
function Stars({ n=5, size=15 }){
  return <span style={{ display:'inline-flex', gap:2, color:'var(--star)' }}>{Array.from({length:n}).map((_,i)=><Icon key={i} name="star" size={size}/>)}</span>;
}

/* experiences, feed, notifications */
const EXPERIENCES = [
  { id:'pasta',   title:'Pasta Masterclass',       sub:'Hands-on with Chef Maria', cook:'maria',  price:65, grad:'var(--g4)', when:'Sat · 4:00 PM', spots:'4 spots left', tag:'Class',         ico:'chefhat' },
  { id:'supper',  title:'West African Supper Club', sub:'Authentic 5-course night', cook:'amara',  price:58, grad:'var(--g1)', when:'Sun · 6:00 PM', spots:'8 seats',      tag:'Supper club',   ico:'globe' },
  { id:'birthday',title:'Private Birthday Dinner',  sub:'Chef-crafted celebration', cook:'denise', price:45, grad:'linear-gradient(135deg,#FF6B9D,#EC4899)', when:'Book any date', spots:'Private', tag:'Private dining', ico:'gift' },
  { id:'bbq',     title:'Backyard BBQ Night',       sub:'Open-fire gathering',      cook:'denise', price:40, grad:'var(--g6)', when:'Sat · 5:00 PM', spots:'12 going',    tag:'Event',         ico:'bolt' },
  { id:'taco',    title:'Taco & Mezcal Evening',    sub:'Oaxacan night with Lucia', cook:'lucia',  price:52, grad:'var(--g7)', when:'Fri · 7:00 PM', spots:'6 seats',     tag:'Supper club',   ico:'globe' },
];
const expById = id => EXPERIENCES.find(e=>e.id===id);
const FEED = [
  { id:'f1', cook:'maria',  meal:'lasagna',  grad:'var(--g4)', live:true,  caption:'Layering tonight’s lasagna trays 🔥 fresh out at 5:30', likes:'1.2k', comments:340, tag:'LIVE' },
  { id:'f2', cook:'amara',  meal:'jollof',   grad:'var(--g1)', live:false, caption:'Smoky jollof the right way — party-rice energy 🎉',     likes:'2.4k', comments:512, tag:'Reel' },
  { id:'f3', cook:'david',  meal:'salmon',   grad:'var(--g3)', live:false, caption:'Honey-garlic glaze hitting the pan 🐟 high protein',   likes:'980',  comments:142, tag:'Reel' },
  { id:'f4', cook:'denise', meal:'shortrib', grad:'var(--g6)', live:false, caption:'6-hour short rib. Sunday cooking, any day 🥹',          likes:'3.1k', comments:620, tag:'Reel' },
  { id:'f5', cook:'lucia',  meal:'tacos',    grad:'var(--g7)', live:false, caption:'Mole negro from scratch — 20 ingredients ✨',          likes:'1.7k', comments:288, tag:'Reel' },
];
const NOTIFS = [
  { ico:'chefhat', cls:'amber',  title:'Maria is cooking your order', body:'Family Lasagna Tray · ready ~5:30 PM',      time:'2m',  unread:true },
  { ico:'bolt',    cls:'purple', title:'New drop near you',           body:'Amara just listed Smoky Jollof — selling fast', time:'18m', unread:true },
  { ico:'gift',    cls:'green',  title:'You earned 40 points',        body:'Thanks for reviewing Honey Garlic Salmon',  time:'1h',  unread:false },
  { ico:'ticket',  cls:'amber',  title:'Free delivery unlocked',      body:'Your next order ships free 🎉',             time:'3h',  unread:false },
  { ico:'star',    cls:'',       title:'Rate your last order',        body:'How was Chef David’s poke bowl?',           time:'1d',  unread:false },
];

Object.assign(window, { Icon, COOKS, MEALS, mealById, CONVERSATIONS, EXPERIENCES, expById, FEED, NOTIFS,
  money, Ph, Avatar, Stepper, Stars, useState, useEffect, useRef });
