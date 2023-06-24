// ==UserScript==
// @name         Moegirl ADBlock Detection Bypass
// @namespace    https://lovecany.me/
// @version      0.1
// @description  跳过萌娘百科的广告屏蔽器检测
// @author       LoveCany
// @match        https://zh.moegirl.org.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moegirl.org
// ==/UserScript==

(() => {
  let observer = new MutationObserver(function(mutations) {
    const e = document.getElementsByClassName('fc-ab-root');
    if (e.length > 0) {
      e[0].remove();
      this.disconnect();
    }
  });
  observer.observe(document, { childList: true, subtree: true });
})();