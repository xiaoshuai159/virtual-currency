<template>
  <div class="app-container demo-tabs">
    <div class="selectClass" style="margin-top: 15px">
      <el-collapse-transition>
        <div v-show="isCollapse">
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="22">
              <div style="display: inline-block">
                <span>实名信息：</span>
                <el-input v-model="smxxInput" style="width: 220px" placeholder="请输入" />
                <span style="margin-left: 10px">归属地：</span>
                <el-input v-model="gsdInput" style="width: 220px" placeholder="请输入" />

                <span style="margin-left: 10px">平台：</span>
                <el-select v-model="ptValue" placeholder="请选择" style="width: 220px">
                  <el-option v-for="item in ptOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-row style="margin-top: 10px">
        <el-col :span="2"></el-col>
        <el-col :span="16">
          <div>
            <span>关联昵称：</span>
            <el-input v-model="ncInput" style="width: 220px" placeholder="请输入" />
            <span style="margin-left: 10px">运营商：</span>
            <el-select v-model="yysValue" placeholder="请选择" style="width: 220px">
              <el-option v-for="item in yysOptions" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-table-column prop="name" label="实名信息" min-width="140" align="center" />
            <el-table-column prop="exchange" label="平台" min-width="100" align="center" />

            <el-table-column prop="nickname" label="关联昵称" min-width="120" align="center" />
            <el-table-column prop="area" label="归属地区" min-width="180" align="center" />
            <el-table-column prop="operator" label="运营商" min-width="100" align="center" />
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
  const smxxInput = ref('')
  const ncInput = ref('')
  const gsdInput = ref('')
  const yysValue = ref('')
  let yysOptions = ref([])
  const ptValue = ref('')
  let ptOptions = ref([])
  let tableData = ref([])
  let curChain = ref('')
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
      value: curChain.value,
      exchange: ptValue.value,
      nickname: ncInput.value,
      name: smxxInput.value,
      area: gsdInput.value,
      operator: yysValue.value,
    }
    const { data: res } = await service.get('/api/v1/query_address', { params: queryData })
    if (res.code == 200) {
      tableData.value = res.data
      yysOptions.value = Array.from(new Set(res.data.map((item) => item.operator))).map((operator) => ({
        label: operator,
        value: operator,
      }))
      ptOptions.value = Array.from(new Set(res.data.map((item) => item.exchange))).map((exchange) => ({ label: exchange, value: exchange }))
    }
  }
  const resetClick = () => {
    smxxInput.value = ''
    gsdInput.value = ''
    ptValue.value = ''
    ncInput.value = ''
    yysValue.value = ''
    searchClick()
  }
  onBeforeMount(() => {
    curChain.value = JSON.parse(window.sessionStorage.getItem('curChain'))
    searchClick()
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
