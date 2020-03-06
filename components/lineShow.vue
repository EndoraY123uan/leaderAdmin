<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasLine" id="canvasLine" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/uCharts/u-charts.js';
	var _self;
	var canvaLine=null;

	export default {
        name:'lineShow',
        props:["lineData"],
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:''
			}
		},
		onLoad() {
			
		},
        mounted() {
            console.log('mounted')
            _self = this;
            this.cWidth=uni.upx2px(750);
            this.cHeight=uni.upx2px(500);
         
        },
		methods: {
			getServerData(){
                console.log('here')
                console.log(_self.$props)
               /* console.log(JSON.parse(_self.$props)) */
               let data = _self.$props.lineData
                console.log(JSON.stringify(_self.$props))
                _self.serverData =data
                let line={categories:[],series:[]};
                //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                line.categories=_self.serverData.categories;
                line.series=_self.serverData.series;
                _self.showColumn("canvasLine",line);
			},
			showColumn(canvasId,chartData){
				canvaLine=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:100,
						format:(val)=>{return val.toFixed(0)+'人'}
					},
					width: 400,
					height: 300,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			}
		}
	}
</script>

<style>
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 400px; height:300px; background-color: rgba(219,238,252) ;}
.charts{width: 400px; height:300px; background-color: rgba(219,238,252) ;}
</style>