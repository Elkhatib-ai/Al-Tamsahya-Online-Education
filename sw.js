self.addEventListener("fetch", (event) => {
    // لا تطبق على admin
    if (event.request.url.includes("/admin")) {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() =>
            new Response("SYSTEM_DISABLED", { status: 503 })
        )
    );
});
