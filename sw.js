const CACHE_NAME = "sala-estudio-v1";
const ARCHIVOS = [
  "./",
  "index.html",
  "css/estilos.css",
  "js/clase.js",
  "js/vocabulario.js",
  "js/juego-dispara.js",
  "js/app.js",
  "manifest.json",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/tanque-fondo.mp4"
];

self.addEventListener("install", (e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(nombres =>
      Promise.all(nombres.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Estrategia: responder desde caché primero (rápido y funciona sin internet),
// y en segundo plano actualizar la caché con la versión de red más reciente.
// Las llamadas a la API de Gemini (otro dominio) NUNCA se cachean, van siempre a la red.
self.addEventListener("fetch", (e)=>{
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // deja pasar las llamadas a Gemini sin tocar

  e.respondWith(
    caches.match(e.request).then(cacheada=>{
      const redFetch = fetch(e.request).then(resp=>{
        if (resp && resp.ok){
          const copia = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, copia));
        }
        return resp;
      }).catch(()=> cacheada);
      return cacheada || redFetch;
    })
  );
});
