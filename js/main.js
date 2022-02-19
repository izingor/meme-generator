'use strict';

var gCanvas;
var gCtx;
var draggedTxt = {
    isDrag: null,
    x: null,
    y: null
}
var gTxtPos = {
    line: 'top',
    x: 50,
    y: 100
};


function onInit() {

    renderGallery();
    addEventListeners();
}


function setCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.font = '30px Impact';
    gCtx.fillStyle = '#FFFFFF';
}


function renderMeme(memeImg) {

    if (typeof memeImg === 'string') {

        var img = new Image();
        img.src = memeImg;
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        };
        return;
    } else {
        memeImg.onload = () => {
            gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        };
    }
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const images = getImages();
    var strHTML = '';

    images.forEach(image => {
        strHTML += `<a href ="#top"><img src = "${image.url}" href="#top" class ="gallery-img" name = "${image.id}"></a>`;
    });
    elGallery.innerHTML = strHTML;
}


function onImageClick(ev) {
    setCanvas();
    const imgId = +ev.target.name;
    const meme = getMeme(imgId);

    toggleGallery();
    renderMeme(meme.url);
    setCurrMeme(meme);
}


function onTxtInput(ev) {

    updateCurrMeme(ev.target.value, gTxtPos.line, gCtx.fillStyle, gTxtPos.x, gTxtPos.y);
    renderTxt();
}

function renderTxt(currText = getCurrLines()) {
    const lines = currText.lines;

    renderMeme(getCurrImg());

    setTimeout(() => {
        lines.forEach(line => {
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        });
    }, 2);
}



function changeFontSize(ev) {
    const value = ev.target.innerText;
    var prevValue = parseInt(gCtx.font);

    if (value === '-') {
        prevValue--;
        gCtx.font = prevValue + 'px Impact';
    } else {
        prevValue++;
        gCtx.font = prevValue + 'px Impact';
    }
    renderTxt();
}

function onSetLine(ev) {
    const inputLine = document.querySelector('.line-input');
    var currLine = ev.target.value;

    inputLine.value = '';
    changeLines(currLine);
}

function toggleGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const elBody = document.querySelector('body');

    elGallery.classList.toggle('slide-down');
    setTimeout(() => {
        elBody.classList.toggle('lock');
    }, 10);

}



function removeAllTxt() {
    removeLines();
    renderMeme(getCurrImg());
}


function changeLines(currLine = gTxtPos.line) {
    const currTxt = getCurrLines()
    const lines = currTxt.lines;
    if (currLine === 'bottom') {
        if (lines[1]) {
            gTxtPos.x = lines[1].x
            gTxtPos.y = lines[1].y
        } else {
            gTxtPos.x = 50;
            gTxtPos.y = 350;
        }
        gTxtPos.line = 'bottom';
        currTxt.idx = 1
    } else {
        if (lines[0].x) {
            gTxtPos.x = lines[0].x
            gTxtPos.y = lines[0].y
        } else {
            gTxtPos.x = 50;
            gTxtPos.y = 150;
        }
        gTxtPos.line = 'top';
        currTxt.idx = 0
    }
}

function setFontFamily(ev) {
    var font = gCtx.font.split(' ');
    font[1] = ev.target.value;
    var newFont = font.join(' ');
    gCtx.font = newFont;
    renderTxt();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}



function onColorChange(ev) {
    console.log(ev);

    if (ev.target.className === 'fill-color') {
        gCtx.fillStyle = ev.target.value;
    } else {
        gCtx.strokeStyle = ev.target.value;
    }
    renderTxt();
}


function onDownload(elDownload) {
    const data = gCanvas.toDataURL();
    elDownload.href = data;
    elDownload.download = 'my-meme.jpg';

    console.log(elDownload.href);
}


function onImgInput(ev) {
    if (ev.target.files) {
        setCanvas();
        var imageFile = ev.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = (ev) => {
            var img = new Image();
            img.src = ev.target.result;
            img.onload = () => {
                gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
                setCurrMeme({ id: 100, url: img.src });
            };
        };
    }
}


function onMove(ev) {
    if (!draggedTxt.isDrag) document.body.style.cursor = 'grab'
    if (draggedTxt.isDrag) {
        draggedTxt.x = ev.offsetX
        draggedTxt.y = ev.offsetY
        gTxtPos.x = ev.offsetX
        gTxtPos.y = ev.offsetY
        renderTxt();
    }

}

function onDown(ev) {
    const currTxt = getCurrLines();
    const lines = currTxt.lines;

    lines.forEach(line => {
        if (ev.offsetY <= line.y && ev.offsetY >= line.y - 25) {
            line.isDrag = true;
            draggedTxt = line;
            document.body.style.cursor = 'grabbing'
        }
    });
}

function onUp() {
    document.body.style.cursor = 'grab'
    draggedTxt.isDrag = false;
    renderTxt();
}