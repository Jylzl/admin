/**
 * @description: 全局状态码
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:34:18
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 09:35:00
 */
const code = {
    success: 200, //请求成功
    timeout: 408, //请求超时
    request_abort: -200, //请求失败
    no_data: 204, //未查询到数据
    land_timeout: 302, //用户登陆超时
    land_abort: 304, //用户或密码名错误
}

export default code;