import { defineStore } from "pinia";
import { recipes } from "../api";

export const useRecipeStore = defineStore('recipeStore', {
    state: () => ({
        Courses: [],
        Course: '',
        thisDayInfo: {
            Courses: [],
            fullNutritions: {
                gr: 0,
                calories: 0,
                fat: 0,
                protein: 0,
                carbonads: 0

            },
            water: 0
        },
        searchQuery: '',
        options: {
            diet: '',
            health: '',
            mealType: '',
            dishType: '',
            calories: '',
        },
        isLoaded: false,
        error: ''
    }),
    actions: {
        getRecipes(q: string) {
            this.isLoaded = true
            return recipes.fetchRecipes(q, this.options.diet, this.options.health, this.options.mealType, this.options.dishType, this.options.calories).then(({ data }) => {
                this.isLoaded = false
                return this.Courses = data
            })
        },
        getCourse(id: string) {
            this.isLoaded = true
            console.log(id)
            return recipes.fetchCourse(id).then(({ data }) => {
                this.isLoaded = false
                return this.Course = data
            })
        },
        setCourseToDay(label: string, gr: number, calories: number, fat: number, protein: number, carbonads: number) {
            const obj = {
                label,
                gr,
                calories,
                fat,
                protein,
                carbonads
            }
            this.thisDayInfo.Courses.push(obj)
            for (let e of Object.keys(obj)) {
                if (e != label) {
                    this.thisDayInfo.fullNutritions[e] += obj[e]
                    console.log(this.thisDayInfo.fullNutritions[e])

                }

            }



            console.log(this.thisDayInfo.Courses)
            return
        },
        getError(code: number) {
            return this.error = `https://http.cat/[${code}]`
        }
    }
})