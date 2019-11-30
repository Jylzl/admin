<!--
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-08 09:46:22
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-13 11:20:13
 -->
<template>
	<div class="sso-box">
		<div class="sso-msg" v-show="msgShow">
			<div
				role="alert"
				class="el-message"
				:class="{'el-message--warning':msgType=='warning','el-message--success':msgType=='success'}"
			>
				<i
					class="el-message__icon"
					:class="{'el-icon-warning':msgType=='warning','el-icon-success':msgType=='success'}"
				></i>
				<p class="el-message__content">{{msgTxt}}</p>
			</div>
		</div>
		<el-form :model="landForm_password" ref="landForm_password" class="sso-form" size="large">
			<el-form-item prop="user" :rules="rules.user" validate-on-rule-change="false">
				<el-input placeholder="用户名" v-model="landForm_password.user" class="form-input" clearable></el-input>
			</el-form-item>
			<el-form-item prop="pswd" :rules="rules.pswd">
				<div class="show-pswd">
					<el-input
						:type="pswdType"
						v-model="landForm_password.pswd"
						autocomplete="off"
						placeholder="密码"
						maxlength="32"
						class="form-input show-pswd-input"
						@keyup.enter.native="submitForm('landForm_password')"
					></el-input>
					<el-button
						type="text"
						class="show-pswd-btn"
						title="显示密码"
						:icon="icon"
						@mousedown.native="showPswd(true)"
						@mouseup.native="showPswd(false)"
					></el-button>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					class="form-btn"
					@click="submitForm('landForm_password')"
					style="width:100%;"
					:disabled="landLoading.disabled"
					:icon="landLoading.icon"
				>{{landLoading.content}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import va from "@/rules/index.js";
export default {
	data() {
		//引入自定义验证规则
		let r_user = va.required("用户名不能为空", "change");
		let r_pswd = va.required("密码不能为空");
		return {
			msgShow: false,
			msgTxt: "登录名或登录密码不正确!",
			msgType: "warning",
			icon: "icon iconfont icon-icon_yulan",
			pswdType: "text",
			// 表单验证规则
			rules: {
				//用户名验证
				user: [r_user],
				//密码验证
				pswd: [r_pswd]
			},
			landForm_password: {
				user: "yangxiao11",
				pswd: "cc123456"
			},
			landLoading: {
				disabled: false,
				icon: "",
				content: "登录"
			}
		};
	},
	created() {},
	mounted() {},
	methods: {
		// 密码长按显示
		showPswd(type) {
			if (type) {
				this.pswdType = "text";
				this.icon = "icon iconfont icon-miwen";
			} else {
				this.pswdType = "password";
				this.icon = "icon iconfont icon-icon_yulan";
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.landLoading.content = "正在登录...";
					this.landLoading.icon = "el-icon-loading";
					this.landLoading.disabled = true;
					this.$store
						.dispatch("userSso", {
							_this: this,
							loginForm: this.landForm_password
						})
						.then(res => {
							switch (res.code) {
								case this.$code.success:
									// 登录成功
									this.landSuccess();
									break;
								case this.$code.land_abort:
									// 登录失败
									this.landFail(
										"warning",
										"登录名或登录密码不正确!"
									);
									break;
								default:
									// 登录失败
									this.landFail();
									break;
							}
						})
						.catch(() => {
							// 登录失败
							this.landFail();
						});
				} else {
					return false;
				}
			});
		},
		handleSelect(item) {
			this.landForm_password.pswd = item.pswd;
		},
		landSuccess() {
			this.$store
				.dispatch("setRouters")
				.then(res => {
					if (res.code == this.$code.success) {
						this.$router.addRoutes(
							this.$store.state.user.addRouters
						);
						//重置登录样式
						this.restLand();
						//登陆成功提示
						this.msgShow = true;
						this.msgTxt = "登陆成功";
						this.msgType = "success";
						window.top.location.href = process.env.VUE_APP_mhwzsso;
					} else {
						this.landFail();
					}
				})
				.catch(err => {
					this.landFail();
					console.log(err);
				});
		},
		landFail(type, msg) {
			this.loading = false;
			//重置登录样式
			this.restLand();
			//登陆失败提示
			this.msgShow = true;
			this.msgTxt = "登录名或登录密码不正确!";
			this.msgType = "warning";
		},
		restLand() {
			this.landLoading.content = "登录";
			this.landLoading.icon = "";
			this.landLoading.disabled = false;
		}
	}
};
</script>
<style>
.sso-form .form-input input {
	background-color: #fff;
}

.sso-form .form-btn {
	background-color: #0c73c2;
}

.sso-form .form-btn:hover {
	background-color: #155789;
}
</style>
<style scoped>
.sso-box {
	box-sizing: border-box;
	width: 280px;
	height: 204px;
	padding-top: 40px;
}
.sso-box .sso-msg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 30px;
}
.sso-box .el-message {
	position: absolute;
	top: 0;
	min-width: auto;
	width: 100%;
	height: 30px;
	padding: 6px 10px 6px 10px;
}

.sso-form {
	box-sizing: border-box;
	width: 280px;
	height: 164px;
}

.forget-password {
	box-sizing: border-box;
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
	height: 20px;
	/* padding: 0 4px; */
	line-height: 20px;
	margin-bottom: 18px;
	font-size: 14px;
}

.show-pswd,
.get-code {
	position: relative;
	height: 40px;
	width: 100%;
}

.show-pswd-input,
.get-code-input {
	position: absolute;
	box-sizing: border-box;
	width: 100%;
}

.show-pswd-input input,
.get-code-input input {
	padding-right: 100px;
}

.show-pswd-btn,
.get-code-btn {
	position: absolute;
	right: 12px;
	z-index: 10;
}

.show-pswd-btn {
	font-size: 20px;
	padding-top: 9px;
	padding-bottom: 9px;
}
</style>