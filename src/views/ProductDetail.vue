<template>
	<div class="page">
		<div class="header flex">
			<span class="logo"></span>
			<div class="logo-tip flex-s1">
				<p class="txt-s16 txt-bold">映兔 | 潮流好物抢先用</p>
				<p class="txt-s12" style="color: #999999">4000品牌等你探索</p>
			</div>
			<a class="btn txt-s14" href>下载APP</a>
		</div>
		<div class="main">
			<van-swipe class="swiper" :autoplay="5000" indicator-color="#ffc300">
				<van-swipe-item class="swiper-item" v-for="(item, index) in detailData.covers" :key="index">
					<img :src="item" />
				</van-swipe-item>
			</van-swipe>
			<!-- 产品文字信息 -->
			<div class="pro-info">
				<div class="pro-title txt-s18 txt-bold">{{detailData.title}}</div>
				<div class="spots" v-if="detailData.highlights">
					<span v-for="item in detailData.highlights" class="spot txt-s14">亮肤</span>
				</div>
				<div class="price">
					<!-- 当前价 -->
					<span class="curr-price txt-s20 txt-bold">￥80 ~ ￥120</span>
					<!-- 划线价 -->
					<span class="origin-price txt-s12">{{detailData.origin_price}}</span>
					<span class="discount txt-s10">5.5折</span>
				</div>
				<!-- 物流信息 -->
				<div class="exp flex">
					<span class="txt-s14 flex-s1">配送方式</span>
					<span class="exp-type txt-s10">快递免邮</span>
				</div>
			</div>
			<!-- 博主实测 -->
			<div class="blogger-review">
				<div class="title flex">
					<span class="flex-s1 txt-s14">博主实测(3)</span>
					<router-link class="check-all txt-s12" to="reviews">查看全部</router-link>
				</div>
				<div class="review-imgs flex">
					<img v-for="item in imgs" :src="item" />
				</div>
			</div>
			<!-- 公司信息 -->
			<div class="company-intro"></div>
			<!-- 品牌信息 -->
			<div class="brand-info txt-s14 txt-bold flex">
				<img src="https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg" />
				CLIO珂莱欧
			</div>
			<!-- 差评详情 -->
			<div class="pro-detail">
				<p class="title flex">
					<span class="txt-s12 xiushi">///</span>
					<span class="txt-s18 txt-bold">产品详情</span>
					<span class="txt-s12 xiushi">///</span>
				</p>
				<div class="content" v-html="detailData.description"></div>
			</div>
			<div class="note">
				<div class="refound-note">
					<p class="title">退货退款说明</p>
					<div class="content">
						<p>· 因质量问题需要申请退货，请收到商品即时拍照，商家会尽快办理退货退款服务。</p>
						<p>· 因质量问题需要申请退货，请收到商品即时拍照，商家会尽快办理退货退款服务。</p>
						<p>· 订单退款将在5个工作日内处理，实际到账以银行及支付规则为准。</p>
					</div>
				</div>
				<div class="price-note">
					<p class="title">价格说明</p>
					<div class="content">
						划线价格：商品的日常销售价，非原价。
						<br />未划线价格：商品的实际标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结束页价格为准。
					</div>
				</div>
			</div>
		</div>
		<div class="footer" @click="buyClick">立即购买</div>
		<div class="bg" @click="showSku = false" v-show="showSku"></div>
		<div class="sku-dg" v-show="showSku">
			<!-- 产品头部信息 -->
			<div class="pro-info flex">
				<img
					class="header-pic"
					src="https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg"
					alt
				/>
				<div class="txt-info">
					<p class="title">Brosway 施华洛世奇水晶锁骨链镀金天镀金天天镀金天天</p>
					<p class="guige">选择规格</p>
					<div class="price-info flex">
						<p class="flex-s1 price flex">
							<span class="curr-price">￥3709</span>
							<span class="origin-price">￥5299</span>
							<span class="discount">5.5折</span>
						</p>
						<span class="num">x 1</span>
					</div>
				</div>
			</div>
			<!-- 选择规格 -->
			<div class="spec-area">
				<div class="spec-item" v-for="spec in detailData.spec_temp">
					<p class="title">{{spec.name}}</p>
					<div class="specs">
						<span v-for="sub in spec.value" class="spec">{{sub}}</span>
					</div>
				</div>
				<div class="buy-num flex">
					<span class="flex-s1 txt-s14 txt-bold">购买数量</span>
					<div class="mod-num flex">
						<span class="flex num-click" @click="changeNum('-')">-</span>
						<span class="num">{{buyNum}}</span>
						<span class="flex num-click" @click="changeNum('+')">+</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "ProductDetail",
	data() {
		return {
			buyNum: 1, // 购买数量
			showSku: false, // 展示sku
			cover: false, // 是否上滑
			navPro: true, // 当前在产品锚点
			navDetail: false, // 当前在详情锚点
			imgs: [
				"https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg",
				"https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/02.png",
				"https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/03.png"
			],
			detailData: {
				id: "1149201617124331520",
				userId: "949701926113509376",
				link:
					"https://detail.tmall.com/item.htm?spm=875.7931836/B.20161011.16.28e94265EGodAw\u0026pvid=3467456d-ae7a-4556-927c-c5b4f383144a\u0026pos=16\u0026acm=201509290.1003.1.1286473\u0026id=43984164814\u0026scm=1007.12710.81710.100200300000000",
				title: "LA MER海蓝之谜修护精华面霜补水保湿滋润舒缓",
				covers: [
					"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
					"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01r8xcAw29dj5boNx55_!!2424298091.jpg_800x800q90.jpg",
					"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01GFCln429dj5boPlHZ_!!2424298091.jpg_800x800q90.jpg",
					"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01jAqLp529dj5gB13fl_!!2424298091.jpg_800x800q90.jpg",
					"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01ohwGrd29dj4KmiCSh_!!2424298091.jpg_800x800q90.jpg"
				],
				description:
					'\u003cp\u003e\u003cimg src="https://img.alicdn.com/imgextra/i4/2424298091/TB2zNk5X25TBuNjSspmXXaDRVXa_!!2424298091.jpg?t=1518422925000"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i3/2424298091/O1CN01lZwnS229dj3Eg1u2S_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i3/2424298091/O1CN01xqtW6429dj6rKpeEm_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i1/2424298091/O1CN01THueBu29dj6yg0KnM_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01af2G5y29dj6a0xTBO_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i4/2424298091/O1CN01TF2K0L29dj6ys1CzI_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01NTLmMF29dj3BLLKOg_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01ISWk5429dj4JiMajb_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i1/2424298091/O1CN01TGw3VI29dj6ynBFNx_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01cJlk8R29dj2p07e2M_!!2424298091.png"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01K9RJ1C29dj6kiyV7h_!!2424298091.jpg"\u003e\u003c/p\u003e',
				spec_temp: [
					{
						name: "款式",
						value: ["珍珠白"]
					},
					{
						name: "净含量",
						value: ["200ml", "400ml"]
					}
				],
				specs: [
					{
						name: ["珍珠白", "200ml"],
						image_link: "",
						production_price: 1000,
						id: 0,
						num: 0
					},
					{
						name: ["珍珠白", "400ml"],
						image_link: "",
						production_price: 1000,
						id: 0,
						num: 0
					}
				],
				brand_id: 0,
				brand: "KOSE COSMEPORT/高丝魅宝",
				level_one_category_id: "1",
				level_one_category: "美食生活",
				level_two_category: "test0",
				level_two_category_id: "7",
				highlights: null,
				status: 1,
				productionStatus: 1,
				numIid: 0,
				version: "0",
				origin_price: 0,
				is_address_limit: 0,
				address_limit: {
					area: null,
					area_type: 0
				}
			}
		};
	},
	mounted() {},
	methods: {
		async changeNum(type) {
			if (this.buyNum == 1 && type == "-") return false;
			if (type == "+") {
				this.buyNum++;
			} else {
				this.buyNum--;
			}
		},
		buyClick() {
			if (!this.showSku) {
				this.showSku = true;
			} else {
				this.$router.push({ name: "order", query: {} });
			}
		}
	}
};
</script>
<style lang="less">
.pro-detail {
	.content {
		img {
			width: 100%;
		}
	}
}
</style>

<style lang="less" scoped>
.page {
	.sku-dg {
		.spec-area {
			.buy-num {
				padding-top: 0.2rem;
				.mod-num {
					border: 0.01rem solid #e2e2e2;
					border-radius: 0.04rem;
					.num {
						padding: 0.04rem 0.2rem;
						border-right: 0.01rem solid #e2e2e2;
						border-left: 0.01rem solid #e2e2e2;
						font-size: 0.14rem;
						font-weight: bold;
					}
					.num-click {
						width: 0.28rem;
						height: 0.28rem;
						color: #8c8c8c;
					}
				}
			}
			.spec-item {
				border-bottom: 0.01rem solid #dcdcdc;
				.title {
					padding: 0.16rem 0;
				}
				.specs {
					padding-bottom: 0.28rem;
					.spec {
						margin-right: 0.16rem;
						padding: 0.05rem 0.1rem;
						font-size: 0.14rem;
						background: #f0f0f0;
						border-radius: 0.04rem;
					}
				}
			}
		}
		.pro-info {
			.txt-info {
				padding-left: 0.2rem;
				.guige {
					color: #9f9da1;
					font-size: 0.14rem;
					padding-bottom: 0.14rem;
				}
				.title {
					font-size: 0.14rem;
					font-weight: bold;
					padding-bottom: 0.14rem;
				}
			}
			.price-info {
				.num {
					font-size: 0.14rem;
					color: #9f9da1;
				}
				.price {
					justify-content: flex-start;
					.discount {
						color: #9f9da1;
						font-size: 0.1rem;
						border-radius: 0.02rem;
						border: 0.01rem solid #959297;
						padding: 0 0.02rem;
					}
					.origin-price {
						padding-left: 0.1rem;
						padding-right: 0.15rem;
						text-decoration: line-through;
						color: #9f9da1;
						font-size: 0.11rem;
					}
					.curr-price {
						font-size: 0.2rem;
						font-weight: bold;
						color: #f66632;
					}
				}
			}
			.header-pic {
				width: 1.08rem;
				height: 1.08rem;
				border-radius: 0.04rem;
				object-fit: cover;
			}
		}
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0.5rem;
		background: #fff;
		z-index: 101;
		padding: 0.16rem 0.16rem 0.35rem 0.16rem;
		border-radius: 0.04rem 0.04rem 0 0;
	}
	.bg {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		background: rgba(000, 000, 000, 0.5);
		z-index: 100;
	}
	.footer {
		z-index: 101;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.18rem;
		font-weight: bold;
		text-align: center;
		background: #ffc300;
	}
	.main {
		background: #f0f0f0;
		padding-bottom: 0.5rem;
		.note {
			background: #fff;
			padding: 0 0.24rem;
			padding-bottom: 0.45rem;
			.refound-note {
				.content {
					padding: 0.2rem 0;
					border-bottom: 0.01rem solid #c5c5c5;
					p {
						color: #7f7f7f;
						font-size: 0.12rem;
						padding-bottom: 0.08rem;
					}
				}
			}
			.price-note {
				color: #7f7f7f;
				.content {
					padding-top: 0.14rem;
					color: #7f7f7f;
					font-size: 0.12rem;
				}
			}
			.title {
				font-size: 0.14rem;
				font-weight: bold;
				padding: 0.16rem 0;
				border-bottom: 0.01rem dashed #c5c5c5;
			}
		}
		.pro-detail {
			padding-top: 0.35rem;
			background: #fff;
			.content {
				img {
					width: 100%;
				}
			}
			.title {
				span {
					padding: 0 0.14rem;
				}
			}
		}
		.brand-info {
			height: 0.6rem;
			padding-left: 0.22rem;
			justify-content: flex-start;
			background: #fafafa;
			margin-top: 0.1rem;
			img {
				width: 0.32rem;
				height: 0.32rem;
				border-radius: 0.16rem;
				border: 0.01rem solid #e5e5e5;
				margin-right: 0.1rem;
			}
		}
		.company-intro {
			background: url("../assets/img/company-intro.png") center center
				no-repeat;
			height: 1.05rem;
			background-size: 100%;
		}
		.blogger-review {
			margin-top: 0.1rem;
			background: #fff;
			padding: 0 0.24rem;
			.review-imgs {
				padding-bottom: 0.22rem;
				justify-content: space-between;
				img {
					width: 1rem;
					height: 1rem;
					object-fit: cover;
				}
			}
			.title {
				padding: 0.18rem 0;
				.check-all {
					color: #fab811;
					background: url("../assets/img/right-arrow.png") right
						center no-repeat;
					background-size: 0.08rem;
					padding-right: 0.17rem;
				}
			}
		}
		.pro-info {
			background: #fff;
			padding: 0 0.24rem;
			.exp {
				height: 0.5rem;
				.exp-type {
					color: #fab811;
					border: 0.01rem solid #fab811;
					height: 0.18rem;
					padding: 0 0.04rem;
				}
			}
			.price {
				padding-top: 0.16rem;
				padding-bottom: 0.35rem;
				border-bottom: 0.01rem solid #dcdbdc;
				.curr-price {
					color: #f66632;
				}
				.origin-price {
					color: #9f9da1;
					text-decoration: line-through;
					padding: 0 0.14rem 0 0.09rem;
				}
				.discount {
					border: 0.01rem solid #959297;
					color: #9f9da1;
					padding: 0 0.02rem;
				}
			}
			.pro-title {
				padding-top: 0.2rem;
			}
			.spots {
				padding-top: 0.08rem;
				.spot {
					color: #9f9da1;
					padding-right: 0.04rem;
				}
			}
		}
		.swiper {
			height: 3.75rem;
			.swiper-item {
				width: 3.75rem;
				height: 3.75rem;
				img {
					object-fit: cover;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.header {
		padding: 0.15rem 0.16rem;
		.btn {
			width: 0.8rem;
			height: 0.32rem;
			line-height: 0.32rem;
			border-radius: 0.04rem;
			text-align: center;
			background-color: #ffc300;
			color: #000;
		}
		.logo-tip {
			padding-left: 0.18rem;
		}
		.logo {
			background: url("../assets/img/logo.png") center center no-repeat;
			width: 0.4rem;
			height: 0.4rem;
			background-size: 0.4rem 0.4rem;
		}
	}
}
</style>