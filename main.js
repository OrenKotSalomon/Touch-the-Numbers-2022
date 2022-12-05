


var gBoard = getBoard(16)
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
var totalSeconds = 00;
var gNextNum = 1
var gInterval

function onInit() {
    shuffle(gBoard)
    renderBoard(gBoard)
}

function onClickRadio(elRadio, num) {
    var elNumberCount = document.querySelector('.numberCounts')
    var nums = []
    console.log('sscs');
    for (var i = 0; i < num; i++) {
        nums.push(i + 1)
        shuffle(nums)
    }
    gBoard = nums.slice()
    renderBoard(gBoard)

    if (elRadio) {
        elNumberCount.innerText = 'Next Number: ' + gNextNum
    }
}


function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}

function onClickCell(elCell, num) {
    var elNumberCount = document.querySelector('.numberCounts')
    var elWinningMessage = document.querySelector('.winning-message')
    var elNewGame = document.querySelector('.winning-message .newGame')
    if (num !== gNextNum) return
    if (num === gNextNum) {
        gNextNum++
        elCell.classList.add("cell")
    }
    if (num === 1) {
        gInterval = setInterval(setTime, 1000);
    }
    if (elCell) {
        elNumberCount.innerText = 'Next Number: ' + gNextNum
    }
    if (num === gBoard.length) {
        elWinningMessage.style.display = 'block'
        elNewGame.style.display = 'block'
        elNumberCount.innerText = ''
        gNextNum = 1
        clearInterval(gInterval)
        totalSeconds = 00
    }
}
function restartGame(elBtn) {
    renderBoard(gBoard)
    var elWinningMessage = document.querySelector('.winning-message')
    var elNewGame = document.querySelector('.winning-message .newGame')
    elWinningMessage.style.display = 'none'
    elNewGame.style.display = 'none'
}


function getBoard(bordNums) {
    var nums = []
    for (var i = 0; i < bordNums; i++) {
        nums.push(i + 1)
    }
    return shuffle(nums)
}

function renderBoard(gBoard) {
    var elTable = document.querySelector('.table .board')
    var copyGBoard = gBoard.slice()
    strHTML = ''
    for (var i = 0; i < Math.sqrt(gBoard.length); i++) {
        strHTML += `<tr>`
        for (var j = 0; j < Math.sqrt(gBoard.length); j++) {
            var cell = copyGBoard.splice(0, 1)
            strHTML += `<td onclick="onClickCell(this,${cell})">${cell}</td>`
        }
        strHTML += `</tr>\n`
    }
    elTable.innerHTML = strHTML
}





function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
