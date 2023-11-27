/*
* Написать функцию, которая принимает массив чисел, например [1,2,3,4,5] и функция возращает среднее арифметическое, (округлить результат до десятых)
* */

function abs(array) {
    return Math.round((array.reduce((acc, value) => (acc + value)) / array.length) * 10) / 10
}









































module.exports = abs