/**
 * @Description: Description
 * @Author: lizlong<94648929@qq.com>
 * @Since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-06-03 18:04:52
 */

import request from '@/utils/request'
import api from '@/api/api';
import {
    routes,
    ansycRoutes
} from '@/router/routes'
import {
    loginOut
} from "@/api/land.js";

/**
 * @param {异步路由表} ansycRoutes
 * @param {数据库权限拉取} perms
 */

/**
 * @Description: 递归处理角色权限
 * @Author: lizlong
 * @LastEditors: lizlong
 * @LastEditTime: Do not edit
 * @since: 2019-06-03 10:59:35
 */

function getansycRoutes(tmpRoutes, perms) {
    let permsArr = perms.split(',');
    const result = tmpRoutes.filter(route => {
        if (permsArr.indexOf(route.path) != -1) {
            if (route.children != undefined) {
                let permsStr = permsArr.join(',');
                route.children = getansycRoutes(route.children, permsStr);
            }
            return true;
        }
        return false;
    })
    return result
}
const perm = {
    state: {
        routers: routes,
        addRouters: [],
        perms: false, //用户登陆状态,
        permsList: null,
    },
    mutations: {
        SET_ROUTERS: (state, obj) => {
            state.routers = routes.concat(obj.asRouters); //设置路由表
            state.addRouters = obj.asRouters; //动态路由表
            state.perms = true; //登录状态
            state.permsList = obj.permsList; //权限字符串 
        },
        CLEAR_ROUTERS: (state) => {
            state.routers = routes;
            state.addRouters = [];
            state.perms = false;
            state.permsList = null;
            localStorage.setItem('sessionKey', '');
            localStorage.setItem('userName', '');
        }
    },
    actions: {
        setRouters({
            commit
        }) {
            return new Promise((resolve, reject) => { //动态加载路由权限
                request({
                        url: api.getPerms,
                        method: 'GET'
                    })
                    .then(res => {
                        let asRouters;
                        if (res.data.user.admin == true) {
                            asRouters = ansycRoutes;
                        } else {
                            asRouters = getansycRoutes(ansycRoutes, res.data.perms); //递归过滤
                        }
                        commit('SET_ROUTERS', {
                            asRouters: asRouters,
                            permsList: res.data.menus,
                        });
                        resolve(res);
                    }).catch(error => {
                        console.log(error)
                        reject(false);
                    })
            })
        },
        loginOut({
            commit
        }) {
            return new Promise((resolve, reject) => {
                loginOut().then(res => {
                    if (res.code == '200') {
                        commit('CLEAR_ROUTERS');
                    }
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

}

export default perm