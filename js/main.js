'use strict';



var gCanvas;
var gCtx;
var gFont;
var draggedTxt = {
    isDrag: null,
    x: null,
    y: null
};
var gTxt = {
    line: 'top',
    x: 50,
    y: 100,
    font: null
};


function onInit() {

    renderGallery();
    addEventListeners();
    setDataBase();
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
        strHTML += `<a href ="#top"><img src = "${image.url}"  class ="gallery-img" name = "${image.id}"></a>`;
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

    updateCurrMeme(ev.target.value, gTxt.line, gCtx.fillStyle, gTxt.x, gTxt.y);
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


function setFontFamily(ev) {
    const currMeme = getCurrMeme();
    var font = gCtx.font.split(' ');

    gTxt.font = ev.target.value;
    currMeme.font = ev.target.value;
    font[1] = ev.target.value;
    var newFont = font.join(' ');
    gCtx.font = newFont;
    renderTxt();
}

function changeFontSize(ev) {
    const value = ev.target.innerText;
    var prevValue = parseInt(gCtx.font);
    if (value === '-') {
        prevValue--;
        gCtx.font = prevValue + `px ${gTxt.font}`;
    } else {
        prevValue++;
        gCtx.font = prevValue + `px ${gTxt.font}`;
    }
    renderTxt();
}

function onSetLine(ev) {
    const inputLine = document.querySelector('.line-input');
    const currTxt = getCurrLines();
    var currLine = ev.target.value;

    inputLine.value = '';
    changeLines(currLine, currTxt);
}

function toggleGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const elBody = document.querySelector('body');

    elGallery.classList.toggle('slide-down');
    setTimeout(() => {
        elBody.classList.toggle('lock');
    }, 150);

}

function removeAllTxt() {
    removeLines();
    renderMeme(getCurrImg());
}


function changeLines(currLine = gTxt.line, currTxt) {
    const lines = currTxt.lines;
    if (currLine === 'bottom') {
        if (lines[1]) {
            gTxt.x = lines[1].x;
            gTxt.y = lines[1].y;
        } else {
            gTxt.x = 50;
            gTxt.y = 350;
        }
        gTxt.line = 'bottom';
        currTxt.idx = 1;
    } else {
        if (lines[0].x) {
            gTxt.x = lines[0].x;
            gTxt.y = lines[0].y;
        } else {
            gTxt.x = 50;
            gTxt.y = 150;
        }
        gTxt.line = 'top';
        currTxt.idx = 0;
    }
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
            // console.log(img.src);
            img.onload = () => {
                gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
                setCurrMeme({ id: 100, url: img.src });
            };
        };
    }
}


function onMove(ev) {
    const x = ev.offsetX;
    const y = ev.offsetY;
    if (!draggedTxt.isDrag) document.body.style.cursor = 'grab';
    if (draggedTxt.isDrag) {
        draggedTxt.x = x;
        draggedTxt.y = y;
        gTxt.x = x;
        gTxt.y = y;
        renderTxt();
    }
    if (x < 2 || x > gCanvas.width - 2) document.body.style.cursor = 'default';

    if (y < 2 || y > gCanvas.height - 2) document.body.style.cursor = 'default';
}

function onDown(ev) {
    const currTxt = getCurrLines();
    const lines = currTxt.lines;

    lines.forEach(line => {
        if (ev.offsetY <= line.y && ev.offsetY >= line.y - 25) {
            line.isDrag = true;
            draggedTxt = line;
            document.body.style.cursor = 'grabbing';
        }
    });
}

function onUp() {
    document.body.style.cursor = 'grab';
    draggedTxt.isDrag = false;
    renderTxt();
}


function onSave() {
    const data = gCanvas.toDataURL();
    saveCurrMeme(data);
}


function onYourMemes() {
    const memes = loadYourMemes();
    console.log(memes);
    const elYourMemes = document.querySelector('.your-memes');
    elYourMemes.classList.toggle('slide');
    toggleGallery();
    var strHTML = '';

    memes.forEach(meme => {
        strHTML += `<img src = "${meme}" class ="your-meme-img">`;
    });
    elYourMemes.innerHTML = strHTML;
}