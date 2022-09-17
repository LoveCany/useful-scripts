// ==UserScript==
// @name         Replace BiliBili MCDN
// @namespace    http://lovecany.me/
// @version      0.1
// @description  replace BiliBili mcdn for better performance
// @author       LoveCany
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    if (location.href.startsWith('https://www.bilibili.com/video/') || location.href.startsWith('https://www.bilibili.com/bangumi/play/')) {
    let cdnDomain

    try {
        [ cdnDomain ] = document.head.innerHTML.match(/up[\w-]+\.bilivideo\.com/)
    } catch(e) {}

    (function(open) {
        unsafeWindow.XMLHttpRequest.prototype.open = function() {
            try {
                const urlObj = new URL(arguments[1]);
                if (urlObj.hostname.endsWith(".mcdn.bilivideo.cn")) {
                    urlObj.host = cdnDomain || 'upos-sz-mirrorcoso1.bilivideo.com'
                    urlObj.port = 443
                    console.warn(`更换视频源: ${urlObj.host}`);
                    arguments[1] = urlObj.toString()
                } else if (urlObj.hostname.endsWith(".szbdyd.com")) {
                    urlObj.host = urlObj.searchParams.get('xy_usource');
                    urlObj.port = 443;
                    console.warn(`更换视频源: ${urlObj.host}`);
                    arguments[1] = urlObj.toString();
                }
            } finally {
                return open.apply(this, arguments)
            }
        };
    })(unsafeWindow.XMLHttpRequest.prototype.open);

}
})();