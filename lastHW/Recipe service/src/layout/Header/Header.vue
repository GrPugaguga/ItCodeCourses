<template>
    <div class="header">
        <div class="container">
            <VH :size="'M'" :body="'Recipe service'" class="logo" @click="$router.push('/')"></VH>
            <svg width="800px" height="800px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" class="svg profile" @click="$router.push('/day')">

                <title>profile [#1341]</title>
                <desc>Created with Sketch.</desc>
                <defs>

                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#000000">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                                d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                                id="profile-[#1341]">

                            </path>
                        </g>
                    </g>
                </g>
            </svg>


            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="svg search" @click="isOpen = !isOpen">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
                    fill="#000000" />
            </svg>
        </div>
        <div class="infoContainer" :class="{ isOpen: isOpen }">
            <hr />
            <div class="input">
                <input placeholder="Введите ваш запрос" v-model="recipeStore.searchQuery" @input="() => debouncedFn()"
                    @keydown="(e) => {
                        if (e.key == 'Enter') {
                            recipeStore.getRecipes(recipeStore.searchQuery)
                            $router.push('/')
                        }


                    }" />
            </div>
            <div class="options">
                <select class="diet" @change="(event) => { recipeStore.options.diet = event.target.value }">
                    <option value="">diet</option>
                    <option value="balanced">balanced</option>
                    <option value="high-fiber">high-fiber</option>
                    <option value="high-protein">high-protein</option>
                    <option value="low-carb">low-carb</option>
                    <option value="low-fat">low-fat</option>
                </select>
                <select class="health" @change="(event) => { recipeStore.options.health = event.target.value }">
                    <option value="">health</option>
                    <option value="alcohol-cocktail">alcohol-cocktail</option>
                    <option value="alcohol-free">alcohol-free</option>
                    <option value="celery-free">celery-free</option>
                    <option value="crustacean-free">crustacean-free</option>
                    <option value="dairy-free">dairy-free</option>
                    <option value="egg-free">egg-free</option>
                    <option value="fodmap-free">fodmap-free</option>
                    <option value="gluten-free">gluten-free</option>
                    <option value="immuno-supportive">immuno-supportive</option>
                    <option value="keto-friendly">keto-friendly</option>
                    <option value="kidney-friendly">kidney-friendly</option>
                    <option value="low-sugar">low-sugar</option>
                    <option value="no-oil-added">no-oil-added</option>
                    <option value="pork-free">pork-free</option>
                    <option value="red-meat-free">red-meat-free</option>
                    <option value="vegan">vegan</option>
                    <option value="vegatarian">vegatarian</option>
                    <option value="wheat-free">wheat-free</option>
                </select>
                <select class="mealType" @change="(event) => { recipeStore.options.mealType = event.target.value }">
                    <option value="">mealtype</option>
                    <option value="Breakfast">breakfast</option>
                    <option value="Dinner">dinner</option>
                    <option value="Lunch">lunch</option>
                    <option value="Snack">snack</option>
                    <option value="Teatime">teatime</option>
                </select>
                <select class="dishType" @change="(event) => { recipeStore.options.dishType = event.target.value }">
                    <option value="">dishtype</option>
                    <option value="Biscuits%20and%20cookies">biscuits and cookies</option>
                    <option value="Bread">bread</option>
                    <option value="Cereals">cereals</option>
                    <option value="Condiments%20and%20sauces">condiments and sauces</option>
                    <option value="Dessetrs">dessetrs</option>
                    <option value="Drinks">drinks</option>
                    <option value="Main%20course">main course</option>
                    <option value="Pancake">pancake</option>
                    <option value="Preps">preps</option>
                    <option value="Preserve">preserve</option>
                    <option value="Salad">salad</option>
                    <option value="Sandwiches">sandwiches</option>
                    <option value="Side%20dish">side dish</option>
                    <option value="Soup">soup</option>
                    <option value="Starter">starter</option>
                    <option value="Sweets">sweets</option>
                </select>
            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
import VP from '../../components/VP.vue';
import VH from '../../components/VH.vue';
import { useRecipeStore } from '../../services/store/recipeStore';
import { onMounted, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core'

const recipeStore = useRecipeStore();
const isOpen = ref(false)

const debouncedFn = useDebounceFn(() => recipeStore.getRecipes(recipeStore.searchQuery), 400)

</script>
<style lang="scss">
.header {
    align-items: center;
    background-color: #fff;
    z-index: 1000;
    padding: 30px 0;
    width: 100vw;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);

    svg {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        cursor: pointer;
    }

    .container {
        display: grid;
        grid-template-columns: 15vw [start] auto [logoend] 1fr [buttonstart] auto [firstbtnend] 20px [secondbtnstart] auto [end] 15vw;


        .logo {
            grid-column: start/logoend;
            cursor: pointer;
        }

        .profile {
            grid-column: buttonstart/firstbtnend;
            cursor: pointer;
        }

        .search {
            grid-column: secondbtnstart/end;
            cursor: pointer;
        }
    }


    .infoContainer {
        margin-top: 10px;
        margin-bottom: 30px;
        display: grid;
        grid-template-columns: 12vw [q] 1vw [start] 1fr [end] 3vw [w] 12vw;
        gap: 7px;
        padding: 0;
        align-items: start;
        display: none;

        .options {
            grid-column: start/end;
            margin-top: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 10px;

            select {
                font-weight: 500;
                font-size: 16px;
                line-height: 18px;
                padding: 7px 14px;
                border-radius: 15px;
                border: 2px solid #5959616b;
                cursor: pointer;
                appearance: none;
            }
        }

    }

    hr {
        margin-bottom: 15px;
        margin-top: 15px;
        margin-left: 0px;
        width: 100%;
        height: 1px;
        border: none;
        background-color: #28375738;
        grid-column: q/w;
    }

    .input {
        padding: 0px;
        width: 100%;
        grid-column: start/end;
        justify-content: space-between;
    }

    input {
        background-image: linear-gradient(97deg, #f0efef, #eee);
        border: 0;
        outline: none;
        height: 36px;
        width: 100%;
        padding: 5px 17px;
        border-radius: 20px;
        align-self: center;
        font-size: 22px;
        line-height: 28px;
        margin-left: 0px;
        margin-top: 30px
    }

    .isOpen {
        display: block;
        display: grid;
    }

    .links {
        grid-column: start/end;
        display: grid;
        gap: 30px
    }

}
</style>