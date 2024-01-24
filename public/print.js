// 隐藏无需打印的元素
function hideElement(elements, excludeIds) {
    Array.from(elements)
        .forEach(function (element) {
            var childId = element.id;
            if (!excludeIds.includes(childId) && !element.classList.contains('print-hide')) {
                element.classList.add('print-hide')
            }
        });
}

// url生成二维码
async function qrcode(url) {

}

// 图片url转base64
async function convertImageToBase64(url) {
    const response = await fetch(url);
    if (response.ok) {
        const blob = await response.blob();
        const base64String = await convertBlobToBase64(blob);
        return 'data:image/jpeg;base64,' + base64String;
    } else {
        console.error('Failed to fetch the image.', url);
    }
}

function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// 隐藏无需打印的元素
function hideNoPrintElements() {
    hideElement(document.querySelector('main').children, ['app-container']);
    hideElement(document.getElementById('app-container').children, ['left-container']);
    hideElement(document.getElementById('left-container').children, ['main-container']);
    hideElement(document.getElementById('main-container').children, ['main-content-container']);
}

// youtube视频截图封面
function youtubeVideoThumbnails() {
    var promises = [];
    document.querySelectorAll('iframe[id^="youtube-player-"]').forEach(function (iframe) {
        const id = iframe.id.replace('youtube-player-', '');
        const url = "https://img.youtube.com/vi/" + id + "/sddefault.jpg";
        const divId = "div-" + iframe.id;
        const qrcodeId = "qrcode-" + iframe.id;
        promises.push(convertImageToBase64(url)
            .then(function (base64String) {
                var div = document.createElement('div')
                div.classList.add('print-display');
                div.id = divId;
                div.style.width = '100%';
                div.style.position = 'relative';
                div.innerHTML = '<img src="' + base64String + '" alt="' + iframe.src + '" width="100%"/>' +
                    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48" width="10%" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">' +
                    '<path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>' +
                    '<path d="M 45,24 27,14 27,34" fill="#fff"></path>' +
                    '</svg>' +
                    '<div id="' + qrcodeId + '" style="width: 10%;position: absolute;top: 90%;left: 90%;transform: translate(-10%, -10%);"></div>';
                iframe.parentNode.insertBefore(div, iframe);
            })
            .then(function () {
                var qrcodeDiv = document.getElementById(qrcodeId);
                var qrcode = new QRCode(qrcodeDiv, {
                    width: 100 %,
                    height: 100 %,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                qrcode.makeCode(iframe.src);
                var svgCode = qrcodeDiv.getElementsByTagName('svg')[0].outerHTML;
                console.log(svgCode);
                document.getElementById(qrcodeId).innerHTML = svgCode;
            })
        );
    });
    return Promise.all(promises);
}

// 清理插入的元素
function cleanUp() {
    document.querySelectorAll('.print-display').forEach(function (img) {
        img.remove();
    });
}

// 1. 隐藏无需打印的元素
hideNoPrintElements();
// 2. 截取youtube视频封面
youtubeVideoThumbnails()
    .then(_ => {
        // 3. 打印
        window.print();
    })
    .then(_ => {
        // 4. 清理
        cleanUp();
    })
    .catch(error => {
        console.error('Error:', error);
    });