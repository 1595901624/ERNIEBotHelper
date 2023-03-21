// ==UserScript==
// @name         文心一言去除水印（文心一言助手）
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  去除文心一言页面的水印，支持去除3月20日更新的文心一言版本
// @author       我是小学生
// @match        https://yiyan.baidu.com/*
// @icon         https://nlp-eb.cdn.bcebos.com/logo/logoErnieBot.png
// @grant        none
// @license      GPL-3.0
// @run-at       document-end
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js
// @supportUrl   https://github.com/1595901624/ERNIEBotHelper
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `.ebhelper-hide { visibility: hidden !important; }`;
    document.head.appendChild(style);

    // 创建一个MutationObserver实例
    const observer = new MutationObserver(function (mutations) {
        // 获取水印元素
        let watermark = $("div[id^='eb_']")[0];
        if (watermark != null && !watermark.classList.contains('ebhelper-hide')) {
            hideWatermark(watermark);
        }

        // 获取弹窗的元素
        let timeoutDialog = $("div[class='ant-modal-root']")[0];
        if (timeoutDialog != null && !timeoutDialog.classList.contains('ebhelper-hide')) {
            hideTimeoutDialog(timeoutDialog);
        }
    });

    // 开始观察document，并在节点添加或删除时检测变化
    observer.observe(document, {
        childList: true,
        subtree: true
    });


    /**
     * 隐藏超时弹窗
     */
    function hideTimeoutDialog(element) {
        console.log("隐藏超时弹窗!");
        element.classList.add('ebhelper-hide');
    }


    /**
     * 隐藏水印
     */
    function hideWatermark(element) {
        console.log("隐藏水印!");
        element.classList.add('ebhelper-hide');
    }
})();