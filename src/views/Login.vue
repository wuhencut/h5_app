<template>
	<div class="page">
		<div class="login-bg"></div>
		<div class="login-main">
			<div class="hi"></div>
			<!-- 手机号 -->
			<div class="flex phone-area">
				<input class="area-code txt-center txt-s16 txt-bold" type="text" v-model="areaCode" />
				<input
					class="phone txt-s16 txt-bold"
					type="text"
					v-model="phone"
					placeholder="手机号码"
					maxlength="11"
				/>
			</div>
			<!-- 二维码 -->
			<div class="phonecode-area flex">
				<input
					type="text"
					v-model="phoneCode"
					class="flex-s1 code-inp txt-s16 txt-bold"
					placeholder="验证码"
				/>
				<span v-if="!codeSent" class="send-code" @click="sendCode">发送验证码</span>
				<span v-else class="send-code">{{leftSec}} s</span>
			</div>
			<a class="code-tip" href="http://www.ingtube.com/noPhoneCode.html">收不到验证码？</a>
		</div>
		<div class="login-footer">
			<div
				class="btn login-btn txt-s18 txt-center"
				:class="{'btn-disabled': canClick == false, 'btn-active': canClick == true}"
				@click="loginClick"
			>注册或登录</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Login",
	data() {
		return {
			phone: "13566676362", // 手机号,
			areaCode: "+86", // 区号
			phoneCode: "1111",
			leftSec: "", // 剩余秒
			codeSent: false, // 验证码已经发送
			timer: null // 定时器
		};
	},
	watch: {
		// leftSec(val){
		//   if(val <= 1){
		//   }
		// }
	},
	computed: {
		canClick() {
			if (
				!/^1[345789]\d{9}$/.test(this.phone) ||
				!/^\d{4}$/.test(this.phoneCode)
			) {
				return false;
			} else {
				return true;
			}
		}
	},
	mounted() {},
	methods: {
		async sendCode() {
			if (!/^\d{1,}$/.test(this.phone)) {
				this.$toast("输入正确手机号");
				return false;
			}
			this.codeSent = true;
			this.leftSec = 10;
			let timer;
			timer = setInterval(() => {
				this.leftSec -= 1;
				if (this.leftSec <= 1) {
					this.codeSent = false;
					clearInterval(timer);
					return false;
				}
			}, 1000);
		},
		async loginClick() {
      if (!this.canClick) return false;
      this.$router.push({ name: "productDetail" });
			let res = await this.$api.login({
				code: this.phoneCode,
				phone: this.areaCode + this.phone
			});
			if (res.errorCode == 0) {
				this.$router.push({ name: "productDetail" });
			}
		}
	}
};
</script>
<style lang="less" scoped>
.page {
	background: #fff;
	.login-main {
		margin-top: -1.2rem;
		padding: 0 0.32rem;
		.code-tip {
			display: block;
			margin-top: 0.2rem;
			color: #939393;
			padding-left: 0.22rem;
			background: url("../assets/img/login-ask.png") left center no-repeat;
			background-size: 0.16rem;
		}
		.phonecode-area {
			line-height: 0.56rem;
			border-bottom: 0.01rem solid #e1e1e1;
			.code-inp {
				&::-webkit-input-placeholder {
					font-weight: normal;
					font-size: 0.14rem;
				}
			}
			.send-code {
				color: #949494;
			}
		}
		.phone-area {
			padding-top: 0.32rem;
			input {
				height: 0.48rem;
				letter-spacing: 0.02rem;
			}
			.area-code {
				width: 0.56rem;
				margin-right: 0.16rem;
				line-height: 0.48rem;
				border-bottom: 0.01rem solid #e1e1e1;
			}
			.phone {
				flex: 1;
				border-bottom: 0.01rem solid #e1e1e1;
				&::-webkit-input-placeholder {
					font-weight: normal;
					font-size: 0.14rem;
				}
			}
		}
		.hi {
			height: 0.32rem;
			background: url("../assets/img/hi@3x.png") left top no-repeat;
			background-size: 0.56rem 0.32rem;
		}
	}
	.login-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1.54rem;
		padding: 0 0.32rem;
		.btn {
			padding: 0.15rem 0;
			border-radius: 0.08rem;
		}
		.btn-disabled {
			background-color: #e0e0e0;
			color: #949494;
		}
		.btn-active {
			background-color: #ffc900;
			color: #000;
		}
	}
	.login-bg {
		height: 2.3rem;
		background: url("../assets/img/login-bg.png") center center no-repeat;
		background-size: 100% 100%;
	}
}
</style>
