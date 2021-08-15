'use strict';

let tds = document.querySelectorAll('td');

for (let elem of tds) {
  elem.addEventListener('click', marcar);
}

let myNums = [];
 
function marcar (el) {
  event.preventDefault();
  if (el.target.classList.contains('cruz')) {
    el.target.classList.remove('cruz');
    for (let i = 0; i < myNums.length; i++) {
      if (myNums[i] == el.target.innerHTML) {
        myNums.splice(i, 1);
        break;
      }
    }
  } else {
    if (myNums.length == 6) return;
    el.target.classList.add('cruz');
    myNums.push(el.target.innerHTML);
  }

  if (myNums.length == 6) {
    document.querySelector('#tecla').innerHTML='CONFIRMAR';
    document.querySelector('#tecla').classList.add('ready');
    document.querySelector('#tecla').addEventListener('click', rot);
  } else {
    let mOUam = (6 - myNums.length > 1) ? 'Faltam' : 'Falta';
    let oOUos = (6 - myNums.length > 1) ? 'números' : 'número';
    document.querySelector('#tecla').innerHTML=`${mOUam} ${6-myNums.length} ${oOUos}`;
    document.querySelector('#tecla').classList.remove('ready');
    document.querySelector('#tecla').removeEventListener('click', rot);
  }

}



function rot () {
  console.log('ddddddddddddd')
  if (document.querySelector('.reiniciar').style.visibility == 'visible') {
    document.querySelector('.reiniciar').style.visibility = 'hidden';
  }
document.querySelector('img').classList.add('rotate');
document.querySelector('#fala').innerHTML='Espera, tô calculando...';
document.querySelector('#tecla').style.visibility = 'hidden';
setTimeout(()=>calc(),0);
}

function calc () {
  let attempts = 1;
   myNums = myNums.map(x=>Number(x));
    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let numsRepeat = [];
while (numsRepeat.length < 6) {
  let n = getRandomIntInclusive(1, 60)
  if (!myNums.includes(n) ) {
    numsRepeat = [];
    attempts++;
  } else if (numsRepeat.includes(n)) {
    continue;
  } else {
    numsRepeat.push(n)
  }
}

document.querySelector('img').classList.remove('rotate');

let attModern = attempts.toString();
let att = (attModern > 6) ? attempts.toString().slice(0, -6) + '.' + attempts.toString().slice(-6, -3) + '.' + attempts.toString().slice(-3) : (attModern > 3) ? attempts.toString().slice(0, -3) + '.' + attModern.toString().slice(-3) : attModern;
  
  let anosModern = Math.round(attempts / 365).toString();
  let anos = (anosModern.length > 6) ? anosModern.slice(0, -6) + '.' + anosModern.toString().slice(-6, -3) + '.' + anosModern.toString().slice(-3) : (anosModern.length > 3) ? anosModern.slice(0, -3) + '.' + anosModern.toString().slice(-3) : anosModern;

  let anosDeVidaModern = Math.round(attempts / 32850).toString();
  let anosDeVida = (anosDeVidaModern.length > 6) ? anosDeVidaModern.slice(0, -6) + '.' + anosDeVidaModern.toString().slice(-6, -3) + '.' + anosDeVidaModern.toString().slice(-3) : (anosDeVidaModern.length > 3) ? anosDeVidaModern.slice(0, -3) + '.' + anosDeVidaModern.toString().slice(-3) : anosDeVidaModern;

  let estatistica = `Parabéns!<br>Você ganharia essa loteria na ${att}<sup>a</sup> vez.
  <br>Apostando uma vez cada dia, isso demoraria ${anos} anos.<br>Para ganhá-la uma vez durante 90 anos de vida, você precisaria apostar ${anosDeVida} vezes cada dia.<br> P.S.: a probabilidade média de ganhar a loteria é um em 50 milhões.`;

  document.querySelector('#fala').innerHTML = estatistica;
  document.querySelector('.reiniciar').style.visibility = 'visible';
  document.querySelector('#tecla').style.visibility = 'visible';
return attempts;
}

function putInCenter() {

   let table = document.querySelector('table');

   let tableSize = table.getBoundingClientRect();

   let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
   );

   table.style.top = scrollHeight / 2 - tableSize.height / 2 + 'px';

   let scrollWidth = document.documentElement.clientWidth;

   table.style.left = scrollWidth / 2 - tableSize.width / 2 + 'px';

}

putInCenter()

window.onresize = putInCenter;
