<template>
	<div class="page">
		<div class="tip flex">
			<span class="tip-icon"></span>
			<p class="txt-s12">以下内容转载自原博主，其观点、内容、字体、图片版权均归原作者所有</p>
		</div>
    <!-- @onload="getProductionAppraisal" -->
    <van-list :finished="finished" finished-text="没有更多了">
      <div class="review" v-for="(item, index) in list">
        <div class="blogger flex">
          <div class="flex-s1 flex">
            <img class="header-pic" :src="item.avatar" alt="">
            <span class="name flex-s1">{{item.nickname}}</span>
          </div>
          <span class="time">{{moment(item.create_time * 1000).format('YYYY.MM.DD')}}</span>
        </div>
        <img class="intro-img" width="100%" :src="item.image" alt="">
        <div class="content">
          <div class="social-data flex">
            <div class="hot-icons flex-s1 flex">
              <span class="flex icon">
                <img width="14" height="14" :src="require('../assets/img/icon-zhuanfa.png')" alt="">
                <span class="num">{{formatNum(item.repost)}}</span>
              </span>
              <span class="flex icon">
                <img width="16" height="14" :src="require('../assets/img/icon-comment.png')" alt="">
                <span class="num">{{formatNum(item.comment)}}</span>
              </span>
              <span class="flex icon">
                <img width="13" height="14" :src="require('../assets/img/icon-like.png')" alt="">
                <span class="num">{{formatNum(item.like)}}</span>
              </span>
            </div>
            <div class="channel flex">
              <img width="16px" height="16px" :src="item.source_icon" alt="">
              <span class="txt">来源{{item.source}}</span>
            </div>
          </div>
          <div class="review-text">
            <p :class="{'txt': !item.showMore, 'txt-more': item.showMore}">#夏日碎碎念#五月的一天，晴，吹的是青苹果味儿的风。邻家妹纸 @BCL-Company 的碎碎念真有晴，吹的是青苹果味儿的风。邻家妹纸的碎碎念真有晴，吹的是青苹果味儿的风。邻家妹纸</p>
            <span class="show-more" @click="showMoreClick(item)">{{item.showMore ? '收起' : '展开'}}</span>
          </div>
        </div>
      </div>
    </van-list>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	name: "Reviews",
	data() {
		return {
      loading: false, // 正在加载
      finished: false, // 时候加载完毕
      moment: moment,
      page_id: 0,
      list: [{
        avatar: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        create_time: 12313123,
        image: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        source: '微博',
        source_icon: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        repost: 12112121,
        nickname: '樱木花道',
        comment: 212312,
        like: 312321233,
        content: '还大飞去我回去晚点回去五点前维护队去武汉都抢我的回去我都抢我的回去我ID回去我 带回去五点回去我ID回去我ID氰化物都去外地玩电气化强度为i',
        showMore: false,
      },{
        avatar: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        create_time: 12313123,
        image: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        source: '微博',
        source_icon: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        repost: 12211212,
        nickname: '樱木花道',
        comment: 212312,
        like: 312321233,
        content: '还大飞去我回去晚点回去五点前维护队去武汉都抢我的回去我都抢我的回去我ID回去我 带回去五点回去我ID回去我ID氰化物都去外地玩电气化强度为i',
        showMore: false,
      },{
        avatar: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        create_time: 12313123,
        image: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        source: '微博',
        source_icon: 'https://quntidongli.oss-cn-shanghai.aliyuncs.com/banner/tuan/img/0107.jpg',
        repost: 121221,
        nickname: '樱木花道',
        comment: 212312,
        like: 312321233,
        content: '还大飞去我回去晚点回去五点前维护队去武汉都抢我的回去我都抢我的回去我ID回去我 带回去五点回去我ID回去我ID氰化物都去外地玩电气化强度为i',
        showMore: false,
      }]
    };
	},
	mounted() {
    // this.getProductionAppraisal();
  },
	methods: {
    async getProductionAppraisal(){
      if(this.finished)return false;
      this.page_id++;
      let res = await this.$api.getProductionAppraisal({
        page_id: this.page_id,
        production_id: this.$route.query.production_id || ''
      })
      if(res.errorCode == 0){
        if(res.data.id_end){
          this.finished = true;
          return false;
        }
        if(res.data.list){
          for(let i = 0; i < res.data.list.length; i++){
            res.data.list[i]['showMore'] = false;
          }
        }
        this.list = res.data.list || [];
      } else {
        this.page--;
        this.$toast(res.errorDescription)
      }
    },
    // 展开更多
    showMoreClick(item){
      item.showMore = !item.showMore;
    },
    // 转换成 - 万
    formatNum(num){
      if(num >= 10000 && num <= 10000000){
        return parseInt(num / 1000) / 10  + '万'
      } else if(num > 100000000){
        return parseInt(num / 10000000) / 10 + '亿'
      } else {
        return num;
      }
    }
  }
};
</script>
<style lang="less">
.page {
  background: #fff;
  .review{
    padding: 0 0.16rem;
    border-bottom: 0.01rem solid #e1e1e1;
    .content {
      .review-text {
        padding-bottom: 0.4rem;
        position: relative;
        .show-more{
          position:absolute;
          right: 0;
          bottom: 0.15rem;
          color: #FBCD04;
        }
        .txt{
          color: #2c2c2c;
          font-size: 0.14rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .txt-more{
          color: #2c2c2c;
          font-size: 0.14rem;
        }
      }
      .social-data {
        padding: 0.16rem 0;
        .channel{
          img{
            border-radius: 0.04rem;
          }
          .txt{
            color: #999999;
            font-size: 0.12rem;
            padding-left: 0.1rem;
          }
        }
        .hot-icons {
          justify-content: flex-start;
          .icon{
            width: 0.7rem;
          }
          .num{
            padding: 0 0 0 0.08rem;
            font-size: 0.12rem;
            color: #3E3D3E;
          }
        }
      }
    }
    .intro-img {
      border-radius: 0.08rem;
    }
    .blogger{
      padding: 0.18rem 0 0.12rem 0;
      .time{
        font-size: 0.14rem;
        color: #999999;
      }
      .name{
        padding-left: 0.1rem;
        font-size: 0.16rem;
        font-weight: bold;
      }
      .header-pic{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.15rem;
        object-fit: cover;
      }
    }
  }
	.tip {
    background: #f4f3f3;
    color: #9f9da1;
    padding: 0.1rem 0.16rem;
    align-items: flex-start;
		.tip-icon {
			background: url("../assets/img/tip-icon.png") left center no-repeat;
			background-size: 0.15rem 0.15rem;
      width: 0.24rem;
      height: 0.15rem;
		}
	}
}
</style>