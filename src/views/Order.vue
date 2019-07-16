<template>
	<div class="page">
    <div class="header-back">
      <router-link to="productDetail" class="icon-back"></router-link>
      <p class="txt-s18 txt-bold">确认订单</p>
    </div>
		<div class="pro-info flex">
			<img
				class="pro-img"
				src="https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg"
				alt
			/>
			<div class="spec-info">
				<p class="title txt-s14 txt-bold">Brosway 施华洛世奇水晶锁骨链镀金天镀金天天镀金天天</p>
				<p class="spec txt-s12 txt-gray">已选 "红色" "100ml"</p>
				<div class="price-info flex">
					<div class="price flex-s1">
						<span class="curr-price txt-s16 txt-bold">￥60.68</span>
						<span class="origin-price txt-s12 txt-gray">￥100</span>
						<span class="discount txt-s10 txt-gray">5.5折</span>
					</div>
					<span class="num txt-gray">x1</span>
				</div>
			</div>
		</div>

    <!-- 地址 -->
    <div class="address-info flex" @click="setAddress">
      <span class="address-icon"></span>
      <div class="detail flex-s1">
        <!-- <p class="name-tel txt-s14">
          <span class="name">阿三</span>
          <span class="tel">13588878765</span>
        </p>
        <p class="address txt-gray txt-s12">浙江 杭州 西湖 郡原公元里郡原公元里郡原公元里</p> -->
        <p class="txt-s14 txt-gray">请选择收货地址</p>
      </div>
      <span class="right-arrow"></span>
    </div>
    <!-- 邀请名填写 -->
    <div class="invite-inp flex">
      <span class="invite-icon flex-s1"></span>
      <input class="inp" type="text" placeholder="哪位博主邀请你来拔草？请填写博主昵称">
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
          <span class="price-tip">
            共1件商品，小计： 
          </span>
          <span class="curr">￥60.68</span>
        </p>
      </div>
    </div>
    <div class="page-footer flex">
      <div class="all-price txt-s14 flex-s1">
        合集金额： <span class="price txt-s20 txt-bold">￥60.68</span>
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
      defaultAddress: '1231',
      req: {
        production_id: '',
        sku_id: '',
        num: '',
        address_id: '',
        inviter: '',
      }
    };
	},
	mounted() {},
	methods: {
    async submit(){
      let res = await this.$api.productionPay(this.req);
      if(res.errorCode == 0){
        window.open(res.data.alipay_order_str)
      } else {
        this.$toast(res.errorDescription)
      }
    },
    // 获取默认地址
    async getDeAddress(){
      let res = await this.$api.getAddress();
      if(res.errorCode == 0){
        if(res.data && res.data.length){
        for(let i = 0; i < res.data.length; i ++){
            if(res.data[i].isDefault){
              this.defaultAddress = res.data[i]
            }
          }
        }
      }
    },
    setAddress(){
      if(this.defaultAddress){
        this.$router.push({name: 'addressList'})
      } else {
        this.$router.push({name: 'addAddress'})
      }
    },
    changeNum(type){
      if(type == '-' && this.currNum == 1)return false;
      if(type == '+'){
        this.currNum ++;
      } else {
        this.currNum --;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  padding-bottom: 0.68rem;
  background: #f4f3f3;
  padding-top: 0.44rem;
  .header-back{
    height: 0.44rem;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    line-height: 0.44rem;
    text-align: center;
    border-bottom: 0.01rem solid #dcdbdc;
    .icon-back{
      background: url('../assets/img/icon-back.png') center center no-repeat;
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
    left: 0;
    right: 0;
    height: 0.66rem;
    background: #fff;
    .btn{
      width: 1.78rem;
      background: #ffc300;
      height: 0.68rem;
    }
    .all-price{
      padding-left: 0.16rem;
    }
    .price{
      color: #F66632;
    }
  }
  .exp-num-price {
    padding: 0 0.24rem;
    background: #fff;
    .item{
      .price {
        .curr {
          color: #F66632;
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
        .btn{
          height: 0.28rem;
          width: 0.28rem;
          color: #8c8c8c;
        }
      }
      .title{
        color: #3E3D3E;
        font-size: 0.14rem;
      }
      height: 0.58rem;
      border-bottom: 0.01rem solid #dcdbdc;
    }
  }
  .invite-inp{
     padding: 0.2rem 0.24rem;
     background: #fff;
     margin-bottom: 0.1rem;
     .inp{
       width: 2.16rem;
       font-size: 0.12rem;
     }
      .invite-icon{
        background: url('../assets/img/icon-invite.png') left center no-repeat;
        background-size: 0.7rem 0.18rem;
        height: 0.18rem;
      }
  }
  .address-info{
    margin: 0.1rem 0;
    padding: 0.16rem 0.24rem;
    background: #fff;
    .address-icon{
      background: url('../assets/img/icon-address.png') top center no-repeat;
      background-size: 0.16rem 0.16rem;
      width: 0.16rem;
      height: 0.16rem;
    }
    .right-arrow{
      background: url('../assets/img/right-arrow-gray.png') center center no-repeat;
      background-size: 0.08rem 0.12rem;
      height: 0.12rem;
      width: 0.08rem;
    }
    .detail{
      padding-left: 0.16rem;
      .address{
        width: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name-tel{
        padding-bottom: 0.04rem;
        .tel{
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
      .price{
        padding-top: 0.08rem;
        .curr-price{
          color: #F66632;
        }
        .origin-price{
          padding: 0 0.1rem 0 0.04rem;
          text-decoration: line-through;
        }
        .discount{
          border: 0.01rem solid #959297;
          padding: 0 0.02rem;
        }
      }
      .num{
          padding-top: 0.08rem;
        }
      .spec {
        padding-top: 0.05rem;
      }
    }
    .pro-img{
      width: 0.88rem;
      height: 0.88rem;
      object-fit: cover;
    }
	}
}
</style>