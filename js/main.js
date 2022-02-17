'use strict';

var gCanvas;
var gCtx;
var gTxtPos = {
    line: 'top',
    align: 'center',
    x: 150,
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
    var img = new Image();
    img.src = memeImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const images = getImages();
    var strHTML = '';

    images.forEach(image => {
        strHTML += `<img src = "${image.url}" class ="gallery-img" name = "${image.id}">`;
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


function onInput(ev) {

    updateCurrMeme(ev.target.value, gTxtPos.line, gCtx.fillStyle, gTxtPos.x, gTxtPos.y);
    renderTxt();
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

    elBody.classList.toggle('lock');
    elGallery.classList.toggle('slide-down');
}



function removeAllTxt() {
    removeLines();
    renderMeme(getCurrImg());
}


function changeLines(currLine = gTxtPos.line) {
    if (currLine === 'bottom') {
        gTxtPos.x = 120;
        gTxtPos.y = 400;
        gTxtPos.line = 'bottom';
    } else {
        gTxtPos.x = 120;
        gTxtPos.y = 100;
        gTxtPos.line = 'top';
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

function renderTxt() {
    const currText = getCurrLines();
    const lines = currText.lines;

    renderMeme(getCurrImg());

    setTimeout(() => {
        lines.forEach(line => {
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        });
    }, 2);
}


function onColorChange(ev) {
    console.log(ev);

    if (ev.target.className === 'fill-color') {
        gCtx.fillStyle = ev.target.value
    } else {
        gCtx.strokeStyle = ev.target.value;
    }
    renderTxt();
}