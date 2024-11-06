import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserForgetView from "@/views/user/UserForgetView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      isHide: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/forget",
        name: "重置密码",
        component: UserForgetView,
      },
    ],
  },
  {
    path: "/",
    name: "首页",
    component: HomeView,
    meta: {
      isHide: false,
    },
  },
  {
    path: "/addQuestion",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      isHide: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/admin",
    name: "题目模块",
    component: AdminView,
    meta: {
      //admin的时候不隐藏
      isHide: true,
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "在线练习",
    component: NoAuthView,
    meta: {
      isHide: true,
      access: AccessEnum.USER,
    },
  },
  {
    path: "/about",
    name: "关于我",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      isHide: false,
    },
  },
];
