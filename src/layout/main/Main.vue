<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:51:36
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 11:07:34
 -->
<template>
	<div style="height:100%;">
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
.main-view {
	height: calc(100% - 46px);
	box-sizing: border-box;
	padding: 0 20px 20px 20px;
}
</style>