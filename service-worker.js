const CACHE_NAME = "edu-platform-v3";

// ❌ لا نكاش الصفحات الحساسة
const FILES_TO_CACHE = [
    "/Al-Tamsahya-Online-Education/css/style.css",
    "/Al-Tamsahya-Online-Education/manifest.json",
    "/Al-Tamsahya-Online-Education/icons/icon-192.png",
    "/Al-Tamsahya-Online-Education/icons/icon-512.png"
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
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

// 🚫 منع التدخل في التسجيل وطلبات POST
self.addEventListener("fetch", (event) => {

    // ✅ تجاهل أي طلب غير GET
    if (event.request.method !== "GET") {
        return;
    }

    // ✅ تجاهل التسجيل و الـ API
    if (
        event.request.url.includes("register") ||
        event.request.url.includes("login") ||
        event.request.url.includes("api")
    ) {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => {
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
