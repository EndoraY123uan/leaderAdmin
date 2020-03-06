<template>
	<view class="topicDetail">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
        <!-- 主体-->
       <view class="main">
           <view class="topic">
               <view class="topicTitle">
                   {{ topicDetail.topicTitle}}
               </view>
               <view class="userInfo">
                   <image :src="topicDetail.userImg"></image>
                   <view class="author">
                       <view class="userName">
                           {{ topicDetail.userName}}
                       </view>
                       <view class="topicCreatTime">
                           {{ topicDetail.topicCreatTime}}
                       </view>
                   </view>
               </view>
               <view class="topicContent">
                   {{ topicDetail.topicContent}}
               </view>
           </view>
           <view class="operate">
               <button @click="agree">同意</button>
               <button @click="refuse" type="warn">拒绝</button>
           </view>
           
       </view>
       <!-- 引入脚部-->
       <foot></foot>
	</view>
</template>

<script>
    let _self
    import publicNav from '../../components/publicNav.vue'
    import foot from '../../components/foot.vue'
	export default {
        name:'topicDetail',
		data() {
			return {
                isactive:0,
                userInfo:{
                    userName:'管理员---'
                },
                dataOptions:[
                    {
                        name:'专业审核',
                        count:'--'
                    },
                    {
                        name:'考研审核',
                        count:'--'
                    },{
                        name:'就业审核',
                        count:'--'
                    },{
                        name:'生活审核',
                        count:'--'
                    }
                ],
                topicDetail:{
                    "userImg": '---',
                    "userName": '---',
                    "userMajor":'---',
                    "topicTitle": '---',
                    "topicContent":'---',
                    "topicCreatTime":'---'
                } 
			};
		},
        onLoad:function(e){
            _self = this
            _self.topicDetail = JSON.parse(e.data)
            console.log(_self.topicDetail)
        },
        components:{
            publicNav,
            foot
        },
        methods:{
            getUserData(){//获取管理员信息
                console.log('here')
                const adminInfo = uni.getStorageSync('userInfo')
                console.log(adminInfo)
                if(adminInfo){
                    _self.userInfo.userName = adminInfo.userName
                }
            },
            agree(){//管理员同意该申请
               uni.showModal({
                    title: '同意申请?',
                    confirmColor:'#8D75DB',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            uni.request({
                                url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/agree',
                                data:{
                                    topicDetail:_self.topicDetail 
                                },
                                method:'POST',
                                success: (res) => {
                                    if(res.data.flag == 1){
                                      uni.showToast({
                                          title:'已同意',
                                          icon:'none'
                                      })
                                     uni.navigateBack({});
                                    }
                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
             
            },
            refuse(){
                let refuseList = ['内容不真实', '涉及违法内容', '涉及黄赌毒']
                 uni.showActionSheet({
                      itemList: refuseList ,
                      success: function (res) {
                          console.log('选中了' + refuseList[res.tapIndex]);
                          uni.showModal({
                               title: '拒绝申请?',
                               confirmColor:'#E64340',
                               success: function (res) {
                                   if (res.confirm) {
                                       console.log('用户点击确定');
                                      uni.request({
                                           url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/refuse',
                                           data:{
                                               refuseReason:refuseList[res.tapIndex] 
                                           },
                                           method:'POST',
                                           success: (res) => {
                                               if(res.data.flag == 1){
                                                 uni.showToast({
                                                     title:'已拒绝',
                                                     icon:'none'
                                                 })
                                                uni.navigateBack({});
                                               }
                                           }
                                       })
                                   } else if (res.cancel) {
                                       console.log('用户点击取消');
                                   }
                               }
                           });
                      },
                      fail: function (res) {
                          console.log(res.errMsg);
                      }
                  }); 
            }
        }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        .topicDetail{
            width: 100%;
            .main{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 15px auto;
                padding: 5px;
                width: 70%;
                min-height: 300upx;
                padding-bottom: 100px;
                .topic{
                    width: 100%;
                    padding: 10px 0;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: rgba(219,238,252,0.7) ;
                    .topicTitle{
                        width: 50%;
                        font-size: 18px;
                        text-align: center;
                    }
                    .userInfo{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-width: 20%;
                        margin: 10px;
                        padding: 2px 5px;
                        background-color: rgba(255,255,255,0.5);
                       /* border-radius: 70px; */
                        image{
                            margin-right: 5px;
                            width: 30px;
                            height: 30px;/* 
                            border-radius: 30px; */
                        }
                        .author{
                            .userName{
                                font-size: 14px;
                            }
                            .topicCreatTime{
                                font-size: 10px;
                                opacity: 0.6;
                            }
                        }
                    }
                    .topicContent{
                        padding: 10px;
                        width: 90%;
                        min-height: 50px;
                        font-size: 12px;
                        text-indent: 40px;
                        background-color: rgba(255,255,255);
                    }
                }
                .operate{
                    margin-top: 10upx;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    background-color: rgba(219,238,252,0.7) ;
                    button{
                        width: 10%;
                        height: 40%;
                        color: #FFF;
                        font-size: 16px;
                        border-radius: 50pc;
                      &:first-child{
                            background-color: #8D75DB;
                        }
                     /*   &:last-child{
                            background-color: #727CF5;
                        } */
                       /* background: linear-gradient(to top right,#8D75DB 20%,#727CF5); */
                    }
                }
            }
        }
    }
</style>
