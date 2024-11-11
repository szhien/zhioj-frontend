import ACCESS_ENUM from "@/access/accessEnum";
import { LoginUserVO } from "../../generated";

/**
 * 检查导航栏显示权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccessList 满足其中有的权限(不传，默认是普通登录用户User)
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: LoginUserVO, needAccessList: string[]) => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // const needAccess = needAccessList ?? [ACCESS_ENUM.UNAUTHORIZED];
  // 如果需要未登录权限，表示不需要登录就可,但是在这里其实不咋实用
  // if (needAccess[0] === ACCESS_ENUM.NOT_LOGIN) {
  //   return true;
  // }
  // 无值的情况: 如果过来路由没有需求的权限，说明是过滤导航栏要显示的路由————主要是在这里起作用。
  // 有值的情况: 如果像是noAuth路由的access本身没有值，但是有值时，说明是直接访问路由，在路由的beforeEach中判断后设置默认值
  if (!needAccessList) {
    return false;
  }
  if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
    return false;
  }
  // 如果需要普通用户权限，表示只需要登录就可
  return needAccessList.includes(loginUserAccess);

  // if (needAccess === ACCESS_ENUM.USER) {
  //   // 如果需要普通用户权限，表示只需要登录就可
  //   // 如果用户没登录，那么表示无权限
  //   if (loginUserAccess !== ACCESS_ENUM.USER) {
  //     return false;
  //   }
  // }
  // // 如果需要管理员权限
  // if (needAccess === ACCESS_ENUM.ADMIN) {
  //   // 如果不为管理员，表示无权限
  //   if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
  //     return false;
  //   }
  // }
  // return true;
};

export default checkAccess;
