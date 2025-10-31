import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/views/CurrentAnime.vue')
  },

    {
      path:'/current-season',
      name:'CurrentSeason',
      component: () => import('@/views/CurrentAnime.vue')
    },{
      path:'/season/:year/:season',
      name:'SeasonView',
      component: () => import('@/views/SeasonView.vue')
    },
    {
      path:'/anime/search/:name',
      name:'targetAnime',
      component: () => import('@/views/ParticularAnime.vue')
    },
//     {
//   path: '/search',
//   name: 'Search',
//   component: () => import('@/views/ParticularAnime.vue') // reuse for search
// }


  ],
})

export default router
