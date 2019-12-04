<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:51:36
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-04 12:59:52
 -->
<template>
	<div style="height:100%;">
		<div class="breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="main-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "Main",
	components: {}
};
</script>
<style>
.breadcrumb {
	height: 46px;
	line-height: 46px;
}
.main-view {
	height: calc(100% - 46px);
	box-sizing: border-box;
	padding: 0 20px 20px 20px;
}
</style>