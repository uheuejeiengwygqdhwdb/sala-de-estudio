// ============ Selector de modo: Inicio / Clase con profesor / Vocabulario / Dispara la respuesta ============
const homeHub = document.getElementById("homeHub");
const claseWrap = document.getElementById("claseWrap");
const vocabSection = document.getElementById("vocabSection");
const disparaSection = document.getElementById("disparaSection");

function activarModo(activo){
  homeHub.style.display = "none";
  claseWrap.style.display = "none";
  vocabSection.style.display = "none";
  disparaSection.style.display = "none";

  if (activo === "home"){ homeHub.style.display = "block"; }
  if (activo === "clase"){ claseWrap.style.display = "flex"; }
  if (activo === "vocab"){ vocabSection.style.display = "flex"; vocabSection.style.flexDirection = "column"; }
  if (activo === "dispara"){ disparaSection.style.display = "flex"; disparaSection.style.flexDirection = "column"; }
}

document.querySelectorAll(".hub-card").forEach(card=>{
  card.onclick = ()=> activarModo(card.dataset.mode);
});
document.querySelectorAll("[data-back]").forEach(btn=>{
  btn.onclick = ()=> activarModo("home");
});

// ============ Panel de configuración (API key + velocidad) ============
const settingsBtn = document.getElementById("settingsBtn");
const settingsOverlay = document.getElementById("settingsOverlay");
settingsBtn.onclick = ()=> settingsOverlay.classList.add("open");
document.getElementById("closeSettings").onclick = ()=> settingsOverlay.classList.remove("open");
settingsOverlay.addEventListener("click", (e)=>{
  if (e.target === settingsOverlay) settingsOverlay.classList.remove("open");
});

// ============ Mostrar el tema actual en la pantalla principal ============
const hubTemaEl = document.getElementById("hubTema");
function actualizarHubTema(){ hubTemaEl.textContent = topicSelect.value; }
topicSelect.addEventListener("change", actualizarHubTema);
actualizarHubTema();

// ============ Registrar el service worker (para poder instalar la app) ============
if ("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  });
}
