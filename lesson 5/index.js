
const variantsButton = {
    posts: 'posts',
    comments: 'comments',
    albums: 'albums',
    photos: 'photos',
    todos: 'todos',
    users: 'users',
};
const data = {
    limit: 10,
    page: 1,
    count: 0
}
const buttonContainer = document.querySelector('.buttonContainer');
const cardsContainer = document.querySelector('.cardsContainer');
const pageContainer = document.querySelector('.pageContainer');
const pageBtnContainer = document.createElement('div')
pageBtnContainer.classList.add('pageBtnContainer')


const getData = async function (url) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/${url ? url : 'posts'}?_limit=${data.limit}&_page=${data.page}`, { headers: variantsButton.headers });
        let result = await response.json();
        return result
    } catch (e) {
        console.log(`Ошибка( ${e}`)
    }
}

const getLength = async function (url) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/${url ? url : 'posts'}?_limit=180`);
        let result = await response.json();
        return result.length
    } catch (e) {
        console.log(`Ошибка( ${e}`)
    }
}
/*
 функция getCount сделана только потому что не смог достать значение 'X-Total-Count' из headers
 браузер его показывает в заголовке ответов, однако в response(response.headers) его нет
*/
const getCount = async function (url) {
    data.count = await getLength(url);
    renderSelect(url)
}

function ucFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

function renderButton() {
    getCount('posts')
    for (let key in variantsButton) {
        const button = document.createElement('button');
        button.innerHTML = `${ucFirst(key)}`;
        button.classList.add('variantsButton');
        button.addEventListener('click', () => {
            data.limit = 10;
            data.page = 1;
            getCount(variantsButton[key]);
            renderCards(variantsButton[key])
        })
        buttonContainer.appendChild(button)
    }
}

function renderSelect(url) {
    pageContainer.innerHTML = ''
    pageContainer.appendChild(pageBtnContainer)
    var selectList = document.createElement("select");
    selectList.classList.add = "selectList";
    selectList.id = 1
    for (let opt of [10, 20, 30]) {
        let option = document.createElement("option");
        option.value = opt;
        option.text = opt;
        selectList.appendChild(option);
    }
    renderPadination(url)
    selectList.addEventListener('change', (e) => {
        data.limit = e.target.value;
        renderPadination(url)
    })

    pageContainer.prepend(selectList);
}

function renderPadination(url) {
    pageBtnContainer.innerHTML = ''
    for (let i = 0; i < (data.count / data.limit); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerHTML = `${i * data.limit + 1} - ${(i + 1) * data.limit} `
        pageBtn.addEventListener('click', () => {
            data.page = i + 1
            renderCards(url)
        })
        pageBtnContainer.appendChild(pageBtn)
    }
}

async function renderCards(url) {
    let cards = await getData(url);
    cardsContainer.innerHTML = ` <h1>${ucFirst(url)}:</ h1> `
    for (let card of cards) {
        const cardDiv = document.createElement('div');
        for (let property in card) {
            if (property == 'thumbnailUrl') {
                cardDiv.innerHTML += `<img src='${card[property]}'/>`;
                cardDiv.classList.add('cardWImg');
            } else if (property == "company" || property == "address") {
                if (property == "company") {
                    cardDiv.innerHTML += `<span>${ucFirst(property)}:</span> ${card[property]['name']} <br/>`
                } else {
                    cardDiv.innerHTML += `<span>${ucFirst(property)}:</span> ${card[property]['city']}, ${card[property]["street"]}, ${card[property]["suite"]} <br/>`
                }

            } else {
                cardDiv.innerHTML += `<span>${ucFirst(property)}:</span> ${card[property]} <br/>`
            }
        }
        cardDiv.innerHTML += `<hr/>`
        cardDiv.classList.add('cardDiv');
        cardsContainer.appendChild(cardDiv)
    }
}

renderButton()
renderCards('posts')
