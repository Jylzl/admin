/**
 * @description: 全局api
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:33:34
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-29 17:07:36
 */
const api = {
  ssoLogin: "/xxzyapi/sso/login", //SSO登陆
  userLogin: "/api/account/login", //登录 
  userLoginout: "/xxzyapi/logout", //退出登录
  getPerms: "/xxzyapi/getMenuByUser", //获取用户权限getPerms
}

export default api;