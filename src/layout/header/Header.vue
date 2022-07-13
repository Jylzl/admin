<!--
 * @description: 页面顶部栏
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-06-10 08:35:23
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-03 11:36:43
 -->
<template>
	<div class="header">
		<div class="header-left">
			<div class="p-logo">
				后台管理
			</div>
		</div>
		<div class="header-right">
			<div class="header-nav">
				<el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#165abb"
					text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item index="1">工作台</el-menu-item>
					<el-submenu index="2">
						<template slot="title">处理中心</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
					</el-submenu>
					<el-menu-item index="3">消息中心</el-menu-item>
				</el-menu>
			</div>
			<div class="header-user">
				<div class="siteSearch-form" :class="{ 'show': show }">
					<el-button type="text" @click.stop="siteSearchShow(true)" v-popover:siteSearch>
						<svg width="26" height="26">
							<image xlink:href="@/assets/svg/search.svg" src="svg.png" width="26" height="26" />
						</svg>
					</el-button>
					<el-popover ref="siteSearch" placement="bottom" width="260" trigger="click">
						<el-select v-model="search" :remote-method="querySearch" filterable default-first-option remote
							placeholder="请输入内容" class="header-search-select" @change="change"
							@blur="siteSearchShow(false)">
							<el-option v-for="item in options" :key="item.path" :value="item"
								:label="item.name.join(' > ')" />
						</el-select>
					</el-popover>
				</div>
				<div class="message">
					<el-button type="text" v-popover:message>
						<el-badge is-dot class="user-name">
							<svg width="26" height="26">
								<image xlink:href="@/assets/svg/news.svg" src="svg.png" width="26" height="26" />
							</svg>
						</el-badge>
					</el-button>
					<el-popover ref="message" placement="bottom" width="200" trigger="click">
						<p>待办事项</p>
					</el-popover>
				</div>
				<div class="user-console">
					<el-dropdown trigger="click">
						<div class="el-dropdown-link">
							<el-avatar class="user-header-img" :size="32"
								src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2030012986,1102835514&fm=200&gp=0.jpg">
							</el-avatar>
							<!-- <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2030012986,1102835514&fm=200&gp=0.jpg"
							alt="" class="user-header-img">-->
							<span class="item user-name">用户名</span>
							<i class="el-icon-caret-bottom"></i>
						</div>
						<el-dropdown-menu slot="dropdown" size="small">
							<el-dropdown-item icon="el-icon-user"
								@click.native="$router.push({ name: 'personalHome' })">个人主页
							</el-dropdown-item>
							<el-dropdown-item divided icon="el-icon-lock" @click.native="loginOut()">退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Fuse from "fuse.js";
import path from "path";
export default {
	data() {
		return {
			imgUrl: require("@/assets/img/base/logo.png"),
			search: "",
			options: [],
			searchPool: [],
			show: false,
			fuse: undefined
		};
	},
	watch: {
		lang() {
			this.searchPool = this.generateRoutes(this.routes);
		},
		routes() {
			this.searchPool = this.generateRoutes(this.routes);
		},
		searchPool(list) {
			this.initFuse(list);
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
		routes() {
			return this.$store.getters.permission_routes;
		}
	},
	created() { },
	mounted() {
		this.searchPool = this.generateRoutes(this.routes);
	},
	methods: {
		//锁屏操作
		clockScreen() {
			this.$confirm("您在进行锁屏操作, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$router.push({
						path: "/lock", //跳转的路径
						query: {
							user: this.userName
						}
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消"
					});
				});
		},
		//退出登陆
		loginOut() {
			this.$confirm("您在进行退出操作, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$store.dispatch("loginOut").then(res => {
						if (res.code == this.$code.success) {
							this.successMessage("退出成功");
							this.$router.push("/login");
						} else {
							this.errorMessage("退出失败");
						}
					});
				})
				.catch(() => {
					this.warningMessage("已取消");
				});
		},
		//站内搜索
		siteSearchShow(type) {
			this.show = type;
		},
		change(val) {
			this.$router.push(val.path);
			this.search = "";
			this.options = [];
			this.$nextTick(() => {
				this.show = false;
			});
		},
		initFuse(list) {
			this.fuse = new Fuse(list, {
				shouldSort: true,
				threshold: 0.4,
				location: 0,
				distance: 100,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					{
						name: "name",
						weight: 0.7
					},
					{
						name: "path",
						weight: 0.3
					}
				]
			});
		},
		generateRoutes(routes, basePath = "/", prefixTitle = []) {
			let res = [];
			for (const router of routes) {
				// 如果路由不显示就跳出循环
				if (router.meta.hidden) {
					continue;
				}
				const data = {
					path: path.resolve(basePath, router.path),
					name: [...prefixTitle]
				};
				if (router.meta && router.meta.title) {
					// generate internationalized title
					data.name = [...data.name, router.meta.title];
					if (router.redirect !== "noredirect") {
						// only push the routes with title
						// special case: need to exclude parent router without redirect
						res.push(data);
					}
				}

				// recursive child routes
				if (router.children) {
					const tempRoutes = this.generateRoutes(
						router.children,
						data.path,
						data.name
					);
					if (tempRoutes.length >= 1) {
						res = [...res, ...tempRoutes];
					}
				}
			}
			return res;
		},
		querySearch(query) {
			if (query !== "") {
				this.options = this.fuse.search(query);
			} else {
				this.options = [];
			}
		}
	}
};
</script>
<style>
</style>

<style scoped>
.p-logo {
	color: #fff;
	line-height: 32px;
	padding-left: 20px;
}

.header {
	height: 60px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.header .header-left {
	box-sizing: border-box;
	width: 220px;
	height: 32px;
	border-right: 1px solid #e6e6e6;
}

.header .header-right {
	box-sizing: border-box;
	width: calc(100% - 220px);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
}

.el-dropdown-link {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 100%;
	align-items: center;
	padding: 0 5px;
	color: #fff;
}

.el-dropdown-link:hover {
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.025);
}

.item {
	box-sizing: border-box;
	padding-right: 12px;
	line-height: 1;
}

.header-user {
	display: flex;
	justify-content: flex-end;
	height: 100%;
	align-items: center;
}

.siteSearch-form {
	margin-right: 10px;
}

.message {
	margin-right: 20px;
}

.user-name {
	color: #ffffff;
}

.user-console {
	display: -webkit-flex;
	display: flex;
	height: 100%;
	flex-direction: row-reverse;
}

.user-header-img {
	margin-right: 8px;
}

.header-search-select {
	display: flex;
	align-items: center;
	font-size: 18px;
	transition: width 0.2s;
}
</style>