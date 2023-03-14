import { createRouter, createMemoryHistory } from 'vue-router'
import ExperimentView from '../views/ExperimentPage.vue'
import SimulationView from '../views/SimulationPage.vue'

const router = createRouter({
  history: createMemoryHistory('/'),
  routes: [
    {
      path: '/experiment',
      name: 'experiment-view',
      component: () => ExperimentView
    },
    {
      path: '/',
      name: 'simulation-view',
      component: () => SimulationView
    },
  ]
})

export default router
