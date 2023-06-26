// ==UserScript==
// @name         ADBlock Detection Bypass
// @namespace    https://lovecany.me/
// @version      0.1
// @description  跳过广告屏蔽器检测
// @author       LoveCany
// @match        https://*.moegirl.org.cn/*
// @match        https://*.op.gg/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adblockplus.org
// ==/UserScript==

(() => {
  let observer = new MutationObserver(function(mutations) {
    const e = document.getElementsByClassName('fc-close');
    if (e.length > 0) {
      e[0].click();
      this.disconnect();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
})();