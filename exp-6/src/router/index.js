import { createRouter, createMemoryHistory } from 'vue-router'
import ExperimentView from '../views/ExperimentPage.vue'
import SimulationView from '../views/SimulationPage.vue'

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
