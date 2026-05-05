// Kajmvvv — configuratore.jsx
// Monta il solo Configuratore su #configurator-root

const { useState, useEffect } = React;

// ─── Dati ───────────────────────────────────────────────────────
const COLORS = [
  { id:"latte",  label:"Latte",       hex:"#F5EFE6" },
  { id:"sabbia", label:"Sabbia",      hex:"#E8DCC8" },
  { id:"rosa",   label:"Rosa antico", hex:"#E8B4A0" },
  { id:"terra",  label:"Terracotta",  hex:"#C26B4A" },
  { id:"oro",    label:"Oro caldo",   hex:"#D4A574" },
  { id:"bosco",  label:"Bosco",       hex:"#6B7F5A" },
  { id:"notte",  label:"Notte",       hex:"#2C1F17" },
];

const DECOS = [
  { id:"none",    name:"Nessuna",       icon:"fa-circle",     extra:"+ €0" },
  { id:"fiori",   name:"Fiori secchi",  icon:"fa-seedling",   extra:"+ €2" },
  { id:"glitter", name:"Glitter",       icon:"fa-sparkles",   extra:"+ €1" },
  { id:"oro",     name:"Foglia oro",    icon:"fa-star",       extra:"+ €3" },
  { id:"perle",   name:"Microperle",    icon:"fa-circle-dot", extra:"+ €2" },
  { id:"luna",    name:"Stelle e luna", icon:"fa-moon",       extra:"+ €2" },
];

const CORDS = [
  { id:"silver",  name:"Moschettone argento", desc:"Acciaio inox, finitura lucida.",          icon:"fa-link",        extra:"incluso" },
  { id:"gold",    name:"Moschettone oro",     desc:"Ottone bagnato in oro.",                  icon:"fa-link",        extra:"+ €1"   },
  { id:"leather", name:"Cordino in pelle",    desc:"Pelle naturale conciata al vegetale.",    icon:"fa-grip-lines",  extra:"+ €2"   },
  { id:"chain",   name:"Catenella sottile",   desc:"Maglia minimal in acciaio dorato.",       icon:"fa-grip",        extra:"+ €2"   },
];

const DECO_COST = { none:0, fiori:2, glitter:1, oro:3, perle:2, luna:2 };
const CORD_COST = { silver:0, gold:1, leather:2, chain:2 };

const STEPS = [
  { id:"letter", title:"Step 01", q:"Quale lettera ti rappresenta?",        help:"Scegli l'iniziale del tuo nome o quella di chi ti sta a cuore." },
  { id:"color",  title:"Step 02", q:"Che colore di resina?",                 help:"Sette tonalità calde ispirate alla terra e ai materiali naturali." },
  { id:"deco",   title:"Step 03", q:"Aggiungi una decorazione interna",      help:"Fiori secchi raccolti a mano, glitter, foglia oro o microperle." },
  { id:"cord",   title:"Step 04", q:"Scegli il cordino o moschettone",       help:"L'ultimo dettaglio. Combina con la palette del portachiavi." },
  { id:"info",   title:"Step 05", q:"Dimmi qualcosa di te",                  help:"Mi servono solo i dati per ricontattarti e confermare l'ordine." },
];

// ─── Keychain SVG ───────────────────────────────────────────────
function Keychain({ size = 220, color = "#E8B4A0", letter = "A", deco = "fiori", cord = "silver" }) {
  const cordColor = cord === "gold" ? "#D4A574" : cord === "leather" ? "#8A5A3A" : cord === "chain" ? "#D4A574" : "#B8B8B8";
  const uid = letter.replace(/\+/g, 'p');
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 220 300" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`grad-${uid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="60%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <filter id={`ks-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dy="6" />
          <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx="110" cy="40" r="22" fill="none" stroke={cordColor} strokeWidth="6" />
      {cord === "leather" && (
        <path d="M88 40 C70 60,80 80,110 70" stroke={cordColor} strokeWidth="4" fill="none" strokeLinecap="round" />
      )}
      {cord === "chain" && (
        <g stroke={cordColor} strokeWidth="2" fill="none">
          <ellipse cx="100" cy="60" rx="6" ry="3" />
          <ellipse cx="108" cy="68" rx="3" ry="6" />
          <ellipse cx="100" cy="76" rx="6" ry="3" />
        </g>
      )}
      <line x1="110" y1="62" x2="110" y2="92" stroke={cordColor} strokeWidth="3" />

      <g filter={`url(#ks-${uid})`}>
        <ellipse cx="110" cy="180" rx="78" ry="92" fill={`url(#grad-${uid})`} />
        <ellipse cx="80" cy="135" rx="28" ry="14" fill="#fff" opacity="0.4" />
      </g>

      {deco === "fiori" && (
        <g opacity="0.85">
          <circle cx="80" cy="200" r="6" fill="#F5EFE6" />
          <circle cx="80" cy="194" r="3" fill="#C26B4A" /><circle cx="86" cy="204" r="3" fill="#C26B4A" />
          <circle cx="74" cy="204" r="3" fill="#C26B4A" /><circle cx="80" cy="210" r="3" fill="#C26B4A" />
          <circle cx="74" cy="194" r="3" fill="#C26B4A" /><circle cx="86" cy="194" r="3" fill="#C26B4A" />
          <circle cx="140" cy="225" r="5" fill="#F5EFE6" />
          <circle cx="140" cy="220" r="2.5" fill="#A4533A" /><circle cx="145" cy="227" r="2.5" fill="#A4533A" />
          <circle cx="135" cy="227" r="2.5" fill="#A4533A" />
          <path d="M55 165 q4 -10 12 -8 q-4 6 -12 8 z" fill="#6B7F5A" opacity=".75" />
          <path d="M155 145 q4 -10 12 -8 q-4 6 -12 8 z" fill="#6B7F5A" opacity=".75" />
        </g>
      )}
      {deco === "glitter" && (
        <g fill="#fff">
          {[...Array(40)].map((_,i) => (
            <circle key={i} cx={50+(i*37)%120} cy={110+(i*53)%140} r={(i%3)+1} opacity={0.4+(i%3)*0.2}/>
          ))}
        </g>
      )}
      {deco === "oro" && (
        <g fill="#D4A574" opacity=".85">
          <path d="M70 150 l8 4 l-2 8 l-7 -3 z" /><path d="M150 175 l10 3 l-3 9 l-9 -4 z" />
          <path d="M85 230 l7 5 l-3 7 l-7 -3 z" /><path d="M135 215 l6 3 l-2 6 l-6 -2 z" />
          <path d="M105 250 l8 3 l-2 7 l-8 -2 z" />
        </g>
      )}
      {deco === "perle" && (
        <g>
          {[[70,160],[140,150],[155,200],[80,225],[125,235],[100,180],[60,200]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill="#fff" stroke="#D4A574" strokeWidth=".5"/>
          ))}
        </g>
      )}
      {deco === "luna" && (
        <g fill="#D4A574">
          <path d="M70 145 a14 14 0 1 0 6 18 a11 11 0 1 1 -6 -18 z" />
          <path d="M145 215 l3 6 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 z" transform="scale(.6) translate(95 140)"/>
          <circle cx="155" cy="170" r="2"/><circle cx="80" cy="225" r="2"/><circle cx="135" cy="155" r="1.5"/>
        </g>
      )}

      <text
        x="110" y="200" textAnchor="middle"
        fontFamily='"Playfair Display", serif' fontStyle="italic" fontWeight="500"
        fontSize={letter.length > 1 ? 50 : 86}
        fill="#2C1F17" opacity="0.88"
        style={{ paintOrder:"stroke", stroke:"#fff", strokeWidth:2, strokeOpacity:.35 }}
      >{letter}</text>
    </svg>
  );
}

// ─── Configuratore ──────────────────────────────────────────────
function Configurator() {
  const [step, setStep]     = useState(0);
  const [letter, setLetter] = useState("A");
  const [color, setColor]   = useState("rosa");
  const [deco, setDeco]     = useState("fiori");
  const [cord, setCord]     = useState("silver");
  const [done, setDone]     = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [info, setInfo]     = useState({ nome:"", contatto:"", canale:"instagram", note:"" });
  const updateInfo = (k, v) => setInfo(s => ({ ...s, [k]: v }));
  const infoValid  = info.nome.trim().length > 0 && info.contatto.trim().length > 0;

  const colorHex   = COLORS.find(c => c.id === color)?.hex || "#E8B4A0";
  const basePrice  = 8;
  const total      = basePrice + DECO_COST[deco] + CORD_COST[cord];

  const next = () => { if (step < STEPS.length - 1) setStep(step + 1); else setDone(true); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const ABC        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const stepInfo   = STEPS[step];
  const decoLabel  = DECOS.find(d => d.id === deco)?.name;
  const cordLabel  = CORDS.find(c => c.id === cord)?.name;
  const colorLabel = COLORS.find(c => c.id === color)?.label;

  return (
    <section className="k-section k-section-cream">
      <div className="k-container">
        <div className="k-section-head">
          <div className="k-eyebrow k-eyebrow-both"><em>Personalizza</em></div>
          <h2 className="k-h2">Crea il <em>tuo pezzo</em> in cinque passi</h2>
          <p className="k-muted">Lettera, colore, decorazione, cordino e i tuoi dati. Anteprima in tempo reale e ordine via Instagram o email.</p>
        </div>

        <div className="k-config">
          {/* Preview */}
          <div className="k-config-preview">
            <div className="k-preview-stage">
              <Keychain size={260} color={colorHex} letter={letter} deco={deco} cord={cord}/>
            </div>
            <div className="k-preview-meta">
              <span>Anteprima dal vivo</span>
              <span><strong>€{total}</strong></span>
            </div>
          </div>

          {/* Panel */}
          <div className="k-config-panel">
            <div className="k-config-steps">
              {STEPS.map((s, i) => (
                <div key={s.id}
                     className={"k-step-pill " + (i === step ? "active" : i < step ? "done" : "")}
                     onClick={() => { setStep(i); setDone(false); }}>
                  <span className="k-step-num"><span>{i + 1}</span></span>
                  {s.id==="letter"?"Lettera":s.id==="color"?"Colore":s.id==="deco"?"Decoro":s.id==="cord"?"Cordino":"Dati"}
                </div>
              ))}
            </div>

            {!done ? (
              <>
                <div className="k-step-title k-fade-in" key={`t-${step}`}>{stepInfo.title}</div>
                <h3 className="k-step-q k-fade-in"   key={`q-${step}`}>{stepInfo.q}</h3>
                <p className="k-step-help">{stepInfo.help}</p>

                {step === 0 && (
                  <div className="k-letter-grid k-fade-in">
                    {ABC.map(l => (
                      <button key={l} className={"k-letter" + (l === letter ? " active" : "")}
                              onClick={() => setLetter(l)}>{l}</button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="k-color-row k-fade-in">
                    {COLORS.map(c => (
                      <div key={c.id} className={"k-color-chip" + (c.id === color ? " active" : "")}
                           onClick={() => setColor(c.id)}>
                        <span className="k-color-swatch" style={{ background: c.hex }}/>
                        {c.label}
                      </div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="k-deco-grid k-fade-in">
                    {DECOS.map(d => (
                      <div key={d.id} className={"k-deco-card" + (d.id === deco ? " active" : "")}
                           onClick={() => setDeco(d.id)}>
                        <div className="k-deco-icon"><i className={"fa-solid " + d.icon}/></div>
                        <div className="k-deco-name">{d.name}</div>
                        <div className="k-deco-extra">{d.extra}</div>
                      </div>
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div className="k-cord-row k-fade-in">
                    {CORDS.map(c => (
                      <div key={c.id} className={"k-cord-card" + (c.id === cord ? " active" : "")}
                           onClick={() => setCord(c.id)}>
                        <div className="k-cord-vis"><i className={"fa-solid " + c.icon}/></div>
                        <div className="k-cord-info">
                          <div className="k-cord-name">{c.name}</div>
                          <div className="k-cord-desc">{c.desc}</div>
                        </div>
                        <div className="k-cord-extra">{c.extra}</div>
                      </div>
                    ))}
                  </div>
                )}
                {step === 4 && (
                  <div className="k-info-form k-fade-in">
                    <div className="k-info-row">
                      <div className="k-info-field">
                        <label>Nome</label>
                        <input value={info.nome} onChange={e => updateInfo('nome', e.target.value)} placeholder="Come ti chiami?"/>
                      </div>
                      <div className="k-info-field">
                        <label>Come preferisci essere ricontattata/o?</label>
                        <div className="k-info-channel">
                          <button type="button" className={info.canale==='instagram'?'active':''} onClick={() => updateInfo('canale','instagram')}><i className="fa-brands fa-instagram"/> Instagram</button>
                          <button type="button" className={info.canale==='email'?'active':''} onClick={() => updateInfo('canale','email')}><i className="fa-solid fa-envelope"/> Email</button>
                        </div>
                      </div>
                    </div>
                    <div className="k-info-field">
                      <label>{info.canale==='instagram' ? 'Il tuo @username Instagram' : 'La tua email'}</label>
                      <input value={info.contatto} onChange={e => updateInfo('contatto', e.target.value)}
                             placeholder={info.canale==='instagram' ? '@iltuonome' : 'tuonome@email.it'}/>
                    </div>
                    <div className="k-info-field">
                      <label>Note <small style={{color:'var(--k-ink-3)',fontWeight:400}}>(facoltative)</small></label>
                      <textarea rows="3" value={info.note} onChange={e => updateInfo('note', e.target.value)}
                                placeholder="Es: è un regalo per il compleanno della mia amica..."/>
                    </div>
                    <p className="k-info-priv"><i className="fa-solid fa-lock"/> I tuoi dati servono solo a confermare l'ordine. Niente newsletter, niente terzi.</p>
                  </div>
                )}

                <div className="k-config-foot">
                  <div className="k-config-summary">
                    Totale stimato
                    <strong>€{total}</strong>
                  </div>
                  <div className="k-config-nav">
                    <button className="k-btn k-btn-ghost" disabled={step === 0} onClick={prev}>
                      <i className="fa-solid fa-arrow-left"/> Indietro
                    </button>
                    <button className="k-btn k-btn-primary" onClick={next} disabled={step === 4 && !infoValid}>
                      {step < STEPS.length - 1 ? "Avanti" : "Riepilogo"} <i className="fa-solid fa-arrow-right"/>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="k-fade-in" style={{display:"flex",flexDirection:"column",height:"100%"}}>
                <div className="k-step-title">Riepilogo</div>
                <h3 className="k-step-q">Il tuo <em style={{fontFamily:"'Playfair Display'",fontStyle:"italic",color:"var(--k-terracotta)"}}>portachiavi</em> è pronto.</h3>
                <p className="k-step-help">Inviaci il riepilogo via Instagram o email. Confermiamo entro 24h e iniziamo a colare la resina.</p>
                <div className="k-config-recap">
                  <div className="k-config-recap-row"><span>Lettera</span><strong>{letter}</strong></div>
                  <div className="k-config-recap-row"><span>Colore</span><strong>{colorLabel}</strong></div>
                  <div className="k-config-recap-row"><span>Decorazione</span><strong>{decoLabel}</strong></div>
                  <div className="k-config-recap-row"><span>Cordino</span><strong>{cordLabel}</strong></div>
                  <div className="k-config-recap-row" style={{paddingTop:10,borderTop:'1px solid var(--k-line)'}}><span>Per</span><strong>{info.nome||'—'}</strong></div>
                  <div className="k-config-recap-row"><span>{info.canale==='instagram'?'Instagram':'Email'}</span><strong>{info.contatto||'—'}</strong></div>
                  {info.note && <div className="k-config-recap-row"><span>Note</span><strong style={{maxWidth:'60%',textAlign:'right',fontWeight:500,fontSize:'.88rem'}}>{info.note}</strong></div>}
                  <div className="k-config-recap-row total"><span>Totale</span><strong>€{total}</strong></div>
                </div>
                <div className="k-config-foot" style={{marginTop:"1.5rem"}}>
                  <button className="k-btn k-btn-ghost" onClick={() => { setDone(false); setStep(0); }}>
                    <i className="fa-solid fa-rotate-left"/> Ricomincia
                  </button>
                  <button className="k-btn k-btn-primary" onClick={() => setShowCart(true)}>
                    Invia richiesta <i className="fa-solid fa-paper-plane"/>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal invio */}
      <div className={"k-modal-back" + (showCart ? " show" : "")} onClick={() => setShowCart(false)}>
        <div className="k-modal" onClick={e => e.stopPropagation()}>
          <button className="k-modal-close" onClick={() => setShowCart(false)}><i className="fa-solid fa-xmark"/></button>
          <div className="k-eyebrow"><em>Ultimo passo</em></div>
          <h3 className="k-h3" style={{marginBottom:8}}>Come vuoi inviare l'ordine?</h3>
          <p className="k-muted" style={{fontSize:".9rem"}}>
            Copia il riepilogo qui sotto e inviacelo. Ti rispondiamo con tempi e modalità di pagamento.
          </p>
          <div className="k-config-recap" style={{marginTop:18}}>
            <div className="k-config-recap-row"><span>Lettera</span><strong>{letter}</strong></div>
            <div className="k-config-recap-row"><span>Colore</span><strong>{colorLabel}</strong></div>
            <div className="k-config-recap-row"><span>Decorazione</span><strong>{decoLabel}</strong></div>
            <div className="k-config-recap-row"><span>Cordino</span><strong>{cordLabel}</strong></div>
            <div className="k-config-recap-row" style={{paddingTop:10,borderTop:'1px solid var(--k-line)'}}><span>Per</span><strong>{info.nome||'—'}</strong></div>
            <div className="k-config-recap-row"><span>{info.canale==='instagram'?'Instagram':'Email'}</span><strong>{info.contatto||'—'}</strong></div>
            <div className="k-config-recap-row total"><span>Totale</span><strong>€{total}</strong></div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:22,flexWrap:"wrap"}}>
            <a className="k-btn k-btn-primary" style={{flex:1,justifyContent:"center"}}
               href="https://instagram.com/kajmvvv" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"/> Scrivi su Instagram
            </a>
            <a className="k-btn k-btn-outline" style={{flex:1,justifyContent:"center"}}
               href={`mailto:rizzoalice.ar@gmail.com?subject=${encodeURIComponent('Ordine portachiavi '+letter+' — '+(info.nome||''))}&body=${encodeURIComponent('Ciao Alice,\n\nSono '+(info.nome||'')+'.\nMi puoi ricontattare su '+(info.canale==='instagram'?'Instagram: ':'email: ')+(info.contatto||'')+'.\n\nVorrei ordinare:\n- Lettera: '+letter+'\n- Colore: '+colorLabel+'\n- Decorazione: '+decoLabel+'\n- Cordino: '+cordLabel+'\n- Totale: €'+total+(info.note?'\n\nNote: '+info.note:'')+'\n\nGrazie!')}`}>
              <i className="fa-solid fa-envelope"/> Invia email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mount ──────────────────────────────────────────────────────
const rootEl = document.getElementById("configurator-root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<Configurator/>);
}
