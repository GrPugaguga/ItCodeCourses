import Main from "../pages/Main.vue"
import Course from "../pages/Course.vue"
import DayInfo from "../pages/DayInfo.vue"
import { createRouter, createWebHistory } from "vue-router"


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/course/:id',
        component: Course
    },
    {
        path: '/day',
        component: DayInfo
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router