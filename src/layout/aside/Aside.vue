<!--
 * @description: 侧边导航栏
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-09 20:22:56
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 12:56:35
 -->
<template>
	<div class="p-aside">
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu default-active="2" class="el-menu-vertical-demo">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">选项4</template>
						<el-menu-item index="1-4-1">选项1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">导航二</span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script>
export default {
	name: "Aside",
	data() {
		return {};
	},
	computed: {
		/**
		 * @description: 从VUEX获取侧边菜单栏状态是否折叠
		 * @param {type} parameter
		 * @author: lizlong
		 * @LastEditors: lizlong
		 * @LastEditTime: Do not edit
		 * @since: 2019-08-13 09:58:43
		 */
		isCollapse() {
			return this.$store.getters.getCollapse;
		}
	},
	mounted() {},
	methods: {}
};
</script>
<style>
.p-aside .el-menu {
	min-height: 100%;
}
</style>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	box-sizing: border-box;
	width: 220px;
}

.p-aside {
	height: 100%;
}

.aside-top {
	padding: 0;
	background-color: rgb(58, 67, 76);
	border-bottom: none;
	border-right: solid 1px #e6e6e6;
	text-align: center;
	color: #fff;
	font-size: 22px;
	font-weight: bolder;
}

.aside-footer {
	display: block;
	display: -webkit-flex;
	height: 40px;
	line-height: 40px;
	background-color: rgb(84, 92, 100);
	justify-content: flex-end;
}

.left-center {
	height: calc(100% - 100px);
}

.aside-menu {
	height: 100%;
}

.el-submenu-iconfont {
	vertical-align: middle;
	margin-right: 8px;
	width: 24px;
	text-align: center;
	font-size: 18px;
}
</style>