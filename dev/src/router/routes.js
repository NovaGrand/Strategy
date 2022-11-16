// const views = import.meta.glob('@/views/**/index.js') // vite专用

import home from '@/views/home/'

let routes = [
    {
        path: '/', name:'Home',
        component: home
    },
    {
        path: '/babylon', name:'babylon',
        component: () => import('@/views/babylon/learn_1')
    },
    {
        path: '/compositionAPI', name:'compositionAPI',
        component: () => import('@/views/compositionAPI')
    },
    {
        path: '/:pathMatch(.*)*',
        name:'error',
        redirect: '/',
    },
]
export default routes