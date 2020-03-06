<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/uCharts/u-charts.js';
	var _self;
	var canvaPie=null;
   
	export default {
        name:'pieShow',
        props:['pieData'],
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
				console.log('pie here')
				 console.log(_self.$props)
				/* console.log(JSON.parse(_self.$props)) */
				let data = _self.$props.pieData
				console.log(data)
				 console.log(JSON.stringify(_self.$props))
				//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
				_self.serverData=data
               /* _self.serverData = res.data.kaoyanUnvData */
                let Pie={series:[]};
                //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                Pie.series=_self.serverData.series;
                _self.showPie("canvasPie",Pie);

			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
                    width: 400,
                    height: 300,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
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
