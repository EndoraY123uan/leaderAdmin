<template>
	<view class="kaoyan">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
       <!-- 主体-->
      <view class="main">
            <view class="search" v-show="searchIsShow">
                <search :allData="allData" @getItemInfo="useGetKaoyanInfo" ref="search"></search>
            </view>
            
            <view class="dataShowContent">
                <view class="dataShow">
                <view class="content">
                    <view class="dataItemName">{{dataItemName[0]}}</view>
                    <view class="dataItemGraph">
                        <line-show :lineData="kaoyanData[0]" ref="lineShow"></line-show>
                    </view>
                    <view class="dataItemAnalyse">
                        <textarea v-if="dataIsShow" v-model="kaoyanAnal[0]"  maxlength="-1" auto-height="true"></textarea>
                    </view>
                </view>
                 <view class="content">
                            <view class="dataItemName">{{dataItemName[1]}}</view>
                            <view class="dataItemGraph">
                            <column-show :columnData="kaoyanData[1]" ref="columnShow"></column-show>
                            </view>
                            <view class="dataItemAnalyse">
                                 <textarea v-if="dataIsShow" v-model="kaoyanAnal[1]"  maxlength="-1" auto-height="true"></textarea>
                            </view>
                  </view>
                  <view class="content">
                             <view class="dataItemName">{{dataItemName[2]}}</view>
                             <view class="dataItemGraph">
                               <pie-show :pieData="kaoyanData[2]" ref="pieShow"></pie-show>
                             </view>
                             <view class="dataItemAnalyse">
                                  <textarea v-if="dataIsShow" v-model="kaoyanAnal[2]"  maxlength="-1" auto-height="true"></textarea>
                             </view>
                    </view>
                    <view class="content">
                              <view class="dataItemName">{{dataItemName[3]}}</view>
                              <view class="dataItemGraph">
                                 <ring-show :ringData="kaoyanData[3]" ref="ringShow"></ring-show>
                              </view>
                              <view class="dataItemAnalyse">
                                   <textarea v-if="dataIsShow" v-model="kaoyanAnal[3]"  maxlength="-1" auto-height="true"></textarea>
                              </view>
                     </view>
               </view>
            </view>
            <view class="operate">
                <button type="warn" @click="saveChange" v-bind:disabled="saveFlag">保存修改</button>
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
    import columnShow from '@/components/columnShow.vue'
    import lineShow from '@/components/lineShow.vue'
    import pieShow from '@/components/pieShow.vue'
    import ringShow from '@/components/ringShow.vue'
	export default {
        name:'kaoyan',
		data() {
			return {
                isactive:2,
                searchIsShow:false,
                dataIsShow:false,
                saveFlag:true,
                userInfo:{
                    userName:'管理员---'
                },
                allData:{},
                dataItemName:[
                    "考研数据分析",
                    "考研结果分析",
                    "考研院校分析",
                    "考研专业分析"
                ],
                kaoyanAnal:[
                    '这是第一条考研数据的分析',
                    '这是第二条考研数据的分析',
                    '这是第三条考研数据的分析',
                    '这是第四条考研数据的分析'
                ],
                kaoyanData:[
                        {
                          
                             "categories": ["2017", "2018", "2019"],
                             "series": [{
                               "name": '考研报名人数',
                               "data": [35, 20, 25],
                               "color": '#000000'
                             }, {
                               "name": '就业报名人数',
                               "data": [70, 40, 65]
                             }]
                       
                        },
                        {
                          
                              "categories": ["2017", "2018", "2019"],
                              "series": [{
                                "name": "考研成功人数",
                                "data": [15, 17, 25],
                                "color": '#000000'
                              }, {
                                "name": "就业成功人数",
                                "data": [30, 25, 35]
                              }]
                           
                            
                        },
                        {
                           
                              "series": [{
                                "name": "西安电子科技大学",
                                "data": 2
                              }, {
                                "name": "西安理工大学",
                                "data": 5
                              }, {
                                "name": "西安邮电大学",
                                "data": 5
                              }, {
                                "name": "西北工业大学",
                                "data": 4
                              }, {
                                "name": "浙江大学",
                                "data": 1
                              }]
                         
                        },
                        {
                          
                             "series": [{
                               "name": "网络安全",
                               "data": 5
                             }, {
                               "name": "大数据",
                               "data": 5
                             }, {
                               "name": "云计算",
                               "data": 3
                             }, {
                               "name": "人工智能",
                               "data": 4
                             }, {
                               "name": "图形图像处理",
                               "data": 1
                             }]
                          
                        }
                    
                    ]
		};
        },
        onLoad:function(e){
            _self = this
            _self.getUserData()
            _self.getAllData()
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
        components:{
            publicNav,
            foot,
            search,
            columnShow,
            lineShow,
            pieShow,
            ringShow
        },
        methods:{
            getUserData(){//获取管理员信息this
              //添加登陆函数监听
              console.log('主页检查登录')
              let loginRes = _self.checkLogin('../main/mian','2')
              console.log(loginRes)
              if(!loginRes){return;}
              _self.userInfo = loginRes
            },
            getAllData(){//获取所有专业信息
                uni.request({
                    url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/getAllDep',
                    success: (res) => {
                        console.log('fu')
                        console.log(res.data)
                        let allDep = res.data.allDep
                        _self.allData = res.data
                    }
                })
            },
            useGetKaoyanInfo: async function(dep,major){
                console.log(dep + '-------' + major)
                await _self.getKaoyanInfo(dep,major)
                console.log('next')
               
            },
            getKaoyanInfo(dep,major){//获取考研数据
                console.log(dep + 'get kaoyan Info' + major)
                return new Promise((resolve,reject) => {
                    uni.request({
                        url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/getMajorKaoyan',
                        method:'POST',
                        data:{
                            dep:dep,
                            major:major
                        },
                        success: (res) => {
                           _self.kaoyanData = res.data.data
                           _self.kaoyanAnal = res.data.analyse
                           console.log('start')
                           console.log('data',_self.kaoyanData)
                           console.log('anal',res.data.analyse)
                           console.log('end')
                           /* console.log(JSON.parse(JSON.stringify(_self.kaoyanData))) */
                             _self.$refs.lineShow.getServerData()
                             console.log(_self.$refs)
                             _self.$refs.columnShow.getServerData()
                             _self.$refs.pieShow.getServerData()
                             _self.$refs.ringShow.getServerData()
                             _self.dataIsShow = true
                             _self.saveFlag = false
                             
                        }
                    })
                })
            },
            getData(){
                
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
                .search{
                    width: 100%;
                    height: 50px;
                }
                .dataShowContent{
                    margin-top: 10px;
                    padding: 10px;
                    .dataShow{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        .content{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            margin-bottom: 10px;
                            padding: 5px;
                            width: 45%;
                            min-height: 350px;
                            border-radius: 20px;
                            .dataItemName{
                                
                                font-size: 20px;
                                font-weight: 600;
                            }
                            .dataItemGraph{
                                display: flex;
                                justify-content: center;
                                padding: 10px;
                                width: 100%;
                                min-height: 300px;
                                border-radius: 10px;
                              
                            }
                            .dataItemAnalyse{
                                padding: 5px;
                                width: 90%;
                                min-height: 100px;
                                background-color: #FFF;
                            }
                        }
                    }
                }
                .operate{
                    margin: 10px auto;
                    width: 20%;
                    button{
                        border-radius: 20px;
                    }
                }
            }
           
        }
    }
</style>
