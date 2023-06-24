// ==UserScript==
// @name         Moegirl ADBlock Detection Bypass
// @namespace    https://lovecany.me/
// @version      0.1
// @description  跳过萌娘百科的广告屏蔽器检测
// @author       LoveCany
// @match        https://*moegirl.org*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moegirl.org
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(() => {
  let app;
  let observer;
  let throttle = (callback = () => {}, time = 300) => {
    let timer = -1;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(...args);
      }, time);
    };
  };
  let debounce = (callback = () => {}, time = 300) => {
    let timer = -1;

    return (...args) => {
      if (timer > -1) {
        return;
      }

      timer = setTimeout(() => {
        callback(...args);
        clearTimeout(timer);
        timer = -1;
      }, time);
    };
  };
  let detectionBypass = () => {
    if (document.getElementsByClassName('fc-ab-root')) {
      document.getElementsByClassName('fc-ab-root')[0].remove()
      observer?.disconnect?.();
    }
  };

  app = document.querySelector('body');
  observer = new MutationObserver(debounce(detectionBypass, 150));
  observer.observe(app, { childList: true, subtree: true });
})();