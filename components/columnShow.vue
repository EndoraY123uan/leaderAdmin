<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/uCharts/u-charts.js';
	var _self;
	var canvaColumn=null;

	export default {
        name:'columnShow',
        props:['columnData'],
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
                 console.log('column here')
                 console.log(_self.$props)
                /* console.log(JSON.parse(_self.$props)) */
                let data = _self.$props.columnData
                console.log(data)
                 console.log(JSON.stringify(_self.$props))
                //下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
                _self.serverData=data
                let Column={categories:[],series:[]};
                //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                Column.categories=_self.serverData.categories;
                Column.series=_self.serverData.series;
                _self.showColumn("canvasColumn",Column);
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:12,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
                        min:10,
                        max:60,
                        format:(val)=>{return val.toFixed(0)+'人'}
					},
					dataLabel: true,
					width: 400,
					height: 300,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
				
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
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