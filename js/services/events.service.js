'use strict'


function addEventListeners() {
    addImageListener();
    addInputListener();
    addColorListener();
    addFontSizeListener();
    addLineSelectorListener();
    addRemoveListener();
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

function addRemoveListener() {
    const remove = document.querySelector('.remove-btn');

    remove.addEventListener('click', removeLine)
}