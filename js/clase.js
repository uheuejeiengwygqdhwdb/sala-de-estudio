// ============ Temario de inglés ============
const topics = {
  "1. Fundamentos": ["Verb to be","Pronombres personales","Sujeto y objeto","Like","Presente simple","A / an / the","Preposiciones","Profesiones","Familia","Números","Fechas y horarios","Rutinas","Pronunciación básica"],
  "2. Comunicación cotidiana": ["WH-questions","This / that / these / those","Presente simple: afirmativo, negativo e interrogativo","Like, love, enjoy, hate, don't like","Posesivos","Very / really","Presente continuo","Linking sounds","And / or / but"],
  "3. Situaciones prácticas": ["Direcciones","Lugares de la ciudad","There is / there are","How much / how many","Contables e incontables","Some / any","More / less / fewer","Comida y bebidas","Precios y cantidades","Compras y servicios"],
  "4. Pasado": ["Was / were","Past simple","Verbos regulares e irregulares","Did","Preguntas WH- en pasado","Past continuous","When / before / after / until / since","Reported speech","Narración de experiencias"],
  "5. Intermedio": ["Comparativos y superlativos","Can / could / should / may / might","Will / be going to","Condicional cero","Primer condicional","Clima","Vacaciones y viajes","Planes y vida cotidiana"],
  "6. Present perfect": ["Have you ever...?","Already / yet / just / never / ever","For / since","Present perfect vs. past simple","Present perfect continuous","Experiencias y pasado conectado con el presente"],
  "7. Condicionales y narración": ["Second conditional","If I were...","I would...","Third conditional","Past perfect","Past perfect continuous","Used to","Situaciones hipotéticas","Narración de experiencias"],
  "8. Comunicación B2": ["Reported speech avanzado","Relative clauses","Passive voice","Phrasal verbs","Collocations","Lenguaje laboral","Emails y documentos","Textos descriptivos, expositivos y periodísticos","Scanning y skimming","Conectores avanzados","Cortesía y formalidad","Preguntas indirectas","Argumentación"],
  "9. Consolidación hacia B2": ["Modales avanzados","Reporting verbs","Infinitivos y gerundios","Mixed tenses","Relative y adverbial clauses","Condicionales avanzados","Expresar y justificar opiniones","Contraargumentar y comparar ideas","Temas sociales, ambientales y laborales","Tecnología, economía y educación","Pronunciación avanzada","Ritmo, entonación, blending y reducción de vocales","Conversaciones espontáneas"]
};
const topicSelect = document.getElementById("topicSelect");
function fillTopics(){
  topicSelect.innerHTML = "";
  Object.entries(topics).forEach(([modulo, temas])=>{
    const grupo = document.createElement("optgroup");
    grupo.label = modulo;
    temas.forEach(tema=>{
      const o = document.createElement("option"); o.value = tema; o.textContent = tema;
      grupo.appendChild(o);
    });
    topicSelect.appendChild(grupo);
  });
}
fillTopics();
topicSelect.addEventListener("change", ()=>{ historial = []; }); // cambiar de tema reinicia la memoria de la clase

// ============ API key: se guarda en este navegador para no perderla al refrescar ============
const apiKeyInput = document.getElementById("apiKey");
try{
  const guardada = localStorage.getItem("gemini_api_key");
  if (guardada) apiKeyInput.value = guardada;
}catch(e){ /* si el navegador bloquea localStorage, simplemente no se recuerda */ }
apiKeyInput.addEventListener("input", ()=>{
  try{ localStorage.setItem("gemini_api_key", apiKeyInput.value.trim()); }catch(e){}
});

// ============ Escena: alternar entre avatar y pizarra ============
let procesando = false;
let historial = []; // memoria de la clase actual: se reinicia al cambiar de tema
const sendBtn = document.getElementById("sendBtn");
const avatarView = document.getElementById("avatarView");
const boardView = document.getElementById("boardView");
function mostrarAvatar(){
  boardView.classList.remove("active"); avatarView.classList.add("active");
  pauseBtn.style.display = "none";
  pausado = false; pauseBtn.classList.remove("paused"); pauseBtn.textContent = "⏸";
}
function mostrarPizarra(){
  avatarView.classList.remove("active"); boardView.classList.add("active");
  pauseBtn.style.display = "inline-block";
}

// ============ Pizarra (canvas) ============
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
function resizeCanvas(){
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  clearBoard();
}
window.addEventListener("resize", resizeCanvas);

function clearBoard(){
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--board-bg');
  ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

let boardY = 40;
let pausado = false;
function writeLine(text){
  return new Promise(resolve=>{
    ctx.font = "28px 'Comic Sans MS', cursive";
    ctx.fillStyle = "#eef2ea";
    ctx.textBaseline = "top";
    if (boardY > canvas.clientHeight - 60){
      clearBoard();
      boardY = 40;
    }
    // efecto de "escritura" caracter por caracter
    let i = 0;
    const x = 30;
    function step(){
      if (pausado){ setTimeout(step, 150); return; } // en pausa, no avanza hasta que se reanude
      if (i <= text.length){
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--board-bg');
        ctx.fillRect(x, boardY, canvas.clientWidth - 60, 36);
        ctx.fillStyle = "#eef2ea";
        ctx.fillText(text.slice(0,i), x, boardY);
        i += Math.max(1, Math.floor(text.length/40));
        setTimeout(step, 25);
      } else {
        boardY += 44;
        resolve();
      }
    }
    step();
  });
}

// ============ Estado y ondas animadas (reaccionan a si el profesor está hablando) ============
const statusEl = document.getElementById("statusLine");
function setStatus(text){ statusEl.textContent = text || ""; }

const waveCanvas = document.getElementById("waveCanvas");
const wctx = waveCanvas.getContext("2d");
let hablando = false;
let ampActual = 6;
function resizeWaveCanvas(){
  const box = waveCanvas.parentElement.getBoundingClientRect();
  waveCanvas.width = box.width * devicePixelRatio;
  waveCanvas.height = box.height * devicePixelRatio;
  wctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
window.addEventListener("resize", resizeWaveCanvas);

function dibujarOndas(t){
  const W = waveCanvas.clientWidth, H = waveCanvas.clientHeight, midY = H/2;
  const objetivo = hablando ? 30 : 6;
  ampActual += (objetivo - ampActual) * 0.08;
  wctx.clearRect(0,0,W,H);
  wctx.globalCompositeOperation = "lighter";
  const capas = [
    {color:"#ff5f6d", freq:0.045, vel:0.0028, fase:0},
    {color:"#5b6dff", freq:0.032, vel:0.0022, fase:1.2},
    {color:"#c04cff", freq:0.05,  vel:0.0035, fase:2.1},
    {color:"#31e6b3", freq:0.038, vel:0.0018, fase:3.4},
    {color:"#ffd24c", freq:0.026, vel:0.0026, fase:4.6}
  ];
  capas.forEach(c=>{
    wctx.beginPath();
    for (let x=0; x<=W; x+=4){
      const envolvente = Math.sin((x/W) * Math.PI); // se afina hacia los bordes del círculo
      const y = midY + Math.sin(x*c.freq + t*c.vel*1000 + c.fase) * ampActual * envolvente;
      if (x===0) wctx.moveTo(x,y); else wctx.lineTo(x,y);
    }
    wctx.strokeStyle = c.color;
    wctx.lineWidth = 3;
    wctx.globalAlpha = 0.55;
    wctx.stroke();
  });
  wctx.globalCompositeOperation = "source-over";
  wctx.globalAlpha = 1;
  requestAnimationFrame(dibujarOndas);
}

// ============ Velocidad de la voz (control real, no depende de lo que le pidamos a Gemini) ============
const velocidadSelect = document.getElementById("velocidadSelect");
let velocidadHabla = 0.8;
try{
  const guardadaVel = localStorage.getItem("velocidad_habla");
  if (guardadaVel){ velocidadHabla = parseFloat(guardadaVel); velocidadSelect.value = guardadaVel; }
}catch(e){}
velocidadSelect.addEventListener("change", ()=>{
  velocidadHabla = parseFloat(velocidadSelect.value);
  try{ localStorage.setItem("velocidad_habla", velocidadSelect.value); }catch(e){}
});

function speak(text){
  return new Promise(resolve=>{
    try{
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-419";
      u.rate = velocidadHabla;
      u.onstart = ()=> { hablando = true; };
      u.onend = ()=> { hablando = false; resolve(); };
      u.onerror = ()=> { hablando = false; resolve(); };
      speechSynthesis.speak(u);
    }catch(e){ console.warn("TTS no disponible", e); resolve(); }
  });
}

// ============ Conversación con Gemini ============
async function askProfesor(pregunta){
  if (procesando) return; // evita que se disparen varias peticiones a la vez (causaba las repeticiones)
  const key = document.getElementById("apiKey").value.trim();
  if (!key){
    setStatus("Falta pegar tu API key de Gemini arriba.");
    return;
  }
  procesando = true;
  micBtn.disabled = true;
  sendBtn.disabled = true;
  speechSynthesis.cancel(); // limpia cualquier voz pendiente de una petición anterior antes de empezar

  const tema = topicSelect.value;

  const rolIngles = `Eres un profesor nativo de inglés con más de 10 años de experiencia enseñando en universidades. Sigues un temario progresivo (nivel inicial hasta B2) y tu método es: aprender → practicar → hablar → corregir → repetir → usar.
Reglas de tu enseñanza:
- Explica principalmente en español al inicio de cada tema, usando inglés sencillo mezclado. Sube la proporción de inglés solo cuando el estudiante muestre dominio en el tema actual.
- No avances por avanzar: si el estudiante no domina el tema, repite con otro ejemplo o enfoque en vez de pasar al siguiente punto.
- Corrige errores de gramática o pronunciación con amabilidad, explicando brevemente el porqué.
- Fomenta que el estudiante hable y practique en voz alta, no solo que escuche.
- Sé exigente pero cálido, como un profesor universitario real: terminar el temario no significa dominar el idioma, lo que importa es el desempeño real en speaking, listening, reading y writing.`;

  const systemPrompt = `${rolIngles}
El estudiante está estudiando el tema: "${tema}".
Responde SIEMPRE en este formato JSON estricto, sin texto adicional fuera del JSON:
{"pasos": [
  {"tipo": "hablar", "texto": "lo que dices mientras se ve tu avatar, sin pizarra"},
  {"tipo": "pizarra", "texto": "opcional: lo que sigues diciendo mientras se ve la pizarra", "lineas": ["línea muy corta 1", "línea muy corta 2"]},
  {"tipo": "hablar", "texto": "..."}
]}
Reglas:
- Usa pasos "hablar" para explicar, saludar o conversar (el avatar se ve, la pizarra NO).
- Usa un paso "pizarra" SOLO cuando haya un ejemplo concreto que valga mostrar (una fórmula, un cálculo paso a paso, una frase de ejemplo). Las "lineas" deben ser cortísimas (máx. 4-5 palabras cada una), nunca párrafos.
- No repitas en "lineas" lo mismo que dices en "texto".
- Usa entre 1 y 5 pasos en total, los que hagan falta para explicar bien sin relleno.
- Tienes memoria de esta clase: recuerda lo que ya explicaste y lo que el estudiante ya practicó. NO reinicies el saludo ni repitas una explicación ya dada salvo que el estudiante lo pida explícitamente. Continúa la clase de forma natural, como un profesor real que lleva el hilo de la sesión.`;

  setStatus("Pensando...");

  async function obtenerModelosDisponibles(){
    if (window._modelosCache) return window._modelosCache;
    try{
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
        headers: { "x-goog-api-key": key }
      });
      const d = await r.json();
      // Nos quedamos solo con modelos que soportan generateContent, y preferimos los "flash" (más rápidos y baratos) sobre "pro".
      const nombres = (d.models || [])
        .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
        .map(m => m.name.replace("models/", ""));
      const flashLite = nombres.filter(n => n.includes("flash-lite") && !n.includes("preview"));
      const flash = nombres.filter(n => n.includes("flash") && !n.includes("lite") && !n.includes("preview"));
      const resto = nombres.filter(n => !flashLite.includes(n) && !flash.includes(n));
      window._modelosCache = [...flashLite, ...flash, ...resto];
      return window._modelosCache;
    }catch(e){
      // Si no se pudo consultar la lista, usamos nombres de respaldo conocidos al momento de escribir esto.
      return ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-2.5-flash"];
    }
  }

  const modelosAIntentar = await obtenerModelosDisponibles();

  async function llamarModelo(modelo){
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
      method: "POST",
      headers: {"Content-Type":"application/json", "x-goog-api-key": key},
      body: JSON.stringify({
        contents: [...historial, { role:"user", parts:[{ text: pregunta }] }],
        systemInstruction: { parts:[{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" }
      })
    });
    return { res, data: await res.json() };
  }

  try{
    let res, data, ultimoError, modeloUsado;
    for (const modelo of modelosAIntentar){
      const intento = await llamarModelo(modelo);
      res = intento.res; data = intento.data; modeloUsado = modelo;
      if (res.ok) break; // funcionó, seguimos con este resultado
      ultimoError = data.error?.message || res.status;
      // Si es 503 (saturado) o 404 (modelo no existe/retirado), probamos el siguiente. Otros errores (ej. key inválida) no tiene sentido reintentar.
      if (res.status !== 503 && res.status !== 404) break;
    }
    if (!res.ok){
      setStatus("Error de la API: " + (data.error?.message || ultimoError));
      return;
    }
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let parsed;
    try{ parsed = JSON.parse(raw); } catch(e){ parsed = { pasos: [{tipo:"hablar", texto: raw}] }; }

    // Guardamos este intercambio en la memoria de la clase, acotando el tamaño para no crecer sin límite.
    historial.push({ role:"user", parts:[{ text: pregunta }] });
    historial.push({ role:"model", parts:[{ text: raw }] });
    if (historial.length > 20) historial = historial.slice(-20);

    setStatus("");
    const pasos = parsed.pasos && parsed.pasos.length ? parsed.pasos : [{tipo:"hablar", texto:"No tengo una respuesta clara para eso, ¿puedes repetir la pregunta?"}];

    for (const paso of pasos){
      if (paso.tipo === "pizarra"){
        mostrarPizarra();
        clearBoard();
        boardY = 40;
        const narracion = paso.texto ? speak(paso.texto) : Promise.resolve();
        for (const linea of (paso.lineas || [])){
          await writeLine(linea);
        }
        await narracion;
      } else {
        mostrarAvatar();
        await speak(paso.texto || "");
      }
    }
    // NOTA: ya no volvemos automáticamente al avatar aquí. La pizarra (o el avatar)
    // se queda tal como terminó el último paso, hasta que llegue una respuesta nueva.
  }catch(e){
    setStatus("No se pudo conectar con Gemini: " + e.message);
  } finally {
    procesando = false;
    micBtn.disabled = false;
    sendBtn.disabled = false;
  }
}

document.getElementById("sendBtn").onclick = ()=>{
  const input = document.getElementById("textInput");
  const val = input.value.trim();
  if (!val) return;
  input.value = "";
  askProfesor(val);
};
document.getElementById("textInput").addEventListener("keydown", e=>{
  if (e.key === "Enter") document.getElementById("sendBtn").click();
});

// ============ Voz (entrada) ============
const micBtn = document.getElementById("micBtn");
let recognition = null;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR){
  recognition = new SR();
  recognition.lang = "es-419";
  recognition.interimResults = false;
  recognition.onstart = ()=> setStatus("Escuchando...");
  recognition.onresult = (e)=>{
    const texto = e.results[0][0].transcript;
    askProfesor(texto);
  };
  recognition.onend = ()=> micBtn.classList.remove("listening");
  recognition.onerror = ()=> setStatus("No entendí, intenta de nuevo.");
}
micBtn.onclick = ()=>{
  if (!recognition){
    setStatus("Tu navegador no soporta reconocimiento de voz (prueba en Chrome de escritorio o Android).");
    return;
  }
  micBtn.classList.add("listening");
  recognition.start();
};

// ============ Pausa (congela la pizarra; la voz sigue su curso — pausar/reanudar audio es poco confiable en Android) ============
const pauseBtn = document.getElementById("pauseBtn");
pauseBtn.onclick = ()=>{
  pausado = !pausado;
  pauseBtn.classList.toggle("paused", pausado);
  pauseBtn.textContent = pausado ? "▶" : "⏸";
};

// ============ Arranque ============
resizeCanvas();
resizeWaveCanvas();
requestAnimationFrame(dibujarOndas);
