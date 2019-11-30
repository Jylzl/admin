/**
 * @description: 全局路由钩子、页面加载进度条
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 09:30:55
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from '@/utils/get-page-title'
import router from '@/router/index' //路由

router.beforeEach((to, from, next) => {
    // 页面加载进度条
    NProgress.start();

    // 设置页面标题
    document.title = getPageTitle(to.meta.title)
    next();
})

router.afterEach(() => {
    NProgress.done();
});