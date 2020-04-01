import router, { asyncRoutes, editorRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/layout'
import { getMenu } from '@/api/user'
import { resolvePlugin } from '@babel/core'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  const time = new Date().getTime()
    if (!store.getters.timeOut || time > store.getters.timeOut) {
      console.log('请求access')
      const access = await store.dispatch('user/getAccessToken')
      console.log(access);
      
    }
    
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // 404页面要最后添加到底部
  const errUrl = [
  // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }]

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('name:', store.getters.name);
      
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo != '') {
        next()
      } else {
        try {
          console.log('获取用户信息');
          console.log(store.getters.timeOut);
          
          // 获取用户信息
          await store.dispatch('user/getInfo')
          // 获取用户权限，返回{code：***, data: ['***']}
          console.log('信息获取完成');
          
          // const role = await getMenu()
          // 判断权限
          if (store.getters.roles == 'admin') {
            // 在router中添加路由
            router.addRoutes(asyncRoutes.concat(errUrl))
            // 在vuex中设置完整路由
            store.dispatch('user/addMenu', asyncRoutes.concat(errUrl))
          } else {
            router.addRoutes(editorRoutes.concat(errUrl))
            store.dispatch('user/addMenu', editorRoutes.concat(errUrl))
          }

          // 侧边栏根据router.options.routes渲染，需要绑定到store里的routes侧边栏才能显示
          router.options.routes = store.getters.routes

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
