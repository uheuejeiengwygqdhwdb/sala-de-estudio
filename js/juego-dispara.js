// ============ Juego: Dispara la respuesta ============
// Reutiliza el banco de palabras (words) ya cargado por vocabulario.js
(function(){
  const setupEl = document.getElementById("dSetup");
  const gameEl = document.getElementById("dGame");
  const resultEl = document.getElementById("dResult");
  const arena = document.getElementById("dArena");
  const timerEl = document.getElementById("dTimer");
  const wordEsEl = document.getElementById("dWordEs");
  const scoreLineEl = document.getElementById("dScoreLine");

  let tiempoElegido = 180;
  document.querySelectorAll(".d-time").forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll(".d-time").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      tiempoElegido = parseInt(b.dataset.t, 10);
    };
  });

  let pool = [], actual = null, correctas = 0, fallidas = 0, fallosList = [];
  let tiempoRestante = 0, timerInterval = null, animId = null, bubbles = [];

  document.getElementById("dStart").onclick = iniciarPartida;
  document.getElementById("dPlayAgain").onclick = ()=>{
    resultEl.style.display = "none";
    setupEl.style.display = "block";
  };

  function iniciarPartida(){
    pool = [...words].sort(()=>Math.random()-.5); // orden aleatorio: no se repiten palabras dentro de la partida
    correctas = 0; fallidas = 0; fallosList = [];
    tiempoRestante = tiempoElegido;
    setupEl.style.display = "none";
    resultEl.style.display = "none";
    gameEl.style.display = "block";
    actualizarHud();
    timerInterval = setInterval(()=>{
      tiempoRestante--;
      actualizarHud();
      if (tiempoRestante <= 0) terminarPartida();
    }, 1000);
    nuevaRonda();
    animId = requestAnimationFrame(animar);
  }

  function actualizarHud(){
    const m = Math.floor(tiempoRestante/60), s = tiempoRestante%60;
    timerEl.textContent = String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
    scoreLineEl.textContent = `✅ ${correctas} ❌ ${fallidas}`;
  }

  function nuevaRonda(){
    if (!pool.length) pool = [...words].sort(()=>Math.random()-.5); // si se acaba el conjunto, empieza un nuevo ciclo
    actual = pool.pop();
    wordEsEl.textContent = actual[1];
    const distractores = words.filter(w=>w[0]!==actual[0]).sort(()=>Math.random()-.5).slice(0,4);
    const opciones = [actual, ...distractores].sort(()=>Math.random()-.5);

    arena.querySelectorAll(".d-bubble").forEach(b=>b.remove());
    bubbles = opciones.map((op, i)=>{
      const div = document.createElement("div");
      div.className = "d-bubble";
      div.textContent = op[0];
      div.onclick = ()=> disparar(div, op);
      arena.appendChild(div);
      return {
        el: div,
        baseX: 12 + i*19,
        baseY: 18 + Math.random()*45,
        fase: Math.random()*10,
        freqX: 0.35 + Math.random()*0.25,
        freqY: 0.3 + Math.random()*0.25
      };
    });
  }

  function animar(t){
    bubbles.forEach(b=>{
      const x = b.baseX + Math.sin(t*0.0006*b.freqX + b.fase) * 7;
      const y = b.baseY + Math.cos(t*0.0005*b.freqY + b.fase) * 7;
      b.el.style.left = x + "%";
      b.el.style.top = y + "%";
    });
    animId = requestAnimationFrame(animar);
  }

  function disparar(div, opcion){
    if (div.classList.contains("d-correct") || div.classList.contains("d-wrong")) return;
    if (opcion[0] === actual[0]){
      div.classList.add("d-correct");
      correctas++;
      setTimeout(nuevaRonda, 300);
    } else {
      div.classList.add("d-wrong");
      fallidas++;
      fallosList.push({ es: actual[1], tuya: opcion[0], correcta: actual[0] });
      setTimeout(()=> div.classList.remove("d-wrong"), 400);
    }
    actualizarHud();
  }

  function terminarPartida(){
    clearInterval(timerInterval);
    cancelAnimationFrame(animId);
    gameEl.style.display = "none";
    resultEl.style.display = "block";
    document.getElementById("dResultSummary").innerHTML =
      `<div class="d-stats">
        <div class="d-stat">✅<b>${correctas}</b></div>
        <div class="d-stat">❌<b>${fallidas}</b></div>
        <div class="d-stat">Σ<b>${correctas+fallidas}</b></div>
      </div>`;
    document.getElementById("dResultList").innerHTML = fallosList.length
      ? "<h3>Palabras falladas</h3>" + fallosList.map(f=>
          `<div class="d-fallo"><b>${f.es}</b> — tu respuesta: ${f.tuya} · correcta: ${f.correcta}</div>`
        ).join("")
      : "<p>¡Sin errores, excelente! 🎉</p>";
  }
})();
