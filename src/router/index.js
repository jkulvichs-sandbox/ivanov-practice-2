import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Note from '../views/Note.vue'
import Task1 from '../views/Task1.vue'
import Task2 from '../views/Task2.vue'
import Task3 from '../views/Task3.vue'
import Task4 from '../views/Task4.vue'
import Task5 from '../views/Task5.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/note',
        name: 'Note',
        component: Note
    },
    {
        path: '/task1',
        name: 'Task1',
        component: Task1
    },
    {
        path: '/task2',
        name: 'Task2',
        component: Task2
    },
    {
        path: '/task3',
        name: 'Task3',
        component: Task3
    },
    {
        path: '/task4',
        name: 'Task4',
        component: Task4
    },
    {
        path: '/task5',
        name: 'Task5',
        component: Task5
    },
]

const router = new VueRouter({
    routes
})

export default router
