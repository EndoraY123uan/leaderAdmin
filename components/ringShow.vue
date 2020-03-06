<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/uCharts/u-charts.js';
	var _self;
	var canvaRing=null;
   
	export default {
        name:'ringShow',
        props:['ringData'],
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
			}
		},
		onLoad() {
			
		},
        mounted() {
          _self = this;
          this.cWidth=uni.upx2px(750);
          this.cHeight=uni.upx2px(500);
        },
		methods: {
			getServerData(){
				console.log('ring here')
				 console.log(_self.$props)
				/* console.log(JSON.parse(_self.$props)) */
				let data = _self.$props.ringData
				console.log(data)
				 console.log(JSON.stringify(_self.$props))
				//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
				_self.serverData=data
               /* _self.serverData = res.data.kaoyanUnvData */
                let Ring={series:[]};
                //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                Ring.series=_self.serverData.series;
                _self.showRing("canvasRing",Ring);

			},
			showRing(canvasId,chartData){
				new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:true,
					title: {
						name: '考研专业',
						color: '#000',
						fontSize: 22
					},
					extra: {
						pie: {
						  offsetAngle: -45,
						  ringWidth: 40,
						  labelWidth:15
						}
					},
					background:'#FFFFFF',
					pixelRatio:1,
					series: chartData.series,
					animation: true,
					width: 400,
					height: 300,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchPie(e){
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style>
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 400px; height:300px; background-color: rgba(219,238,252) ;}
.charts{width: 400px; height:300px; background-color: rgba(219,238,252) ;}
</style>
