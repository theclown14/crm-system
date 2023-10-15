import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'empty',
        },
        component: () => import('../views/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            layout: 'empty',
        },
        component: () => import('../views/RegisterPage.vue'),
    },
    {
        path: '/',
        name: 'home',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/HomeView.vue'),
    },

    {
        path: '/categories',
        name: 'categories',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/CategoriesPage.vue'),
    },
    {
        path: '/detail-record',
        name: 'detail-record',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/DetailRecordPage.vue'),
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/HistoryPage.vue'),
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/PlanningPage.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/ProfilePage.vue'),
    },
    {
        path: '/record',
        name: 'record',
        meta: {
            layout: 'main',
        },
        component: () => import('../views/RecordPage.vue'),
    },
];

const router = new VueRouter({
    // history: createWebHashHistory(),
    mode: 'history',
    routes,
});

export default router;
