/*
*  Если мы получили палиндром, функция должна вернуть значение true. Если же нет — false.
* */

function isPalindrome(str) {
    if (str == [...str].reverse().join('')) {
        return true
    }
    return false
}

















































module.exports = isPalindrome