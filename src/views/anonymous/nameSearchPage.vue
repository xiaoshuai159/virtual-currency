<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="关联信息" name="first" class="first-tab">
        <div>
          <div class="selectClass" style="margin-top: 15px">
            <el-row>
              <el-col :span="2"></el-col>
              <el-col :span="16">
                <div>
                  <span>关联实名信息：</span>
                  <el-input v-model="smxxInput" style="width: 240px" placeholder="请输入" />
                  <span style="margin-left: 10px">链上地址：</span>
                  <el-input v-model="lsdzInput" style="width: 240px" placeholder="请输入" />
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
                <div style="display: inline-block; margin-top: 10px">
                  <span>所属平台：</span>
                  <el-select v-model="ssptValue" placeholder="请选择">
                    <el-option v-for="item in ssptOptions" :key="item.value" :label="item.label" :value="item.value" />
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
                  <el-table-column prop="address" label="链上地址" min-width="280" align="center" show-overflow-tooltip />
                  <el-table-column prop="chain" label="所属链" min-width="100" align="center" />
                  <el-table-column prop="exchange" label="平台" min-width="100" align="center" />
                  <el-table-column prop="actor" label="身份信息" min-width="120" align="center" />
                  <el-table-column prop="name" label="关联实名信息" min-width="140" align="center" />
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
                  <el-table-column prop="num" label="矿机数" min-width="140" align="center" />
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
  const ssptValue = ref('')
  let ssptOptions = ref([])
  const kcymValue = ref('')
  let kcymOptions = ref([])
  const lsdzInput = ref('')
  const bzInput = ref('')
  const smxxInput = ref('')
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
  const searchClick1 = async () => {
    const queryData = {
      value: curName.value,
      exchange: ssptValue.value,
      address: lsdzInput.value,
      name: smxxInput.value,
    }
    const { data: res } = await service.get('/api/v1/query_nickname_address', { params: queryData })
    if (res.code == 200) {
      tableData.value = res.data
      ssptOptions.value = Array.from(new Set(res.data.map((item) => item.exchange))).map((exchange) => ({
        label: exchange,
        value: exchange,
      }))
    }
  }
  const resetClick1 = () => {
    smxxInput.value = ''
    lsdzInput.value = ''
    ssptValue.value = ''
    console.log('点击了重置按钮')
    searchClick1()
  }
  const searchClick2 = async () => {
    const queryData = {
      value: curName.value,
      coin: bzInput.value,
      pool_domain: kcymValue.value,
    }
    const { data: res } = await service.get('/api/v1/query_nickname_mining', { params: queryData })
    if (res.code == 200) {
      tableData2.value = res.data
      kcymOptions.value = Array.from(new Set(res.data.map((item) => item.pool))).map((pool) => ({ label: pool, value: pool }))
    }
  }
  const resetClick2 = () => {
    bzInput.value = ''
    kcymValue.value = ''
    console.log('点击了重置按钮')
    searchClick2()
  }
  let curName = ref('')
  onBeforeMount(() => {
    curName.value = JSON.parse(window.sessionStorage.getItem('curName'))
    searchClick1()
    searchClick2()
  })
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
