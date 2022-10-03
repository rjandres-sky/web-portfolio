// JavaScript Document
let holesValue = [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
let player;
let msg;

const player1 = Array.from(document.querySelectorAll('.holes.player-1'));
const player2 = Array.from(document.querySelectorAll('.holes.player-2')).sort().reverse();
const player1Home = document.querySelector(".home.player-1");
const player2Home = document.querySelector(".home.player-2");

const mergeHoles = player1.concat(player1Home, player2, player2Home);

const popupElement = document.querySelector(`.popup`);


function currentPlayerHome(){
for(let index=0; index < 7; index++){
	if(player == 1) {
		player1[index].style.background = 'linear-gradient(193deg, rgba(0,3,36,0.5550595238095238) 0%, rgba(236,92,92,0.8577159379376751) 100%, rgba(28,28,60,0.11808473389355745) 100%)';
		player2[index].style.background = 'linear-gradient(193deg, rgba(0,3,36,0.5550595238095238) 0%, rgba(255,185,135,0.8577159379376751) 100%, rgba(28,28,60,0.11808473389355745) 100%)'
	} else {
		player2[index].style.background = 'linear-gradient(193deg, rgba(0,3,36,0.5550595238095238) 0%, rgba(236,92,92,0.8577159379376751) 100%, rgba(28,28,60,0.11808473389355745) 100%)';
		player1[index].style.background = 'linear-gradient(193deg, rgba(0,3,36,0.5550595238095238) 0%, rgba(255,185,135,0.8577159379376751) 100%, rgba(28,28,60,0.11808473389355745) 100%)'
	}
}
	
}

function showPopupDisplay(msg) {
    popupElement.classList.add(`show-popup`);
	console.log(player);
    if(player == 1){
		popupElement.querySelector(`img`).src = "assets/images/huggy-win-turn.png";
	} else if(player == 2){
		popupElement.querySelector(`img`).src = "assets/images/kissy-win-turn.png";
	}
    popupElement.querySelector(`p`).innerHTML = msg;
}

popupElement.querySelector(`.btn-hide`).addEventListener(`click`, hidePopupDisplay);

function hidePopupDisplay() {
    popupElement.classList.remove(`show-popup`);
}

setHoleValue();


let btnStart = document.querySelector(`.start-button`);

btnStart.addEventListener(`click`, startGame);

function startGame() {
    var result = Math.random();
    if (result < 0.5) {
        player = 1;
        changePlayer();
        msgDisplay(`Player 1 start the game`);
        showPopupDisplay(`Player 1 start the game`)
    } else {
        player = 2;
        changePlayer();
        showPopupDisplay(`Player 2 start the game`);
        msgDisplay(`Player 2 start the game`);
    }
	currentPlayerHome();
}


function msgDisplay(msg) {
    let msgElement = document.querySelector(`.msg-content h1`);
    msgElement.innerHTML = msg;
}


//add Event Listener to holes
function action(index) {

    if (player == 2) {
        if ([0, 1, 2, 3, 4, 5, 6].includes(index) == true) {
            msgDisplay(`Select to your holes only.`);
            return;
        }

        if (holesValue[index] == 0) {
            msgDisplay(`Select hole that is not equal to 0.`);
            return;
        }

    } else if (player == 1) {

        if ([8, 9, 10, 11, 12, 13, 14].includes(index) == true) {
            msgDisplay(`Select to your holes only.`);
            return;
        }
        if (holesValue[index] == 0) {
            msgDisplay(`Select hole that is not equal to 0.`);
            return;
        }
    }

    msgDisplay(`Player ${player} is moving`);
    loopSeed(index, player);
}


function changePlayer() { //changing players turn
    const player1 = Array.from(document.querySelectorAll('.holes.player-1'));
    const player2 = Array.from(document.querySelectorAll('.holes.player-2')).sort().reverse();

    player1.forEach(function (elem, index) {
        elem.addEventListener("click", action.bind(this, index), true);
    });

    player2.forEach(function (elem, index) {
        elem.addEventListener("click", action.bind(this, index + 8), true);
    });

}


function setHoleValue() {
    for (let index = 0; index < holesValue.length; index++) {
        mergeHoles[index].innerHTML = holesValue[index];
    }
}

const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

async function checkEmptyHole(currentIndex, currentPlayer) {

    switch (currentIndex) {
        case 7:
            msgDisplay(`End in home, select another hole.`);
            showPopupDisplay(`End in home, select another hole.`);
            break;
        case 15:
            msgDisplay(`End in home, select another hole.`);
            showPopupDisplay(`End in home, select another hole.`);
            break;
        default:
            if (holesValue[currentIndex] > 1) {
                console.log(holesValue[currentIndex]);
                loopSeed(currentIndex, currentPlayer);
            } else {
                getOpponentHoleValue(currentIndex);
				
			await delay(5000);
				
                if (player == 1) {
                    player = 2;
                    msgDisplay(`Player 2 turn`);
                    showPopupDisplay(`Player 2 turn`);
                } else {
                    player = 1;
                    msgDisplay(`Player 1 turn`);
                    showPopupDisplay(`Player 1 turn`);
                }
            }
    }
}

function zoomPlus(currentIndex) {
    if (currentIndex != 7) {
        if (currentIndex != 15) {
            mergeHoles[currentIndex].style.fontSize = '30px';
        } else {
            mergeHoles[currentIndex].style.fontSize = '40px';
        }

    } else {
        mergeHoles[currentIndex].style.fontSize = '40px';
    }
}


function zoomMinus(currentIndex) { //
    if (currentIndex != 7) {
        if (currentIndex != 15) {
            mergeHoles[currentIndex].style.fontSize = '20px';
        } else {
            mergeHoles[currentIndex].style.fontSize = '30px';
        }

    } else {
        mergeHoles[currentIndex].style.fontSize = '30px';
    }
}

async function loopSeed(startHole, currentPlayer) {
    let currentIndex;
    let seedCount = holesValue[startHole];

    if (currentPlayer == 1) { //if current player equal to 1
        for (let index = 0; index <= seedCount; index++) {

            if (startHole == index + startHole) {
                holesValue[index + startHole] = 0;
                currentIndex = (index + startHole);
            } else {
                if (currentIndex == 14) {
                    currentIndex = 0;
                    holesValue[currentIndex] += 1;
                } else {
                    currentIndex += 1;
                    holesValue[currentIndex] += 1;
                }
            }

            zoomPlus(currentIndex);

            if (currentIndex != startHole) {
                mergeHoles[currentIndex].innerHTML = "+1";
            }

            await delay(1500);

            mergeHoles[currentIndex].innerHTML = holesValue[currentIndex];
			zoomMinus(currentIndex);
        }
        //Check if hole is empty or home
        checkEmptyHole(currentIndex, currentPlayer);

    } else if (currentPlayer == 2) { //if current player equal to 2
        for (let index = 0; index <= seedCount; index++) {

            if (startHole == index + startHole) {
                currentIndex = (index + startHole);
                holesValue[currentIndex] = 0;
            } else {

                currentIndex += 1;

                if (currentIndex == 7) {
                    currentIndex = 8;
                    holesValue[currentIndex] += 1;
                    console.log(currentIndex + "   1 " + index);
                } else {

                    if (currentIndex == 16) {
                        currentIndex = 0;
                        console.log(currentIndex + "    2 " + index);
                        holesValue[currentIndex] += 1;

                    } else {
                        console.log(currentIndex + "   3 " + index);
                        holesValue[currentIndex] += 1;
                    }
                }
            }

            zoomPlus(currentIndex);

            if (currentIndex != startHole) {
                mergeHoles[currentIndex].innerHTML = "+1";
            }

            await delay(1500);

            mergeHoles[currentIndex].innerHTML = holesValue[currentIndex];
			zoomMinus(currentIndex);
        }
        //Check if hole is empty or home
        checkEmptyHole(currentIndex, currentPlayer);
    }
}

function getOpponentHoleValue(currentIndex) {
    let opponentHole;
    if ([0, 1, 2, 3, 4, 5, 6].includes(currentIndex) == true && player == 1) {
        opponentHole = 14 - currentIndex;

        if (holesValue[opponentHole] != 0) {
            holesValue[7] = holesValue[7] + holesValue[opponentHole] + holesValue[currentIndex];
			mergeHoles[7].innerHTML = holesValue[7];
            holesValue[opponentHole] = 0;
			mergeHoles[opponentHole].innerHTML = 0;	
            holesValue[currentIndex] = 0;
			mergeHoles[currentIndex].innerHTML = 0;
            msgDisplay(`I get your seed from your village, hehehe`);
            showPopupDisplay(`I get your seed from your village, hehehe`);
        }

    } else if ([8, 9, 10, 11, 12, 13, 14].includes(currentIndex) == true && player == 2) {
        opponentHole = 14 - currentIndex;

        if (holesValue[opponentHole] != 0) {
            holesValue[15] = holesValue[15] + holesValue[opponentHole] + holesValue[currentIndex];
			mergeHoles[15].innerHTML = holesValue[15];
            holesValue[opponentHole] = 0;
			mergeHoles[opponentHole].innerHTML = 0;	
            holesValue[currentIndex] = 0;
			mergeHoles[currentIndex].innerHTML = 0;
            msgDisplay(`I get your seed from your village, hehehe`);
            showPopupDisplay(`I get your seed from your village, hehehe`);
        }

    }

}
