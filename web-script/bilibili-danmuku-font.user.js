// ==UserScript==
// @name         Bilibili Danmuku Font Customizer
// @name: zh-CN  B站弹幕自定义字体
// @namespace    https://github.com/LoveCany
// @homepageURL  https://github.com/useful-scripts
// @version      0.1
// @description  Change the font of danmuku
// @license      MIT
// @author       LoveCany
// @match        *://*.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let curVideoAddr = '';
    let fontSettings = {
        fontName: '苹方-简',
        opacity: '1',
        strokeWidth: '1.5px',
        strokeColor: 'black',
        textShadow: ''
    };

    setInterval(function () {
        let newAddr = document.getElementsByTagName('video')[0].getAttribute('src');
        if (newAddr === curVideoAddr) return;
        curVideoAddr = newAddr;
        setTimeout(function () {
            changeDanmukuFont(fontSettings.fontName);
        }, 100);
    }, 3000);

    function changeDanmukuFont(fontName) {
        function changeStyle(obj, level = 0) {
            try {
                obj.style.fontFamily = fontSettings.fontName;
                obj.style.opacity = fontSettings.opacity;
                obj.style.webkitTextStrokeWidth = fontSettings.strokeWidth;
                obj.style.webkitTextStrokeColor = fontSettings.strokeColor;
                obj.style.textShadow = fontSettings.textShadow;
            } catch (err) {
                console.log('Trying ' + level + ': ');
                console.log(obj);
                if (level < 3) {
                    setTimeout(function () {
                        changeStyle(obj.parentNode, level + 1);
                    }, 100);
                }
            }
        }

        let d = document.getElementsByClassName('bilibili-player-video-danmaku')[0];
        d.addEventListener('DOMNodeInserted', function (ev) {
            changeStyle(ev.target);
        });
    }
})
