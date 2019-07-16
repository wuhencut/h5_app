<template>
  <div class="page">
		<div class="header-back">
			<router-link to="order" class="icon-back"></router-link>
		</div>
		<div class="title txt-s28 txt-bold">新增地址</div>
		<div class="mod-inp">
      <input class="inp" type="text" placeholder="姓名" v-model="address.recipient">
      <input class="inp" type="text" placeholder="手机号码" v-model="address.phone_num">
      <input class="inp" type="text" placeholder="省份" v-model="address.province">
      <input class="inp" type="text" placeholder="城市" v-model="address.city">
      <input class="inp" type="text" placeholder="县区" v-model="address.county">
      <input class="inp" type="text" placeholder="详细地址，如街道、楼牌号等" v-model="address.address">
    </div>
		<div to="addAddress" class="footer-btn txt-s20 txt-bold" @click="save">保存</div>
	</div>
</template>
<script>
export default {
  name: 'AddAddress',
  data(){
    return {
      address: {
        address: '',
        city: '',
        county: '',
        is_default: false,
        phone_num: '',
        province: '',
        recipient: '',
        type: 1, // 1 新增  2修改
      }
    }
  },
  mounted(){
    if(this.$route.query.address){
      this.address = JSON.parse(this.$route.query.address)
      this.address.type = 2;
    }
  },
  methods:{
    async save(){
      let req = this.address;
      if(!this.address.recipient){
        this.$toast('请填写姓名');
        return false;
      }
      if(!this.address.phone_num){
        this.$toast('请填写手机号');
        return false;
      }
      if(!this.address.province){
        this.$toast('请填写省份');
        return false;
      }
      if(!this.address.city){
        this.$toast('请填写所在城市');
        return false;
      }
      let res = await this.$api.addressModify(req);
      if(res.errorCode == 0){
        this.$toast('保存成功');
        this.$router.push({name:'order'})
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .page {
	padding: 0.44rem 0.24rem 0.6rem 0.24rem;
  background: #fff;
  .mod-inp{
    .inp{
      border-bottom: 0.01rem solid #dcdbdc;
      display: block;
      width: 100%;
      line-height: 0.5rem;
      font-size: 0.16rem;
    }
  }
	.footer-btn {
		position: fixed;
		line-height: 0.5rem;
		text-align: center;
		background: #ffc300;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.title {
		padding-top: 0.12rem;
		padding-bottom: 0.22rem;
		color: #3e3d3e;
	}
	.header-back {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
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