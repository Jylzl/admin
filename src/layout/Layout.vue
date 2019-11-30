<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-14 10:13:00
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 13:01:34
 -->
<template>
	<el-container>
		<el-header height="60px" class="header-bg">
			<Header></Header>
		</el-header>
		<el-container style="height: calc(100% - 60px);">
			<el-aside :width="width">
				<Aside></Aside>
			</el-aside>
			<el-main>
				<Main></Main>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
// @ is an alias to /src
import Header from "@/layout/header/Header.vue";
import Aside from "@/layout/aside/Aside.vue";
import Main from "@/layout/main/Main.vue";
export default {
	name: "Layout",
	components: {
		Header,
		Aside,
		Main
	},
	data() {
		return {};
	},
	computed: {
		width() {
			return this.$store.getters.getAsideWidth;
		}
	},
	mounted() {},
	methods: {}
};
</script>
<style>
.header-bg {
	background: #165abb url(../assets/img/base/header_bg.png) no-repeat center
		right;
}

.el-header,
.el-footer {
	color: #333;
}

main.el-main {
	background-color: #f7f7f9;
	color: #333;
	padding-top: 0;
	height: 100%;
}
</style>