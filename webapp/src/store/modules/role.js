import { roleList } from "../../utils/axios" // 引入接口

const state = {
    roleList: []
}

const getters = {
    // 获取角色列表
    getRoleList(state) {
        return state.roleList
    }
}

const mutations = {
    // 改变角色列表信息
    UPDATE_ROLELIST(state, payload) {
        state.roleList = payload
    }
}

const actions = {
    // 改变角色列表的行动
    updateRoleList({ commit }) {
        roleList()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_ROLELIST", res.data.list)
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