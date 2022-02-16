'use strict';

var gCanvas;
var gCtx;
var gTxtPos = {
    line: 'top',
    align: 'center',
    x: 100,
    y: 100
};




function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addEventListeners();
}



function renderMeme(meme) {
    var img = new Image();
    img.src = meme.url;
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
    const imgId = +ev.target.name;
    var meme = getMeme(imgId);
    renderMeme(meme);
    setCurrMeme(meme);
}


function renderTxt(ev) {
    const txt = ev.target.value;

    gCtx.fillText(txt, gTxtPos.x, gTxtPos.y);
    gCtx.strokeText(txt, gTxtPos.x, gTxtPos.y);
    updateCurrMeme(txt, gTxtPos.line, gTxtPos.align, gCtx.fillStyle)
}

function addEventListeners() {
    addImageListener();
    addInputListener();
    addColorListener();
    addFontSizeListener();
    addLineSelectorListener();
}

function addLineSelectorListener() {
    const lineSelector = document.querySelector('.line-select');
    lineSelector.addEventListener('change', setLine);
}


function addImageListener() {
    const images = document.querySelectorAll('.gallery-img');

    images.forEach(image => {
        image.addEventListener('click', onImageClick);
    });
}



function addInputListener() {
    const input = document.querySelector('.line-input');

    input.addEventListener('change', renderTxt);
}



function addColorListener() {
    const fill = document.querySelector('.fill-color');
    const stroke = document.querySelector('.stroke-color');

    fill.addEventListener('change', (ev) => gCtx.fillStyle = ev.target.value);
    stroke.addEventListener('change', (ev) => gCtx.strokeStyle = ev.target.value);
}



function addFontSizeListener() {
    const increase = document.querySelector('.font-increase');
    const decrease = document.querySelector('.font-decrease');

    increase.addEventListener('click', changeFontSize);
    decrease.addEventListener('click', changeFontSize);
}



function changeFontSize(ev) {
    const value = ev.target.innerText;
    var prevValue = parseInt(gCtx.font);

    if (value === '-') {
        prevValue--;
        gCtx.font = prevValue + 'px Arial';
    } else {
        prevValue++;
        gCtx.font = prevValue + 'px Arial';
    }
}

function setLine(ev) {
    if (ev.target.value === 'top') {
        gTxtPos.x = 100;
        gTxtPos.y = 100;
        gTxtPos.line = 'top'
    } else {
        gTxtPos.x = 100;
        gTxtPos.y = 300;
        gTxtPos.line = 'bottom'
    }
}