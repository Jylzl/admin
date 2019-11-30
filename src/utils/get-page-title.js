/**
 * @description: 设置页面title属性的方法
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-05-27 08:41:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-09-04 14:39:32
 */

import defaultSettings from '@/settings'

const title = defaultSettings.title || 'jeecms'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}