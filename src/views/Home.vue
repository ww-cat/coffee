<template>
  <div class="container">
    <div class="top">
      <div class="top_left">
        <p class="hello">下午好</p>
        <p class="username">Allen</p>
      </div>
      <div class="top_right">
        <div class="icon">
          <van-icon name="search" color="#0C34BA" />
        </div>
        <input @click="toSearch" type="text" name="" placeholder="输入商品名称" id="" />
      </div>
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in banners"
          :key="index"
          class="banner-swipe"
          @click="gotoDetail(item.pid)"
        >
          <img :src="item.bannerImg" class="swiper-img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot">
      <div class="hot_box">
        <span>热卖推荐</span>
      </div>
    </div>
    <div class="product-list">
      <div class="product" v-for="(item, index) in hotList" :key="index" @click="gotoDetail(item.pid)">
        <div class="img">
          <img :src="item.smallImg" alt="" />
        </div>
        <div class="c-name">
          <span>{{ item.name }}</span>
        </div>
        <div class="e-name">
          <span>{{ item.enname }}</span>
        </div>
        <div class="price">
          <span>￥{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBanners, getTypeProducts } from "@/api";

export default {
  name: "",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      banners: [],
      hotList: [],
    };
  },
  created() {
    this.getBanners();
    this.getHotList();
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getBanners() {
      getBanners({ appkey: this.$appkey }).then((res) => {
        this.banners = res.data.result;
      });
    },
    getHotList() {
      getTypeProducts({
        appkey: this.$appkey,
        key: "isHot",
        value: 1,
      }).then((res) => {
        this.hotList = res.data.result;
      });
    },
    gotoDetail(pid) {
      this.$router.push({ path: '/detail', query: { pid: pid } })
    },
    toSearch() {
        this.$router.push({ path: 'search' })
    }
  },
};
</script>
<style lang='less' scoped>
.container {
  padding-bottom: 60px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 60px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .top_left {
      display: flex;
      width: 30%;
      height: 100%;
      align-items: center;
      justify-content: space-around;

      p {
        font-weight: bold;
        font-size: 12px;
      }

      .hello {
        color: #646566;
      }

      .username {
        color: #0c34ba;
      }
    }

    .top_right {
      height: 34px;
      width: 220px;
      display: flex;
      position: relative;
      background-color: #f7f8fa;
      align-items: center;
      justify-content: flex-end;
      border-radius: 30px;

      input {
        position: absolute;
        left: 30px;
        width: 180px;
        background-color: #f7f8fa;
      }

      .icon {
        position: absolute;
        left: 10px;
        top: 8px;
      }
    }
  }

  .banner {
    .banner-swipe {
      text-align: center;

      .swiper-img {
        width: 95%;
        height: 100%;
        border-radius: 20px;
        margin: 10px 0;
      }
    }
  }

  .hot {
    width: 95%;
    background-color: #fff;
    height: 50px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;

    .hot_box {
      height: 30px;
      border-top-right-radius: 20px;
      background-color: #0c34ba;
      line-height: 30px;
      width: 80px;
      text-align: center;

      span {
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: 20px;
    justify-content: space-between;

    .product {
      width: 46%;
      background-color: #fff;
      padding: 5px 5px;
      font-size: 16px;
      margin-bottom: 20px;
      border-radius: 20px;

      .img {
        width: 100%;
        border-radius: 10px;
        text-align: center;

        img {
          width: 95%;
          border-radius: 20px;
          z-index:0;

        }
        &::before {
            content: "hot";
            position: relative;
            top: 25px;
            z-index: 1;
            color:white;
            background-color: #0C34BA;
            width: 40px;
            height: 25px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            float: left;
            left: 20px;
            margin-top: -25px;
          }
      }

      .c-name {
        margin-top: 10px;
        color: #646566;
      }

      .e-name {
        margin-top: 5px;
        color: #7a7773;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        margin-top: 10px;
        color: #0c34ba;
      }
    }
  }
}
</style>
