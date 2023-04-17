import { memberList } from "../../utils/axios" // 引入接口

const state = {
    memberList: []
}

const getters = {
    // 获取角色列表
    getMemberList(state) {
        return state.memberList
    }
}

const mutations = {
    // 改变角色列表信息
    UPDATE_MEMBERLIST(state, payload) {
        state.memberList = payload
    }
}

const actions = {
    // 改变角色列表的行动
    updateMemberList({ commit }) {
        memberList()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_MEMBERLIST", res.data.list)
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