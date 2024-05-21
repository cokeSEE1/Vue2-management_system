<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
        <el-card>
           <detail title="总销售额" count="￥ 126560">
            <template slot="charts">
               <span> 周同比&nbsp;&nbsp;&nbsp;56.6% <svg t="1716012905701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3745" width="16" height="16"><path d="M512.146286 454.753524l-266.849524 266.727619L193.584762 669.744762l318.585905-318.415238 318.268952 318.415238-51.736381 51.687619z" p-id="3746" fill="#1afa29"></path></svg>&nbsp;&nbsp;&nbsp;</span>
               &nbsp;&nbsp;&nbsp;
               <span>日同比&nbsp;&nbsp;19.96%<svg t="1716013089108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6085" width="16" height="16"><path d="M954.898691 343.255785 870.554724 258.913864 511.998465 617.447611 153.438113 258.913864 69.099263 343.255785 511.997442 786.15601 512.591983 785.16545 512.741385 785.412067Z" fill="#d81e06" p-id="6086"></path></svg></span>
            </template>
            <template slot="footer">
               <span>日销售额￥ 12423</span>
            </template>
           </detail>
        </el-card>
       </el-col>
       <el-col :span="6">
        <el-card>
           <detail title="访问量" count="88460">
            <template slot="charts">
              <lineChart/>
            </template>
            <template slot="footer">
               <span>日访问量 1234</span>
            </template>
           </detail>
        </el-card>
       </el-col>
       <el-col :span="6">
        <el-card>
           <detail title="支付笔数" count="88460">
            <template slot="charts">
               <barCharts/> 
            </template>
            <template slot="footer">
               <span>转化率 64%</span>
            </template>
           </detail>
        </el-card>
       </el-col>
       <el-col :span="6">
        <el-card>
           <detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressCharts/>
            </template>
            <template slot="footer">
                <span> 周同比&nbsp;&nbsp;&nbsp;56.6% <svg t="1716012905701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3745" width="16" height="16"><path d="M512.146286 454.753524l-266.849524 266.727619L193.584762 669.744762l318.585905-318.415238 318.268952 318.415238-51.736381 51.687619z" p-id="3746" fill="#1afa29"></path></svg>&nbsp;&nbsp;&nbsp;</span>
               &nbsp;&nbsp;&nbsp;
               <span>日同比&nbsp;&nbsp;19.96%<svg t="1716013089108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6085" width="16" height="16"><path d="M954.898691 343.255785 870.554724 258.913864 511.998465 617.447611 153.438113 258.913864 69.099263 343.255785 511.997442 786.15601 512.591983 785.16545 512.741385 785.412067Z" fill="#d81e06" p-id="6086"></path></svg></span>
            </template>
           </detail>
        </el-card>
       </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from './detail/index.vue'
import lineChart from './lineChart/index.vue'
import barCharts from './barCharts/index.vue'
import progressCharts from './progressCharts/index.vue'
export default {
name:'Card',
components:{
    detail,
    lineChart,
    barCharts,
    progressCharts
}
}
</script>

<style>

</style>