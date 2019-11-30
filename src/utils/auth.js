/**
 * @description: 对储存在cookies里面的token的设置、获取、删除方法
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-31 17:22:06
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 09:27:00
 */

import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token, {
		expires: 3,
		path: '/'
	})
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}