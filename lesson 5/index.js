
const variantsButton = {
    posts: 'posts',
    comments: 'comments',
    albums: 'albums',
    photos: 'photos',
    todos: 'todos',
    users: 'users',
};
const data = {
    BASE_URL: 'https://jsonplaceholder.typicode.com/',
    limit: 10,
    page: 1,
    count: 0
}
const buttonContainer = document.querySelector('.buttonContainer');
const cardsContainer = document.querySelector('.cardsContainer');
const pageContainer = document.querySelector('.pageContainer');
const pageBtnContainer = document.createElement('div')
pageBtnContainer.classList.add('pageBtnContainer')


const getData = async function (props, variants) {
    try {
        console.log(`${props.BASE_URL}${variants ? variants : 'posts'}?_limit=${props.limit}&_page=${props.page}`)
        let response = await fetch(`${props.BASE_URL}${variants ? variants : 'posts'}?_limit=${props.limit}&_page=${props.page}`);
        let result = await response.json();
        return result
    } catch (e) {
        console.log(e)
    }
}

const getLength = async function (props, variants) {
    try {
        let response = await fetch(`${props.BASE_URL}${variants ? variants : 'posts'}?_limit=180`);
        let result = await response.json();
        return result.length
    } catch (e) {
        console.log(e)
    }
}
/*
 функция getCount сделана только потому что не смог достать значение 'X-Total-Count' из headers
 браузер его показывает в заголовке ответов, однако в response(response.headers) его нет
*/
const getCount = async function (props, variants) {
    data.count = await getLength(props, variants);
    renderSelect(props, variants)
}

function getUppFirstEl(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

function renderVarButton(props) {
    console.log({ ...props })
    getCount(props)
    for (let key in variantsButton) {
        const button = document.createElement('button');
        button.innerHTML = `${getUppFirstEl(key)}`;
        button.classList.add('variantsButton');
        button.addEventListener('click', () => {
            props.limit = 10;
            props.page = 1;
            getCount(props, variantsButton[key]);
            renderCards(props, variantsButton[key])
        })
        buttonContainer.appendChild(button)
    }
}

function renderSelect(props, variants) {
    pageContainer.innerHTML = ''
    pageContainer.appendChild(pageBtnContainer)
    const selectList = document.createElement("select");
    selectList.classList.add = "selectList";
    selectList.id = 1
    for (let opt of [10, 20, 30]) {
        let option = document.createElement("option");
        option.value = opt;
        option.text = opt;
        selectList.appendChild(option);
    }
    renderPadination(props, variants)
    selectList.addEventListener('change', (e) => {
        props.limit = e.target.value;
        renderPadination(props, variants)
    })

    pageContainer.prepend(selectList);
}

function renderPadination(props, variants) {
    pageBtnContainer.innerHTML = ''
    for (let i = 0; i < (props.count / props.limit); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerHTML = `${i * props.limit + 1} - ${(i + 1) * props.limit} `
        pageBtn.addEventListener('click', () => {
            data.page = i + 1
            renderCards(props, variants)
        })
        pageBtnContainer.appendChild(pageBtn)
    }
}

async function renderCards(props, variants) {
    let cards = await getData(props, variants);
    cardsContainer.innerHTML = ` <h1>${getUppFirstEl(variants)}:</ h1> `
    for (let card of cards) {
        const cardDiv = document.createElement('div');
        for (let property in card) {
            switch (property) {
                case property == 'thumbnailUrl':
                    cardDiv.innerHTML += `<img src='${card[property]}'/>`;
                    cardDiv.classList.add('cardWImg');
                    break;
                case property == "company":
                    cardDiv.innerHTML += `<span>${getUppFirstEl(property)}:</span> ${card[property]['name']} <br/>`
                    break;
                case property == "address":
                    cardDiv.innerHTML += `<span>${getUppFirstEl(property)}:</span> ${card[property]['city']}, ${card[property]["street"]}, ${card[property]["suite"]} <br/>`
                    break;
                default:
                    cardDiv.innerHTML += `<span>${getUppFirstEl(property)}:</span> ${card[property]} <br/>`
            }
            /* Ранее никогда не использовал, но кажется в данной ситуации приятнее чем if else*/
        }
        cardDiv.innerHTML += `<hr/>`
        cardDiv.classList.add('cardDiv');
        cardsContainer.appendChild(cardDiv)
    }
}

function fullRenderMainView(props) {
    renderVarButton(props)
    renderCards(props, 'posts')
}

fullRenderMainView(data)

