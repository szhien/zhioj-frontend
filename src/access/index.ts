import ACCESS_ENUM from "@/access/accessEnum";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";

/**
 * 路由守卫
 * @param to
 * @param from
 * @param next
 */
router.beforeEach(async (to, from, next) => {
  console.log("登陆用户信息", store.state.user.loginUser);
  // 如果之前没登陆过，自动登录
  if (!store.state.user.loginUser || !store.state.user.loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser"); //查询用户是否已经登录，会将登陆用户的信息保存到store中
  }
  // 如果直接访问首页/ 并且用户没有登录，就会跳转至登录路由，执行下面逻辑
  if (to.path.startsWith("/user")) {
    console.log("需要登录：" + JSON.stringify(store.state.user.loginUser));
    if (store.state.user.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next();
      return;
    } else {
      next("/");
      return;
    }
  }
  //如果没有登录，直接跳转登录路由
  if (store.state.user.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    console.log("Current not login user:" + to.path);
    next(`/user/login?redirect=${to.path}`);
    return;
  }
  // 如果路由的access不设置就默认是需要User权限,则判断用户是否登录
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.USER;
  if (store.state.user.loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果不是User权限，那就说明是可能是管理员权限
    if (needAccess !== ACCESS_ENUM.USER) {
      console.log(store.state.user.loginUser);
      if (!checkAccess(store.state.user.loginUser, needAccess)) {
        next("/noAuth");
        return;
      }
    }
    next();
  }
});
