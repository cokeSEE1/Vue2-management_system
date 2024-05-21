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
        //   最小值与最大值的设置
        min:0,
        max:100
      },
      yAxis:{
          show:false,
          type:'category'
      },
      series:[
          {
              type:'bar',
              smooth:true,
              data:[78],
              color:'pink',
              barWidth:10,
            //   设置背景的显示与隐藏
              showBackground:true,
            //   设置背景颜色
              backgroundStyle:{
                color:'#eee'
              },
            //   设置文本标签
              label:{
                show:true,
                // 改变文本内容
                formatter:'|',
                // 设置文本的位置调试
                position:'right'
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