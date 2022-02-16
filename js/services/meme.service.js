'use strict';


const gImgs = [{
        id: 1,
        url: '/imgs/1.jpg',
        keywords: ['trump,politics']
    },
    {
        id: 2,
        url: '/imgs/2.jpg',
        keywords: ['dog,cute,puppy']
    },
    {
        id: 3,
        url: '/imgs/3.jpg',
        keywords: ['baby,pupy,cute']
    },
    {
        id: 4,
        url: '/imgs/4.jpg',
        keywords: ['cat,cute']
    },
    {
        id: 5,
        url: '/imgs/5.jpg',
        keywords: ['baby,success']
    },
    {
        id: 6,
        url: '/imgs/6.jpg',
        keywords: ['aliens,history']
    },
    {
        id: 7,
        url: '/imgs/7.jpg',
        keywords: ['kid,cute,suprised']
    },
    {
        id: 8,
        url: '/imgs/8.jpg',
        keywords: ['wonka,interesting']
    },
    {
        id: 9,
        url: '/imgs/9.jpg',
        keywords: ['kid,evil']
    },
    {
        id: 10,
        url: '/imgs/10.jpg',
        keywords: ['politics,obama']
    },
    {
        id: 11,
        url: '/imgs/11.jpg',
        keywords: ['boxing,kiss,lgbt']
    },
    {
        id: 12,
        url: '/imgs/12.jpg',
        keywords: ['pointing']
    },
    {
        id: 13,
        url: '/imgs/13.jpg',
        keywords: ['dicaprio,congratulations']
    },
    {
        id: 14,
        url: '/imgs/14.jpg',
        keywords: ['matrix,morpheus']
    },
    {
        id: 15,
        url: '/imgs/15.jpg',
        keywords: ['no one, lotr, sean bean']
    },
    {
        id: 16,
        url: '/imgs/16.jpg',
        keywords: ['startrek,kirk,funny']
    },
    {
        id: 17,
        url: '/imgs/17.jpg',
        keywords: ['politics,putin']
    },
    {
        id: 18,
        url: '/imgs/18.jpg',
        keywords: ['toy story,buzz']
    },

];

var keyWordSearchCountMap = {};
var gMeme;
//  {
//     selectedImgId,
//     selectedLineIdx,
//     lines: [{
//         txt,
//         size,
//         align,
//         color
//     }]
// };


function getMeme(id) {

    const meme = gImgs.find(img => img.id === id);
    return meme;
}

function getImages() {
    return gImgs;
}






function setCurrMeme(meme) {
    gMeme = {
        selectedImgId: meme.id,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: null,
            align: null,
            color: null
        }]
    };
    console.log(gMeme);
}


function updateCurrMeme(txt, linePos, font, textAlign = 'center', color) {
    const lines = gMeme.lines;

    if (linePos === 'top') {
        gMeme.selectedLineIdx = 1;
        lines[0].size = font;
        lines[0].txt = txt;
        lines[0].textAlign = textAlign;
        lines[0].color = color;
    } else {
        gMeme.selectedLineIdx = 1;
        const newLine = {
            txt: txt,
            size: font,
            align: textAlign,
            color: color
        };
        lines.length > 1 ? lines[1] = newLine : lines.push(newLine);
        console.log(gMeme);
    }




    // gMeme = {
    //     selectedImgId: meme.id,
    //     selectedLineIdx: 0,
    //     lines: [{
    //         txt: '',
    //         size: font,
    //         align: align,
    //         color: color
    //     }]
    // };
}