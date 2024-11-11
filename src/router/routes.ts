import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserForgetView from "@/views/user/UserForgetView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

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
    component: QuestionsView,
    meta: {
      isHide: false, //如果没有权限限制不需要隐藏，即可直接使用false，也不用设置access
    },
  },
  // {
  //   path: "/questions",
  //   name: "统计题目",
  //   component: QuestionsView,
  //   meta: {
  //     isHide: true, //如果需要满足指定的权限才能显示的话，设置isHide为true，access设置权限集合
  //     access: [ACCESS_ENUM.USER, ACCESS_ENUM.ADMIN],
  //   },
  // },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      isHide: true,
      access: [ACCESS_ENUM.USER, ACCESS_ENUM.ADMIN],
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      isHide: true,
      access: [ACCESS_ENUM.ADMIN],
    },
  },
  {
    path: "/update/question",
    name: "修改题目",
    component: AddQuestionView,
    meta: {
      isHide: true,
      access: [ACCESS_ENUM.ADMIN],
    },
  },
  {
    path: "/view/question/:id", //动态路由实现
    name: "在线做题",
    component: ViewQuestionView,
    props: true, // 路由参数会以props的形式传递给组件
    meta: {
      isHide: true,
    },
  },
  {
    path: "/admin",
    name: "题目模块",
    component: AdminView,
    meta: {
      //admin的时候不隐藏,access 不填时默认直接隐藏
      isHide: true,
      access: [ACCESS_ENUM.ADMIN],
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      isHide: true,
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
