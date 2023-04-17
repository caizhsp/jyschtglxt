import { specsList, specsCount } from "../../utils/axios"

const state = {
    specsList: [],
    size: 2,
    page: 1,
    count: 0,
}

const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getCount(state) {
        return state.count
    },
    getSize(state) {
        return state.size
    },
    getPage(state) {
        return state.page
    }
}

const mutations = {
    UPDATE_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    UPDATE_COUNT(state, payload) {
        state.count = payload
    },
    UPDATE_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    updateSpecsList(context) {
        specsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                if (context.state.page != 1 && res.data.list.length == 0) {
                    context.dispatch("updatePage", context.state.page - 1)
                    return
                }
                context.commit("UPDATE_SPECSLIST", res.data.list)
            }
        })
    },
    updateCount({ commit }) {
        specsCount()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_COUNT", res.data.list[0].total)
                }
            })
    },
    updatePage(context, payload) {
        context.commit("UPDATE_PAGE", payload)
        // 页码改变之后，重新调取接口获取当前页的数据
        context.dispatch("updateSpecsList")
    }

}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}