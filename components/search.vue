<template>
	<view class="search">
        <view class="dep" >
            <picker mode="multiSelector" @tap="getData" :range="depList" :value="depIndex" @change="bindTimeChange" @columnchange="select">
                <view>{{ depList[0][depIndex[0]]}}——{{ depList[1][depIndex[1]]}}</view>
            </picker>
        </view>
	</view>
</template>

<script>
    let _self
	export default {
        name:'search',
        props:["allData"],
		data() {
			return {
                depList:[
                   [
                       "请选择学院"
                   ],
                   [
                       "请选择专业"
                   ]
                ],
                depIndex:[0,0],
                allMajorList:[],
                flag:true
			};
		},
        onLoad:function(){
            
        },
        components:{
            
        },
        onReady() {
            console.log('ready')
        },
        mounted() {
           console.log('search')
            _self = this
        },
        methods:{
            getData(){//从父组件拿到的数据赋值给子组件的data
                console.log('console')
                _self.depList[0] = ["请选择学院"].concat(_self.$props.allData.allDep)
                _self.allMajorList = ['请选择专业'].concat(_self.$props.allData.allMajor)
            },
            bindTimeChange(e){//选择后的选项
           /*     console.log('son') */
            	_self.depIndex = e.target.value
                let selectDep = _self.depList[0][_self.depIndex[0]]
                let selectMajor = _self.depList[1][_self.depIndex[1]]
               console.log(selectDep)
                console.log(selectMajor)
                _self.$emit('getItemInfo',selectDep,selectMajor)
                uni.showLoading({
                });
                setTimeout(function () {
                    uni.hideLoading();
                }, 1000);
            },
            select(e){//选择院系专业
                let column = e.target.column //改变的列
                let value = e.target.value //选择的下标
                if(column == 0){
                     this.depList[1] = this.allMajorList[value]
                }
                
                console.log('column')
                console.log(e.target.column)
                console.log(e.target.value)
            }
          }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        .search{
            position: sticky;
            top: 50px;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            height: 30px;
            z-index: 100;
            .dep{
                padding: 0 10px;
                margin-right: 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color: #FFF;
                font-size: 14px;
                background: linear-gradient(to right,#8D75DB 20%,#727CF5);
                border-radius: 20px;
            }
        }
    }
</style>
