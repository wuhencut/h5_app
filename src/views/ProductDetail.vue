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
				<van-swipe-item class="swiper-item" v-for="(item, index) in detailData.star_production.images" :key="index">
					<img :src="item" />
				</van-swipe-item>
			</van-swipe>
			<!-- 产品文字信息 -->
			<div class="pro-info">
				<div class="pro-title txt-s18 txt-bold">{{detailData.title}}</div>
				<div class="spots" v-if="detailData.star_production.spotlight">
					<span v-for="item in detailData.star_production.spotlight" class="spot txt-s14">{{item}} </span>
				</div>
				<div class="price">
					<!-- 当前价 -->
					<span class="curr-price txt-s20 txt-bold">￥{{detailData.star_production.price}}</span>
					<!-- 划线价 -->
					<span class="origin-price txt-s12">{{detailData.origin_price}}</span>
					<span class="discount txt-s10">{{detailData.star_production.discount}}折</span>
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
				<div class="review-imgs flex" v-if="detailData.appraisal.images.length > 2">
					<img v-for="item in detailData.appraisal.images.slice(0, 3)" :src="item" />
				</div>
			</div>
			<!-- 公司信息 -->
			<div class="company-intro"></div>
			<!-- 品牌信息 -->
			<div class="brand-info txt-s14 txt-bold flex">
				<img :src="detailData.brand.logo" />
				{{detailData.brand.name}}
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
					:src="currSpec.image ? currSpec.image : detailData.star_production.images[0]"
					alt
				/>
				<div class="txt-info">
					<p class="title">{{detailData.star_production.title}}</p>
					<p class="guige">选择规格</p>
					<div v-show="showPrice" class="price-info flex">
						<p class="flex-s1 price flex">
							<span class="curr-price">￥{{currSpec.price}}</span>
							<span class="origin-price">￥{{detailData.star_production.origin_price}}</span>
							<span class="discount">{{detailData.star_production.discount}}折</span>
						</p>
						<span class="num">x {{currSpec.stock}}</span>
					</div>
				</div>
			</div>
			<!-- 选择规格 -->
			<div class="spec-area">
				<div class="spec-item" v-for="(spec, index) in detailData.spec.params" :key="index">
					<p class="title">{{spec.spec_type}}</p>
					<div class="specs">
						<span
							v-for="(sub,subIndex) in spec.spec_name"
							:class="{
              'spec': sub.canClick && indexChoose[index] != subIndex,
              'disabled': !sub.canClick,
              'active': indexChoose[index] == subIndex && sub.canClick
              }"
							:key="subIndex"
							@click="specClick(sub, index, $event, subIndex)"
						>{{sub.name}}</span>
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
			showPrice: false, // 展示价格信息
			currSpec: {},
			selectArr: [], // 选择的规格
			indexChoose: [], // 点击的index 用来判断是否展示激活
			buyNum: 1, // 购买数量
			showSku: false, // 展示sku
			cover: false, // 是否上滑
			navPro: true, // 当前在产品锚点想
			navDetail: false, // 当前在详情锚点
      detailTemp: {}, // key-value保存spec
			detailData: {
				star_production: {
					production_id: "12112",
					title: "LA MER海蓝之谜修护精华面霜补水保湿滋润舒缓",
					logo:
						"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
					origin_price: 3123,
					price: 2222,
					discount: 5.0,
					images: [
						"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01r8xcAw29dj5boNx55_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01GFCln429dj5boPlHZ_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01jAqLp529dj5gB13fl_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01ohwGrd29dj4KmiCSh_!!2424298091.jpg_800x800q90.jpg"
					],
					description:
            '\u003cp\u003e\u003cimg src="https://img.alicdn.com/imgextra/i4/2424298091/TB2zNk5X25TBuNjSspmXXaDRVXa_!!2424298091.jpg?t=1518422925000"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i3/2424298091/O1CN01lZwnS229dj3Eg1u2S_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i3/2424298091/O1CN01xqtW6429dj6rKpeEm_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i1/2424298091/O1CN01THueBu29dj6yg0KnM_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01af2G5y29dj6a0xTBO_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i4/2424298091/O1CN01TF2K0L29dj6ys1CzI_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01NTLmMF29dj3BLLKOg_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01ISWk5429dj4JiMajb_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i1/2424298091/O1CN01TGw3VI29dj6ynBFNx_!!2424298091.jpg"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01cJlk8R29dj2p07e2M_!!2424298091.png"\u003e\u003cimg src="https://img.alicdn.com/imgextra/i2/2424298091/O1CN01K9RJ1C29dj6kiyV7h_!!2424298091.jpg"\u003e\u003c/p\u003e',
            spotlight: ['亮肤', '美白']
				},
				spec: {
					params: [
						{
							spec_type: "颜色",
							spec_name: ["红色", "白色"]
						},
						{
							spec_type: "尺寸",
							spec_name: ["100ml", "200ml"]
						}
					],
					conditions: [
						{
							condition: ["红色", "100ml"],
							price: 123,
							stock: 1,
							image:
								"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
							sku_id: "1"
						},
						{
							condition: ["红色", "200ml"],
							price: 123,
							stock: 2,
							image:
								"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01r8xcAw29dj5boNx55_!!2424298091.jpg_800x800q90.jpg",
							sku_id: "2"
						},
						{
							condition: ["白色", "100ml"],
							price: 123,
							stock: 0,
							image:
								"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01GFCln429dj5boPlHZ_!!2424298091.jpg_800x800q90.jpg",
							sku_id: "3"
						},
						{
							condition: ["白色", "200ml"],
							price: 123,
							stock: 4,
							image:
								"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01jAqLp529dj5gB13fl_!!2424298091.jpg_800x800q90.jpg",
							sku_id: "4"
						}
					]
				},
				appraisal: {
					total_num: 5,
					images: [
						"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01r8xcAw29dj5boNx55_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01GFCln429dj5boPlHZ_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i1/2424298091/O1CN01jAqLp529dj5gB13fl_!!2424298091.jpg_800x800q90.jpg",
						"http://img.alicdn.com/imgextra/i3/2424298091/O1CN01ohwGrd29dj4KmiCSh_!!2424298091.jpg_800x800q90.jpg"
					]
				},
				brand: {
					logo:
						"http://img.alicdn.com/imgextra/i4/2424298091/O1CN01CbPZMT29dj6vM8CUF_!!0-item_pic.jpg_800x800q90.jpg",
					name: "品牌品牌品牌品牌品牌"
				}
			}
		};
	},
	mounted() {
    this.initData(this.detailData.spec.conditions, this.detailData.spec.params);
    // console.log(this.detailTemp, this.detailData.spec.params)
	},
	methods: {
		// 修改数据结构: key-value
		initData(specs, spec_temp) {
			for (let i = 0; i < specs.length; i++) {
				let name = specs[i].condition.join(","); // 字符串做key
				this.detailTemp[name] = specs[i];
			}
			// value 用对象保存，为canClick做准备
			for (let i = 0; i < spec_temp.length; i++) {
				let newValue = []; // 新数组，用来存储对象格式的value，对象用来保存 canClick属性
				for (let j = 0; j < spec_temp[i].spec_name.length; j++) {
					let obj = {};
					obj["name"] = spec_temp[i].spec_name[j];
					newValue[j] = obj;
				}
				spec_temp[i].spec_name = newValue;
			}
			this.checkItem();
		},
		// 点击选择规格
		//              父级index      子级index
		specClick(spec, index, event, subIndex) {
			if (!spec.canClick) return false;
			if (this.selectArr[index] != spec.name) {
				this.selectArr[index] = spec.name;
				this.indexChoose[index] = subIndex;
			} else {
				this.selectArr[index] = ""
				this.indexChoose[index] = -1; // 取消选中的规格
      }
      let isUse = true; // 确保选中的规则都有值，因为在此点击会把当前点击的设置成 ”“ ，
      for(let i = 0; i< this.selectArr.length; i++){
        if(!this.selectArr[i]){
          isUse = false;
        }
      }
			if (this.selectArr.length == this.detailData.spec.params.length && isUse) {
        this.showPrice = true;
        this.currSpec = this.detailTemp[this.selectArr.join(",")];
        // 在选择sku前点击的数量错误的话需要矫正，防止提交过大的数量
        this.buyNum = this.buyNum >= this.currSpec.stock ? this.currSpec.stock : this.buyNum;
			} else {
        this.showPrice = false;
      }
			this.checkItem();
		},
		// 检查库存，置灰按钮
		checkItem() {
			let option = this.detailData.spec.params,
				result = []; // 选中的规格
			for (let i = 0; i < option.length; i++) {
				result[i] = this.selectArr[i] ? this.selectArr[i] : "";
			}
			for (let i = 0; i < option.length; i++) {
				let last = result[i]; // 将选中的值存放到字符串中
				for (let j = 0; j < option[i].spec_name.length; j++) {
					result[i] = option[i].spec_name[j].name; // 直接覆盖
					option[i].spec_name[j]["canClick"] = this.isClick(result); // 添加字段判断是否能点击
				}
				result[i] = last; // 还原
			}
			this.$forceUpdate(); // 重绘
		},
		// 通过库存判断是否可点击
		isClick(result) {
			for (let i = 0; i < result.length; i++) {
				if (result[i] == "") {
					return true; // 未选择，默认可点击
				}
			}
			let key = result.join(",");
			return this.detailTemp[key].stock == 0 ? false : true;
		},
		async changeNum(type) {
			if (this.buyNum == 1 && type == "-") return false;
			if (type == "+") {
        if(this.buyNum >= this.currSpec.stock){
          this.buyNum = this.currSpec.stock;
          return false;
        }
				this.buyNum++;
			} else {
				this.buyNum--;
			}
		},
		buyClick() {
			if (!this.showSku) {
				this.showSku = true;
			} else {
        if(!this.currSpec.sku_id)return false;
        if(!this.currSpec.image){
          this.currSpec.images = this.detailData.star_production.images[0];
        }
        let orderData = {
          currSpec: this.currSpec,
          discount: this.detailData.star_production.discount,
          title: this.detailData.star_production.title,
          origin_price: this.detailData.star_production.origin_price,
          buyNum: this.buyNum,
          production_id: this.detailData.star_production.production_id
        }
        localStorage.setItem('orderData', JSON.stringify(orderData));
				this.$router.push({ name: "order"});
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
					.active {
						border: 0.01rem solid #ffc300;
						color: #ffc300;
						background: #fffae6;
					}
					.spec {
						background: #f0f0f0;
					}
					.disabled {
						background: #f0f0f0;
						opacity: 0.5;
					}
					.spec,
					.active,
					.disabled {
						margin-right: 0.16rem;
						padding: 0.05rem 0.1rem;
						font-size: 0.14rem;
						border-radius: 0.04rem;
					}
				}
			}
		}
		.pro-info {
			.txt-info {
        height: 1.08rem;
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
		width: 3.75rem;
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
		width: 3.76rem;
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
          vertical-align: 0.03rem;
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