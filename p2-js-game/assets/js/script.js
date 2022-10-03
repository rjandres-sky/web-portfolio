// JavaScript Document
let holesValue = [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
let player = 1;


changePlayer(1);
setHoleValue();

//add Event Listener to holes
function action(index){
	
	if (player == 2){
		if([0,1,2,3,4,5,6].includes(index) == true){
			console.log("Select to your holes only.");
			return;
		}
		
		if (holesValue[index] == 0){
			console.log("Select hole that is not equal to 0.");
		return;
		}
		
	} else if(player == 1){

		if([8,9,10,11,12,13,14].includes(index) == true){
			console.log("Select to your holes only.");
			return;
		}
		if (holesValue[index] == 0){
			console.log("Select hole that is not equal to 0.");
		return;
		}
	}
	
	loopSeed(index, player);
}

function changePlayer(currentPlayer){ //changing players turn
	//console.log(currentPlayer +" ppppppppppppp");
	const player1 = Array.from(document.querySelectorAll('.holes.player-1'));
	const player2 = Array.from(document.querySelectorAll('.holes.player-2')).sort().reverse();
	
	player1.forEach(function(elem, index) {
			elem.addEventListener("click", action.bind(this, index), true);
		});
	
	player2.forEach(function(elem, index) {
			elem.addEventListener("click", action.bind(this, index+8), true);
		});
	
}


function setHoleValue()
{
	const player1 = Array.from(document.querySelectorAll('.holes.player-1'));
	const player2 = Array.from(document.querySelectorAll('.holes.player-2')).sort().reverse();
	const player1Home = document.querySelector(".home.player-1");
	const player2Home = document.querySelector(".home.player-2");


	const mergeHoles = player1.concat(player1Home , player2, player2Home);
	
	for(let index = 0; index < holesValue.length; index++)
		{
			mergeHoles[index].innerHTML = holesValue[index];
		}
}

function checkEmptyHole(currentIndex, currentPlayer){
	
	switch (currentIndex) {
		case 7:
			break;
		case 15:
			break;
		default:
			if(holesValue[currentIndex] > 1){
            	console.log(holesValue[currentIndex]);
            	loopSeed(currentIndex, currentPlayer);		
			} else {
				getOpponentHoleValue(currentIndex);
				
				console.log(player + " hjjjjjjjjjjjj");
				if(player == 1){
					player=2;
				} else {
					player = 1;
				}
				console.log(player + " hjjjjjjjjjjjj");
			}
	}
}


function loopSeed(startHole, currentPlayer) {
	let currentIndex;
	let seedCount = holesValue[startHole];
	
	
	//console.log("start hole " +startHole + " " + [8,9,10,11,12,13,14].includes(currentIndex) + "   " + currentPlayer);
	if(currentPlayer == 1){
	   for(let index = 0; index <= seedCount; index++){

			if(startHole == index + startHole){
				holesValue[index + startHole] = 0;
				currentIndex = (index + startHole);
			}  else{
				if(currentIndex == 14){
					currentIndex = 0;
					holesValue[currentIndex] += 1;
					//seedCount += 1;
				} else {
					currentIndex += 1;
					holesValue[currentIndex] += 1;    
				}  
			}  
			//console.log("array index " + index + " array index + start " + (index + startHole) +" nnnn hole " + currentIndex + " hole value " + holesValue.length);
		}
		//console.log("yyyyy" + currentIndex);
		setHoleValue();
		//loopSeed(currentIndex);
		checkEmptyHole(currentIndex, currentPlayer);
		
	   } else if(currentPlayer == 2) {
		   for(let index = 0; index <= seedCount; index++){

				if(startHole == index + startHole){
					currentIndex = (index + startHole);
					holesValue[currentIndex] = 0;		
				}  else{
					
					currentIndex += 1;
					
						if(currentIndex == 7){
							currentIndex = 8;
							holesValue[currentIndex] += 1; 
							console.log(currentIndex + "   1 " + index );
						} else {
							
								
							if(currentIndex == 16){
								currentIndex = 0;
								console.log(currentIndex + "    2 " + index);
								holesValue[currentIndex] += 1;
								
							} else {
								console.log(currentIndex + "   3 " + index);
								holesValue[currentIndex] += 1;  
							}
						   
				}  
				//console.log("array index " + index + " array index + start " + (index + startHole) +" nnnn hole " + currentIndex + " hole value " + holesValue.length);
			}
		   }
			console.log("yyyyy " + currentIndex);
		   	//(currentIndex == 0 ) ? currentIndex = 15 : currentIndex -= 1;
			setHoleValue();
			//loopSeed(currentIndex);
			checkEmptyHole(currentIndex, currentPlayer);
	   }
	
}		

function getOpponentHoleValue(currentIndex){
	let opponentHole;
	if([0,1,2,3,4,5,6].includes(currentIndex) == true && player == 1){
		opponentHole = 14-currentIndex;
		
		if(holesValue[opponentHole]!=0) {
			holesValue[7] = holesValue[7] + holesValue[opponentHole] + holesValue[currentIndex];
			holesValue[opponentHole] = 0; 
			holesValue[currentIndex] = 0;
			console.log("kimarrrr P2 " + opponentHole + " i " + currentIndex);
		}
		
	} else if([8,9,10,11,12,13,14].includes(currentIndex) == true && player == 2){
		opponentHole = 14 - currentIndex;
		
		if(holesValue[opponentHole]!=0) {
			holesValue[15] = holesValue[15] + holesValue[opponentHole] + holesValue[currentIndex];
			holesValue[opponentHole] = 0; 
			holesValue[currentIndex] = 0;
			console.log("kimarrrr P1 " + opponentHole + " i " + currentIndex);
		}

	}
	setHoleValue();
	
}
		
        /*holeLocation = index + startHole;
		
		console.log("index " + index + " locate " + holesValue[holeLocation-1] + " index of " + holeLocation  +"   seed count " + seedCount);

        if (startHole == holeLocation - 1) {
            holesValue[startHole-1] = 0;
        }
        //console.log((index + " " + holeLocation-1 + " " + changeStartHole));

        if(holeLocation < 8){

            holesValue[holeLocation-1] += 1;
			currentIndex = holeLocation;
			
        } else if ((holeLocation) > 8) {
                
                if ((changeStartHole % 16) == 0) {

                    holesValue[(holeLocation - changeStartHole) - 1] += 1;
					currentIndex = (holeLocation - changeStartHole) - 1;
					console.log(holeLocation + "------------ " + changeStartHole + "===========" + ((holeLocation - changeStartHole)+7));
                    
                } else {

                    holesValue[holeLocation-1] += 1;
					currentIndex = (holeLocation-1);
 					console.log(holeLocation + "------------ " + changeStartHole + "===========" + ((holeLocation - changeStartHole)+7));
                }

        }else if (holeLocation == 8 || holeLocation == 16 || holeLocation == 24 || holeLocation == 32) {  
			
				console.log("home hole "  + (holeLocation-1));
				holesValue[holeLocation - 1] += 1;
				currentIndex = holeLocation - 1;	
			
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
	
	console.log(currentIndex +"  ddd  "+ currentPlayer);
	if(flagMoving == false){
		checkEmptyHole(currentIndex + 1);	*/





