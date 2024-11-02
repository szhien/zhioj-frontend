<template>
  <div class="userForget">
    <h2 style="text-align: center">重置密码</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="两次密码输入要一致"
        label="密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 60%; margin: 10px auto"
          >点击注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    //获取最新的登录用户的信息，保存到了store中
    await store.dispatch("user/getLoginUser");
    //登录成功后跳转到首页，这里也可以使用重定向回到登录之前页面
    await router.push({
      path: "/",
      replace: true, // replace: true 表示替换当前的历史记录，而不是添加新的历史记录，即跳转到首页后点击回到上一页不会再次来到登录页
    });
    message.success("登录成功，" + JSON.stringify(res.data));
  } else {
    message.error("登录失败，" + res.message);
  }
};
</script>
