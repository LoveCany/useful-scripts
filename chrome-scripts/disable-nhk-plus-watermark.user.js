// ==UserScript==
// @name         Disable NHK Plus Watermark
// @namespace    https://lovecany.me/
// @version      0.1
// @description  Disable guest watermark on NHK Plus
// @author       LoveCany
// @match        https://plus.nhk.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=plus.nhk.jp
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    let css = `.hls-player_message{
        display: none
    }`;
    GM_addStyle(css);
})();