<template>
  <div class="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <img
          src="@/assets/oj-logo.svg"
          alt="logo"
          style="width: 50px; height: 50px; margin-left: 10px"
        />
        <span style="margin-left: 10px">Zhi Online Judge</span>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="sider-logo"></div>
        <div class="login-panel">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">
        Online Judge Copyright © 2024 by Zhien Shen
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
.userLayout {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userLayout .header {
  display: flex;
  line-height: 64px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-weight: bold;
  font-size: 24px;
}

.userLayout .content {
  display: flex;
  justify-content: space-between;
  height: calc(100vh);
  padding: 20px;
}

.sider-logo {
  flex: 1;
  background-size: cover;
  background-position: center;
  background-size: 800px;
  background-repeat: no-repeat;
  background-image: url("../assets/logo-img.png");
}

.login-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userLayout .footer {
  position: sticky;
  line-height: 5;
  text-align: center;
  background-color: #fff;
}
</style>
