import browser from "webextension-polyfill"
import type { DlpMessage } from '../types/types.ts';

const blockedDomains = ["malicious.com", "phishingsite.net"];

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (blockedDomains.some(domain => details.url.includes(domain))) {
            console.warn("Blocked URL:", details.url);
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

browser.downloads.onCreated.addListener(downloadItem => {
    console.warn("Blocked download:", downloadItem.url);
    browser.downloads.cancel(downloadItem.id);
});

browser.runtime.onMessage.addListener((message: unknown) => {
    const typedMessage = message as DlpMessage;

    if (typedMessage.type === "upload_detected") {
        console.info("Upload detected!");
    }
});