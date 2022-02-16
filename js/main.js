'use strict';

var gCanvas;
var gCtx;





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
}


function renderLine(ev) {
    console.log(ev.target.value);
    const txt = ev.target.value;
    gCtx.lineWidth = 0.5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '35px Arial';
    gCtx.fillText(txt, 50, 50);
    gCtx.strokeText(txt, 50, 50);

}

function addEventListeners() {
    addClickListener();
    addInputListener();

}




function addClickListener() {
    const images = document.querySelectorAll('.gallery-img');

    images.forEach(image => {
        image.addEventListener('click', onImageClick);
    });
}

function addInputListener() {
    var input = document.querySelector('.line-input');

    input.addEventListener('change', renderLine);
}