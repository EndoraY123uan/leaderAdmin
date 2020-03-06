<template>
	<view class="login">
        <view class="loginContent">
            <view class="title">
                <view class="iconfont icon-admin"></view>
                <text class="logo-name">领航者</text>
                <text class="system">后台管理系统</text>
            </view>
            <view class="input">
                <input type="text" v-model="userName" placeholder="请输入账号" focus="true"/>
                <input type="text" v-model="userPwd" password="true" placeholder="请输入密码"/>
            </view>
            <checkbox-group @change="remumberPwd">
                <checkbox 
                value="yes" 
                @tap="remumberPwdFlag = !remumberPwdFlag" 
                :checked="remumberPwdFlag" />记住密码
            </checkbox-group>
            <view class="btn" @click="login">
                <button type="primary" >登录</button>
            </view>
        </view>
	</view>
</template>

<script>
    let _self
	export default {
		data() {
			return {
                userName:'',
                userPwd:'',
                remumberPwdFlag: true
			}
		},
		onLoad() {
            _self = this
		},
        mounted() {
            //提取缓存
            console.log('here')
            let cacheUserName = uni.getStorageSync('cacheUserName')
            let cacheUserPwd = uni.getStorageSync('cacheUserPwd')
            console.log(cacheUserName + '+' + cacheUserPwd)
            if( cacheUserName && cacheUserPwd ){
                _self.userName = cacheUserName
                _self.userPwd = cacheUserPwd
                console.log(cacheUserName + '+' + cacheUserPwd)
            }else{
                _self.userName = ''
                _self.userPwd = ''
                console.log('here')
            }
        },
		methods: {
            remumberPwd(e){//记住密码
                console.log(e.detail)
            },
            login(){//登录
                if(_self.userName.length <=0 || _self.userPwd.length <=0){
                    uni.showToast({
                        title:'账号或密码不能为空',
                        icon:'none'
                    })
                }else{
                    uni.request({
                        url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/login',
                        method:'POST',
                        data:{
                            userName: _self.userName,
                            userPwd:_self.userPwd
                        },
                        success: (res) => {
                            console.log(res.data)
                            let flag = res.data.flag 
                            let userInfo = res.data.userInfo
                           /* let identify = res.data.identify */
                            /* console.log(flag +  '+' + identify) */
                            if(flag === 1){//账号密码正确
                                if(_self.remumberPwd){ //记住密码
                                    uni.setStorageSync('cacheUserName',_self.userName)
                                    uni.setStorageSync('cacheUserPwd',_self.userPwd)
                                    console.log(userInfo)
                                   /* uni.setStorage({
                                    	key:'userInfo',
                                    	data:{
                                    		"userName":userInfo.userName,
                                    		"userSex":userInfo.userSex,
                                    		'userAge':userInfo.userAge,
                                    		"userNum":userInfo.userNum,
                                    	},
                                    	success:function(){
                                    		console.log('有用户信息了')
                                    	}
                                    }) */
                                    console.log('保存用户信息')
                                }else{
                                    uni.removeStorageSync('cacheUserName')
                                    uni.removeStorageSync('cacheUserPwd')
                                   
                                }
                                uni.setStorageSync('userInfo',res.data.userInfo)
                                uni.redirectTo({
                                    url:'../main/main'
                                })
                            }else{
                                uni.showToast({
                                    title:'账号或密码错误！',
                                    icon:'none'
                                })
                            }
                        }
                    })
                }
                
            }
            
		}
	}
</script>

<style lang="less" scoped>
    page{
        width: 100%;
        height: 100%;
      /*  background: url(../../static/img/bImg.png) no-repeat center center/cover; */    
        /* background-color: #7779CD; */
       /* background: linear-gradient(to top right,#7779CD,#2461B2); */
     /*  background: linear-gradient(to right,#feac5e,#c779d0,#4bc0c8); */
     background: linear-gradient(to bottom right,#0C7BB3,#f2bae8);
    /* background: linear-gradient(to bottom right,#c973ff,#aebaf8); */
        .login{
           display: flex;
           justify-content: center;
           position: relative;
            width: 100%;
            height: 100%;
           .loginContent{
               min-width: 250upx;
               position: absolute;
               top: 30%;
               width: 40%;
               .title{
                   margin: 0 auto;
                   display: flex;
                   width: 60%;
                   height: 25upx;
                   .icon-admin{
                       margin-top: 1upx;
                       margin-right: 3upx;
                       padding-left: 5upx;
                       line-height: 30upx;
                       color: #FFF;
                   }
                   .logo-name{
                       margin-left: 2upx;
                       margin-right: 2upx;
                       line-height: 30upx;
                       font-size: 18upx;
                       font-weight: 500;
                       color: #FFF;
                   }
                   .system{
                       padding-top: 4upx;
                       line-height: 30upx;
                       font-size: 10upx;
                       color: #FFF;
                       opacity: 0.7;
                   }
               }
               .input{
                   display: flex;
                   flex-direction: column;
                   justify-content: space-between;
                   margin: 0 auto;
                   width: 60%;
                   input{
                       margin-top: 10upx;
                       padding: 5upx 10upx;
                       height: 10upx;
                       border-radius: 20upx;
                       background-color: #FFF;
                       &:hover{
                           box-shadow: ;
                       }
                   }  
               }
               checkbox-group{
                   margin: 10upx auto;
                   padding-left: 5upx;
                   width: 60%;
                   font-size: 20px;
               }
               .btn{
                   margin: 0 auto;
                   width: 60%;
                   button{
                       background-color: #6c5ce7;
                       border-radius: 15upx;
                   }
               }
           }
        }
    }
        
</style>
