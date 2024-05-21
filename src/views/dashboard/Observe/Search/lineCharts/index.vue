<template>
  <div>
    <div class="header">
        <span class="search-header">搜索用户数</span>
        <svg t="1716011798294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2331" width="16" height="16"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z" p-id="2332" fill="#8a8a8a"></path><path d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z" p-id="2333" fill="#8a8a8a"></path><path d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z" p-id="2334" fill="#8a8a8a"></path></svg>
    </div>
    <div class="main">
        <span class="main-title">12321</span>
        <span class="main-content">17.1</span>
        <svg t="1716012905701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3745" width="16" height="16"><path d="M512.146286 454.753524l-266.849524 266.727619L193.584762 669.744762l318.585905-318.415238 318.268952 318.415238-51.736381 51.687619z" p-id="3746" fill="#1afa29"></path></svg>
        <svg t="1716013089108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6085" width="16" height="16"><path d="M954.898691 343.255785 870.554724 258.913864 511.998465 617.447611 153.438113 258.913864 69.099263 343.255785 511.997442 786.15601 512.591983 785.16545 512.741385 785.412067Z" fill="#d81e06" p-id="6086"></path></svg>
    </div>
    <div class="footer">
        <div class="charts" ref="charts"></div>
        
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
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
                color:'blue'
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
                    offset: 0, color: 'blue' // 0% 处的颜色
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
.header{
    display: flex;
    align-content: center;
}
.search-header{
    margin-right:15px ;
}
.main{
    margin: 10px 0;
}
.main-title{
    margin-right: 30px;
}
.main-content{
    margin-right: 10px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>