import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//封装全局登录函数
Vue.prototype.checkLogin = function(backPage,backType){
    let userInfo = uni.getStorageSync('adminInfo')
    console.log('check login')
    console.log(userInfo)
    if(userInfo == ''){
        console.log('为空')
        uni.redirectTo({
            url:'/pages/login/login?backPage='+backPage +'&bacType='+ backType
        });
        return false
    }
    return userInfo
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
