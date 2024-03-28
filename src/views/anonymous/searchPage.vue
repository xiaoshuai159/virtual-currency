<template>
  <div class="app-container">
    <div class="mm-title"> 反匿名查询 </div>
    <div class="handle-box">
      <el-input v-model="inputContent" placeholder="请输入" class="custom-input" @focus="showTooltip" @blur="hideTooltip"></el-input>
      <el-button type="primary" class="custom-button" @click="toIpPage">搜 索</el-button><br />
      <div v-show="tooltipVisible" class="tooltip">
        <InfoFilled
          style="
            position: absolute;
            left: 16px;
            top: 16px;
            width: 1.5em;
            height: 1.5em;
            margin-right: 8px;
            display: inline-block;
            color: #1c92ff;
          "
        />
        <span class="tooltip-title">帮助提示</span>
        <span class="tooltip-content">当前支持手机号、链上地址、昵称和IP地址的查询分析</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import router from '@/routers'
  import { ref } from 'vue'
  const tooltipVisible = ref(false)
  const inputContent = ref('')
  const showTooltip = () => {
    tooltipVisible.value = true
  }
  const hideTooltip = () => {
    tooltipVisible.value = false
  }
  const toIpPage = () => {
    if (inputContent.value == '123.123.123.123') {
      router.push('/anonymous/ipSearchPage')
    } else if (inputContent.value == '13345678901') {
      router.push('/anonymous/infoSearchPage')
    } else if (inputContent.value == 'TZG3dQV9TMoNj8V4jzEbkkTmajt4ddQAcj') {
      router.push('/anonymous/chainSearchPage')
    } else if (inputContent.value == '等会吃个橘子') {
      router.push('/anonymous/nameSearchPage')
    }
  }
</script>
<style lang="scss" scoped>
  .tooltip-title {
    display: block;
    color: #52585a;
    margin: 17px 0 12px 48px;
    text-align: left;
  }
  .tooltip-content {
    display: block;
    color: #869096;
    font-size: 12px;
    margin-left: 48px;
    text-align: left;
  }
  .tooltip {
    border: #a5ddff solid 1px;
    display: inline-block;
    width: 451px;
    height: 82px;
    background-color: #e6f7ff;
    transform: translateY(8px);
    border-radius: 4px;
  }
  .mm-title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0 26px 0;
  }
  .input-focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .custom-input {
    width: 390px;
    height: 34px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  }

  .custom-button {
    border-radius: 0 4px 4px 0;
    height: 34px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  }
  .handle-box {
    text-align: center;
  }
  .handle-box :deep(.el-button) {
    border-radius: 0 4px 4px 0;
    height: 34px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  }
  .handle-box :deep(.el-input__wrapper) {
    border: solid #b3b3b3 1px;
    padding: 1px 12px;
    border-radius: 0px;
    box-shadow: 0 0 0 0 !important;
  }
  .handle-box :deep(.el-input__wrapper:hover) {
    border: solid #6f9ffd 1px;
    padding: 1px 12px;
    border-radius: 0px;
    box-shadow: 0 0 0 0 !important;
  }
  :deep(.el-input__inner::placeholder) {
    color: #808080 !important;
  }
  :deep(.el-input__inner:focus::-webkit-input-placeholder) {
    opacity: 0;
  }
</style>
