<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="关联钱包" name="first" class="first-tab">
        <div>
          <div class="selectClass" style="margin-top: 15px">
            <el-row>
              <el-col :span="2"></el-col>
              <el-col :span="16">
                <div>
                  <span>交易平台：</span>
                  <el-select v-model="jyptValue" placeholder="请选择">
                    <el-option v-for="item in jyptOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <span style="margin-left: 10px">钱包地址：</span>
                  <el-input v-model="qbInput" style="width: 240px" placeholder="请输入" />
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin-right: 20px">
                  <el-button type="primary" @click="searchClick1">查 询</el-button>
                  <el-button @click="resetClick1">重 置</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2"></el-col>
              <el-col :span="20">
                <div style="display: inline-block; transform: translateX(14px); margin-top: 10px">
                  <span>所属链：</span>
                  <el-select v-model="sslValue" placeholder="请选择">
                    <el-option v-for="item in sslOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row style="margin-top: 32px">
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <div class="tableClass">
                <el-table
                  :data="tableData.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="address" label="钱包地址" min-width="280" align="center" />
                  <el-table-column prop="chain" label="所属链" min-width="140" align="center" />
                  <el-table-column prop="exchange" label="交易平台" min-width="140" align="center" />
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  v-model:currentPage="pagination.currentPage"
                  background
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="tableData.length"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-col>
            <el-col :span="1"></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="挖矿活动" name="second" class="second-tab">
        <div>
          <div class="selectClass" style="margin-top: 15px">
            <el-row>
              <el-col :span="2"></el-col>
              <el-col :span="16">
                <div>
                  <span>币种：</span>
                  <el-input v-model="bzInput" style="width: 240px" placeholder="请输入" />
                  <span style="margin-left: 10px">矿池域名：</span>
                  <el-select v-model="kcymValue" placeholder="请选择">
                    <el-option v-for="item in kcymOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin-right: 20px">
                  <el-button type="primary" @click="searchClick2">查 询</el-button>
                  <el-button @click="resetClick2">重 置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row style="margin-top: 32px">
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <div class="tableClass">
                <el-table
                  :data="
                    tableData2.slice((pagination2.currentPage - 1) * pagination2.pageSize, pagination2.currentPage * pagination2.pageSize)
                  "
                  style="width: 100%"
                  @selection-change="handleSelectionChange2"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="coin" label="币种" min-width="140" align="center" />
                  <el-table-column prop="num" label="矿机数量" min-width="140" align="center" />
                  <el-table-column prop="pool" label="矿池域名" min-width="180" align="center" />
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  v-model:currentPage="pagination2.currentPage"
                  background
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="tableData2.length"
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                />
              </div>
            </el-col>
            <el-col :span="1"></el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import service from '@/api/request'
  interface User {
    qbdz: string
    ssl: string
    jypt: string
  }

  const activeName = ref('first')

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
  const jyptValue = ref('')
  let jyptOptions = ref([])
  const kcymValue = ref('')
  let kcymOptions = ref([])
  const sslValue = ref('')
  let sslOptions = ref([])
  const qbInput = ref('')
  const bzInput = ref('')
  let curIp = ref('')
  onBeforeMount(() => {
    curIp.value = JSON.parse(window.sessionStorage.getItem('curIp'))
    searchClick1()
    searchClick2()
  })
  // table逻辑 start -------------

  let tableData = ref([])
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pagination.currentPage = val
  }
  const multipleSelection = ref([])
  const handleSelectionChange = (val: any) => {
    multipleSelection.value = val
  }
  const searchClick1 = async () => {
    const queryData = {
      value: curIp.value,
      exchange: jyptValue.value,
      address: qbInput.value,
      chain: sslValue.value,
    }
    const { data: res } = await service.get('/api/v1/query_ip_address', { params: queryData })
    if (res.code == 200) {
      tableData.value = res.data
      jyptOptions.value = Array.from(new Set(res.data.map((item) => item.exchange))).map((exchange) => ({
        label: exchange,
        value: exchange,
      }))
      sslOptions.value = Array.from(new Set(res.data.map((item) => item.chain))).map((chain) => ({ label: chain, value: chain }))
    }
  }
  const resetClick1 = () => {
    console.log('点击了重置按钮')
    jyptValue.value = ''
    qbInput.value = ''
    sslValue.value = ''
    searchClick1()
  }
  // end -----------------------------------

  let tableData2 = ref([])
  const pagination2 = reactive({
    currentPage: 1,
    pageSize: 10,
  })
  const multipleSelection2 = ref<User[]>([])
  const handleSizeChange2 = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange2 = (val: number) => {
    console.log(`current page: ${val}`)
    pagination2.currentPage = val
  }
  const handleSelectionChange2 = (val: User[]) => {
    multipleSelection2.value = val
  }

  const searchClick2 = async () => {
    const queryData = {
      value: curIp.value,
      coin: bzInput.value,
      pool_domain: kcymValue.value,
    }
    const { data: res } = await service.get('/api/v1/query_ip_mining', { params: queryData })
    if (res.code == 200) {
      tableData2.value = res.data
      kcymOptions.value = Array.from(new Set(res.data.map((item) => item.pool))).map((pool) => ({ label: pool, value: pool }))
    }
  }
  const resetClick2 = () => {
    console.log('点击了重置按钮')
    bzInput.value = ''
    kcymValue.value = ''
    searchClick2()
  }
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin: 15px 0;
    justify-content: center !important;
  }
  .demo-tabs {
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  // .first-tab{
  //     margin-left: 20px;
  // }
  :deep(#tab-first) {
    margin-left: 20px !important;
  }
  :deep(.el-tabs__active-bar is-top) {
    margin-left: 20px !important;
  }
</style>
