import ACCESS_ENUM from "@/access/accessEnum";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";
import message from "@arco-design/web-vue/es/message";

/**
 * 路由守卫
 * @param to
 * @param from
 * @param next
 */
router.beforeEach(async (to, from, next) => {
  console.log("登陆用户信息", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser; // let是定义变量的
  // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser"); //查询用户是否已经登录，会将登陆用户的信息保存到store中
    loginUser = store.state.user.loginUser; //重新获取用户信息
  }
  // 如果直接访问首页/ 并且用户没有登录，就会跳转至登录路由，执行下面逻辑
  if (to.path.startsWith("/user")) {
    console.log("需要登录：" + JSON.stringify(store.state.user.loginUser));
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next();
      return;
    } else {
      next("/");
      return;
    }
  }
  //如果没有登录，直接跳转登录路由
  if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    message.warning("Current not login user:" + to.path);
    next(`/user/login?redirect=${to.path}`);
    return;
  }
  //如果当前登录用户是管理员权限，直接放行
  if (loginUser.userRole === ACCESS_ENUM.ADMIN) {
    next();
    return;
  }
  // 当前登录用户不是管理员权限，如果路由的access不设置就默认是需要User权限
  const needAccess = (to.meta?.access as string[]) ?? [ACCESS_ENUM.USER];
  // 如果当前路由需要User权限，但是当前登录用户没有User权限，就跳转到无权限页面
  if (!needAccess.includes(ACCESS_ENUM.USER)) {
    console.log(store.state.user.loginUser);
    if (!checkAccess(store.state.user.loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
