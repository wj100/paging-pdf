import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
/**
 * 分页下载pdf
 * @param {string} filename  文件名
 * @param {string} selector  元素选择器
 * @param {string:'l'|'p'} direction l代表横向，p代表纵向
 * @returns 
 */
const sizeMap={
    l:[1280,720],
    p:'a4'
}
const widthMap={
    l:1280,
    p:555.28
}
/* 获取屏幕缩放比例 */
function detectZoom() {
    var ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf("msie")) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
    ) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio / 100;
}
 function pagingPdf(filename, selector,direction='p') {
    const els = document.querySelectorAll(selector);
    if (els.length===0){
        throw new Error("element is not find by "+selector)
    }
    if(!['l','p'].includes(direction)){
        throw new Error("invalid params, 'direction' must be 'l' or 'p'")
    }
    let pdf = new jsPDF(direction, "pt", sizeMap[direction]); 
    let success = [];
    for (let i = 0, len = els.length; i < len; i++) {
        success.push(0);
    }
    return new Promise(function (resolve, reject) {
        !(function runself(index) {
            let html = els[index];
            let contentWidth = html.clientWidth; // 获得该容器的宽高
            let contentHeight = html.clientHeight;
            /* 如果用户缩放了屏幕  就X缩放值 mac下 ratio=2 */
            let ratio = detectZoom();
            if (ratio !== 1) {
                contentWidth = html.clientWidth * ratio;
                contentHeight = html.clientHeight * ratio;
            }
            let canvas = document.createElement("canvas");
            let scale = 1; // 解决清晰度问题，先放大 2倍
            canvas.width = contentWidth * scale; // 将画布宽&&高放大两倍
            canvas.height = contentHeight * scale;
            //兼容mac缩放
            canvas.getContext("2d").scale(scale, scale);
            // isMac ? canvas.getContext("2d") : canvas.getContext("2d").scale(scale, scale);
            let opts = {
                canvas: canvas,
                width: contentWidth,
                height: contentHeight,
                useCORS: true,
            };
            html2canvas(html, opts)
                .then((canvas) => {
                    let pageData = canvas.toDataURL("image/jpeg", 1.0); // 清晰度 0 - 1
                    let imgWidth = widthMap[direction]; //a4 555.28
                    let imgHeight = (imgWidth / contentWidth) * contentHeight;
                    // pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
                    pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                    pdf.addPage();
                    return 1;
                })
                .then((item) => {
                    success[index] = item;
                    /* 每项都为1  则保存 */
                    if (success.every(_ => _ === 1)) {
                        /* 删除多余空白页 */
                        pdf.deletePage(els.length + 1);
                        pdf.save(String(filename));
                        resolve(true);
                    }
                    if (index < els.length - 1) {
                        index++;
                        runself(index);
                    }
                });
        })(0);
    });
}

export default pagingPdf
