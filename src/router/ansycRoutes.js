/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 11:07:45
 * @LastEditTime: 2019-09-02 17:56:25
 * @LastEditors: Please set LastEditors
 */

/**
 * @description: 路由组件注册，名称必须与后台录入的路由Name字段保持一致
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-08-05 16:43:55
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 11:00:20
 */
// 公共组件
const layout = r => require.ensure([], () => r(require('@/layout/Layout.vue')), 'layout') //layout
// const childView = r => require.ensure([], () => r(require('@/components/childView/Index.vue')), 'childView') //childView

// 工作台
// 工作台--工作台
const work = r => require.ensure([], () => r(require('@/views/work/Work.vue')), 'work') // 工作台

// 关于
// 关于--技术支持
const aboutUs = r => require.ensure([], () => r(require('@/views/about/About.vue')), 'aboutUs') // 技术支持


let ansycRoutes = new Map()

// set属性名必须与后端的名称保持一致，否则组件无法挂载

// 工作台
ansycRoutes.set("console", layout) // 工作台
// 工作台-工作台
ansycRoutes.set("work", work) // 资源归集


// 关于
ansycRoutes.set("about", layout) // 关于
// 关于--技术支持
ansycRoutes.set("aboutUs", aboutUs) //技术支持


export {
    ansycRoutes
}