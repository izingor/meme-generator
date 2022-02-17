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
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.font = '30px Impact'
    gCtx.fillStyle = '#FFFFFF'
    renderGallery();
    addEventListeners();
}



function renderMeme(memeImg) {
    var img = new Image();
    img.src = memeImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
    gCtx.save();
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
    const meme = getMeme(imgId);

    toggleGallery();
    renderMeme(meme.url);
    setCurrMeme(meme);
}


function renderTxt(ev) {
    const txt = ev.target.value;

    gCtx.fillText(txt, gTxtPos.x, gTxtPos.y);
    gCtx.strokeText(txt, gTxtPos.x, gTxtPos.y);
    updateCurrMeme(txt, gTxtPos.line, gTxtPos.align, gCtx.fillStyle)
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
        gTxtPos.x = 150;
        gTxtPos.y = 100;
        gTxtPos.line = 'top'
    } else {
        gTxtPos.x = 150;
        gTxtPos.y = 400;
        gTxtPos.line = 'bottom'
    }
}

function toggleGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const elBody = document.querySelector('body');

    elBody.classList.toggle('lock');
    elGallery.classList.toggle('slide-down');
}



function removeLine() {
    // gTxtPos.line;
    const updatedTxt = updateLines(gTxtPos.line);
    const currImg = getCurrImg();

    renderMeme(currImg);
    reverseLines(gTxtPos.line);


    console.log(updatedTxt);

    gCtx.fillText(updatedTxt, gTxtPos.x, gTxtPos.y);
    gCtx.strokeText(updatedTxt, gTxtPos.x, gTxtPos.y);
    reverseLines(gTxtPos.line);

    console.log(gTxtPos.line);
}


function reverseLines(currLine) {
    if (currLine === 'top') {
        gTxtPos.x = 100;
        gTxtPos.y = 300;
        gTxtPos.line = 'bottom'
    } else {
        gTxtPos.x = 100;
        gTxtPos.y = 100;
        gTxtPos.line = 'top'
    }
}