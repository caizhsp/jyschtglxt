// 引入接口
import { cateList } from "../../utils/axios"

const state = {
    cateList: []
}

const getters = {
    getCateList(state) {
        return state.cateList
    }
}

const mutations = {
    UPDATE_CATELIST(state, payload) {
        state.cateList = payload
    }
}

const actions = {
    updateCateList({ commit }) {
        cateList()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_CATELIST", res.data.list)
                }
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}