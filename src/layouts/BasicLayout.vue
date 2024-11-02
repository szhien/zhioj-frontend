<template>
  <div class="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        Copyright © 2024 by Zhien Shen
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
.basicLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.basicLayout .header {
  height: 64px;
  background-color: #fff;
}

.basicLayout .content {
  padding: 20px;
  background-color: #f0f2f5;
}

.basicLayout .footer {
  position: sticky;
  line-height: 5;
  text-align: center;
  background-color: #fff;
}
</style>
