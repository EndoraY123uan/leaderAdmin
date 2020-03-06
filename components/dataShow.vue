<template>
	<view class="dataShow">
       <view class="content">
                <view class="dataItemName">{{dataItem[0]}}</view>
                <view class="dataItemGraph">
                    <line-show></line-show>
                </view>
                <view class="dataItemAnalyse"></view>
        </view>
      <view class="content">
                 <view class="dataItemName">{{dataItem[1]}}</view>
                 <view class="dataItemGraph">
                     
                 </view>
                 <view class="dataItemAnalyse"></view>
       </view>
       <view class="content">
                  <view class="dataItemName">{{dataItem[2]}}</view>
                  <view class="dataItemGraph">
                     <!-- <pie-show></pie-show> -->
                  </view>
                  <view class="dataItemAnalyse"></view>
         </view>
         <view class="content">
                   <view class="dataItemName">{{dataItem[3]}}</view>
                   <view class="dataItemGraph">
                       
                   </view>
                   <view class="dataItemAnalyse"></view>
          </view>
	</view>
</template>
<script>
    import pieShow from '@/components/pieShow.vue'
    import lineShow from '@/components/lineShow.vue'
	export default {
        name:'dataShow',
        props:["dataItem"],
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
                updateStatus: false,
             /*   echarts:echarts,
                m:'', */
              /*  line: {
                    legend: {
                        data: ['邮件营销']
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value',
                        data: []
                    },
                    dataZoom: [{
                        type: 'slider',
                        start: 30,
                        end: 100,
                        zoomLock: false,
                    }],
                    grid: {
                        left: 40,
                        right: 40,
                        bottom: 20,
                        top: 40,
                        containLabel: true
                    },
                    series: [{
                        data: [],
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        color: ['#5eb4e2'], //折线条的颜色
                    }]
                } */
			};
		},
        onLoad:function(){
            
        },
        components: {
            pieShow,
            lineShow
        },
        onReady() {
            console.log('ready')
        },
        methods:{
            /* lineInit(e) {
                let {
                    width,
                    height
                } = e;
                let canvas = this.$refs.lineChart.canvas
                echarts.setCanvasCreator(() => canvas);
                let lineChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(lineChart)
                lineChart.setOption(this.line)
                this.$refs.lineChart.setChart(lineChart)
                },
                lineInit(canvas, width, height) {
                 
                				let lineOption = {
                					animation: false,
                					backgroundColor: '#0A98D5',
                					color: ['#FFB6C1', '#32C5E9', '#67E0E3', '#91F2DE'],
                					series: [{
                						label: {
                							normal: {
                								fontSize: 14
                							}
                						},
                						type: 'pie',
                						center: ['50%', '50%'],
                						radius: [0, '60%'],
                						data: [{
                								value: 1,
                								name: '电流报警'
                							},
                							{
                								value: 2,
                								name: '漏电报警'
                							},
                							{
                								value: 3,
                								name: '温度报警'
                							},
                							{
                								value: 4,
                								name: '电压报警'
                							}
                 
                						],
                						itemStyle: {
                							emphasis: {
                								shadowBlur: 10,
                								shadowOffsetX: 0,
                								shadowColor: 'rgba(0, 2, 2, 0.3)'
                							}
                						}
                					}]
                				};
                				let lineChart = echarts.init(canvas, null, {
                					width: width,
                					height: height
                				})
                				canvas.setChart(lineChart)
                 
                				lineChart.setOption(lineOption)
                				return lineChart
                 
                			}
                            */
                   
          }
	}
</script>

<style lang="less" scoped>
    @mianColor:#7779CD;
    page{
        
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
                    font-size: 18px;
                    font-weight: 600;
                }
                .dataItemGraph{
                   width: 100%;
                   
                  min-height: 300px;
                  border-radius: 10px;
                  .ec-canvas{
                      display: flex;
                     height: 200px;
                     flex: 1; 
                  }
                }
                .dataItemAnalyse{
                    width: 100%;
                    min-height: 100px;
                    background-color: rgba(219,238,252);
                }
            }
        }
    }
</style>
