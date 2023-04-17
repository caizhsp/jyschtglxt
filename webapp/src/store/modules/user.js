import { userList, userCount } from "../../utils/axios" // 引入接口

const state = {
    userlist: [],
    size: 2,
    page: 1,
    count: 0
}

const getters = {
    // 获取userlist
    getUserList(state) {
        return state.userlist
    },
    // 获取总条数
    getUserCount() {
        return state.count
    },
    // 获取size
    getSize(state) {
        return state.size
    }
}

const mutations = {
    // 改变userlist的值
    UPDATE_USERLIST(state, payload) {
        state.userlist = payload
    },
    // 改变count的值
    UPDATE_COUNT(state, payload) {
        state.count = payload
    },
    // 更改页码数
    UPDATE_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    // 改变userlist值的行动
    updateUserList(context) {
        userList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code == 200) {
                    context.commit("UPDATE_USERLIST", res.data.list)

                    // 如果当前页不是第一页，且请求值为空，则需要获取上一页的内容
                    if (context.state.page != 1 && res.data.list == null) {
                        context.dispatch("updatePage", context.state.page - 1)
                    }
                }
            })
    },
    // 改变count值的行动
    updateUserCount({ commit }) {
        userCount()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_COUNT", res.data.list[0].total)
                }
            })
    },
    // 更改page页码行动
    updatePage(context, payload) {
        context.commit("UPDATE_PAGE", payload)
        // 更改页码之后重新调取管理员列表
        context.dispatch("updateUserList")
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}