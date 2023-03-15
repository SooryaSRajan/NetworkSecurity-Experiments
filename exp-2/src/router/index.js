import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory('/'),
  routes: [
    {
      path: '/',
      name: 'experiment-view',
      component: () => import('../views/ExperimentPage.vue')
    },
    {
      path: '/simulation',
      name: 'simulation-view',
      component: () => import('../views/SimulationPage.vue')
    },
  ]
})

export default router
