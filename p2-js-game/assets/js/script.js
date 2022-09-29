// JavaScript Document
let HolesValue = 7;
let currentPlayer = 1;

let seedCount;

function loopSeed(){
    let startHole = 3;
  for(let index = 1; index <= 7; index++){
      if((index + startHole)==8){
          let home = document.querySelector(`.home.player-${currentPlayer} div`);
          console.log(home);
          home.innerHTML = "+1";
          
      } else if((index + startHole) > 8){
          
          if (currentPlayer==1){
              currentPlayer = 2;
          } 
          
          let hole = document.querySelector(`.player-${currentPlayer}.hole-${(index + startHole)-8}`);
          console.log(hole);
          hole.innerHTML = "+1";
      } else {
          let hole = document.querySelector(`.player-${currentPlayer}.hole-${index + startHole}`);
          hole.innerHTML = "+1";
      }
          
  }
      
}


loopSeed();




/*function myFunction() {
  if (x.innerHTML === "1") {
    x.innerHTML = "+1";
  } else {
    x.innerHTML = "1";
  }
}
console.log(x);
//for(let index = 0; index < x.length; index++){
    x.addEventListener('click', myFunction, false);
//}*/
