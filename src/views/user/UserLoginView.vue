<template>
  <div class="userLogin">
    <a-form
      style="max-width: 400px; margin: 10px auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <div class="title">登录</div>
      </a-form-item>
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <div class="no-account">
          <a href="javascript:void(0)" class="a-link" :onclick="doForget"
            >忘记密码</a
          >
          <a href="javascript:void(0)" class="a-link" :onclick="doRegister"
            >没有账号？</a
          >
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 60%; margin: 10px auto"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
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

const doRegister = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};
const doForget = () => {
  router.push({
    path: "/user/forget",
    replace: true,
  });
};
</script>

<style scoped>
.userLogin {
  width: 800px;
  height: auto;
  line-height: 30px;
}

a-form-item {
  height: 20px;
}

.no-account {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.userLogin .title {
  font-size: 24px;
  font-weight: bold;
  margin: 20px auto;
}

.a-link {
  text-decoration: none;
  color: #1890ff;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #40a9ff;
  }
}
</style>
