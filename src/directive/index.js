/**
 * @description: 全局自定义指令
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-03 18:19:28
 * @LastAuthor: lizlong
 * @lastTime: 2019-08-20 14:13:40
 */
import Vue from 'vue'
import {
    store
} from "@/store/index.js";

function checkPerms(perms, perm) {
    if (perm != null && typeof (perm) == 'object') {
        let key = true;
        perm.map((permkey) => {
            key = key && perms.some((item) => {
                return item == permkey
            })
        })
        return key;
    } else if (typeof (perm) == 'string') {
        return perms.some((item) => {
            return item == perm
        })
    }
}

//自定义权限指令，绑定值可为String/Array

Vue.directive("perms", {
    inserted(el, binding) {
        let perms = store.state.user.permsList; //用户所拥有的按钮权限指令
        let user = store.getters.getUser; //用户信息
        if (user.admin) {
            return false
        } else {
            //验证权限不通过则删除元素
            if (checkPerms(perms, binding.value)) {
                return false
            } else {
                el.parentNode.removeChild(el);
            }
        }
    }
});