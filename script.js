// ==UserScript==
// @name         文心一言去除水印（文心一言助手）
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  去除文心一言页面的水印，支持去除3月20日更新的文心一言版本
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

    const style = document.createElement('style');
    style.innerHTML = `.ebhelper-hide { visibility: hidden !important; }`;
    document.head.appendChild(style);

    // ai图片水印标记
    const aiImageWaterFlag = "x-bce-process=style/wm_ai";

    // 创建一个MutationObserver实例
    const observer = new MutationObserver(function (mutations) {
        // 获取水印元素
        let watermark = document.querySelector("div[id^='eb_']");
        if (watermark != null && !watermark.classList.contains('ebhelper-hide')) {
            hideWatermark(watermark);
        }

        // 获取弹窗的元素
        let timeoutDialog = document.querySelector("div[class='ant-modal-root']");
        if (timeoutDialog != null && !timeoutDialog.classList.contains('ebhelper-hide')) {
            hideTimeoutDialog(timeoutDialog);
        }

        // 隐藏图片水印并处理头像
        let allImage = document.querySelectorAll("img");
        if (allImage != null) {
            hideAIImageWatermark(allImage);
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

    /**
     * 隐藏图片水印并处理头像
     */
    function hideAIImageWatermark(images) {
        images.forEach(element => {
            let url = element.getAttribute("src");
            // 去除水印
            if (url != null && url.indexOf(aiImageWaterFlag) != -1) {
                if (url.indexOf(aiImageWaterFlag) != -1) {
                    console.log("隐藏图片水印!");
                    element.setAttribute("src", url.replace(aiImageWaterFlag, ""))
                }
            }
            // 处理头像
            if (url != null
                && element.getAttribute("alt") == '头像'
                && url.indexOf('icon-rb') == '-1') {
                console.log("设置头像为默认值!");
                element.setAttribute("src", 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico')
            }
        });
    }
})();