import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home    from '../views/Home.vue';
import Article from '../views/Article.vue';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/article',
        name: 'Article',
        component: Article
    },

    {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat.vue'),
    },

    {
        path: '/project',
        name: 'Project',
        component: () => import('../views/Project.vue'),
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
