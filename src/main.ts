import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "./router";
import store from "./store";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access"; // 权限控制，如果不想用，不引入即可

createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
