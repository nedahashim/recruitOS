import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/JobsView.vue')
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: () => import('../views/CandidatesView.vue')
  },
  {
    path: '/interview-prep',
    name: 'InterviewPrep',
    component: () => import('../views/InterviewPrepView.vue')
  },
  {
    path: '/reminders',
    name: 'Reminders',
    component: () => import('../views/RemindersView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router