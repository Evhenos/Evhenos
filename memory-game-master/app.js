let cardArray = []
let hist_game = []
let saund = ['saunds/flip.mp3', 'saunds/close.mp3', "saunds/win.mp3"]
const lvl1 = ['π','π', 'π', 'π', 'π', 'π']
const lvl2 = ['πΈ', 'πΉ', 'πΊ', 'π»', ' π', 'πΎ', 'π½', 'πΏ', 'πΈ', 'πΉ', 'πΊ', 'π»', ' π', 'πΎ', 'π½', 'πΏ' ]
const lvl3 = ['π', 'π', 'π', 'π', 'π', 'π', 'π', 'π‘', 'π', 'π΅', 'π·', 'π€', 'π', 'π', 'π', 'π', 'π', 'π', 'π', 'π', 'π', 'π‘', 'π', 'π΅', 'π·', 'π€', 'π', 'π' ]
let grid = document.querySelector('.grid')
let timeElt = document.querySelector("#time");
let pointElt = document.querySelector("#point");
let results = document.querySelector('.results')
let content = ''
let elementNameArr = []
let elementIDArr  = []
let name_player = ''
let points = 0 
let flip_card = 0
let time = 0
let timer = 0

function card_flip(name_card, id){
  play_saund(0)
  document.getElementById(id).setAttribute('value', `${name_card}`)
  elementNameArr.push(String(name_card));
  elementIDArr.push(id)

  if (elementNameArr.length == 2 ){
    if (elementIDArr[0] != elementIDArr[1]){
        console.log(elementNameArr);
        console.log(elementIDArr);
        setTimeout(check_card, 500, elementNameArr, elementIDArr)
        elementNameArr = [];
        elementIDArr = [];
    }
    else{
      document.getElementById(id).setAttribute('value', 'β');
      elementNameArr = [];
      elementIDArr = [];
      return
    }
  }
}

function check_card(NameArr, IDArr){
  if (NameArr[0] == NameArr[1]){
    play_saund(2)
    document.getElementById(IDArr[0]).removeAttribute('value');
    document.getElementById(IDArr[1]).removeAttribute('value');
    document.getElementById(IDArr[0]).removeAttribute('onclick');
    document.getElementById(IDArr[1]).removeAttribute('onclick');
    
    
    flip_card += 1 
    points += 10;
    pointElt.innerHTML = `ΠΡΠΊΠΈ: ${points}`
    console.log(points);
    if (flip_card == cardArray.length/2){
      clearInterval(timer);
      grid.innerHTML = '';
      timeElt.innerHTML = '';
      pointElt.innerHTML = '';
      open_window()
      win_window(time, points)
      storage(time, points)
      
    }  
  }
  else{
    play_saund(1)
    document.getElementById(IDArr[0]).setAttribute('value', 'β');
    document.getElementById(IDArr[1]).setAttribute('value', 'β');
    if (points >= 4){
      points -= 5;
      pointElt.innerHTML = `ΠΡΠΊΠΈ: ${points}`
    } 
  }
}

function start_game(){
  close_window()
  flip_card = 0
  time = 0
  points = 5
  pointElt.innerHTML = `ΠΡΠΊΠΈ: ${points}`
  timeElt.innerHTML = `ΠΡΠ΅ΠΌΡ: ${points}`
  random_card = cardArray.sort(() => 0.5 - Math.random())
  console.log(random_card);
  let card_input = ''
  for (let i = 0; i < random_card.length; i++) {
    card_input +=   `<input value="β" style="cursor: pointer;" type = "button" id="card${i}", class="content" name="" onclick="card_flip(random_card[${i}], 'card${i}')"></input>`   
  }
  grid.innerHTML = card_input

  timer = setInterval(() => {
    time++;
    timeElt.innerHTML = `ΠΡΠ΅ΠΌΡ: ${time}`;
  }, 1000);

}

function number_lvl(n){
  name_player = document.getElementById('neme_player').value;
  if (n == 1){
    cardArray = lvl1
    grid.classList.add('grid_lvl1');
  }
  if ( n == 2){
    cardArray = lvl2
    grid.classList.add('grid_lvl2');
  }
  if (n == 3){
    cardArray = lvl3
    grid.classList.add('grid_lvl3');
  }
  console.log(cardArray)
  if (name_player == '' && name_player.length < 3){
    alert('ΠΡ Π½Π΅ Π²Π²Π΅Π»ΠΈ Π½ΠΈΠΊ')
    return
  }
  console.log(name_player);
  start_game()
}



function storage(time, point) {
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if(existingEntries == null) existingEntries = [];
  var entry = `<p>${name_player} ${time} ${point}</p>`;
  localStorage.setItem("entry", JSON.stringify(entry));
 
  existingEntries.push(entry);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  res_write()
  
};

function res_write(){
  arr = JSON.parse(localStorage.getItem("allEntries"));
  if (arr != null){
    document.querySelector('.hist').innerHTML = '<h4>ΠΡΡΠΎΡΠΈΡ<br> ΠΠΈΠΊ ΠΡΠ΅ΠΌΡ ΠΡΠΊΠΈ</h4>'
    res = arr.slice(-4)
    results.innerHTML = res.join('');
  }
  
  
}

function play_saund(s){
  var audio = new Audio(); 
  audio.src = saund[s];
  audio.autoplay = true; 
}

function win_window(time, point){
  let newDoc = open("", "displayWindow", "width=200,height=300,status=no,toolbar=no,menubar=no resizable=no");
  newDoc.document.open();
  newDoc.document.write(`<div style="text-align: center;  background-color: rgb(234, 227, 43);"><h1>ΠΠΎΠ±Π΅Π΄Π°</h1><br><h2>ΠΡΠ΅ΠΌΡ: ${time} ΡΠ΅ΠΊ.</h2><br><h2>ΠΡΠΊΠΈ: ${point}</h2></div>`);

}



//////////////////////////////////////////////////////////
let modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];

function open_window() { 
    modal.classList.add('modal_vis'); 
    modal.classList.remove('bounceOutDown'); 
    body.classList.add('body_block');
  };

function close_window() { 
    modal.classList.remove('modal_vis'); 
    body.classList.remove('body_block'); 
}
///////////////////////////////////////////////////////

open_window()
res_write()




