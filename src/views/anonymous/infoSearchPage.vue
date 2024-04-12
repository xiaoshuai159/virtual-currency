<template>
  <div class="app-container demo-tabs">
    <div class="selectClass" style="margin-top: 15px">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="16">
          <div>
            <span>平台：</span>
            <el-input v-model="ptInput" style="width: 240px" placeholder="请输入" />
            <span style="margin-left: 10px">所在链：</span>

            <el-select v-model="szlValue" placeholder="请选择">
              <el-option v-for="item in szlOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="margin-right: 20px">
            <el-button type="primary" @click="searchClick">查 询</el-button>
            <el-button @click="resetClick">重 置</el-button>
            <a style="margin-left: 14px; cursor: pointer; color: #1675d5" @click="toggleAdvanced">
              {{ isCollapse ? '收起' : '展开' }}
              <!-- <i :class="isCollapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" /> -->
            </a>
          </div>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="isCollapse">
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="20">
              <div style="display: inline-block; margin-top: 10px">
                <span>地址：</span>
                <el-input v-model="dzValue" style="width: 240px" placeholder="请输入" />
                <!-- <el-select v-model="dzValue" placeholder="请选择" style="width: 240px">
                  <el-option v-for="item in dzOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> -->
                <span style="margin-left: 10px">昵称：</span>
                <el-input v-model="ncInput" style="width: 220px" placeholder="请输入" />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
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
            <el-table-column prop="exchange" label="平台" min-width="100" align="center" />
            <el-table-column prop="address" label="地址" show-overflow-tooltip min-width="280" align="center" />
            <el-table-column prop="chain" label="所在链" min-width="100" align="center" />
            <el-table-column prop="nickname" label="昵称" min-width="100" align="center" />
            <el-table-column prop="bank_card" label="卡号" min-width="160" align="center" />
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
</template>
<script lang="ts" setup>
  import { ref, reactive, Ref, onBeforeMount } from 'vue'
  import service from '@/api/request'
  const ptInput = ref('')
  const ncInput = ref('')
  const szlValue = ref('')
  let szlOptions = ref([])
  const dzValue = ref('')
  let dzOptions = ref([])
  const curPhone = ref('')
  onBeforeMount(() => {
    curPhone.value = JSON.parse(window.sessionStorage.getItem('curPhone'))
    searchClick()
  })
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
  let isCollapse: Ref<boolean> = ref(false)
  const toggleAdvanced = () => {
    isCollapse.value = !isCollapse.value
  }

  const searchClick = async () => {
    const queryData = {
      value: curPhone.value,
      exchange: ptInput.value,
      address: dzValue.value,
      chain: szlValue.value,
      nickname: ncInput.value,
    }
    const { data: res } = await service.get('/api/v1/query_name', { params: queryData })
    if (res.code == 200) {
      tableData.value = res.data
      szlOptions.value = Array.from(new Set(res.data.map((item) => item.chain))).map((chain) => ({ label: chain, value: chain }))
      // dzOptions.value = Array.from(new Set(res.data.map(item=>item.address))).map(address=>({label:address,value:address}))
    }
  }
  const resetClick = () => {
    console.log('点击了重置按钮')
    ptInput.value = ''
    szlValue.value = ''
    dzValue.value = ''
    ncInput.value = ''
    searchClick()
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
    margin: 10px 12px !important;
    height: auto;
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
