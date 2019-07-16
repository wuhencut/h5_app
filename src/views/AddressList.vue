<template>
	<div class="page">
		<div class="header-back">
			<router-link to="order" class="icon-back"></router-link>
		</div>
		<div class="main">
			<div class="title txt-s28 txt-bold">收货地址</div>
			<div class="addresss-item flex" v-for="item in list">
				<div class="detail flex-s1">
					<p class="name-tel flex">
						<span class="name">{{item.recipient}}</span>
						<span class="tel">{{item.phone_num}}</span>
						<span class="defalut-icon" v-if="item.is_default">默认</span>
					</p>
					<p class="address">{{item.province}} {{item.city}} {{item.county}} {{item.address}}</p>
				</div>
				<span class="icon-set" @click="setAddress(item)"></span>
			</div>
		</div>
		<router-link to="addAddress" class="footer-btn txt-s20 txt-bold">新增地址</router-link>
	</div>
</template>
<script>
export default {
	name: "AddressList",
	data() {
		return {
			list: [
				{
					address_id: "31312",
					province: "浙江",
					city: "杭州",
					county: "拱墅",
					address: "郡原公元里",
					phone_num: "13566646353",
					recipient: "石磊",
					is_default: true
				}
			]
		};
	},
	mounted() {},
	methods: {
		setAddress(item) {
			this.$router.push({
				name: "addAddress",
				query: { address: JSON.stringify(item) }
			});
		}
	}
};
</script>
<style lang="less" scoped>
.page {
	padding: 0.44rem 0 0.6rem 0;
	background: #fff;
	.main {
    padding: 0 0.24rem;
		.title {
			padding-top: 0.12rem;
			padding-bottom: 0.22rem;
			color: #3e3d3e;
		}
		.addresss-item {
			padding: 0.2rem 0;
			border-bottom: 0.01rem solid #e2e2e2;
			.icon-set {
				background: url("../assets/img/icon-write.png") center center
					no-repeat;
				background-size: 0.14rem 0.14rem;
				width: 0.14rem;
				height: 0.14rem;
			}
			.detail {
				.address {
					font-size: 0.12rem;
					color: #949494;
					padding-top: 0.08rem;
				}
				.name-tel {
					font-size: 0.16rem;
					font-weight: bold;
					justify-content: flex-start;
					.tel {
						padding: 0 0.12rem;
					}
					.defalut-icon {
						font-size: 0.1rem;
						font-weight: bold;
						width: 0.38rem;
						background: #ffc300;
						border-radius: 0.08rem;
						text-align: center;
					}
				}
			}
		}
	}
	.footer-btn {
		position: fixed;
		line-height: 0.5rem;
		text-align: center;
		background: #ffc300;
    bottom: 0;
    width: 3.75rem;
    color: #000;
	}
	.header-back {
		position: fixed;
		top: 0;
		width: 3.75rem;
		height: 0.44rem;
		.icon-back {
			background: url("../assets/img/icon-back.png") center center
				no-repeat;
			background-size: 0.08rem 0.16rem;
			width: 0.08rem;
			height: 0.16rem;
			display: inline-block;
			margin: 0.14rem 0.18rem;
		}
	}
}
</style>