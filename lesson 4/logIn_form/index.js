'use stric'
/* 01.12.2023 
В начале создания истории с прошлыми играми заметил что очень удобно было бы сделать класс поля с методом рендер 
и от него уже экстендить игровое поле и обычные
(извиняюсь что затянул с началом выполнения и реализовал грязно)
*/
const winCombsArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
let player = true,
    isEnd = false,
    lastArrOf5 = [],
    fieldArr = ['', '', '', '', '', '', '', '', ''];
const forGameField = document.querySelector('.forGame');
const history = document.querySelector('.history');
const returnButton = document.querySelector('.returnButton');
const show = document.querySelector('.showHistory');
let isShow = false;
const FIRST_GAME = 'firstGame',
    LAST_GAME = 'lastGame';

let FIRST_GAME_ARR = fieldArr,
    LAST_GAME_ARR = [];


if (!window.localStorage.getItem(`${FIRST_GAME}`)) {
    FIRST_GAME_ARR = fieldArr;
    window.localStorage.setItem(`${FIRST_GAME}`, `${FIRST_GAME_ARR.join('')}`)
} else {
    FIRST_GAME_ARR = window.localStorage.getItem(`${FIRST_GAME}`).split(' ')
}

if (!window.localStorage.getItem(`${LAST_GAME}`)) {
    window.localStorage.setItem(`${LAST_GAME}`, `${fieldArr.join('')}`)
} else {
    fieldArr = window.localStorage.getItem(`${LAST_GAME}`).split(',');
}





function lastFiveGames() {
    lastArrOf5 = [];
    FIRST_GAME_ARR = window.localStorage.getItem(`${FIRST_GAME}`).split(' ')
    for (let i = 0; i < FIRST_GAME_ARR.join('').split(';').length; i++) {
        if (i % 2 == 1) {
            lastArrOf5.push(FIRST_GAME_ARR.join('').split(';').reverse()[i])
        }
    }
    lastArrOf5 = lastArrOf5.slice(0, 5)

    return lastArrOf5
}



function checkWinner() {
    for (let winComb of winCombsArr) {
        if (
            fieldArr[winComb[0]] == fieldArr[winComb[1]]
            && fieldArr[winComb[2]] == fieldArr[winComb[1]]
            && fieldArr[winComb[0]] !== ''
        ) {
            setTimeout(() => {
                alert(`Победитель: ${player ? 'O' : 'X'}`);
                FIRST_GAME_ARR.push(';');
                FIRST_GAME_ARR.push(fieldArr);
                FIRST_GAME_ARR.push(';');
                window.localStorage.setItem(`${FIRST_GAME}`, `${FIRST_GAME_ARR.join('')}`);
                lastFiveGames()
                renderHistory()
                isEnd = true;

            },)
        }

    }
}

function renderField() {
    forGameField.innerHTML = '';
    for (let i = 0; i < fieldArr.length; i++) {
        const cellButton = document.createElement('button');
        cellButton.classList.add('field');
        cellButton.id = i;
        cellButton.innerText = fieldArr[i];
        cellButton.addEventListener('click', () => {
            if (!fieldArr[i] && !isEnd) {
                cellButton.innerText = `${player ? 'X' : 'O'}`;
                fieldArr[i] = player ? 'X' : 'O';
                checkWinner();
                player = !player;
                window.localStorage.setItem(`${LAST_GAME}`, `${fieldArr.join(',')}`)

            }
        });
        forGameField.appendChild(cellButton)
    }
}

returnButton.addEventListener('click', () => {
    fieldArr = ['', '', '', '', '', '', '', '', ''];
    window.localStorage.setItem(`${LAST_GAME}`, `${fieldArr.join(',')}`)
    isEnd = false;
    renderField()
})

function renderHistory() {
    history.innerHTML = '  ';
    for (let historyField of lastFiveGames()) {
        const historyFieldContainer = document.createElement('div');
        historyFieldContainer.innerHTML = ''
        historyFieldContainer.classList.add('container');
        for (let i = 0; i < historyField.split(',').length; i++) {
            const cellButton = document.createElement('button');
            cellButton.classList.add('field');
            cellButton.classList.add('historyField');
            cellButton.id = i;
            cellButton.innerText = historyField.split(',')[i];
            historyFieldContainer.appendChild(cellButton);
        }
        history.appendChild(historyFieldContainer);
    }
}

show.addEventListener('click', () => {
    if (!isShow) {
        history.classList.add('show')
    } else {
        history.classList.remove('show')
    }
    isShow = !isShow

})
renderHistory()
renderField()
