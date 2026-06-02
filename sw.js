const CACHE_NAME = 'glosario-recetas-v2'; // ¡Cambiamos a v2 para forzar la actualización!
const ASSETS = [
  './',
  './index.html',
  './especias.json',
  './recetas.json',
  './manifest.json',
  './image_d6412b.jpg',       // La dejamos porque es la portada visual de la página
  './Portada_ebook192.png',   // Agregamos el ícono cuadrado chico
  './Portada_ebook512.png'    // Agregamos el ícono cuadrado grande
];

// Instalar el Service Worker y guardar los archivos esenciales en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptar las peticiones para responder incluso sin conexión
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
