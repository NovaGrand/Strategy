const views = import.meta.glob('@/views/**/index.js')


import home from '../views/home/'
let routes = [
    {
        path: '/', name:'Home',
        component: home
    },
    {
        path: '/learn_1', name:'Learn_1',
        component: views['/src/views/babylon/learn_1/index.js']
    },
    {
        path: '/:pathMatch(.*)*',
        name:'error',
        redirect: '/',
    },
]
export default routes