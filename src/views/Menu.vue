<template>
  <div class="container">
    <div class="search">
      <van-search v-model="value" shape="round" placeholder="输入商品名称" @click="toSearch" />
    </div>
    <div class="menu">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="changeMenu(item, index)"
      >
        <div class="img">
          <img :src="item.activeImg" v-if="item.flag" alt="" />
          <img :src="item.inactiveImg" v-else alt="" />
        </div>
        <div class="text" :class="item.flag ? 'active' : ''">
          <span>{{ item.typeDesc }}</span>
        </div>
      </div>
    </div>
    <div class="product-list">
      <div class="product" v-for="(item, index) in productList" :key="index" @click="gotoDetail(item.pid)">
        <div class="img">
          <img :src="item.smallImg" alt="" />
        </div>
        <div class="product-name">
          <span class="cname">{{ item.name }}</span>
          <span class="ename">{{ item.enname }}</span>
        </div>
        <div class="product-price">
          <span class="price"> ￥{{ item.price }} </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getTypeProducts } from "../api/index";
import { getType } from "../api/menu";
export default {
  data() {
    return {
      value: "",
      menuList: [],
      key: "type",
      productType: "",
      productList: [],
    };
  },
  methods: {
      gotoDetail(pid) {
          this.$router.push({ path: '/detail', query: { pid: pid } })
      },
      changeMenu(item, index) {
        this.productType = item.type;
        this.menuList.forEach((item2, index2) => {
          if (index === index2) {
            item2.flag = true;
          } else {
            item2.flag = false;
          }
        });
        this.getProductList();
      },
      getProductList() {
        getTypeProducts({
          appkey: this.$appkey,
          key: "type",
          value: this.productType,
        }).then((res) => {
          this.productList = res.data.result;
        });
      },
      getMenuList() {
        getType({ appkey: this.$appkey }).then((res) => {
          this.menuList = res.data.result;
          this.productType = this.menuList[0].type
          this.menuList.forEach((item) => {
            item.flag = false;
          });
          this.menuList[0].flag = true
          this.menuList[0].inactiveImg = require("../assets/images/icons_05.gif");
          this.menuList[0].activeImg = require("../assets/images/icons_19.gif");
          this.menuList[1].inactiveImg = require("../assets/images/icons_03.gif");
          this.menuList[1].activeImg = require("../assets/images/icons_18.gif");
          this.menuList[2].inactiveImg = require("../assets/images/icons_07.gif");
          this.menuList[2].activeImg = require("../assets/images/icons_20.gif");
          this.menuList[3].inactiveImg = require("../assets/images/icons_11.gif");
          this.menuList[3].activeImg = require("../assets/images/icons_22.png");
          this.getProductList();
        });
      },
      toSearch() {
          this.$router.push({ path: 'search' })
      }
  },
  created() {
    this.getMenuList();
    this.getProductList();
  },
};
</script>
<style scoped lang="less">
.container {
  padding-bottom: 60px;

  .menu {
    display: flex;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    height: 60px;
    .menu-item {
      width: 25%;

      .img {
        img {
          width: 40px;
        }
      }
      .text {
        font-size: 12px;
      }
      .active {
        font-weight: bold;
        color: #0c34ba;
      }
    }
  }

  .product-list {
    .product {
      background-color: #fff;
      display: flex;
      width: 95%;
      margin: 0 auto;
      margin-top: 20px;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      align-items: center;
      .img {
        img {
          width: 80px;
        }
      }

      .product-name {
        display: flex;
        flex-direction: column;
        width: 200px;
        margin-left: 10px;
        font-size: 15px;
        .ename {
          margin-top: 5px;
        }
      }
      .product-price {
        font-weight: bold;
        color: #0c34ba;
      }
    }
  }
}
</style>
