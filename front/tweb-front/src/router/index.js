import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/components/auth/Login-auth.vue';
import Register from '@/components/auth/Registration-auth.vue';
import Home from '@/components/Home-page.vue';
import Profile from '@/components/Profile-page.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/exchanges',
        name: 'Login',
        component: Login,
    },
    {
        path: '/articles',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/Profile',
        name: 'Profile',
        component: Profile,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;