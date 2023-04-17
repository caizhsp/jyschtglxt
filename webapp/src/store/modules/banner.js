import { bannerList } from "../../utils/axios" // 引入接口

const state = {
    bannerList: []
}

const getters = {
    // 获取角色列表
    getBannerList(state) {
        return state.bannerList
    }
}

const mutations = {
    // 改变角色列表信息
    UPDATE_BANNERLIST(state, payload) {
        state.bannerList = payload
    }
}

const actions = {
    // 改变角色列表的行动
    updateBannerList({ commit }) {
        bannerList()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_BANNERLIST", res.data.list)
                }
            })
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}