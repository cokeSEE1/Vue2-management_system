<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
  <div slot="header" class="clearfix">
    <!-- @tab-click="handleClick" -->
    <!-- 头部左侧内容 -->
    <el-tabs class="tab" v-model="activeName">
    <el-tab-pane label="销售额" name='Sale'></el-tab-pane>
    <el-tab-pane label="访问量" name='Visit'></el-tab-pane>
  </el-tabs>
  <!-- 头部右侧内容 -->
  <div class="right">
    <span @click="setDate">今日</span>
   <span @click="setWeek">本周</span>
   <span @click="setMonth">本月</span>
   <span @click="setYear">本年</span>
   <el-date-picker class="date"
   v-model="date"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      size="mini">
      
    </el-date-picker>
  </div>
   

  </div>
 <div>
    <el-row :gutter="10">
        <el-col :span="18">
            <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
           <div class="right1">
            <h3>门店{{ title }}排名</h3>
            <ul>
                <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex">2</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex2">4</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex2">5</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex2">6</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
                <li>
                    <span class="rindex2">7</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                </li>
            </ul>
           </div>
        </el-col>
    </el-row>
 </div>
</el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs';
export default {
   name:'Sale',
   data() {
    return {
        activeName:'销售额',
        charts:null,
        date:[]
    }
   },
   computed:{
    title(){
      return this.activeName=='Sale'?'销售额':'访问量'
    }
   },
   mounted(){
    this.charts=echarts.init(this.$refs.charts)
    // console.log(charts1);
    this.charts.setOption({
        title:{
            text:`销售额趋势`
        },
        tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220,52, 200, 334, 390, 52 ],
      color:'green'
    }
  ]
    })
   },
   watch:{
    title(newValue){
      this.charts.setOption({
        title:{
          text:`${newValue}趋势`
        }
      })
    }
   },
   methods:{
    setDate(){
      // 本天
      const day=dayjs().format('YYYY-MM-DD')
      this.date=[day,day]
    },
    setWeek(){
      // 本周
      const start =dayjs().day(1).format('YYYY-MM-DD')
      const end =dayjs().day(7).format('YYYY-MM-DD')
      this.date=[start,end]
     
    },
    setMonth(){
      // 本月
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date=[start,end]
      
    },
    setYear(){
    //  本年
    const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date=[start,end]
    }
   }
}
</script>

<style scoped>
.tab{
    width: 100%;
}
.right{
    position: absolute;
    right: 0;
}
.clearfix{
    position: relative;
  display: flex;
  justify-content: space-between;
}
.date{
  width: 250px;
  margin: 0 20px;
}
.right span{
 margin: 0 10px;
}
.charts{
    width: 100%;
    height: 300px;
}
.right1{
    padding: 0;
}
ul{
    list-style: none;
    width: 100%;
    height: 100%;
    padding: 0px;
}
ul li {
    height: 10%;
    margin: 10px 0;

}
ul li span{
    margin: 0 10px;
}
.rindex{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
    float: left;
}
.rindex2{
    width: 20px;
    height: 20px;
    float: left;
    text-align: center;
}
.rvalue{
    float: right;
}
</style>