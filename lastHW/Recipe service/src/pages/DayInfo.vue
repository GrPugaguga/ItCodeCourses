<script setup lang="ts">
import VP from '../components/VP.vue'
import { ref } from 'vue'
const LOCALSTORAGE = {
    COURSES: '',
    gr: 0,
    calories: 0,
    fat: 0,
    protein: 0,
    carbonads: 0
}


for (let saveElem in LOCALSTORAGE) {
    if (!window.localStorage.getItem(`${saveElem}`)) {
        window.localStorage.setItem(`${saveElem}`, `${LOCALSTORAGE[saveElem]}`)
    } else {
        LOCALSTORAGE[saveElem] = window.localStorage.getItem(`${saveElem}`)
    }
}
if (!window.localStorage.getItem(`weight`) || !window.localStorage.getItem(`water`)) {
    window.localStorage.setItem(`weight`, '75')
    window.localStorage.setItem(`water`, `1500`)
}

let weight = ref(Number(window.localStorage.getItem(`weight`))),
    water = Number(window.localStorage.getItem(`water`));

function changeWeight(e: string) {
    switch (e) {
        case "-": weight.value -= 1;
            break;
        case "+": weight.value += 1;
            break;
    }
    window.localStorage.setItem(`weight`, `${weight.value}`)

}


</script>

<template>
    <div class="body">

        <div class="calories card">
            <h1 class="hcalories">Сводка </h1>
            <div class="nutritions">
                <div class="totalCalories">
                    <div class="plan cal">{{ Math.round(LOCALSTORAGE.calories) }} cal</div>
                    <div class="real cal">2000 cal</div>
                    <div class="label">Сьедено</div>
                    <div class="label">Цель</div>
                </div>
                <div class="fpc"><span>Белки {{ LOCALSTORAGE.protein }} </span>
                    <span>Жиры {{ LOCALSTORAGE.fat }}</span>
                    <span>Углеводы {{ LOCALSTORAGE.carbonads }} </span>
                </div>

                <br />
            </div>
            <hr />
            <div class="foodList">
                <VP :size="'M'" :body="'Приемы пищи:'"></VP>
                <span v-for="text of LOCALSTORAGE.COURSES.split(',')">{{ text }}</span>
            </div>
        </div>

        <div class="weight card">
            <h1 class="hweight">Измерения тела</h1>
            <div class="realWeight">Вес</div>
            <div class="planWeight">Цель: 65</div>
            <div class="actionInfo">
                <button @click="() => { changeWeight('-') }">-</button>
                <div class="number">
                    {{ weight }}
                </div>
                <button @click="() => { changeWeight('+') }">+</button>
            </div>
        </div>

        <div class="water card">
            <h1 class="hwater">Отслеживание выпитой воды</h1>
            <div class="glases">

                <svg fill="#000000" width="80px" height="50px" viewBox="0 0 24 24" id="glass-water" data-name="Flat Line"
                    xmlns="http://www.w3.org/2000/svg" class="svg full" v-for="q of [1, 2, 3, 4, 5, 67, 8, 9]">
                    <path id="secondary" d="M18.45,9,17.22,20.11a1,1,0,0,1-1,.89H7.78a1,1,0,0,1-1-.89L5.55,9Z"
                        style="fill: rgb(43, 40, 218); stroke-width: 2;"></path>
                    <path id="primary"
                        d="M5.55,9h12.9M6,3A1,1,0,0,0,5,4.11l1.77,16a1,1,0,0,0,1,.89h8.44a1,1,0,0,0,1-.89L19,4.11A1,1,0,0,0,18,3Z"
                        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                    </path>
                </svg>
                <svg fill="#000000" width="80px" height="50px" viewBox="0 0 24 24" id="glass-water" data-name="Flat Line"
                    xmlns="http://www.w3.org/2000/svg" class="svg full" v-for="q of [1, 2, 3, 4, 5, 67, 8, 9]">
                    <path id="secondary" d="M18.45,9,17.22,20.11a1,1,0,0,1-1,.89H7.78a1,1,0,0,1-1-.89L5.55,9Z"
                        style="fill: rgb(255, 255, 255); stroke-width: 2;"></path>
                    <path id="primary"
                        d="M5.55,9h12.9M6,3A1,1,0,0,0,5,4.11l1.77,16a1,1,0,0,0,1,.89h8.44a1,1,0,0,0,1-.89L19,4.11A1,1,0,0,0,18,3Z"
                        style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                    </path>
                </svg>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.body {
    margin-top: 40px;
    display: grid;
    grid-template-areas:
        "calories calories weight"
        "water water water";
    gap: 30px;

    .card {
        margin-top: 50px;
        border-radius: 15px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
        position: relative;
        height: 440px;

        hr {
            width: 80%;
            height: 1px;
            border: none;
            background-color: #406dcf50;
        }
    }

    .calories {
        background-color: #fff;
        grid-area: calories;
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 20px;
        max-height: 400px;

        .totalCalories {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-content: center;
            margin-top: 50px;
            margin-left: 20%;

            .label {
                font-size: 28px;
            }

            .cal {
                font-size: 12px;
            }
        }

        .fpc {
            font-size: 22px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            margin-left: 10%;
            margin-top: 30px;
        }

        .foodList {
            display: grid;
            grid-template-columns: repeat(auto-fit, 1fr);
            margin-left: 10%;
            justify-content: space-between;
            gap: 5px;
        }
    }

    .weight {
        background-color: #6e6e77;
        color: #fff;
        min-width: 150px;
        grid-area: weight;
    }

    .water {
        background-color: #7197e9f3;
        color: #fff;
        grid-area: water;
        padding: 10px;
        height: 200px;


        .svg {
            height: 100px;
            width: 50px;
            cursor: pointer;
        }

    }

    h1 {
        position: absolute;
        top: -55px;
        color: black;
        font-weight: 700;
        font-size: 24px;
        white-space: nowrap;
    }


    .weight {
        display: grid;
        grid-template-columns: 1fr;


        .realWeight {
            margin-top: 30px;
            font-size: 48px;
            justify-self: center;
        }

        .planWeight {
            margin-top: 30px;
            font-size: 24px;
            justify-self: center;
            align-self: start;
        }

        .actionInfo {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            justify-items: center;
            align-items: center;
            margin-bottom: 30px;

            .number {
                font-size: 96px;
            }

            button {
                width: 50px;
                height: 50px;
                cursor: pointer;
                border-radius: 100%;
                font-size: 22px;
                background: rgba(196, 196, 196, .9);
                border: none;
                justify-items: center;
                align-items: center;
            }

        }
    }
}
</style>
