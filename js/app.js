'use strict';


function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

const productName = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

const imgPath = [
  '../image/bag.jpg',
  '../image/banana.jpg',
  '../image/bathroom.jpg',
  '../image/boots.jpg',
  '../image/breakfast.jpg',
  '../image/bubblegum.jpg',
  '../image/chair.jpg',
  '../image/cthulhu.jpg',
  '../image/dog-duck.jpg',
  '../image/dragon.jpg',
  '../image/pen.jpg',
  '../image/pet-sweep.jpg',
  '../image/scissors.jpg',
  '../image/shark.jpg',
  '../image/sweep.png',
  '../image/tauntaun.jpg',
  '../image/unicorn.jpg',
  '../image/usb.gif',
  '../image/water-can.jpg',
  '../image/wine-glass.jpg',

];

const imageSection = document.getElementById('image_section');
const firstImage =document.getElementById('img1');
const secondImage =document.getElementById('img2');
const lastImage =document.getElementById('img3');
const resultSection=document.getElementById('result_container');

Product.all = [];
function Product(name,pathOfImg) {
  this.name=name;
  this.imageSrc=pathOfImg;
  this.shown =0 ;
  this.vote=0;
  Product.all.push(this);
}

for (let index = 0; index < productName.length; index++) {
  new Product (productName[index],imgPath[index]);
}

// console.log(Product.all);
let img1Index=0;
let img2Index=0;
let img3Index=0;
function shuffle (){
  do {
    img1Index=randomNumber(0,productName.length-1);
    firstImage.src=imgPath[img1Index];

    img2Index=randomNumber(0,productName.length-1);
    secondImage.src=imgPath[img2Index];

    img3Index=randomNumber(0,productName.length-1);
    lastImage.src=imgPath[img3Index];

  } while (img1Index === img2Index || img2Index === img3Index || img3Index === img1Index);

  Product.all[img1Index].shown++;
  Product.all[img2Index].shown++;
  Product.all[img3Index].shown++;
}
Product.counter = 25;
let counter =0;
imageSection.addEventListener( 'click', handelClick );
function handelClick(event){
  if (counter < Product.counter){
    const clickedElement = event.target;
    counter++;
    switch (clickedElement.id) {
    case 'img1':
      Product.all[img1Index].vote++;
      shuffle();
      break;
    case 'img2':
      Product.all[img2Index].vote++;
      shuffle();
      break;
    case 'img3':
      Product.all[img3Index].vote++;
      shuffle();
      break;

    default:
      break;
    }


  }else{
    imageSection.removeEventListener( 'click', handelClick );
    const veiwResultButton= document.createElement('button');
    resultSection.appendChild(veiwResultButton);
    veiwResultButton.class='resultButton';
    veiwResultButton.textContent='View Results';
    veiwResultButton.onclick=function showTheResult() {
      const listArtical = document.createElement('article');
      resultSection.appendChild(listArtical);

      const ulElement = document.createElement('ul');
      listArtical.appendChild(ulElement);


      for (let i = 0; i < Product.all.length; i++) {
        const liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent=`${Product.all[i].name}   had   ${Product.all[i].vote}   votes, and was seen   ${Product.all[i].shown}   times.`;

      }
      veiwResultButton.onclick=false;
    };

  }
}


shuffle();
// const resultButton = document.getElementById('result_button');

