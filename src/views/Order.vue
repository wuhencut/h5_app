<template>
	<div class="page">
		<div class="header-back">
			<router-link to="productDetail" class="icon-back"></router-link>
			<p class="txt-s18 txt-bold">确认订单</p>
		</div>
		<div class="pro-info flex">
			<img class="pro-img" :src="detailData.currSpec.image" alt />
			<div class="spec-info flex-s1">
				<p class="title txt-s14 txt-bold">{{detailData.title}}</p>
				<p class="spec txt-s12 txt-gray">已选 "{{detailData.currSpec.condition.join(',')}}"</p>
				<div class="price-info flex">
					<div class="price flex-s1">
						<span class="curr-price txt-s16 txt-bold">￥{{detailData.currSpec.price}}</span>
						<span class="origin-price txt-s12 txt-gray">￥{{detailData.origin_price}}</span>
						<span class="discount txt-s10 txt-gray">{{detailData.discount}}折</span>
					</div>
					<span class="num txt-gray">x {{detailData.currSpec.stock}}</span>
				</div>
			</div>
		</div>

		<!-- 地址 -->
		<div class="address-info flex" @click="setAddress">
			<span class="address-icon"></span>
			<div class="detail flex-s1">
				<div v-if="addressInfo.address_id">
					<p class="name-tel txt-s14">
						<span class="name">{{addressInfo.recipient}}</span>
						<span class="tel">{{addressInfo.phone_num}}</span>
					</p>
					<p class="address txt-gray txt-s12">{{addressInfo.province}} {{addressInfo.city}} {{addressInfo.county}} {{addressInfo.address}}</p>
				</div>
				<p v-else class="txt-s14 txt-gray">请选择收货地址</p>
			</div>
			<span class="right-arrow"></span>
		</div>
		<!-- 邀请名填写 -->
		<div class="invite-inp flex">
			<span class="invite-icon flex-s1"></span>
			<input class="inp" type="text" placeholder="哪位博主邀请你来拔草？请填写博主昵称" />
		</div>
		<!-- 价格数量金额 -->
		<div class="exp-num-price">
			<div class="item flex">
				<span class="title flex-s1">购买数量</span>
				<p class="num-inp flex">
					<span class="btn flex" @click="changeNum('-')">-</span>
					<span class="num flex">{{currNum}}</span>
					<span class="btn flex" @click="changeNum('+')">+</span>
				</p>
			</div>
			<div class="item flex">
				<span class="title flex-s1">配送方式</span>
				<span class="exp-txt">快递 免邮</span>
			</div>
			<div class="item flex" style="border: none;">
				<span class="title flex-s1"></span>
				<p class="price txt-s16 txt-bold">
					<span class="price-tip">共1件商品，小计：</span>
					<span class="curr">￥{{currPrice}}</span>
				</p>
			</div>
		</div>
		<div class="page-footer flex">
			<div class="all-price txt-s14 flex-s1">
				合集金额：
				<span class="price txt-s20 txt-bold">￥{{currPrice}}</span>
			</div>
			<div class="btn txt-s16 txt-bold flex" @click="submit()">提交订单</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Order",
	data() {
		return {
			currNum: 1,
			defaultAddress: "1231",
			req: {
				production_id: "",
				sku_id: "",
				num: "",
				address_id: "",
				inviter: ""
			},
			currPrice: "101", // 小计金额，通过后台计算返回
			detailData: JSON.parse(localStorage.getItem("orderData")),
			addressInfo: {} // 地址信息
		};
	},
	mounted() {
		this.currNum = this.detailData.buyNum;
		this.getAddressInfo();
		// this.getPrice();
	},
	methods: {
		// 获取地址信息
		async getAddressInfo() {
			if (JSON.parse(localStorage.getItem("addressData")).address_id) {
				this.addressInfo = JSON.parse(
					localStorage.getItem("addressData")
				);
				return false;
			}
			let res = await this.$api.getAddress();
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].is_default) {
					this.addressInfo = res.data[i];
				} else {
					this.addressInfo = {};
				}
			}
		},
		// 获取价格
		async getPrice() {
			let res = await this.$api.getPayPrice({
				num: this.currNum,
				spec_condition: this.detailData.currSpec.condition,
				production_id: this.detailData.production_id
			});
			if (res.errorCode == 0) {
				this.currPrice = res.data.price;
			} else {
				this.$taost(res.errorDescription);
			}
		},
		async submit() {
			let res = await this.$api.productionPay(this.req);
			if (res.errorCode == 0) {
				window.open(res.data.alipay_order_str);
			} else {
				this.$toast(res.errorDescription);
			}
		},
		// 获取默认地址
		async getDeAddress() {
			let res = await this.$api.getAddress();
			if (res.errorCode == 0) {
				if (res.data && res.data.length) {
					for (let i = 0; i < res.data.length; i++) {
						if (res.data[i].isDefault) {
							this.defaultAddress = res.data[i];
						}
					}
				}
			}
		},
		setAddress() {
			if (this.defaultAddress) {
				this.$router.push({ name: "addressList" });
			} else {
				this.$router.push({ name: "addAddress" });
			}
		},
		changeNum(type) {
			if (type == "-" && this.currNum == 1) return false;
			if (type == "+") {
				if (this.currNum >= this.detailData.currSpec.stock)
					return false;
				this.currNum++;
			} else {
				this.currNum--;
			}
			this.getPrice();
		}
	}
};
</script>
<style lang="less" scoped>
.page {
	padding-bottom: 0.68rem;
	background: #f4f3f3;
	padding-top: 0.44rem;
	.header-back {
		height: 0.44rem;
		position: fixed;
		top: 0;
		width: 3.75rem;
		background: #fff;
		line-height: 0.44rem;
		text-align: center;
		border-bottom: 0.01rem solid #dcdbdc;
		.icon-back {
			background: url("../assets/img/icon-back.png") center center
				no-repeat;
			background-size: 0.08rem 0.16rem;
			position: absolute;
			left: 0.18rem;
			top: 0.14rem;
			width: 0.08rem;
			height: 0.16rem;
		}
	}
	.page-footer {
		position: fixed;
		bottom: 0;
		width: 3.75rem;
		height: 0.66rem;
		background: #fff;
		.btn {
			width: 1.78rem;
			background: #ffc300;
			height: 0.68rem;
		}
		.all-price {
			padding-left: 0.16rem;
		}
		.price {
			color: #f66632;
		}
	}
	.exp-num-price {
		padding: 0 0.24rem;
		background: #fff;
		.item {
			.price {
				.curr {
					color: #f66632;
				}
			}
			.num-inp {
				border: 0.01rem solid #e3e3e4;
				border-radius: 0.04rem;
				.num {
					border-right: 0.01rem solid #e3e3e4;
					border-left: 0.01rem solid #e3e3e4;
					padding: 0 0.2rem;
					height: 0.28rem;
				}
				.btn {
					height: 0.28rem;
					width: 0.28rem;
					color: #8c8c8c;
				}
			}
			.title {
				color: #3e3d3e;
				font-size: 0.14rem;
			}
			height: 0.58rem;
			border-bottom: 0.01rem solid #dcdbdc;
		}
	}
	.invite-inp {
		padding: 0.2rem 0.24rem;
		background: #fff;
		margin-bottom: 0.1rem;
		.inp {
			width: 2.16rem;
			font-size: 0.12rem;
		}
		.invite-icon {
			background: url("../assets/img/icon-invite.png") left center
				no-repeat;
			background-size: 0.7rem 0.18rem;
			height: 0.18rem;
		}
	}
	.address-info {
		margin: 0.1rem 0;
		padding: 0.16rem 0.24rem;
		background: #fff;
		.address-icon {
			background: url("../assets/img/icon-address.png") top center
				no-repeat;
			background-size: 0.16rem 0.16rem;
			width: 0.16rem;
			height: 0.16rem;
		}
		.right-arrow {
			background: url("../assets/img/right-arrow-gray.png") center center
				no-repeat;
			background-size: 0.08rem 0.12rem;
			height: 0.12rem;
			width: 0.08rem;
		}
		.detail {
			padding-left: 0.16rem;
			.address {
				width: 2rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.name-tel {
				padding-bottom: 0.04rem;
				.tel {
					padding-left: 0.16rem;
				}
			}
		}
	}
	.pro-info {
		padding: 0.24rem;
		background: #fff;
		.spec-info {
			padding-left: 0.16rem;
			.price {
				padding-top: 0.08rem;
				.curr-price {
					color: #f66632;
				}
				.origin-price {
					padding: 0 0.1rem 0 0.04rem;
					text-decoration: line-through;
				}
				.discount {
					border: 0.01rem solid #959297;
					padding: 0 0.02rem;
				}
			}
			.num {
				padding-top: 0.08rem;
			}
			.spec {
				padding-top: 0.05rem;
			}
		}
		.pro-img {
			width: 0.88rem;
			height: 0.88rem;
			object-fit: cover;
		}
	}
}
</style>