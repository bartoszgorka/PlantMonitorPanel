import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

function load (component) {
  return () => System.import(`@/${component}.vue`)
}

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: load('views/Login')
    },
    {
      path: '/',
      component: load('views/Dash'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: load('views/Dashboard'),
          meta: {
            authorize: true
          }
        },
        {
          path: 'data',
          name: 'data',
          component: load('views/Data'),
          meta: {
            authorize: true
          }
        },
        {
          path: 'devices',
          name: 'devices',
          component: load('views/Devices'),
          meta: {
            authorize: true
          }
        },
        {
          path: 'devices/:device_id',
          name: 'device',
          component: load('views/Device'),
          meta: {
            authorize: true
          }
        }
      ]
    },
    {
      path: '*',
      component: load('views/NotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check route require authorize
  if (to.matched.some(record => record.meta.authorize)) {
    if (!store.getters['oauth/checkLogged']) {
      return next({ name: 'login' })
    }
  }

  next()
})

export default router
