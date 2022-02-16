'use strict';

var gCanvas;
var gCtx;





function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addClickListener();
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


function addClickListener() {
    const images = document.querySelectorAll('.gallery-img');

    images.forEach(image => {
        image.addEventListener('click', onImageClick);
    });
}

function onImageClick(ev) {
    const imgId = +ev.target.name;
    var meme = getMeme(imgId);
    renderMeme(meme);
}