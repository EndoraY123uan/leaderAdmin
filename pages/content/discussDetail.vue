<template>
	<view class="discussDetail">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
        <!-- 主体-->
       <view class="main">
           <view class="topic">
               <view class="topicTitle">
                   {{ discussDetail.title}}
               </view>
               <view class="userInfo">
                   <image :src="discussDetail.authorImg"></image>
                   <view class="author">
                       <view class="userName">
                           {{ discussDetail.author}}
                       </view>
                       <view class="topicCreatTime">
                           {{ discussDetail.creatTime}}
                       </view>
                   </view>
               </view>
               <view class="topicContent">
                   {{ discussDetail.detail}}
               </view>
           </view>
           <view class="comment">
               <view class="comment-title">最新评论</view>
             <scroll-view v-for="(comment,index) in discussDetail.commentList" :key='index' class="comment-list"   show-scrollbar="false">
               	<view class="commentAuthor">
                    <view class="img">
                        <image :src="comment.src"></image>
                    </view>
               		<view class="author">
               			<view class="commentName">{{ comment.name }}</view>
               			<view class="commentTime">{{ comment.time }}</view>
               			<view class="commentContent">{{ comment.content}}</view>
               		</view>
               	</view>
               </scroll-view>
           </view>
           <view class="operate">
               <button @click="hot" type="warn">设为热点话题</button>
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
        name:'discussDetail',
		data() {
			return {
                isactive:4,
                userInfo:{
                    userName:'管理员---'
                },
                discussDetail:{
                } 
			};
		},
        onLoad:function(e){
            _self = this
            _self.discussDetail = JSON.parse(e.data)
            console.log(_self.discussDetail)
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
            hot(){
               uni.showModal({
                   title:'设为设点话题',
                   success: (res) => {
                       if (res.confirm) {
                           console.log('用户点击确定');
                           uni.request({
                               url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/setTopicHot',
                               data:{
                                   topicId:_self.discussDetail.id
                               },
                               method:'POST',
                               success: (res) => {
                                   if(res.data.flag == 1){
                                     uni.showToast({
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
               })
            }
        }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        .discussDetail{
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
                        font-size: 12upx;
                        font-weight: 600;
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
                        font-size: 10upx;
                        text-indent: 40px;
                        background-color: rgba(255,255,255);
                    }
                }
                .comment{
                    margin-top: 10px;
                    width: 100%;                    padding: 10px 0;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: rgba(219,238,252,0.7) ;
                    .comment-title{
                        padding: 5px;
                        width: 90%;
                        text-align: center;
                        font-size: 10upx;
                        font-weight: 600;
                        border-bottom: 0.1px solid #808080;
                    }
                    .comment-list{
                        width: 90%;
                        border-bottom: 1px solid rgba(141,117,220,0.3);
    				/* 	background-color: #0EA391; */
                        margin-bottom: 5px;
                        .commentAuthor{
                            display: flex;
                            align-items: center;
                            padding: 10px 0;
                        /*    background-color: #007AFF; */
                             .img{
                                 position: absolute;
                                 margin: 0 auto;
                                 width: 10%;
                                 min-height: 50upx;
                                /* background-color: #00AB98; */
                                 text-align: center;
                                image{
                                    width: 25upx;
                                    height: 25upx;
                                } 
                             }
                           
                            .author{
                                margin-left: 50upx;
                                font-size: 8upx;
                                .commentName{
                                    color:#7779CD
                                }
                                .commentTime{
                                    opacity: 0.5;
                                }
                            }
                        }
                
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
                        }
                }
            }
        }
    }
    
</style>
