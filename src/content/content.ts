import browser from "webextension-polyfill"

document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (anchor && (anchor.href.includes("malicious.com") || anchor.href.includes("phishingsite.net"))) {
        e.preventDefault();
        alert("🚫 Blocked: Malicious URL");
    }
}, true);

document.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target?.type === "file") {
        browser.runtime.sendMessage({ type: "upload_detected" });
        alert("📤 Upload reported.");
        e.preventDefault();
    }
});