<template>
	<view class="kaoyan">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
       <!-- 主体-->
      <view class="main">
           <view class="control">
             <uni-segmented-control  :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#727CF5"></uni-segmented-control>
            </view>     
             <view class="content">
                 <view v-show="current === 0" class="itemContent">
                    <view class="topic-list" v-for="(topic,topicIndex) in topicDataList[0].list" :key="topicIndex" >
                        <view class="topic-list-item" @click="toDetail(0,topicIndex)">
                            <image :src="topic.authorImg"></image>
                            <view class="userName">{{ topic.author}}</view>
                            <view class="topicTitle">{{ topic.title}}</view>
                            <view class="topicCreatTime">{{ topic.creatTime}}</view>
                        </view>
                    </view>
                 </view>
                 <view v-show="current === 1" class="itemContent">
                      <view class="topic-list" v-for="(topic,topicIndex) in topicDataList[1].list" :key="topicIndex" >
                          <view class="topic-list-item" @click="toDetail(1,topicIndex)">
                              <image :src="topic.authorImg"></image>
                              <view class="userName">{{ topic.author}}</view>
                              <view class="topicTitle">{{ topic.title}}</view>
                              <view class="topicCreatTime">{{ topic.creatTime}}</view>
                          </view>
                      </view>
                 </view>
                 <view v-show="current === 2" class="itemContent">
                      <view class="topic-list" v-for="(topic,topicIndex) in topicDataList[2].list" :key="topicIndex" >
                          <view class="topic-list-item" @click="toDetail(2,topicIndex)">
                              <image :src="topic.authorImg"></image>
                              <view class="userName">{{ topic.author}}</view>
                              <view class="topicTitle">{{ topic.title}}</view>
                              <view class="topicCreatTime">{{ topic.creatTime}}</view>
                          </view>
                      </view>
                 </view>
                 <view v-show="current === 3" class="itemContent">
                     <view class="topic-list" v-for="(topic,topicIndex) in topicDataList[3].list" :key="topicIndex" >
                         <view class="topic-list-item" @click="toDetail(3,topicIndex)">
                             <image :src="topic.authorImg"></image>
                             <view class="userName">{{ topic.author}}</view>
                             <view class="topicTitle">{{ topic.title}}</view>
                             <view class="topicCreatTime">{{ topic.creatTime}}</view>
                         </view>
                     </view>
                 </view>
            </view>
            <view class="pagination">
       <!--         <uni-pagination title="上一页" total="20" class="left"></uni-pagination> -->
                <!-- <uni-pagination prev-text="上一页" next-text="下一页" title="" show-icon="true" total="50" current="2" pageSize="8"></uni-pagination> -->
            </view>
       </view>
       <!-- 脚部-->
       <foot></foot>
	</view>
</template>

<script>
    let _self;
    import publicNav from '@/components/publicNav.vue'
    import foot from '@/components/foot.vue'
    import search from '@/components/search.vue'
    import {uniSegmentedControl} from '@dcloudio/uni-ui'
    import {uniPagination} from '@dcloudio/uni-ui'
	export default {
        name:'kaoyan',
		data() {
			return {
                isactive:4,
                searchIsShow:false,
                dataIsShow:false,
                saveFlag:true,
                items: ['专业话题','考研话题','就业话题','生活话题'],
                current: 0,
                userInfo:{
                    userName:'管理员---'
                },
                allData:{},
                topicDataList:[
                    {
                        item:'专业话题',
                        list:[]
                    },
                    {
                        item:'考研话题',
                        list:[]
                    },
                    {
                        item:'就业话题',
                        list:[]
                    },
                    {
                        item:'生活话题',
                        list:[]
                    }
                ]
		};
        },
        components:{
            publicNav,
            foot,
            search,
            uniSegmentedControl,
            uniPagination
        },
        onLoad:function(e){
            _self = this
            _self.getUserData()
            _self.getTopicData()
            console.log('kaoyan')
        },
        onHide() {
            _self.searchIsShow = false
        },
        onShow() {
            _self.searchIsShow = true
        },
        mounted() {
           console.log('mounted') 
          
        },
        methods:{
            onClickItem(e) {
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex;
                }
            },
            getUserData(){//获取管理员信息this
              //添加登陆函数监听
              console.log('主页检查登录')
              let loginRes = _self.checkLogin('../main/mian','2')
              console.log(loginRes)
              if(!loginRes){return;}
              _self.userInfo = loginRes
            },
            getTopicData(){
                uni.request({
                    url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/getTopicList',
                    success: (res) => {
                    /*    _self.topicDataList = res.data.topicList.list */
                        console.log(res.data.topicList)
                        for(let i = 0;i<res.data.topicList.length;i++){
                           _self.topicDataList[i].list = res.data.topicList[i]
                        }
                      /*  _self.getCount() */
                    }
                })
            },
            toDetail(typeIndex,topicIndex){
                console.log('data')
                console.log(typeIndex + '+' + topicIndex)
                let data = JSON.stringify(_self.topicDataList[typeIndex].list[topicIndex])
                console.log(data)
                uni.navigateTo({
                     url:'/pages/content/discussDetail?data=' + data
                 });
            },
            saveChange(){//保存修改
                uni.showModal({
                     title: '确定修改?',
                     confirmColor:'#E64340',
                     success: function (res) {
                         if (res.confirm) {
                             console.log('用户点击确定');
                            uni.request({
                                url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/resaveKaoyanAnal',
                                method:'POST',
                                data:{
                                    kaoyanAnal:_self.kaoyanAnal
                                },
                                success: (res) => {
                                    if(res.data.flag == 1){
                                        uni.showToast({
                                            
                                        })
                                    }
                                }
                            })
                         } else if (res.cancel) {
                             console.log('用户点击取消');
                         }
                     }
                 });
                
            }
            
        }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        width: 100%;
        height: 100%;
        .kaoyan{
            .main{
                margin: 15px auto;
                padding: 10px;
                width: 80%;
                min-height: 300upx;
                padding-bottom: 100px;
                background-color: rgba(219,238,252,0.7) ;
               .control{
                  /* position: sticky;
                   top: 50px; */
                   margin:10px auto;
                   width: 30%;
               }
               .content{
                   display: flex;
                   justify-content: center;
                   width: 80%;
                   margin: 0 auto;
                   min-height: 300upx;
                   /* background-color: #00AB98; */
                   .itemContent{
                       margin-top: 10px auto;
                       width: 80%;
                     /*  background-color: #007AFF; */
                       .topic-list{
                      /*     background-color: #007AFF; */
                           .topic-list-item{
                               margin-top: 5px;
                               padding: 5px;
                               display: flex;
                               justify-content: space-around;
                               height: 40px;
                               align-items: center;
                               background-color: #FFFFFF;
                               image{
                                   width: 30px;
                                   height: 30px;
                               }
                               .userName,.userMajor,.topicTitle,.topicCreatTime{
                                  
                                   font-size: 16px;
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
               .pagination{
                   margin: 10px auto;
                   width: 50%;
             }
           
        }
    }
    }
</style>
