<template>
	<div class="page">
		<div class="main">
			<div class="logo"></div>
			<div class="tip txt-s16 txt-bold txt-center">下载APP 查看订单</div>
			<router-link to class="down-btn btn flex">下载或打开APP</router-link>
			<router-link to="productDetail" class="btn check-btn flex">返回商品</router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: "Download",
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>
<style lang="less" scoped>
.page {
	background: #fff;
	.main {
		padding-top: 0.7rem;
		.check-btn {
			border: 0.01rem solid #8c8c8c;
			color: #5e5e5e;
		}
		.down-btn {
			background: #ffc300;
			color: #000;
		}
		.btn {
			width: 2.65rem;
			height: 0.48rem;
			margin: 0 auto;
			margin-bottom: 0.2rem;
			font-size: 0.2rem;
			font-weight: bold;
			border-radius: 0.08rem;
		}
		.tip {
			padding-top: 0.2rem;
			padding-bottom: 0.66rem;
		}
		.logo {
			background: url("../assets/img/logo.png") center center no-repeat;
			background-size: 0.84rem 0.84rem;
			height: 0.84rem;
		}
	}
}
</style>