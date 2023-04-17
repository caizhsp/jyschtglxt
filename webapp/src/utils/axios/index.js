// 引进实例
import http from './axios'

// 创建接口

// 添加接口
export function menuAdd(data) {
    return http.post("/api/menuadd", data)
}

// 获取菜单列表
export function menuList() {
    return http.get("/api/menulist", {
        params: {
            istree: true
        }
    })
}

// 获取单条数据
export function menuInfo(id) {
    return http.get("/api/menuinfo", {
        params: {
            id
        }
    })
}

// 菜单修改
export function menuEdit(data) {
    return http.post("/api/menuedit", data)
}

// 菜单删除
export function menuDelete(id) {
    return http.post("/api/menudelete", {
        id
    })
}

// ===================角色接口===========================

// 角色添加
export function roleAdd(data) {
    return http.post("/api/roleadd", data)
}

// 角色列表
export function roleList() {
    return http.get("/api/rolelist")
}

// 获取单条角色
export function roleInfo(id) {
    return http.get("/api/roleinfo", {
        params: {
            id
        }
    })
}

// 角色修改
export function roleEdit(data) {
    return http.post("/api/roleedit", data)
}

// 角色删除
export function roleDelete(id) {
    return http.post("/api/roledelete", {
        id
    })
}

// ==========================管理员接口======================

// 管理员添加
export function userAdd(data) {
    return http.post("/api/useradd", data)
}

// 管理员总数（用于计算分页）
export function userCount() {
    return http.get("/api/usercount")
}

// 管理员列表（分页）
export function userList(params) {
    return http.get("/api/userlist", {
        params
    })
}

// 管理员获取（一条）
export function userInfo(uid) {
    return http.get("/api/userinfo", {
        params: {
            uid
        }
    })
}

// 管理员修改
export function userEdit(data) {
    return http.post("/api/useredit", data)
}

// 管理员删除
export function userDelete(uid) {
    return http.post("/api/userdelete", {
        uid
    })
}

// 管理员登录
export function userLogin(data) {
    return http.post("/api/userlogin", data)
}

// ===================商品分类接口==========================

// 商品分类添加
export function cateAdd(data) {
    return http.post("/api/cateadd", data)
}

// 商品分类列表
export function cateList() {
    return http.get("/api/catelist", {
        params: {
            istree: true
        }
    })
}

// 商品分类单条信息获取
export function cateInfo(id) {
    return http.get("/api/cateinfo", {
        params: {
            id
        }
    })
}

// 商品分类修改
export function cateEdit(data) {
    return http.post("/api/cateedit", data)
}

// 商品分类删除
export function cateDelete(id) {
    return http.post("/api/catedelete", { id })
}

// ===========商品规格管理接口==================

// 商品规格添加
export function specsAdd(data) {
    return http.post("/api/specsadd", data)
}

// 商品规格总数(用于计算分页)
export function specsCount() {
    return http.get("/api/specscount")
}

// 商品规格列表(分页)
export function specsList(params) {
    return http.get("/api/specslist", {
        params
    })
}

// 商品规格单挑条获取
export function specsInfo(id) {
    return http.get("/api/specsinfo", {
        params: {
            id
        }
    })
}

// 商品规格修改
export function specsEdit(data) {
    return http.post("/api/specsedit", data)
}

// 商品规格删除
export function specsDelete(id) {
    return http.post("/api/specsdelete", { id })
}

// ================商品管理接口=================

// 商品添加
export function goodsAdd(data) {
    return http.post("/api/goodsadd", data)
}

// 商品总数(计算分页)
export function goodsCount() {
    return http.get("/api/goodscount")
}

// 商品列表
export function goodsList(params) {
    return http.get("/api/goodslist", {
        params
    })
}

// 商品单条获取
export function goodsInfo(id) {
    return http.get("/api/goodsinfo", {
        params: {
            id
        }
    })
}

// 商品修改
export function goodsEdit(data) {
    return http.post("/api/goodsedit", data)
}

// 商品删除
export function goodsDelete(id) {
    return http.post("/api/goodsdelete", { id })
}

// ===========会员接口==================

// 会员列表
export function memberList() {
    return http.get("/api/memberlist")
}

// 获取单条会员列表
export function memberInfo(uid) {
    return http.get("/api/memberinfo", {
        params: {
            uid
        }
    })
}

// 会员修改
export function memberEdit(data) {
    return http.post("/api/memberedit", data)
}

// ============轮播图接口=============

// 轮播图添加
export function bannerAdd(data) {
    return http.post("/api/banneradd", data)
}

// 轮播图列表
export function bannerList() {
    return http.get("/api/bannerlist")
}

// 轮播图获取
export function bannerInfo(id) {
    return http.get("/api/bannerinfo", {
        params: {
            id
        }
    })
}

// 轮播图修改
export function bannerEdit(data) {
    return http.post("/api/banneredit", data)
}

// 轮播图删除
export function bannerDelete(id) {
    return http.post("/api/bannerdelete", { id })
}

// ==============限时秒杀管理==============

// 限时秒杀添加
export function seckAdd(data) {
    return http.post("/api/seckadd", data)
}

// 限时秒杀列表
export function seckList() {
    return http.get("/api/secklist")
}

// 限时单条获取
export function seckInfo(id) {
    return http.get("/api/seckinfo", {
        params: {
            id
        }
    })
}

// 限时秒杀修改
export function seckEdit(data) {
    return http.post("/api/seckedit", data)
}

// 限时秒杀删除
export function seckDelete(id) {
    return http.post("/api/seckdelete", { id })
}