import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// 页面刷新时，重新赋值token
/*if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}*/

const routers = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/home/login/login'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/home/register/register'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/genius',
      name: 'genius',
      component: () => import('@/home/genius/genius'),
      meta: {
        requireAuth: true
      },
      redirect:'/genius/geniusContainer',
      children:[
        {
          path:'geniusContainer',
          name:'geniusContainer',
          component: () => import('@/common/boss/bossList'),
          meta: {requireAuth: true}
        },
        {
          path:'msg',
          name:'msg',
          component: () => import('@/common/msg/msg'),
          meta: {requireAuth: true}
        },
        {
          path:'person',
          name:'person',
          component: () => import('@/common/person/person'),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/geniusInfo',
      name: 'geniusInfo',
      component: () => import('@/home/geniusInfo/geniusInfo'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/boss',
      name: 'boss',
      component: () => import('@/home/boss/boss'),
      meta: {
        requireAuth: true
      },
      redirect:'/boss/bossList',
      children:[
        {
          path:'bossList',
          name:'bossList',
          component: () => import('@/common/boss/bossList'),
          meta: {requireAuth: true}
        },
        {
          path:'msg',
          component: () => import('@/common/msg/msg'),
          meta: {requireAuth: true}
        },
        {
          path:'person',
          component: () => import('@/common/person/person'),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/bossinfo',
      name: 'bossInfo',
      component: () => import('@/home/bossInfo/bossInfo'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/common/chat/chat'),
      meta: {
        requireAuth: true
      }
    }
  ]
})

routers.beforeEach((to, from, next) => {

  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {

    // 如果已经是登录或者注册页面，不需要请求
    const publicList = ['/login', '/register']
    if (publicList.indexOf(to.fullPath) > -1) {
      next()
      return;
    }

    store.dispatch('authRoute').then(res => {
      next()
    }).catch(err => {
      console.log(err)
      next({path: '/login'})
    })

  } else {
    next();
  }
})

export default routers;
