<template>
  <a-row class="globalHeader" align="center" :wrap="false">
    <!--warp 是否可以换行-->
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menuItemClick="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.svg" />
            <div class="title">Zhi OJ</div>
          </div>
        </a-menu-item>
        <!--动态获取路由-->
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser.userName }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { RouteRecordRaw, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();

const visibleRoutes = computed(() => {
  const v = routes.filter((item, index) => {
    //路由显示不受用户权限限制，不隐藏就直接显示，第一级别
    if (!item.meta?.isHide) {
      return true;
    }
    //隐藏以/user开头的路由
    if (item.path.startsWith("/user")) {
      return false;
    }
    //如果菜单要隐藏，根据用户的权限过滤菜单，用户的权限满足菜单的要求才显示
    return checkAccess(
      store.state.user?.loginUser, //不要将其作为变量提出去，就是说不要用 const loginUser = store.state.user?.loginUser;，因为它是响应式的，会实时更新
      item?.meta?.access as string
    );
  });
  //根据用户权限过滤路由
  return v;
});
//检查是否隐藏路由
const checkHide = (item: RouteRecordRaw) => {
  if (!item.meta?.isHide) {
    if (item.meta?.access) {
      if (store.state.user?.loginUser.roles?.includes(item.meta?.access)) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
};

//默认主页
const selectedKeys = ref(["/"]);
//路由跳转后，同步选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

//点击导航菜单栏,跳转到指定路径
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.globalHeader {
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.title-bar {
  display: flex;
  align-items: center;

  .logo {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
