const CACHE_NAME = "edu-platform-v2";

// ❌ لا نكاش الصفحات الحساسة
const FILES_TO_CACHE = [
    "/css/style.css",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// تفعيل Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// 🚫 منع التشغيل Offline + إجبار الرجوع للسيرفر
self.addEventListener("fetch", (event) => {

    // دايمًا اسأل السيرفر
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                // لو السيرفر مقفول
                return new Response(
                    `
                    <html>
                        <body style="text-align:center;margin-top:100px">
                            <h1 style="color:red">🚫 الموقع متوقف مؤقتًا</h1>
                            <p>يرجى المحاولة لاحقًا</p>
                        </body>
                    </html>
                    `,
                    {
                        headers: { "Content-Type": "text/html" },
                        status: 503
                    }
                );
            })
    );
});
