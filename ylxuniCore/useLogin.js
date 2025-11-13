

// 需要登录时获取接口登录token
export const Login = (callback,saveToken) => {
    setTimeout(() => {
        console.log('需要登录时获取接口登录token')
        saveToken('我是token', callback)
    }, 1000)
}
