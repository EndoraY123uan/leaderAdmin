<template>
	<view class="foot">
        <view class="copyright">©这里由小袁工作室特别制作</view>
	</view>
</template>

<script>
    let _self
	export default {
        name:'foot',
		data() {
			return {
			};
		},
        onLoad:function(){
            _self = this
           
        },
        components:{
        },
        methods:{
            
        }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        .foot{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100px;
            background: linear-gradient(to right,#8D75DB 20%,#727CF5);
            .copyright{
                color: #FFF;
                font-size: 14px;
            }
        }
    }
</style>
