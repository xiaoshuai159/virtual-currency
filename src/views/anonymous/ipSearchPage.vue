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
                <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="qbdz" label="钱包地址" min-width="280" align="center" />
                  <el-table-column prop="ssl" label="所属链" min-width="140" align="center" />
                  <el-table-column prop="jypt" label="交易平台" min-width="140" align="center" />
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  v-model:currentPage="pagination.currentPage"
                  background
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="total"
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
                <el-table :data="tableData2" style="width: 100%" @selection-change="handleSelectionChange2">
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="bz" label="币种" min-width="140" align="center" />
                  <el-table-column prop="kjsl" label="矿机数量" min-width="140" align="center" />
                  <el-table-column prop="kcym" label="矿池域名" min-width="180" align="center" />
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  v-model:currentPage="pagination2.currentPage"
                  background
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="total2"
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
  const getAPIData = async () => {
    const { data: res } = await service.get('/api/v1/get_software_header')
  }
  onBeforeMount(() => {})
  const activeName = ref('first')

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
  const jyptValue = ref('')
  const jyptOptions = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
  ]
  const kcymValue = ref('')
  const kcymOptions = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
  ]
  const sslValue = ref('')
  const sslOptions = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
  ]
  const qbInput = ref('')
  const bzInput = ref('')
  const tableData = [
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
    {
      qbdz: '0xe35bbafa0266089f95d745d348b468622805d82b',
      ssl: 'TRON',
      jypt: 'Huobi',
    },
  ]
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
  })
  const total = ref(0)
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

  const tableData2 = [
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
    {
      bz: 'ETH',
      kjsl: '3820',
      kcym: 'channel.vaincues.com',
    },
  ]
  const pagination2 = reactive({
    currentPage: 1,
    pageSize: 10,
  })
  const total2 = ref(0)
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

  const searchClick1 = () => {
    console.log('点击了查询按钮')
  }
  const resetClick1 = () => {
    console.log('点击了重置按钮')
    jyptValue.value = ''
    qbInput.value = ''
    sslValue.value = ''
    searchClick1()
  }

  const searchClick2 = () => {
    console.log('点击了查询按钮')
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
