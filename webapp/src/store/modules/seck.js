import { seckList } from "../../utils/axios" // 引入接口

const state = {
    seckList: []
}

const getters = {
    // 获取角色列表
    getSeckList(state) {
        return state.seckList
    }
}

const mutations = {
    // 改变角色列表信息
    UPDATE_SECKLIST(state, payload) {
        state.seckList = payload
    }
}

const actions = {
    // 改变角色列表的行动
    updateSeckList({ commit }) {
        seckList()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_SECKLIST", res.data.list)
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