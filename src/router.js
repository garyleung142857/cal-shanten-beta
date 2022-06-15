import Router from 'vue-router'

const HomePage = () => import('./views/HomePage')

export const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: HomePage, name: 'HomePage'}
  ]
})