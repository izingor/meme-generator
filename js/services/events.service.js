'use strict';


function addEventListeners() {
    addImageListener();
    addInputListener();
    addColorListener();
    addFontSizeListener();
    addLineSelectorListener();
    addFontChangeListener();
    addImageUploadListener();
    addShareListener();
    addMouseListeners();
    addSaveListener();
    addYourMemeListener();

    // addDownloadCanvas();
    // addResizeListener();
}

function addLineSelectorListener() {
    const elLineSelector = document.querySelector('.line-select');

    elLineSelector.addEventListener('change', onSetLine);
}

function addImageListener() {
    const elImages = document.querySelectorAll('.gallery-img');

    elImages.forEach(image => {
        image.addEventListener('click', onImageClick);
    });
}

function addInputListener() {
    const elInput = document.querySelector('.line-input');

    elInput.addEventListener('keyup', onTxtInput);
}

function addColorListener() {
    const elFill = document.querySelector('.fill-color');
    const elStroke = document.querySelector('.stroke-color');

    elFill.addEventListener('input', onColorChange);
    elStroke.addEventListener('input', onColorChange);
}

function addFontSizeListener() {
    const elIncrease = document.querySelector('.font-increase');
    const elDecrease = document.querySelector('.font-decrease');

    elIncrease.addEventListener('click', changeFontSize);
    elDecrease.addEventListener('click', changeFontSize);
}

function addRemoveListener() {
    const elRemove = document.querySelector('.remove-btn');

    elRemove.addEventListener('click', removeAllTxt);
}


function addFontChangeListener() {
    const elFontStyle = document.querySelector('.font-family-select');
    elFontStyle.addEventListener('change', setFontFamily);
}


function addDownloadCanvas() {
    const elDownload = document.querySelector('.download');
    elDownload.addEventListener('click', onDownload);
}

// function addResizeListener() {
//     const elEditor = document.querySelector('html');
//     elEditor.addEventListener('resize', resizeCanvas);
// }


function addImageUploadListener() {
    const elUpload = document.querySelector('.file-input');
    elUpload.addEventListener('change', onImgInput);
}


function addShareListener() {
    const elShare = document.querySelector('.share-btn');
    elShare.addEventListener('click', shareImg);
}


function addMouseListeners() {
    const elCanvas = document.querySelector('canvas');

    elCanvas.addEventListener('mousemove', onMove);
    elCanvas.addEventListener('mousedown', onDown);
    elCanvas.addEventListener('mouseup', onUp);
}


function addSaveListener() {
    const elSave = document.querySelector('.save-btn');
    elSave.addEventListener('click', onSave);
}


function addYourMemeListener() {
    const elMeme = document.querySelector('.memes');
    elMeme.addEventListener('click', onYourMemes);
}