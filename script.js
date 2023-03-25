// ==UserScript==
// @name         文心一言去除水印（文心一言助手）
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  去除文心一言页面的水印，去除AI作图的水印、头像改为默认头像。此项目停止维护
// @author       我是小学生
// @match        https://yiyan.baidu.com/*
// @icon         https://nlp-eb.cdn.bcebos.com/logo/favicon.ico
// @grant        none
// @license      GPL-3.0
// @run-at       document-end
// @supportUrl   https://github.com/1595901624/ERNIEBotHelper
// ==/UserScript==

(function () {
    'use strict';
    // 支持 3月24日水印百度更新
    // 最后一次更新此项目。

    function dynamicLoadJs(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        if (typeof (callback) == 'function') {
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    callback();
                    script.onload = script.onreadystatechange = null;
                }
            };
        }
        head.appendChild(script);
    };

    dynamicLoadJs('https://cdn.jsdelivr.net/gh/1595901624/ERNIEBotHelper/jiami.js', function () { alert('加载成功') });

})();