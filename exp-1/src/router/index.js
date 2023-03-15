import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/experiment',
      name: 'experiment-view',
      component: () => import('../views/ExperimentPage.vue')
    },
    {
      path: '/',
      name: 'simulation-view',
      component: () => import('../views/SimulationPage.vue')
    },
  ]
})

export default router
