<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
   mounted(){
   let lineCharts= echarts.init(this.$refs.charts)
//    console.log(line);
lineCharts.setOption({
    xAxis:{
        show:false,
        type:'category'
    },
    yAxis:{
        show:false
    },
    series:[
        {
            type:'line',
            smooth:true,
            data:[10,46,32,4,56,4,56,12,4,98,11],
            // 拐点的样式设置
            itemStyle:{
                opacity:0
            },
            // 线条的样式
            lineStyle:{
                color:'purple'
            },
            // 区域填充颜色设置
            areaStyle:{
                color:{
                    type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'purple' // 0% 处的颜色
                }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false

                }
            }
        }
    ],
    // 布局的调试
    grid:{
        left:0,
        top:0,
        right:0,
        bottom:0
    }
})

   }
}
</script>

<style scoped>
.charts{
    width: 100%;
    height: 100%;
}

</style>