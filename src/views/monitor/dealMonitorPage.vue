<template>
  <div class="app-container">
    <div class="blockstyle">
      <div class="titlestyle">
        <span>链上交易情况</span>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <div class="namestyle">充币人数</div>
            <div class="numberstyle">{{ cbrs }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">提币人数</div>
            <div class="numberstyle">{{ tbrs }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">充币地址数</div>
            <div class="numberstyle">{{ cbdzs }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">提币地址数</div>
            <div class="numberstyle">{{ tbdzs }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="blockstyle">
      <div class="titlestyle">
        <span>交易行为趋势</span>
      </div>
      <div style="height: 350px; padding: 10px 0px">
        <div
          id="mylinechart"
          style="width: 96%; margin: 0 auto; border: 1px Dashed #797979; height: 96%; border-radius: 15px; padding-top: 10px"
        >
        </div>
      </div>
    </div>
    <div style="width: 98%; margin: 0 auto; margin-bottom: 20px; border-radius: 4px">
      <div class="blockstyle1" style="margin-right: 1%">
        <div class="titlestyle">
          <span>收入TOP5</span>
        </div>
        <div style="height: auto; padding: 10px 0px">
          <div style="width: 94%; margin: 0 auto">
            <el-table :data="buytableData">
              <el-table-column prop="address" label="地址" width="180" align="center" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="name" label="关联实名信息" width="140" align="center"> </el-table-column>
              <el-table-column prop="area" label="归属地" width="140" align="center"> </el-table-column>
              <el-table-column prop="num" label="收入量" align="center"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="blockstyle1" style="margin-left: 1%">
        <div class="titlestyle">
          <span>支出TOP5</span>
        </div>
        <div style="height: auto; padding: 10px 0px">
          <div style="width: 94%; margin: 0 auto">
            <el-table :data="selltableData">
              <el-table-column prop="address" label="地址" width="180" align="center" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="name" label="关联实名信息" width="140" align="center"> </el-table-column>
              <el-table-column prop="area" label="归属地" width="140" align="center"> </el-table-column>
              <el-table-column prop="num" label="支出量" align="center"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { onMounted } from 'vue'
  import * as echarts from 'echarts'
  import service from '@/api/request'
  import dayjs from 'dayjs'

  const cbrs = ref('2,1341')
  const tbrs = ref('3,2123')
  const cbdzs = ref('125,401,23')
  const tbdzs = ref('125,401,23')
  const buytableData = ref([])
  const selltableData = ref([])
  function drawlineChart(keys, chargingValues, withdrawlValues) {
    const mylineChart = echarts.init(document.getElementById('mylinechart'))
    let option = {
      color: ['#bf444c', '#91cc75', '#675bba'], // 设置折线图的颜色
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['收入量', '支出量'],
        // colorStops:['#bf444c','#91cc75']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: keys,
      },
      yAxis: {
        type: 'value',
        name: 'USDT',
      },
      series: [
        {
          name: '收入量',
          type: 'line',
          stack: 'Total',
          data: chargingValues,
        },
        {
          name: '支出量',
          type: 'line',
          stack: 'Total',
          data: withdrawlValues,
        },
      ],
    }
    option && mylineChart.setOption(option)
  }

  //获取数据
  const loadAPI = async () => {
    const { data: res } = await service.get('/api/v1/get_trans_header', {
      params: {
        s_date: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        e_date: dayjs().format('YYYY-MM-DD'),
      },
    })
    if (res.code == 200) {
      ;(cbrs.value = res.data.charging_num),
        (cbdzs.value = res.data.charging_address_num),
        (tbrs.value = res.data.withdrawl_num),
        (tbdzs.value = res.data.withdrawl_address_num)
    }
    const { data: resLine } = await service.get('/api/v1/get_trans_line', {
      params: {
        s_date: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        e_date: dayjs().format('YYYY-MM-DD'),
      },
    })
    if (resLine.code == 200) {
      const keys = Object.keys(resLine.data.charging)
      const chargingValues = Object.values(resLine.data.charging).map((value) => value || 0)
      const withdrawlValues = Object.values(resLine.data.withdrawl).map((value) => value || 0)
      drawlineChart(keys, chargingValues, withdrawlValues)
    }
    const { data: tableData } = await service.get('/api/v1/get_trans_top', {
      params: {
        s_date: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        e_date: dayjs().format('YYYY-MM-DD'),
      },
    })
    if (tableData.code == 200) {
      ;(buytableData.value = tableData.data.charging), (selltableData.value = tableData.data.withdrawl)
    }
  }
  onMounted(() => {
    loadAPI()
  })
</script>
<style>
  .blockstyle {
    width: 98%;
    margin: 0 auto;
    background-color: #ffffff;
    margin-bottom: 20px;
    border-radius: 4px;
    /* height: 300px; */
  }

  .blockstyle1 {
    width: 49%;
    margin: 0 auto;
    background-color: #ffffff;
    margin-bottom: 20px;
    border-radius: 4px;
    display: inline-block;
  }

  .titlestyle {
    font-size: 16px;
    font-weight: 600;
    padding: 18px 0px 18px 24px;
    border-bottom: 1px solid #ebebeb;
  }

  .namestyle {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    padding: 24px 32px 4px 32px;
    color: rgba(0, 0, 0, 0.427450980392157);
  }

  .numberstyle {
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    padding: 4px 32px 32px 32px;
    color: rgba(0, 0, 0, 0.847058823529412);
  }

  .usergraph {
    width: 46%;
    display: inline-block;
    margin: 0 auto;
    border-radius: 10px;
    border: 1px solid blue;
    margin: 0px 2%;
  }
</style>
<style scoped lang="scss">
  :deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
    height: 50px !important;
  }
</style>
