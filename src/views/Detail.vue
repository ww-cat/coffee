<template>
  <div class="container">
    <div class="top">
      <div class="back" @click="goBack">
        <span><van-icon name="arrow-left" /> 返回</span>
      </div>
      <div class="title">
        <span>商品详情</span>
      </div>
    </div>
    <div class="productImg">
      <img :src="productInfo.small_img" alt="" />
    </div>
    <div class="info">
      <div class="product">
        <div class="name">
          <div class="cname">
            <span>{{ productInfo.name }}</span>
          </div>
          <div class="ename">
            <span>{{ productInfo.enname }}</span>
          </div>
        </div>
        <div class="price">
          <span>￥{{ productInfo.price }}</span>
        </div>
      </div>
      <div class="option"></div>
        <div class="num">
          <div class="text">
            <span>选择数量</span>
          </div>
          <div class="steeper">
              <button class="btn" @click="subNum">-</button>
              <div class="value">{{ num }}</div>
              <button class="btn" @click="addNum">+</button>
          </div>
        </div>
        <div class="other">
            <div class="optionBtn" v-if="productInfo.tem != ''">
                <div class="text">{{ productInfo.tem_desc }}</div>
                <div class="btnBox">
                    <div :class="[tem === item ? 'blue' : 'default', 'btn']" v-for="(item, index) in productInfo.tem" :key="index" @click="changeOption(productInfo.tem_desc, item)">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="optionBtn" v-if="productInfo.sugar != ''">
                <div class="text">{{ productInfo.sugar_desc }}</div>
                <div class="btnBox">
                    <div :class="[sugar === item ? 'blue' : 'default', 'btn']" v-for="(item, index) in productInfo.sugar" :key="index" @click="changeOption(productInfo.sugar_desc, item)">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="optionBtn" v-if="productInfo.milk != ''">
                <div class="text">{{ productInfo.milk_desc }}</div>
                <div  class="btnBox">
                    <div :class="[milk === item ? 'blue' : 'default', 'btn']" v-for="(item, index) in productInfo.milk" :key="index" @click="changeOption(productInfo.milk_desc, item)">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
      <div class="description">
          <div class="d-title">
              商品描述
          </div>
          <div class="content">
              <p v-for="(item, index) in descArr" :key="index">
                  {{ index + 1 }}、{{ item }}
              </p>
          </div>
      </div>
    </div>
    <div class="floor">
      <van-goods-action>
        <van-goods-action-icon icon="bag" text="购物袋" :color="shopBagCount > 0 ? '#0c34ba' : ''" :badge="shopBagCount" id="icon" @click="toShopBag" />
        <van-goods-action-icon icon="like" :color="collect ? '#0c34ba' : ''" :text="collect ? '已收藏' : '未收藏'" @click="toCollect" />
        <van-goods-action-button
          color="#6a91ec"
          type="warning"
          text="加入购物袋"
          @click="addShopBag"
        />
        <van-goods-action-button
          color="#0c34ba"
          type="danger"
          text="立即购买"
          @click="immediatelyBuy"
        />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { getProductDetail,addShopBag, findLike, like, deleteCollect, shopCartCount } from "@/api/detail";
import {
    getUserShopBag,
} from "@/api/shopBag";
import {
    mapState
} from "vuex";

export default {
  data() {
    return {
        pid: this.$route.query.pid,
        productInfo: {},
        num: 1,
        descArr: [],
        sugar: '',
        tem: '',
        milk: '',
        collect: false,
        shopBagCount: 0
    };
  },
  methods: {
      immediatelyBuy() {
          if (this.tokenString) {
              let arr = []
              if (this.tem !== '') {
                  arr.push(this.tem)
              }
              if (this.sugar !== '') {
                  arr.push(this.sugar)
              }
              if (this.milk !== '') {
                  arr.push(this.milk)
              }
              let rule = arr.join("/")
              let str = "pid=" + this.productInfo.pid + "&count=" + this.num + "&rule=" + rule + "&appkey=" + this.$appkey + "&tokenString=" + this.tokenString
              addShopBag(str).then(res => {
                  if (res.data.code === 3000) {
                      getUserShopBag({
                          appkey: this.$appkey,
                          tokenString: this.tokenString
                      }).then(res2 => {
                          res2.data.result.forEach(item => {
                              if (item.sid === res.data.sid) {
                                  let arr = []
                                  arr.push(item)
                                  this.$router.push({ path: 'createOrder', query: { sids: arr } })
                              }
                          })
                      })
                  }
              })
          } else {
              this.$toast.fail("请先登录")
              this.$router.push({ path: 'login' })
          }
      },
      toCollect() {
          let str = "appkey=" + this.$appkey + "&pid=" + this.pid + "&tokenString=" + this.tokenString
          if (this.collect) {
              deleteCollect(str).then(res => {
                  if (res.data.code === 900) {
                      this.$toast.success("取消收藏成功")
                      this.findLike()
                  }
              })
          } else {
              like(str).then(res => {
                  if (res.data.code === 800) {
                      this.$toast.success("收藏成功")
                      this.findLike()
                  }
              })
          }
      },
      shopCartCount() {
          shopCartCount({
              appkey: this.$appkey,
              tokenString: this.tokenString
          }).then(res => {
              this.shopBagCount = res.data.result
          })
      },
      goBack() {
        this.$router.go(-1);
      },
      findLike() {
          if (this.tokenString) {
              findLike({
                  appkey: this.$appkey,
                  pid: this.pid,
                  tokenString: this.tokenString
              }).then(res => {
                  this.collect = res.data.result.length > 0 && res.data.result[0].pid === this.pid;
              })
          }
      },
      addShopBag() {
          if (this.tokenString) {
              let arr = []
              if (this.tem !== '') {
                  arr.push(this.tem)
              }
              if (this.sugar !== '') {
                  arr.push(this.sugar)
              }
              if (this.milk !== '') {
                  arr.push(this.milk)
              }
              let rule = arr.join("/")
              let str = "pid=" + this.productInfo.pid + "&count=" + this.num + "&rule=" + rule + "&appkey=" + this.$appkey + "&tokenString=" + this.tokenString
              addShopBag(str).then(res => {
                  this.$toast.success("加入购物袋成功!")
                  this.shopCartCount()
              })
          } else {
              this.$toast.fail("请先登录")
              this.$router.push({ path: 'login' })
          }
      },
      getDetail() {
        getProductDetail({ appkey: this.$appkey, pid: this.pid }).then((res) => {
          this.productInfo = res.data.result[0];
          this.descArr[0] = this.productInfo.desc.substring(0, this.productInfo.desc.indexOf("。") + 1);
          this.descArr[1] = this.productInfo.desc.substring(this.descArr[0].length + 1, this.productInfo.desc.indexOf("。", this.productInfo.desc.indexOf("。") + 1) + 1);
          this.descArr[2] = this.productInfo.desc.substring(this.descArr[1].length + this.descArr[0].length + 2, this.productInfo.desc.lastIndexOf("。") + 1);
          if (this.productInfo.tem_desc !== '') {
              this.productInfo.tem = this.productInfo.tem.split("/");
              this.tem = this.productInfo.tem[0]
          }
          if (this.productInfo.sugar_desc !== '') {
              this.productInfo.sugar = this.productInfo.sugar.split("/");
              this.sugar = this.productInfo.sugar[0]
          }
          if (this.productInfo.milk_desc !== '') {
              this.productInfo.milk = this.productInfo.milk.split("/");
              this.milk = this.productInfo.milk[0]
          }
        });
      },
      changeOption(text, str) {
        if (text === this.productInfo.tem_desc) {
            this.tem = str
        } else if (text === this.productInfo.sugar_desc) {
            this.sugar = str;
        } else if (text === this.productInfo.milk_desc) {
            this.milk = str;
        }
      },
      subNum() {
          if (this.num === 1) {
              return;
          }
          this.num--;
      },
      addNum() {
          this.num++;
      },
      toShopBag() {
          this.$router.push({ path: 'shopbag' })
      }
  },
  computed: {
      ...mapState([
          'tokenString'
      ])
  },
  created() {
    this.getDetail();
    this.findLike();
    this.shopCartCount()
  },
};
</script>
<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  .top {
    display: flex;
    height: 50px;
    align-items: center;
    width: 100%;
    position: fixed;
    background-color: #fff;
    .back {
      color: #0c34ba;
      width: 30%;
      height: 100%;
      line-height: 50px;
    }
    .title {
      width: 40%;
      text-align: center;
    }
  }
  .productImg {
    width: 100%;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }
    z-index: -999;
    position: fixed;
  }

  .info {
    position: absolute;
    top: 270px;
    background: #fff;
    width: 95%;
    margin-left: 10px;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
    padding-bottom: 100px;
    .product {
      display: flex;
      height: 60px;
      .name {
        width: 90%;
        height: 60px;
        align-self: center;
        .cname {
          height: 30px;
          color: #646575;
          line-height: 30px;
        }
        .ename {
          height: 30px;
          font-size: 12px;
          color: grey;
          line-height: 30px;
        }
      }
      .price {
        color: #0c34ba;
        align-self: center;
        font-weight: bold;
      }
    }

    .description {
      margin-top: 20px;
      .d-title {
        color: gray;
      }
      .content {
        p {
          margin-top: 10px;
          font-size: 12px;
          color: gray;
        }
      }
    }

    .num {
      height: 60px;
      border-bottom: 1px solid #f5f5f5;
      line-height: 60px;
      display: flex;
      color: gray;

      .text {
        width: 74%;
      }
      .steeper {
          display: flex;
          align-items: center;

          .value {
              margin: 0 15px;
          }
          .btn {
              border-radius: 50%;
              height: 20px;
              width: 20px;
              line-height: 10px;
              border: 1px solid #0c34ba;
              background-color:transparent;
              color: #0c34ba;
          }
          .btn:last-child {
              color: white;
              background-color: #0c34b5;
          }
      }
    }

    .other {
      .optionBtn {
        margin-top: 15px;
        color: gray;
        display: flex;
        .text {
          width: 50px;
        }
        .btnBox {
          display: flex;
          .blue {
            background-color: #0c34b5;
            color: white;
          }
          .default {
            background-color: #e8e8e8;
          }
          .btn {
            margin-left: 15px;
            width: 55px;
            height: 30px;
            border-radius: 20px;
            text-align: center;
            font-size: 13px;
            line-height: 30px;
          }
        }
      }
    }
  }
  /deep/ .van-info {
    background-color: #0c34b5;
  }
}
</style>
