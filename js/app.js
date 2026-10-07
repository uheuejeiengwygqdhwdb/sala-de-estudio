// ============ Selector de modo: Inicio / Clase con profesor / Vocabulario / juegos ============
// Mapa de modos: agregar un juego nuevo en el futuro es solo agregar una línea aquí.
const vistas = {
  home:    { el: document.getElementById("homeHub"),       modo: "block" },
  clase:   { el: document.getElementById("claseWrap"),      modo: "flex"  },
  vocab:   { el: document.getElementById("vocabSection"),   modo: "flex"  },
  dispara: { el: document.getElementById("disparaSection"), modo: "flex"  },
  dlisten: { el: document.getElementById("dlSection"),       modo: "flex"  },
  vb:      { el: document.getElementById("vbSection"),      modo: "flex"  },
  em:      { el: document.getElementById("emSection"),      modo: "flex"  },
  esq:     { el: document.getElementById("esqSection"),     modo: "flex"  }
};

function activarModo(activo){
  Object.values(vistas).forEach(v=>{ if (v.el) v.el.style.display = "none"; });
  const v = vistas[activo];
  if (!v || !v.el) return;
  v.el.style.display = v.modo;
  if (v.modo === "flex") v.el.style.flexDirection = "column";
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
