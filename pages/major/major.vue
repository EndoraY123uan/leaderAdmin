<template>
	<view class="major">
        <!-- 导航栏-->
       <public-nav :user = "userInfo.userName" :currentIndex="isactive"></public-nav>
       <view class="main">
           <!-- 搜索框-->
          <search :allData="allData" @getItemInfo="getMajorInfo"></search>
          <!--显示框 -->
          <view class="content">
              <view class="majorItem" >
                  <view class="majorItemName">专业名称:</view>
                  <view class="majorItemDetail">
                      <input v-model="majorInfo.majorName" />
                  </view>
              </view>
              <view class="majorItem" >
                  <view class="majorItemName">专业介绍:</view>
                  <view class="majorItemDetail">
                      <textarea v-model="majorInfo.majorIntroduce"  maxlength="-1" auto-height="true"></textarea>
                    <!--  <input :value="majorInfo.majorIntroduce" /> -->
                  </view>
              </view>
              <view class="majorItem">
                  <view class="majorItemName">基础课程:</view>
                  <view class="majorItemDetail classList">
                       <view class="Class" v-for="(item,index) in majorInfo.basicClass">
                           <view class="className">
                               <view class="iconfont icon-class"></view>
                               <view>{{ item.className }}</view>
                           </view>
                           <view class="classDetail">
                               <textarea maxlength="-1" auto-height="true" v-model="item.classIntroduce"></textarea>
                           </view>
                       </view>
                  </view>
              </view>
              <view class="majorItem">
                  <view class="majorItemName">专业课程:</view>
                  <view class="majorItemDetail classList">
                       <view class="Class" v-for="(item,index) in majorInfo.majorClass">
                           <view class="className">
                               <view class="iconfont icon-class"></view>
                               <view>{{ item.className }}</view>
                           </view>
                           <view class="classDetail">
                               <textarea maxlength="-1" auto-height="true" v-model="item.classIntroduce" ></textarea>
                           </view>
                       </view>
                  </view>
              </view>
              <view class="majorItem">
                  <view class="majorItemName">工作岗位:</view>
                  <view class="majorItemDetail classList">
                       <view class="Class" v-for="(item,index) in majorInfo.workList">
                           <view class="className">
                               <view class="iconfont icon-class"></view>
                               <view>{{ item.workName }}</view>
                           </view>
                           <view class="classDetail">
                               <textarea maxlength="-1" auto-height="true" v-model="item.workIntroduce"></textarea>
                           </view>
                       </view>
                  </view>
              </view>
          </view>
          <!-- 操作栏 -->
          <view class="operate">
              <button type="warn" @click="save" v-bind:disabled="saveFlag">保存修改</button>
          </view>
       </view>
       <!-- 脚部-->
       <foot></foot>
	</view>
</template>

<script>
    let _self
    import publicNav from '../../components/publicNav.vue'
    import foot from '../../components/foot.vue'
   import search from '../../components/search.vue'
	export default {
        name:'major',
		data() {
			return {
                isactive:1,
                saveFlag:true,
                userInfo:{
                    userName:'管理员---'
                },
                allData:{},
                majorItem:[
                    "专业名称",
                    "专业介绍",
                    "基础课程",
                    "专业课程",
                    "工作岗位"
                ],
                majorInfo:{}
			};
		},
        onLoad:function(){
           _self = this
          _self.getUserData()
           console.log('2')
           console.log(this)
           _self.getAllData()
         /*  _self.getMajorInfo() */
          /* this.$refs.search.getAllDep() */
        /*   _self.getSearchData() */
        },
        components:{
            publicNav,
            foot,
            search
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
            getMajorInfo(depId,majorId){//获取专业信息
            console.log(depId + '+' + majorId)
                uni.request({
                    url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/getMajorDetail',
                    method:'POST',
                    data:{
                        depId:depId,
                        majorid:majorId
                    },
                    success: (res) => {
                        _self.saveFlag = false
                        console.log(res.data)
                        _self.majorInfo = res.data
                    }
                })
            },
            save(){//保存修改
                uni.showModal({
                     title: '确定修改?',
                     confirmColor:'#E64340',
                     success: function (res) {
                         if (res.confirm) {
                             console.log('用户点击确定');
                            uni.request({
                                url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/resaveMajorInfo',
                                method:'POST',
                                data:{
                                    majorInfo:_self.majorInfo
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
        .major{
            width: 100%;
            .main{
                margin: 15px auto;
                padding: 10px;
                width: 80%;
                min-height: 300upx;
                padding-bottom: 100px;
                background-color: rgba(219,238,252,0.7) ;
                .content{
                    margin: 10upx auto;
                    width: 90%;
                   background-color: rgba(219,238,252,0.7) ;
                    .majorItem{
                        padding: 10px ;
                      /*  border: 0.2px solid #555555; */
                        margin-bottom: 10px;
                        .majorItemName{
                            font-size: 16px;
                            font-weight: 600;
                        }
                        .majorItemDetail{
                            padding: 5px 10px;
                            margin-top: 5px;
                            background-color: #FFF;
                            border-radius: 10px;
                            input{
                                width: 100%;
                            }
                            textarea{
                                width: 100%;
                            }
                            .Class{
                                padding: 5px;
                                background-color: #FFF;
                                .className{
                                    display: flex;
                                    align-items: center;
                                    color: @mianColor;
                                    font-size: 16px;
                                    font-weight: 800;
                                }
                                .classDetail{
                                   
                                }
                            }
                        }
                        .classList{
                             padding: 0;
                             background-color: rgba(219,238,252,0.7) ;
                             border-radius: 10px;
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
