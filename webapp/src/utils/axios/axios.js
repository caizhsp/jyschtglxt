// 引入axios
import axios from "axios"
// 引入路由
import router from "../../router"

// 创建实例
const http = axios.create({
    baseURL: "/api"
})

// axios拦截
// 请求拦截
http.interceptors.request.use(req => {
    req.headers.authorization = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).token : ""
    return req // 设置后才可以正常往下走
})

// 响应拦截
http.interceptors.response.use(res => {
    // 错误拦截 403说明token过期
    if (res.data.code == 403) {
        // 强制登录
        router.push("/login")
    }

    return res // 设置后才可以正常往下走
})

// 导出实例
export default http