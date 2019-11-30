<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-30 17:49:09
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-05 20:59:02
 -->
<template>
	<div>
		<cms-neditor :destroy="false" v-model="html" :index="0"></cms-neditor>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			name: "",
			html: ""
		};
	},
	methods: {
		aa() {
			this.html +=
				'<video src="http://2460al0068.wicp.vip/api/static/file/a85044cb-26dd-4f99-bef0-7231953ff1bd.mp4" controls="controls"></video>';
			console.log(this.html);
		}
	}
};
</script>
