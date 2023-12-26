<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRecipeStore } from '../services/store/recipeStore';
import {
    useRoute
} from 'vue-router'
import VP from '../components/VP.vue'
import VH from '../components/VH.vue'
import VButton from '../components/VButton.vue'
import VLoader from '../components/VLoader.vue'

const route = useRoute()
const recipeStore = useRecipeStore();
console.log(`${route.params.id}`)
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
    }

}
let change;

onMounted(() => {
    recipeStore.getCourse(`${route.params.id}`)
    change = recipeStore.thisDayInfo.Courses.length
})
onUnmounted(() => {
    if (change == recipeStore.thisDayInfo.Courses.length) { return }

    for (let saveElem in LOCALSTORAGE) {
        if (saveElem != `COURSES`) {
            window.localStorage.setItem(`${saveElem}`, `${Number(window.localStorage.getItem(`${saveElem}`)) + Number(recipeStore.thisDayInfo.fullNutritions[saveElem])}`)
        }

    }
    for (let course of recipeStore.thisDayInfo.Courses) {
        console.log(course.label)
        window.localStorage.setItem(`COURSES`, `${window.localStorage.getItem(`COURSES`) + ' ,' + course.label}`)
    }

})

let showModal = ref(false);
let data = ref({
    courseInfo: {},
    gr: 100
})

function getCourseId(url: string) {
    let startInd = url.lastIndexOf('/'),
        endInd = url.indexOf('?');
    return url.slice(startInd, endInd)
}
</script>

<template>
    <div>
        <VLoader v-if="recipeStore.isLoaded" class="load"></VLoader>
        <div v-else-if="recipeStore.Course.recipe" :class="{ 'course': true, 'blur': showModal }">
            <div class="image">
                <img :src="recipeStore.Course.recipe.images.REGULAR.url" />


                <div class="calories">

                    <span>Вес Порции {{ Math.round(recipeStore.Course.recipe.totalWeight) }}</span>
                    <br />
                    <span>Калории {{ Math.round(recipeStore.Course.recipe.calories) }}</span>
                    <br />
                    <span>Белки {{
                        Math.round(recipeStore.Course.recipe.totalNutrients.FAT.quantity)
                    }}</span>
                    <span>Жиры {{
                        Math.round(recipeStore.Course.recipe.totalNutrients.PROCNT.quantity) }} </span>
                    <span>Углеводы {{
                        Math.round(recipeStore.Course.recipe.totalNutrients.CHOCDF.quantity) }} </span>
                    <br />
                </div>
                <VButton :class="'white'" :body="'  Добавить  '" :onclick="() => {
                    showModal = true
                }"></VButton>


            </div>
            <div class="info">
                <VH :size="'L'" :body="recipeStore.Course.recipe.label" class="modalLabel"></VH>
                <div class="ingridients">
                    <VP :size="'L'" :body="'Ингридиенты:'"></VP>
                    <VP :size="'M'" :body="ing.text" v-for="ing of recipeStore.Course.recipe.ingredients"></VP>
                </div>
                <div class="method">
                    <VP :size="'L'" :body="'Рецепт:'"></VP>
                    <VP :size="'M'" :body="ing" v-for="ing of recipeStore.Course.recipe.instructionLines"></VP>
                </div>
            </div>


        </div>
        <div class="tags">
            <div class="tag" v-for="tag of recipeStore.Course.recipe.healthLabels"
                v-if="recipeStore.Course.recipe && !recipeStore.isLoaded">
                {{ tag }}
            </div>
        </div>

        <div :class="{ 'modalWindow': true, showModal }" v-if="recipeStore.Course.recipe">
            <VH :size="'M'" :body="'Добавить блюдо'" class="modalLabel"></VH>
            <div class="kkal">
                <VP :size="'L'" :body="'Калорий в порции:'"></VP>
                <VP :size="'M'"
                    :body="Math.round((recipeStore.Course.recipe.calories / recipeStore.Course.recipe.totalWeight) * data.gr)">
                </VP>
            </div>

            <input type=" text" placeholder="Введите вес порции" v-model="data.gr" class="modalInput" />
            <VButton :class="'white'" :body="'  Добавить  '" :onclick="() => {
                recipeStore.setCourseToDay(recipeStore.Course.recipe.label, data.gr, Math.round(recipeStore.Course.recipe.calories / recipeStore.Course.recipe.totalWeight * data.gr), Math.round(recipeStore.Course.recipe.totalNutrients.FAT.quantity), Math.round(recipeStore.Course.recipe.totalNutrients.PROCNT.quantity), Math.round(recipeStore.Course.recipe.totalNutrients.CHOCDF.quantity));
                showModal = false
            }"></VButton>
            <VButton :class="'blue'" :body="'  Отменить  '" :onclick="() => {
                showModal = false
            }"></VButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
hr {
    width: 80%;
    height: 1px;
    border: none;
    background-color: #406dcf50;
    margin-top: 50px;
}

.load {
    left: 10vw;
}

.course {
    margin-left: 14vw;
    margin-top: 70px;
    min-height: 80vh;
    display: grid;
    grid-template-columns: 300px 1fr;
    width: 80vw;
    word-wrap: break-word;

    .image {
        display: flex;
        flex-direction: column;
        gap: 30px;


        img {
            width: 300px;
            height: 300px;
            border-radius: 15px;
        }

        span {
            font-size: 18px;
            line-height: 29px;
            margin-right: 10px;
        }
    }



}

.tags {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    gap: 12px;
    width: 80vw;
    margin-bottom: 30px;

    .tag {
        border: solid 3px #406ecf;
        background-color: #fff;
        color: #406ecf;
        border-radius: 20px;
        padding: 5px 10px;
        font-size: 18px;
        line-height: 25px;
        font-weight: 500;
        align-items: center;
        justify-content: center;
        width: auto;
        white-space: nowrap;
    }
}

.modalWindow {
    width: 300px;
    height: 0px;

    gap: 7px;
    background: rgba(220, 220, 220, .7);
    position: absolute;
    display: none;
    display: grid;
    grid-template-columns: 1fr;
    top: 200px;
    right: 0;
    left: 0;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .4);
    border-radius: 30px;
    overflow: hidden;
    z-index: 10000;

    .modalInput {
        margin-bottom: -30px;
    }

    .modalInput {
        background-image: linear-gradient(97deg, #f0efef, #eee);
        border: 0;
        outline: none;
        height: 36px;
        padding: 5px 17px;
        border-radius: 20px;
        align-self: center;
        font-size: 22px;
        line-height: 28px;
        margin-left: 0px;
        margin-bottom: 20px;
    }
}

.showModal {
    height: auto;
    padding: 21px;
}

.blur {
    filter: blur(10px);
}
</style>
