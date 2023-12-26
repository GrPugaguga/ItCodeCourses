<script setup lang="ts">
import VP from '../components/VP.vue'
import VH from '../components/VH.vue'
import VButton from '../components/VButton.vue'
import VLoader from '../components/VLoader.vue'
import { onMounted, ref, onUnmounted, } from 'vue';
import { useRecipeStore } from '../services/store/recipeStore';

const recipeStore = useRecipeStore();
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

let change;
onMounted(() => {
    recipeStore.getRecipes(recipeStore.searchQuery);
    change = recipeStore.thisDayInfo.Courses.length
})

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

</script>

<template>
    <div>
        <div :class="{ 'body': true, 'blur': showModal }">
            <VLoader v-if="recipeStore.isLoaded"></VLoader>
            <div v-else v-for="course of recipeStore.Courses['hits']" class="course">
                <img :src='course.recipe.images.REGULAR.url' />
                <button class="addToDay" @click.prevent="() => {
                    data.courseInfo = course
                    showModal = true
                }">+</button>
                <div class="label" @click="$router.push('course' + getCourseId(course._links.self.href))">
                    <VP :size="'M'" :body="course.recipe.label"></VP>
                    <VP :size="'S'"
                        :body="Math.round(course.recipe.calories) + ' kkal  ' + Math.round(course.recipe.totalWeight) + ' gr'">
                    </VP>
                </div>

            </div>

        </div>
        <div :class="{ 'modalWindow': true, showModal }" v-if="data.courseInfo.recipe">
            <VH :size="'M'" :body="'Добавить блюдо'" class="modalLabel"></VH>
            <div class="kkal">
                <VP :size="'L'" :body="'Калорий в порции:'"></VP>
                <VP :size="'M'"
                    :body="Math.round((data.courseInfo.recipe.calories / data.courseInfo.recipe.totalWeight) * data.gr)">
                </VP>
            </div>

            <input type=" text" placeholder="Введите вес порции" v-model="data.gr" class="modalInput" />
            <VButton :class="'white'" :body="'  Добавить  '" :onclick="() => {
                recipeStore.setCourseToDay(data.courseInfo.recipe.label, +data.gr, (data.courseInfo.recipe.calories / data.courseInfo.recipe.totalWeight) * data.gr, Math.round(recipeStore.Course.recipe.totalNutrients.FAT.quantity), Math.round(recipeStore.Course.recipe.totalNutrients.PROCNT.quantity), Math.round(recipeStore.Course.recipe.totalNutrients.CHOCDF.quantity))
                showModal = false
            }">
            </VButton>
            <VButton :class="'blue'" :body="'  Отменить  '" :onclick="() => {
                showModal = false
            }"></VButton>
        </div>
        <div class="error" v-if="recipeStore.Courses['hits'] == 0">
            <img src='https://http.cat/[${code}]' />
        </div>
    </div>
</template>

<style scoped lang="scss">
.body {
    display: grid;
    grid-template-columns: repeat(auto-fit, 330px);
    justify-content: space-between;
    margin-bottom: 50px;
    position: relative;



    .course {
        margin-top: 30px;
        display: flex;
        width: 300px;
        overflow: hidden;
        cursor: pointer;
        flex-direction: column;
        border-radius: 20px;
        padding: 0px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .3);
        position: relative;

        img {
            width: 300px;
            height: 300px;
        }

        .label {
            margin: 7px 15px;
        }

        .addToDay {
            width: 35px;
            height: 35px;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            border-radius: 100%;
            font-size: 22px;
            background: rgba(196, 196, 196, .7);
            border: none;
        }

        .addToDay:hover {
            background: rgba(196, 196, 196, .9);
        }


    }


}

.error {
    position: absolute;
    left: 23%;
    margin: auto;
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
