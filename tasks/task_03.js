/*
* Нужно написать функцию, принимающую строку в качестве аргумента и возвращающую количество гласных, которые содержатся в строке.
Гласными являются «a», «e», «i», «o», «u», «y».
* */

function getVowelsCount(str) {
    const arr = ['a', 'e', 'i', 'o', 'u', 'y'];
    let summ = 0;

    for (const el of [...str]) {
        if (arr.includes(el)) {
            summ++
        }
    }

    return summ
}












































module.exports = getVowelsCount