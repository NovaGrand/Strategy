const views = import.meta.glob('@/views/**/index.js')
// console.log(views)


import home from '../views/home/'
let routes = [
    {
        path: '/', name:'Home',
        component: home
    },
    {
        path: '/:pathMatch(.*)*',
        name:'error',
        redirect: '/',
    },
]
export default routes