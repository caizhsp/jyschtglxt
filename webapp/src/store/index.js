// 引入vue和vuex资源库
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入menu模块
import menu from './modules/menu'
// 引入role模块
import role from "./modules/role"
// 引入user模块
import user from "./modules/user"
// 引入cate模块
import cate from "./modules/cate"
// 引入specs
import specs from "./modules/specs"
// 引入goods
import goods from "./modules/goods"
// 引入member
import member from "./modules/member"
// 引入banner
import banner from "./modules/banner"
// 引入seck
import seck from "./modules/seck"

// 导出实例
export default new Vuex.Store({
    state: {
        userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : null
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        UPDATE_USERINFO(state, payload) {
            return state.userInfo = payload
        }
    },
    actions: {
        updateUserInfo({ commit }, payload) {
            // 根据参数情况判断是登录还是退出，登录存值，退出清值
            if (payload) {
                sessionStorage.setItem("userInfo", JSON.stringify(payload))
            } else {
                sessionStorage.removeItem("userInfo")
            }
            commit("UPDATE_USERINFO", payload)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        member,
        banner,
        seck
    }
})