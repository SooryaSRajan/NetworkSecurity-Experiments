import { createRouter, createMemoryHistory } from 'vue-router'
import ExperimentView from '../views/ExperimentPage.vue'
import SimulationView from '../views/SimulationPage.vue'

const router = createRouter({
  history: createMemoryHistory('/'),
  routes: [
    {
      path: '/',
      name: 'experiment-view',
      component: () => ExperimentView
    },
    {
      path: '/simulation',
      name: 'simulation-view',
      component: () => SimulationView    
    },
  ]
})

export default router
