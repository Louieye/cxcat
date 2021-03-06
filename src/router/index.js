import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '课堂管理', icon: 'lanmuguanli' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/course-manage/reply'),
        meta: { title: '课程反馈', icon: 'shiyongwendang' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/course-manage/test'),
        meta: { title: '小测验管理', icon: 'ceshishenqing' }
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('@/views/course-manage/student'),
        meta: { title: '学生管理', icon: 'student' }
      },
      {
        path: 'look',
        name: 'Look',
        component: () => import('@/views/course-manage/look'),
        hidden: true,
        meta: { title: '内容查看', icon: 'shiyongwendang' }
      }
    ]
  },
  {
    path: '/works',
    component: Layout,
    redirect: '/works/index',
    name: 'works',
    meta: { title: '作品管理', icon: 'lanmuguanli' },
    children: [
      {
        path: 'index',
        name: 'works-all',
        component: () => import('@/views/works/index'),
        meta: { title: '作品管理', icon: 'icon_yingyongguanli' }
      },
      {
        path: 'upload',
        name: 'works-upload',
        component: () => import('@/views/works/upload'),
        meta: { title: '作品上传', icon: 'shangchuan' }
      }
    ]
  },

  {
    path: '/reply',
    component: Layout,
    redirect: '/reply/index',
    children: [{
      path: 'index',
      name: 'reply',
      component: () => import('@/views/reply/index'),
      meta: { title: '课程预约', icon: 'form' }
    }]
  },
  {
    path: '/myInfo',
    component: Layout,
    redirect: '/myInfo/index',
    children: [{
      path: 'index',
      name: 'myInfo',
      component: () => import('@/views/myInfo/index'),
      meta: { title: '个人信息', icon: 'user' }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    hidden: true,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  }
]
// 权限路由
export const asyncRoutes = [
  {
    path: '/my-table',
    component: Layout,
    redirect: '/my-table/today',
    name: 'course',
    meta: { title: '课表管理', icon: 'table' },
    children: [
      {
        path: 'today',
        name: 'today',
        component: () => import('@/views/my-table/today'),
        meta: { title: '今日课表', icon: 'daibanshixiang' }
      },
      {
        path: 'all-course',
        name: 'all-course',
        component: () => import('@/views/my-table/all'),
        meta: { title: '全部课表', icon: 'biaoge' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    name: 'goods',
    meta: { title: '课程管理', icon: 'table' },
    children: [
      {
        path: 'index',
        name: 'goods-index',
        component: () => import('@/views/goods/index'),
        meta: { title: '课程管理', icon: 'lanmuguanli' }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    redirect: '/address/index',
    name: 'address',
    meta: { title: '地址管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/address/index'),
        meta: { title: '地址管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'permission-index',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限管理', icon: 'password' }
      }
    ]
  }
]

export const editorRoutes = [
  {
    path: '/my-table',
    component: Layout,
    redirect: '/my-table/today',
    name: 'my-table',
    meta: { title: '我的课表', icon: 'table' },
    children: [
      {
        path: 'today',
        name: 'today',
        component: () => import('@/views/my-table/today'),
        meta: { title: '今日课表', icon: 'example' }
      },
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/my-table/all'),
        meta: { title: '全部课表', icon: 'example' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
