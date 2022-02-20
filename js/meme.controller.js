'use strict';



var gCanvas;
var gCtx;
// var gFont;
var draggedTxt = {
    isDrag: null,
    x: null,
    y: null,
    focusX: null,
    focusY: null
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


function renderImg(memeImg) {

    if (typeof memeImg === 'string') {

        var img = new Image();
        img.src = memeImg;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        return;
    } else {
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
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
    renderImg(meme.url);
    setCurrMeme(meme);
    renderFocusBox(gTxt.x, gTxt.y);

}


function onTxtInput(ev) {

    updateCurrMeme(ev.target.value, gTxt.line, gCtx.fillStyle, gCtx.strokeStyle, gTxt.x, gTxt.y);
    renderTxt();
}

function renderTxt() {
    const currMeme = getCurrMeme()
    const lines = currMeme.lines;

    renderImg(currMeme.selectedUrl);
    gCtx.fillStyle = gMeme.fill;
    gCtx.strokeStyle = gMeme.stroke;
    gCtx.lineWidth = 1;
    lines.forEach(line => {
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
    });
    renderFocusBox(gTxt.x, gTxt.y);

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
    renderTxt();
    renderFocusBox(gTxt.x, gTxt.y);

}


function changeLines(currLine = gTxt.line, currTxt) {
    const lines = currTxt.lines;
    if (currLine === 'bottom') {
        if (lines[2]) {
            gTxt.x = lines[2].x;
            gTxt.y = lines[2].y;
        } else {
            gTxt.x = 50;
            gTxt.y = 350;
        }
        gTxt.line = 'bottom';
        currTxt.idx = 2;
    } else if (currLine === 'mid') {
        if (lines[1]) {
            gTxt.x = lines[1].x;
            gTxt.y = lines[1].y;
        } else {
            gTxt.x = 50;
            gTxt.y = 200;
        }
        gTxt.line = 'mid';
        currTxt.idx = 1;
    } else {
        if (lines[0].x) {
            gTxt.x = lines[0].x;
            gTxt.y = lines[0].y;
        } else {
            gTxt.x = 50;
            gTxt.y = 100;
        }
        gTxt.line = 'top';
        currTxt.idx = 0;
    }

}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}



function onColorChange(ev) {
    const currMeme = getCurrMeme();
    const color = ev.target.value;
    if (ev.target.className === 'fill-color') {
        gCtx.fillStyle = color;
        currMeme.fill = color;
    } else {
        currMeme.stroke = color;
        gCtx.strokeStyle = color;
    }
    renderTxt();
}


function onDownload(elDownload) {

    renderForDownload();
    const data = gCanvas.toDataURL();
    console.log(data);
    elDownload.href = data;
    elDownload.download = 'my-meme.jpg';

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
    const x = ev.offsetX;
    const y = ev.offsetY;
    const currMeme = getCurrMeme();
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
    const currMeme = getCurrMeme();
    const lines = currMeme.lines;
    // const inputLine = document.querySelector('.line-input');
    console.log(currMeme);
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
    const elYourMemes = document.querySelector('.your-memes');
    elYourMemes.classList.toggle('slide');
    // toggleGallery();
    var strHTML = '';

    memes.forEach(meme => {
        strHTML += `<a href="#" onclick = "donwloadFromGallery(this)"><img src = "${meme.img}"  class ="your-meme-img"></a>`;
    });
    elYourMemes.innerHTML = strHTML;
}

function toggleGallery() {
    const elGallery = document.querySelector('.gallery-container');
    const elYourMemes = document.querySelector('.your-memes');
    const elBody = document.querySelector('body');

    if (elYourMemes.classList.contains('slide')) {
        elYourMemes.classList.remove('slide')
        return;
    }

    elGallery.classList.toggle('slide-down');
    setTimeout(() => {
        elBody.classList.toggle('lock');
    }, 150);

}

function donwloadFromGallery(elImg) {
    elImg.href = elImg.firstChild.src;
    elImg.download = 'my-meme.jpg';
}

function renderFocusBox(x, y) {
    gCtx.beginPath();
    gCtx.rect(x - 50, y - 40, 400, 50);
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = '#06FF00'
    gCtx.stroke();
}

function removeAllTxt() {
    removeLines();
    renderImg(getCurrImg());
}


function renderForDownload() {
    const currMeme = getCurrMeme()
    const lines = currMeme.lines;
    renderImg(currMeme.selectedUrl);
    gCtx.fillStyle = gMeme.fill;
    gCtx.strokeStyle = gMeme.stroke;
    gCtx.lineWidth = 1;
    lines.forEach(line => {
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
    });
}