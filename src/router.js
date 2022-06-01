import Router from 'vue-router'

const HomePage = () => import('./views/HomePage')

export const router = new Router({
  mode: 'history',
  base: '/cal-shanten-beta',
  routes: [
    {path: '/', component: HomePage, name: 'HomePage'}
  ]
})