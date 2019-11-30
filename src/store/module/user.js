/**
 * @description: VueX 用户信息，权限信息，登陆登出
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-31 10:38:45
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-13 10:13:59
 */
import {
	Encrypt
} from "@/utils/aes.js";
import {
	userLogin,
	userSso,
	userLogout,
	getPerms
} from "@/api/land.js";
import {
	setToken,
	removeToken
} from '@/utils/auth'
import code from '@/code/code';
import {
	routes,
	lastRoutes,
	ansycRoutes
} from '@/router/routes';
import {
	translateDataToTree
} from "@/utils/tools.js"

function getansycRoutes(tmpRoutes, menus) {
	let newMenus = menus.map((menu) => {
		menu.meta = {};
		menu.meta.title = menu.menuTitle;
		menu.meta.iconCls = menu.icon;
		menu.meta.leaf = menu.leaf == '1' ? true : false;
		menu.meta.hidden = menu.display == '0' ? true : false;
		menu.path = menu.url;
		if (menu.redirectUrl && menu.redirectUrl != '') {
			menu.redirect = menu.redirectUrl;
		}
		menu.name = menu.menuName;
		menu.component = tmpRoutes.get(menu.menuName);

		delete menu.children;
		delete menu.createTime;
		delete menu.creator;
		delete menu.display;
		delete menu.icon;
		delete menu.leaf;
		delete menu.menuName;
		delete menu.menuTitle;
		delete menu.menuType;
		delete menu.parentName;
		delete menu.updateTime;
		delete menu.updator;

		return menu;
	})
	return translateDataToTree(newMenus, 'menuId', 'parentId').concat(lastRoutes);
}

//展示的用户信息
const user = {
	state: {
		//设置属性
		user: {},
		routers: routes, //所有路由
		addRouters: [], //需要添加的路由
		perms: false, //用户登陆状态,
		permsList: [], //按钮权限列表
		menuList: [] //菜单列表
	},
	mutations: {
		//改变属性的状态
		LOGING_STATE: (state, params) => {
			localStorage.setItem('sessionKey', params.token); //将token存进localStorage
			setToken(params.token); //将token存进cookies
			state.user = params.user;
		},
		//动态设置路由
		SET_ROUTERS: (state, obj) => {
			state.routers = routes.concat(obj.asRouters); //设置路由表(基础路由+动态路由+最后的统配路由)
			state.addRouters = obj.asRouters; //动态路由表
			state.perms = true; //登录状态
			state.permsList = obj.permsList; //权限字符串 
		},
		//取消路由，清空数据
		CLEAR_ROUTERS: (state) => {
			state.routers = routes;
			state.user = {};
			state.addRouters = lastRoutes;
			state.perms = false;
			state.permsList = [];
			localStorage.setItem('sessionKey', ''); //清除localStorage里面的token
			removeToken(); //清除cookies里面的token
		},
		//设置用户信息
		SET_USER: (state, obj) => {
			state.user = obj.user
		}
	},
	actions: {
		//应用mutaions
		userLogin({
			commit
		}, data) { //登录异步操作
			var landInf = data.loginForm;
			let userName = landInf.user;
			let password = Encrypt(landInf.pswd, process.env.VUE_APP_aesKey, process.env.VUE_APP_ivKey); //密码加密

			return new Promise((resolve, reject) => {
				userLogin({
						account: userName,
						password: password
					}).then(res => {
						if (res.code == code.success) {
							commit('LOGING_STATE', res.data); //执行登陆成功的方法
						}
						resolve(res)
					})
					.catch(err => {
						console.log(err)
						reject(false);
					});
			});
		},
		userSso({
			commit
		}, data) { //登录异步操作
			var landInf = data.loginForm;
			let userName = landInf.user;
			let password = Encrypt(landInf.pswd, process.env.VUE_APP_aesKey, process.env.VUE_APP_ivKey); //密码加密

			return new Promise((resolve, reject) => {
				userSso({
						account: userName,
						password: password
					}).then(res => {
						if (res.code == code.success) {
							commit('LOGING_STATE', res.data); //执行登陆成功的方法
						}
						resolve(res)
					})
					.catch(err => {
						console.log(err)
						reject(false);
					});
			});
		},
		loginOut({
			commit
		}) {
			return new Promise((resolve, reject) => {
				userLogout().then(res => {
					if (res.code == code.success) {
						commit('CLEAR_ROUTERS');
					}
					resolve(res);
				}).catch(error => {
					reject(error);
				})
			})
		},
		//清空vuex里面的登陆状态（在路由拦截里面用户登陆超时时执行清空信息）
		clearLogin({
			commit
		}) {
			commit('CLEAR_ROUTERS');
		},
		//请求用户路由权限
		setRouters({
			commit
		}) {
			return new Promise((resolve, reject) => { //动态加载路由权限
				getPerms().then(res => {
					if (res.code == code.success) {
						let asRouters = [];
						let permsList = [];
						let user = {};
						asRouters = getansycRoutes(ansycRoutes, res.data.menus); //递归过滤
						permsList = res.data.perms;
						user = res.data.user;
						commit('SET_ROUTERS', {
							asRouters: asRouters,
							permsList: permsList,
						});
						commit('SET_USER', {
							user: user
						})
					} else {
						commit('CLEAR_ROUTERS');
					}
					resolve(res);
				}).catch(error => {
					console.log(error)
					reject(false);
				})
			})
		}
	}
}
export default user