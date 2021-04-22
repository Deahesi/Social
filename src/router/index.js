import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app"

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'None',
        meta: {auth: true},
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Profile')
    },
    {
        path: '/messages',
        name: 'Messages',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Messages')
    },
    {
        path: '/messages/:id',
        name: 'Dialog',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Dialog')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Settings')
    },
    {
        path: '/friends',
        name: 'Friends',
        meta: {layout: 'main', auth: true},
        component: () => import('../views/Friends')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(rec => rec.meta.auth)
    
    
    if (to.name === 'None') {
        if (requireAuth && !currentUser) {
            next('/login?message=login')
        } else {
            next(`/profile/${currentUser.uid}`)
        }
    } else {
        if (requireAuth && !currentUser) {
            next('/login?message=login')
        } else {
            next()
        }
    }
})

export default router
