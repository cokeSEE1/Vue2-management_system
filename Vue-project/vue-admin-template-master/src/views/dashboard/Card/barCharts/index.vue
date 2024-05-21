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
              type:'bar',
              data:[10,46,32,56,56,12,56,12,22,45,11,22],
              color:'#B03A5B'
          
          }
      ],
      // 布局的调试
      grid:{
          left:0,
          top:0,
          right:0,
          bottom:0
      },
      tooltip:{}
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