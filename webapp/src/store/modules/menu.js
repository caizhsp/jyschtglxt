// 导入接口方法
import { menuList } from "../../utils/axios"

const state = {
    menulist: []
}

const getters = {
    // 获取菜单列表
    getMenuList(state) {
        return state.menulist
    }
}

const mutations = {
    // 更新菜单列表
    UPDATE_MENULIST(state, payload) {
        state.menulist = payload
    }
}

const actions = {
    // 改变菜单列表的行动
    updateMenulist({ commit }) {
        menuList()
            .then(res => {
                // 如果状态码是200说明获取正确，传给mutations改变数值
                if (res.status == 200) {
                    commit("UPDATE_MENULIST", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, "这是仓库模块menu中的err");
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}