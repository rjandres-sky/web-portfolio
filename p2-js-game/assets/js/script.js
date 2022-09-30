// JavaScript Document
let holesValue = [7, 16, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
let currentPlayer = 1;





//add Event Listener to holes
const player1 = Array.from(document.querySelectorAll('.holes.player-1'));
const player2 = Array.from(document.querySelectorAll('.holes.player-2')).sort().reverse();
const player1Home = document.querySelector(".home.player-1");
const player2Home = document.querySelector(".home.player-2");


const mergeHoles = player1.concat(player1Home , player2, player2Home);

player1.forEach(function(elem, index) {
    elem.addEventListener("click", function() {
        //this function does stuff
		alert(elem + " " + elem.innerHTML + " " + index);
		loopSeed(index);
    });
});


player2.forEach(function(elem, index) {
    elem.addEventListener("click", function() {
        //this function does stuff
		alert(elem + " " + elem.innerHTML + " " + (index + 8));
		startHole = index + 8;
    });
});


console.log(mergeHoles);

setHoleValue();

function setHoleValue()
{
	for(let index = 0; index < holesValue.length; index++)
		{
			mergeHoles[index].innerHTML = holesValue[index];
		}
}

function checkEmptyHole(currentIndex){
	if (currentIndex != 7 || currentIndex != 15){
		if(holesValue[currentIndex] != 0){
			loopSeed(currentIndex);
			console.log(holesValue[currentIndex]);
		}
	}
	/**/
}

function loopSeed(startHole) {
    let holeLocation;
    let changeStartHole;
	let flagMoving = true;
	let currenIndex;
	
	
	let seedCount = holesValue[startHole];
	
	console.log("start hole " +startHole + " " + seedCount);
	
	let index = 0;
	
	while(index <= seedCount){
		
		
		console.log("array index " + index + " array index + start " + (index + startHole) +" nnnn hole " + currenIndex);
		
		
		if(startHole == index + startHole){
			holesValue[index + startHole] = 0;
			currenIndex = (index + startHole);
			console.log(currenIndex);
		} 
		
		
		/*else if (index > holesValue.length){
			
			console.log((index - 17) + startHole + " ------ " + index);
			holesValue[(index - 17) + startHole] += 1;
			currenIndex = (index - 17) + startHole;
		} else {
			
			holesValue[index + startHole] += 1;
			currenIndex = index + startHole;
			console.log(currenIndex + " ------ " + index);	
		} */
		  
		index++;
	}
    
	
	
	console.log("yyyyy" + currenIndex);
	setHoleValue();
	//loopSeed(currenIndex);
}		
		
		
        /*holeLocation = index + startHole;
		
		console.log("index " + index + " locate " + holesValue[holeLocation-1] + " index of " + holeLocation  +"   seed count " + seedCount);

        if (startHole == holeLocation - 1) {
            holesValue[startHole-1] = 0;
        }
        //console.log((index + " " + holeLocation-1 + " " + changeStartHole));

        if(holeLocation < 8){

            holesValue[holeLocation-1] += 1;
			currenIndex = holeLocation;
			
        } else if ((holeLocation) > 8) {
                
                if ((changeStartHole % 16) == 0) {

                    holesValue[(holeLocation - changeStartHole) - 1] += 1;
					currenIndex = (holeLocation - changeStartHole) - 1;
					console.log(holeLocation + "------------ " + changeStartHole + "===========" + ((holeLocation - changeStartHole)+7));
                    
                } else {

                    holesValue[holeLocation-1] += 1;
					currenIndex = (holeLocation-1);
 					console.log(holeLocation + "------------ " + changeStartHole + "===========" + ((holeLocation - changeStartHole)+7));
                }

        }else if (holeLocation == 8 || holeLocation == 16 || holeLocation == 24 || holeLocation == 32) {  
			
				console.log("home hole "  + (holeLocation-1));
				holesValue[holeLocation - 1] += 1;
				currenIndex = holeLocation - 1;	
			
                if (currentPlayer == 1) {
                    currentPlayer = 2;
                } else {
                    currentPlayer = 1;
                }
                changeStartHole = holeLocation + 1;
        }
		flagMoving = false;
    }
	
	changeStartHole = 0;
	setHoleValue();
	
	console.log(currenIndex +"  ddd  "+ currentPlayer);
	if(flagMoving == false){
		checkEmptyHole(currenIndex + 1);	*/





