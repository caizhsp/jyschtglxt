import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

Vue.use(Router)

function hasUrl(url) {
  return store.getters.getUserInfo.menus_url.some(item => item == url)
}

// 将路由列表提出并封装导出
// 封装的好处在于，不仅数据更清晰，而且方便做更改
export let routeList = [
  {
    path: '/menu',
    component: () => import("@/views/menu/menu"),
    name: "菜单管理",
    // 通过路由独享守卫判断是否有进入此路由的权限
    beforeEnter(to, from, next) {
      hasUrl("/menu") ? next() : next("/home")
    }
  },
  {
    path: "/role",
    component: () => import("@/views/role/role"),
    name: "角色管理",
    beforeEnter(to, from, next) {
      hasUrl("/role") ? next() : next("/home")
    }
  },
  {
    path: "/user",
    component: () => import("@/views/user/user"),
    name: "管理员管理",
    beforeEnter(to, from, next) {
      hasUrl("/user") ? next() : next("/home")
    }
  },
  {
    path: "/cate",
    component: () => import("@/views/cate/cate"),
    name: "商品分类"
  },
  {
    path: "/specs",
    component: () => import("@/views/specs/specs"),
    name: "商品规格"
  },
  {
    path: "/goods",
    component: () => import("@/views/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/member",
    component: () => import("@/views/member/member"),
    name: "会员管理"
  },
  {
    path: "/banner",
    component: () => import("@/views/banner/banner"),
    name: "轮播图管理"
  },
  {
    path: "/seck",
    component: () => import("@/views/seck/seck"),
    name: "秒杀管理"
  },
]

let router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/home",
          component: () => import("@/views/home/home")
        },
        ...routeList,
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 如果访问登录，通行
  if (to.path == "/login") {
    next()
    return
  }
  // 如果访问其他路由，则验证sessionStorage是否存在
  //  let userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
  // console.log(store.getters.getUserInfo,"getUserInfo");
  if (store.getters.getUserInfo) {
    next()
    return
  }
  // 如果都不符合，则强制跳转到登录
  next("/login")
})

export default router
