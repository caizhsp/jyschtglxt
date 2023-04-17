import { goodsList, goodsCount } from "../../utils/axios"

const state = {
    goodsList: [],
    size: 2,
    page: 1,
    count: 0
}

const getters = {
    getPage(state) {
        return state.page
    },
    getSize(state) {
        return state.size
    },
    getGoodsList(state) {
        return state.goodsList
    },
    getCount(state) {
        return state.count
    }
}

const mutations = {
    UPDATE_GOODSLIST(state, payload) {
        state.goodsList = payload
    },
    UPDATE_PAGE(state, payload) {
        state.page = payload
    },
    UPDATE_COUNT(state, payload) {
        state.count = payload
    }
}

const actions = {
    updateGoodsList(context) {
        goodsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                context.commit("UPDATE_GOODSLIST", res.data.list)
                if (context.state.page != 1 && res.data.list == null) {
                    context.dispatch("updatePage", context.state.page - 1)
                }
            }
        })
    },
    updatePage(context, payload) {
        context.commit("UPDATE_PAGE", payload)
        context.dispatch("updateGoodsList") // 更新完页码之后再次调用更新商品列表，保持数据最新
    },
    updateCount({ commit }) {
        goodsCount()
            .then(res => {
                if (res.data.code == 200) {
                    commit("UPDATE_COUNT", res.data.list[0].total)
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