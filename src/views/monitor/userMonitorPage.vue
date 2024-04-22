<template>
  <div class="app-container">
    <div class="blockstyle">
      <div class="titlestyle" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0px 10px 24px">
        <div>
          <span>交易软件活跃情况</span>
        </div>
        <div style="font-weight: normal; margin-right: 20px">
          <span>时间范围：</span>
          <el-select v-model="timeValue" placeholder="请选择" style="width: 100px; margin-right: 30px">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <span>日期选择：</span>
          <el-date-picker
            v-model="datetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
            style="width: auto"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <div class="namestyle">钱包软件IP日活数</div>
            <div class="numberstyle">{{ wallet_ip_num }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">交易平台IP日活数</div>
            <div class="numberstyle">{{ exchange_ip_num }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">监控钱包软件数</div>
            <div class="numberstyle">{{ wallet_num }}</div>
          </el-col>
          <el-col :span="6">
            <div class="namestyle">监控交易平台数</div>
            <div class="numberstyle">{{ exchange_num }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="blockstyle">
      <div class="titlestyle">
        <span>用户分布情况</span>
      </div>
      <div style="width: 50%; height: 350px; padding: 10px 0px; display: inline-block">
        <div
          id="myPieChart1"
          style="width: 80%; margin: 0 auto; border: 1px Dashed #797979; height: 96%; border-radius: 15px; padding-top: 10px"
        >
        </div>
      </div>
      <div style="width: 50%; height: 350px; padding: 10px 0px; display: inline-block">
        <div
          id="myPieChart2"
          style="width: 80%; margin: 0 auto; border: 1px Dashed #797979; height: 96%; border-radius: 15px; padding-top: 10px"
        >
        </div>
      </div>
    </div>
    <div class="blockstyle">
      <div class="titlestyle">
        <span>IP地域分布情况</span>
      </div>
      <div style="height: 350px; padding: 10px 0px">
        <div
          id="myhistogram"
          style="width: 96%; margin: 0 auto; border: 1px Dashed #797979; height: 96%; border-radius: 15px; padding-top: 10px"
        >
        </div>
      </div>
    </div>
    <div class="blockstyle">
      <div class="titlestyle">
        <span>交易/查询访问行为</span>
      </div>
      <div style="height: 350px; padding: 10px 0px">
        <div
          id="mylinechart"
          style="width: 96%; margin: 0 auto; border: 1px Dashed #797979; height: 96%; border-radius: 15px; padding-top: 10px"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import service from '@/api/request'

  //交易软件活跃情况
  const wallet_ip_num = ref('124,543,23')
  const exchange_ip_num = ref('324,124,58')
  const wallet_num = ref('10')
  const exchange_num = ref('9')

  function drawPiechart1(walletData) {
    if (document.getElementById('myPieChart1') == null) {
      return
    }
    echarts.dispose(document.getElementById('myPieChart1'))
    const pie_chart1 = echarts.init(document.getElementById('myPieChart1'))
    // let pie_chart = this.$echarts.init(this.$refs.myPieChart1)
    let option = {
      title: {
        subtext: '钱包软件用户数量占比',
        top: '-3%',
        left: '3%',
        subtextStyle: {
          fontSize: 14, // 设置副标题字体大小
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '14%',
        orient: 'vertical',
        right: 'right',
      },
      grid: {
        left: '20%', // 在这里调整左边距
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          padAngle: 2,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 26,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: walletData,
        },
      ],
    }
    option && pie_chart1.setOption(option)
  }

  function drawPiechart2(walletData2) {
    if (document.getElementById('myPieChart2') == null) {
      return
    }
    echarts.dispose(document.getElementById('myPieChart2'))
    const pie_chart2 = echarts.init(document.getElementById('myPieChart2'))
    // let pie_chart = this.$echarts.init(this.$refs.myPieChart1)
    let option = {
      title: {
        subtext: '交易平台用户数量占比',
        top: '-3%',
        left: '3%',
        subtextStyle: {
          fontSize: 14, // 设置副标题字体大小
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '14%',
        orient: 'vertical',
        right: 'right',
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          padAngle: 2,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 26,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: walletData2,
        },
      ],
    }
    option && pie_chart2.setOption(option)
  }
  function drawHistogram(shengfendate, qianbaodate, pingtaidate) {
    if (document.getElementById('myhistogram') == null) {
      return
    }
    echarts.dispose(document.getElementById('myhistogram'))
    const myChart = echarts.init(document.getElementById('myhistogram'))
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 45,
          textStyle: { fontStyle: 'italic' },
        },
        data: shengfendate,
      },
      yAxis: {
        type: 'value',
        name: 'IP数量（单位：万）',
        boundaryGap: [0, 0.01],
      },
      series: [
        {
          name: '钱包软件访问',
          type: 'bar',
          data: qianbaodate,
        },
        {
          name: '交易平台访问',
          type: 'bar',
          data: pingtaidate,
        },
      ],
    }
    option && myChart.setOption(option)
  }

  function drawlineChart(xdata, jiaoyi, chaxun) {
    if (document.getElementById('mylinechart') == null) {
      return
    }
    echarts.dispose(document.getElementById('mylinechart'))
    const mylineChart = echarts.init(document.getElementById('mylinechart'))
    let option = {
      color: ['#bf444c', '#91cc75', '#675bba'], // 设置折线图的颜色
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['交易', '查询'],
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
        data: xdata,
      },
      yAxis: {
        type: 'value',
        name: 'USDT',
      },
      series: [
        {
          name: '交易',
          type: 'line',
          stack: 'Total',
          data: jiaoyi,
        },
        {
          name: '查询',
          type: 'line',
          stack: 'Total',
          data: chaxun,
        },
      ],
    }
    option && mylineChart.setOption(option)
  }

  //获取数据
  const loadAPI = async () => {
    const { data: res } = await service.get('/api/v1/get_software_header', {
      params: {
        s_date: dayjs(datetime.value[0]).format('YYYY-MM-DD'),
        e_date: dayjs(datetime.value[1]).format('YYYY-MM-DD'),
      },
    })
    if (res.code == 200) {
      // console.log(res);
      ;(exchange_ip_num.value = res.data.exchange_ip_num),
        (wallet_ip_num.value = res.data.wallet_ip_num),
        (wallet_num.value = res.data.wallet_num),
        (exchange_num.value = res.data.exchange_num)
    } else {
      console.error(res.msg)
    }
    const { data: resPie } = await service.get('/api/v1/get_software_pie', {
      params: {
        s_date: dayjs(datetime.value[0]).format('YYYY-MM-DD'),
        e_date: dayjs(datetime.value[1]).format('YYYY-MM-DD'),
      },
    })
    if (resPie.code == 200) {
      // 拆分wallet对象为数组
      const walletArray = Object.entries(resPie.data.wallet).map(([name, value]) => ({
        value,
        name,
      }))
      // 拆分exchange对象为数组
      const exchangeArray = Object.entries(resPie.data.exchange).map(([name, value]) => ({
        value,
        name,
      }))
      drawPiechart1(walletArray)
      drawPiechart2(exchangeArray)
    }
    const { data: resBar } = await service.get('/api/v1/get_software_bar', {
      params: {
        s_date: dayjs(datetime.value[0]).format('YYYY-MM-DD'),
        e_date: dayjs(datetime.value[1]).format('YYYY-MM-DD'),
      },
    })
    if (resBar.code == 200) {
      const cities = Object.keys(resBar.data.wallet)
      const walletValues = Object.values(resBar.data.wallet).map((value) => value || 0)
      const exchangeValues = Object.values(resBar.data.exchange).map((value) => value || 0)
      drawHistogram(cities, walletValues, exchangeValues)
    }
    const { data: resLine } = await service.get('/api/v1/get_software_line', {
      params: {
        s_date: dayjs(datetime.value[0]).format('YYYY-MM-DD'),
        e_date: dayjs(datetime.value[1]).format('YYYY-MM-DD'),
      },
    })
    if (resLine.code == 200) {
      const keys = Object.keys(resLine.data.query)
      const queryValues = Object.values(resLine.data.query).map((value) => value || 0)
      const transactionValues = Object.values(resLine.data.transaction).map((value) => value || 0)
      // console.log(keys)
      drawlineChart(keys, transactionValues, queryValues)
    }
  }

  onMounted(() => {
    loadAPI()
    // drawPiechart1(walletData) // 在这里替换 yourFirstLevelData 为您的数据
    // drawPiechart2(walletData2) // 在这里替换 yourFirstLevelData 为您的数据

    // drawlineChart()
  })
  const getPastDate = (days) => {
    const today = new Date()
    const pastDate = new Date(today)
    pastDate.setDate(today.getDate() - days)
    return pastDate
  }
  //日期下拉框和日期时间选择器
  const timeValue = ref(1)
  const datetime = ref([])
  const pastDate = getPastDate(7)
  datetime.value = [pastDate, new Date()]
  const timeOptions = ref([
    { value: 1, label: '周' },
    { value: 2, label: '月' },
    { value: 3, label: '季度' },
  ])

  watch(datetime, (newValue, oldValue) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    if (
      newValue[1].getFullYear() === currentYear &&
      newValue[1].getMonth() === currentMonth &&
      newValue[1].getDate() === currentDay &&
      newValue[0].getFullYear() === getPastDate(7).getFullYear() &&
      newValue[0].getMonth() === getPastDate(7).getMonth() &&
      newValue[0].getDate() === getPastDate(7).getDate()
    ) {
      timeValue.value = 1
    } else if (
      newValue[1].getFullYear() === currentYear &&
      newValue[1].getMonth() === currentMonth &&
      newValue[1].getDate() === currentDay &&
      newValue[0].getFullYear() === getPastDate(30).getFullYear() &&
      newValue[0].getMonth() === getPastDate(30).getMonth() &&
      newValue[0].getDate() === getPastDate(30).getDate()
    ) {
      timeValue.value = 2
    } else if (
      newValue[1].getFullYear() === currentYear &&
      newValue[1].getMonth() === currentMonth &&
      newValue[1].getDate() === currentDay &&
      newValue[0].getFullYear() === getPastDate(90).getFullYear() &&
      newValue[0].getMonth() === getPastDate(90).getMonth() &&
      newValue[0].getDate() === getPastDate(90).getDate()
    ) {
      timeValue.value = 3
    } else {
      timeValue.value = null
    }
    loadAPI()
  })

  watch(timeValue, (newValue, oldValue) => {
    if (newValue === 1) {
      datetime.value = [getPastDate(7), new Date()]
    } else if (newValue === 2) {
      datetime.value = [getPastDate(30), new Date()]
    } else if (newValue === 3) {
      datetime.value = [getPastDate(90), new Date()]
    }
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
