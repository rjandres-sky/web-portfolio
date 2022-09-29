// JavaScript Document
let HolesValue = [7,7,7,7,7,7,7,0,7,7,7,7,7,7,7,0];
let currentPlayer = 1;

let seedCount;

function loopSeed(){
    let startHole = 3;
	let locateHole;
	let changeStartHole;
  for(let index = 1; index <= 18; index++){

		  locateHole = startHole;
	  	  
	  console.log((index + " " + locateHole + " " + changeStartHole));
	  
      if(locateHole==8 || locateHole==16 || locateHole==24 || locateHole==32){
          let home = document.querySelector(`.home.player-${currentPlayer} div`);
          //console.log(home);
		 // console.log((locateHole + " " + changeStartHole));
		  HolesValue[locateHole-1] += 1;
          home.innerHTML = locateHole;
		  home.innerHTML = HolesValue[locateHole-1];
		  
		  if (currentPlayer==1){
              currentPlayer = 2;
          } else {
			  currentPlayer = 1;
		  }
		  changeStartHole  = locateHole;
          
      } else if((locateHole) > 8){
          let hole = document.querySelector(`.player-${currentPlayer}.hole-${locateHole - changeStartHole}`);
		  
		  if((changeStartHole % 16) == 0) {
			  HolesValue[(locateHole - changeStartHole)-1] += 1;
			  hole.innerHTML = index + startHole;
		  hole.innerHTML = HolesValue[(locateHole - changeStartHole)-1];
		  } else {
			  HolesValue[(locateHole - changeStartHole)+8] += 1;
			  hole.innerHTML = index + startHole;
		  	  hole.innerHTML = HolesValue[(locateHole - changeStartHole)+8];
		  }
		  
		   
          //console.log((locateHole + " " + changeStartHole));
          
      } else {
          let hole = document.querySelector(`.player-${currentPlayer}.hole-${locateHole}`);
          HolesValue[locateHole-1] += 1; 
          //console.log(locateHole);
          hole.innerHTML = index + startHole;
		  hole.innerHTML = HolesValue[locateHole-1];
      }
	  startHole++;
          
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
