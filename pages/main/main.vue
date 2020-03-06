<template>
	<view class="main">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
       <!-- 数据栏-->
       <view class="data">
           <view class="list" v-for="(item,index) in dataOptions" :key="index">
               <view class="list-name">{{ item.name}}</view>
               <view class="list-count">{{ item.count}}</view>
           </view>
       </view>
       <!-- 话题申请列表-->
       <view class="topic-content">
           <view class="topic-type" v-for="(type,typeIndex) in topicList" :key="typeIndex">
               <view class="topic-type-name">
                   <view class="iconfont icon-options"></view>
                   {{ type.item}}
               </view>
               <view class="topic-list" v-for="(topic,topicIndex) in type.list" :key="topicIndex" >
                   <view class="topic-list-item" @click="toDetail(typeIndex,topicIndex)">
                       <image :src="topic.userImg"></image>
                       <view class="userName">{{ topic.userName}}</view>
                       <view class="topicTitle">{{ topic.topicTitle}}</view>
                       <view class="topicCreatTime">{{ topic.topicCreatTime}}</view>
                   </view>
               </view>
           </view>
       </view>
       <!-- 引入脚部-->
       <foot></foot>
	</view>
</template>

<script>
    let _self
    let userInfo
    import publicNav from '../../components/publicNav.vue'
    import foot from '../../components/foot.vue'
	export default {
        name:'mainFirst',
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
                topicList:[
                    {
                        item:'专业话题申请列表',
                        list:[]
                    },
                    {
                        item:'考研话题申请列表',
                        list:[]
                    },
                    {
                        item:'就业话题申请列表',
                        list:[]
                    },
                    {
                        item:'生活话题申请列表',
                        list:[]
                    }
                    
                ]
			};
		},
        onLoad:function(){
             _self = this
          _self.getUserData()
            _self.getTopicData()
        },
        components:{
            publicNav,
            foot
        },
        methods:{
           getUserData(){//获取管理员信息
               //添加登陆函数监听
               console.log('主页检查登录')
               let loginRes = _self.checkLogin('../main/mian','2')
               console.log(loginRes)
               if(!loginRes){return;}
               _self.userInfo = loginRes
            },
            getCount(){
                for(let i = 0;i<_self.dataOptions.length;i++){
                    _self.dataOptions[i].count = _self.topicList[i].list.length
                }
            },
            getTopicData(){
                uni.request({
                    url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/getTopicData',
                    success: (res) => {
                        for(let i = 0;i<_self.topicList.length;i++){
                           _self.topicList[i].list = res.data.topicList[i].list
                        }
                        _self.getCount()
                    }
                })
            },
            toDetail(typeIndex,topicIndex){
                console.log('data')
                console.log(typeIndex + '+' + topicIndex)
                let data = JSON.stringify(_self.topicList[typeIndex].list[topicIndex])
                console.log(data)
                uni.navigateTo({
                     url:'../content/topicDetail?data=' + data
                 });
            }
        }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        position: relative;
        width: 100%;
        height: 100%;
        .main{
            width: 100%;
            height: 100%;
            padding-bottom: 100px;
            .data{
                display: flex;
                justify-content: space-around;
                margin: 10upx auto;
                width: 80%;
                height: 60px;
               /* background-color: #007AFF; */
                .list{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px ;
                    width: 20%;
                    background-color: #727CF5;
                    /* background: linear-gradient(to right,#8D75DB 20%,#727CF5); */
                    .list-name,.list-count{
                        color: #FFF;
                        font-size: 18px;
                    }
                    .list-count{
                        font-weight: 600;
                    }
                    &:hover{
                        box-shadow: 1px 1px 10px #777777;
                    }
                    &:first-child,&:nth-child(2){
                        background-color: #8D75DB;
                    }
                } 
            }
            //话题申请
            .topic-content{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin: 0 auto;
                width: 80%;
                height: 100%;
                .topic-type{
                    margin: 10px 5px;
                    padding: 10px;
                    width: 45%;
                     background-color: rgba(219,238,252,0.7) ;
                    opacity: ;
                    .topic-type-name{
                        display: flex;
                        align-items: center;
                        font-size: 14px; 
                        .icon-options{
                            margin-right: 5px;
                        }
                    }
                }
                .topic-list{
                    display: fl;
                    .topic-list-item{
                        margin-top: 5px;
                        padding: 5px;
                        display: flex;
                        justify-content: space-around;
                        height: 30px;
                        align-items: center;
                        background-color: #FFFFFF;
                        image{
                            width: 20px;
                            height: 20px;
                        }
                        .userName,.userMajor,.topicTitle,.topicCreatTime{
                           
                            font-size: 10px;
                        }
                        .userName{
                            width: 10%;
                        }
                        .topicTitle{
                            width: 50%;
                             overflow:hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;//在第几行显示...
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                         
                        }
                        &:hover{
                            box-shadow: 1px 1px 5px #777777;
                        }
                    }
                }
            }
        }
    }
</style>
