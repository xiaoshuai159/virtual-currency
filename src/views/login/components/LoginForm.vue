<template>
  <div class="login-title">
    <h2 class="title">虚拟货币全链条监测平台</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名"
        auto-complete="on"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="passwd">
      <el-input
        v-model="ruleForm.passwd"
        placeholder="请输入密码"
        auto-complete="on"
        :type="passwordType"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'passwd' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <!-- 添加验证码输入框 -->
    <el-form-item label="" prop="captcha">
      <el-input
        v-model="ruleForm.captcha"
        placeholder="请输入验证码"
        auto-complete="off"
        style="position: relative"
        @keyup.enter="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><PictureFilled /></el-icon>
        </template>
        <template #suffix>
          <img :src="getCaptchaImgUrl()" alt="验证码" class="captcha-input__img" @click="refreshCaptcha" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button :loading="loading" class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import axios from 'axios'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'

  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('passwd')
  const loading = ref(false)

  const rules = reactive({
    passwd: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    username: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    username: 'Coins',
    passwd: 'Coins@123',
    captcha: '',
  })
  let captchaImgUrl = ref('/api/v1/verify_code?time' + new Date())
  const getCaptchaImgUrl = () => {
    return captchaImgUrl.value
  }
  const refreshCaptcha = () => {
    fetchNewCaptchaImage()
  }
  const fetchNewCaptchaImage = () => {
    setTimeout(() => {
      console.log(new Date().toLocaleString())
      captchaImgUrl.value = '/api/v1/verify_code?time' + new Date().toLocaleString()
    }, 300)
  }
  // 显示密码图标
  const showPwd = () => {
    passwordType.value = passwordType.value === 'passwd' ? '' : 'passwd'
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true
        // 登录
        setTimeout(async () => {
          await UserStore.login(ruleForm)
          await router.push({
            path: '/',
          })
          ElNotification({
            title: getTimeStateStr(),
            message: '欢迎登录',
            type: 'success',
            duration: 3000,
          })
          loading.value = true
        }, 1000)
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
</script>

<style lang="scss" scoped>
  @import '../index.scss';
  .captcha-input__img {
    cursor: pointer;
    margin-left: 10px;
    width: 100px; /* 根据实际情况调整 */
    height: auto; /* 根据实际情况调整 */
  }
</style>
