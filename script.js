// ==UserScript==
// @name         文心一言去除水印（文心一言助手）
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  去除文心一言页面的水印，去除AI作图的水印、去除超时弹窗、头像改为默认头像
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

    // 百度大大，不要再搞了，我只是想去个水印而已。

    // ai图片水印标记
    const aiImageWaterFlag = "x-bce-process=style/wm_ai";

    // 打开shadow-root
    Element.prototype._attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function () {
        return this._attachShadow({ mode: "open" });
    };

    // 自己调整频次 感觉10毫秒比较友好
    setInterval(deal, 10);

    function deal() {
        // 获取水印元素
        let watermark = getElementByRegex(/^[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}$/);
        if (watermark != null && watermark.classList != null && !watermark.classList.contains('ebhelper-hide')) {
            hideWatermark(watermark);
        }
        // Array.from(document.querySelectorAll('div')).filter(e => e.shadowRoot);

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
    }


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
        // console.log("隐藏水印!");
        let shadows = element.shadowRoot.querySelectorAll('*');
        for (let e of shadows) {
            e.remove();
        }
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

    /**
     * 正则匹配元素,获取第一个元素
     * @param {*} pattern 
     * @returns 
     */
    function getElementByRegex(pattern) {
        let allElements = document.getElementsByTagName('div');
        let result = "";

        for (let i = 0; i < allElements.length; i++) {
            let element = allElements[i];
            let attr = element.getAttribute('id');
            if (attr != null && pattern.test(attr)) {
                result = element;
                break;
            }
        }

        return result;
    }


})();