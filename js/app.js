'use strict';

let random=0;

function randomNumber( min, max,index1,index2,index3 ) {
  do
  {random= Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }while(random === index1 || random===index2 || random===index3);
  return random;
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
  './image/bag.jpg',
  './image/banana.jpg',
  './image/bathroom.jpg',
  './image/boots.jpg',
  './image/breakfast.jpg',
  './image/bubblegum.jpg',
  './image/chair.jpg',
  './image/cthulhu.jpg',
  './image/dog-duck.jpg',
  './image/dragon.jpg',
  './image/pen.jpg',
  './image/pet-sweep.jpg',
  './image/scissors.jpg',
  './image/shark.jpg',
  './image/sweep.png',
  './image/tauntaun.jpg',
  './image/unicorn.jpg',
  './image/usb.gif',
  './image/water-can.jpg',
  './image/wine-glass.jpg',

];

const imageSection = document.getElementById('image_section');
const firstImage =document.getElementById('img1');
const secondImage =document.getElementById('img2');
const lastImage =document.getElementById('img3');
const resultSection=document.getElementById('result_container');
const resultChart=document.getElementById('canvasChart');

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
    let newIndex1 = randomNumber(0,productName.length-1,img1Index,img3Index,img2Index);
    let newIndex2 =randomNumber(0,productName.length-1,img2Index,img3Index,img1Index);
    let newIndex3=randomNumber(0,productName.length-1,img3Index,img1Index,img2Index);


    img1Index= newIndex1;
    firstImage.src=imgPath[img1Index];

    img2Index=newIndex2;
    secondImage.src=imgPath[img2Index];

    img3Index=newIndex3;
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
    resultChart.appendChild(veiwResultButton);
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
      const canvasElement=document.createElement('canvas');
      resultChart .appendChild(canvasElement);
      canvasElement.id='myChart';
      renderChart();
      veiwResultButton.textContent='The Result';
      veiwResultButton.onclick=false;
    };
    localStorage.setItem( 'product', JSON.stringify( Product.all ) );

  }
}
function getData() {
  const data = localStorage.getItem('product');
  if(data) {
    const objData = JSON.parse(data);
    Product.all = objData;
   
  }
}
getData();
shuffle();

function renderChart() {

  let nameArray = [];
  let shownArray = [];
  let votesArray = [];

  for(let i = 0; i < Product.all.length; i++) {
    nameArray.push(Product.all[i].name);
    shownArray.push(Product.all[i].shown);
    votesArray.push(Product.all[i].vote);

  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  // eslint-disable-next-line no-undef
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Shown',
          data: shownArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        },{
          label: '# of Votes',
          data: votesArray,
          backgroundColor: '#8ac4d0',
          borderColor: '#28527a',
          borderWidth: 3
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}

// const resultButton = document.getElementById('result_button');

