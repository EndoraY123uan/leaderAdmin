<template>
    <view class="nav">
       <view class="logo">
           领航者
           <text>后台管理系统</text>
       </view>
       <view class="options">
         <view class="item" 
           v-for="(item,index) in options" 
           :key="index"
           :class=" currentIndex == index ? 'current-class': 'item' "
           >
               <navigator :url="item.url">
                   <text>{{ item.title}}</text>
               </navigator>
           </view>
       </view>
       <view class="right">
           <view class="userInfo">
               {{ user}}
           </view>
           
           <view class="outLogin" @click="outLogin">
              退出登录
           </view>
       </view>
      
    </view>
</template>

<script>
    let _self
    export default {
       name:'publicNav',
       props:["user","currentIndex"],
       data() {
          return {
              options:[
                  {
                      title:'首页',
                      url:'../main/main'
                  },
                  {
                      title:'专业信息',
                      url:'../major/major'
                  },
                  {
                      title:'考研信息',
                      url:'../kaoyan/kaoyan'
                  },
                  {
                      title:'就业信息',
                      url:'../work/work'
                  },
                  {
                      title:'讨论区信息',
                      url:'../discuss/discuss'
                  }
              ]
          };
       },
       onLoad:function(){
         _self = this
         console.log('son')
         console.log( _self)
       },
       components:{},
       methods:{
           outLogin(){
               uni.showModal({
                    title: '退出系统?',
                    confirmColor:'#E64340',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                           uni.reLaunch({
                               url:'/pages/login/login'
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

<style lang="less">
    .nav{
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 50px;
        background: linear-gradient(to right,#8D75DB 20%,#727CF5);
        .logo{
            width: 150px;
            line-height:50px ;
            font-size: 20px;
            color: #FFF;
            text{
                font-size: 10px;
            }
        }
        .options{
            display: flex;
            align-items: center;
            height: 50px;
            font-size: 16px;
            color: #FFF;
            .item{
                margin-left: 30px;
                padding: 10upx 10upx;
               &:hover{
                    font-weight: 600;
                }
                &.current-class{
                    color: #7779CD;
                    background-color: #FFF;
                }
            }
               
        }
        .right{
          /*  text-align: right; */
          display: flex;
          justify-content: space-around;
       /*    background-color: #00AB98; */
          width: 200px;
          line-height:50px ;
          .userInfo{
              font-size: 18px;
              color: #FFF;
          }
          .outLogin{
             font-size: 16px;
             color: #FFF; 
             &:hover{
                 font-weight: 600;
             }
          }
         
          
        }
     
            
    }
</style>
