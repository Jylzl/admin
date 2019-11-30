<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:17:39
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 10:37:51
 -->
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "app"
};
</script>

<style lang="scss">
@import url(./assets/css/rest.min.css);
@import url(./assets/css/animate.css);
@import url(./assets/iconfont/iconfont.css);

html,
body,
#app {
	box-sizing: border-box;
	margin: 0;
	width: 100%;
	height: 100%;
}

@media screen and (max-width: 300px) {
	html {
		width: 1920px;
		height: 1080px;
	}
}

@media (-webkit-max-device-pixel-ratio: 1) {
	::-webkit-scrollbar-track-piece {
		background-color: #ffffff;
	}

	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #c2c2c2;
		background-clip: padding-box;
		min-height: 28px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: #a0a0a0;
	}
}

.clearfix:after {
	content: "";
	display: block;
	clear: both;
	height: 0;
}

.clearfix {
	zoom: 1;
}

.fl {
	float: left;
}

.fr {
	float: right;
}
</style>