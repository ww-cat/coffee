<template>
  <div class="container">
      <div class="top">
          <van-nav-bar>
             <template #title>
                 <span>我的订单</span>
             </template>
              <template #left>
                  <div @click="goBack">
                      <van-icon name="arrow-left" color="#0c34ba" />
                      <span class="back">返回</span>
                  </div>
              </template>
          </van-nav-bar>
      </div>
      <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="bgc" ></div>
     <div class="order">
         <div class="tab">
             <div class="all" @click="changeOrderList(0)">
                 全部
                 <div :class="active === 0 ? 'line' : ''"></div>
             </div>
             <div class="progress" @click="changeOrderList(1)">
                 进行中
                 <div :class="active === 1 ? 'line' : ''"></div>
             </div>
             <div class="finish" @click="changeOrderList(2)">
                 已完成
                 <div :class="active === 2 ? 'line' : ''"></div>
             </div>
         </div>
         <div class="orderList">
            <div class="order" v-for="(item, index) in currentList" :key="index">
                <div class="orderInfo">
                    <div class="top">
                        <div class="oid">
                            {{ item[0].oid }}
                        </div>
                        <div class="statusText" @click="receive(item[0])">
                            {{ item[0].status === 1 ? '确认收货' : '已完成' }}
                            <div class="icon" @click="deleteOrder(item[0].oid)">
                                <van-icon name="delete-o" v-if="item[0].status === 2" />
                            </div>
                        </div>
                    </div>
                    <div class="productList">
                        <div class="productItem" v-for="(item2, index2) in item" :key="index2">
                            <div class="img">
                                <img :src="item2.smallImg" alt="">
                            </div>
                            <div class="text">
                                <div class="name">
                                    {{ item2.name }}
                                    <div class="rule">
                                        {{ item2.rule }}
                                    </div>
                                </div>
                                <div class="ename">
                                    {{ item2.enname }}
                                </div>
                                <div class="price">
                                    ￥{{ item2.price }}
                                </div>
                            </div>
                            <div class="num">
                                x{{ item2.count }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="time">
                        {{ item[0].createdAt }}
                    </div>
                    <div class="priceAndNum">
                        <div class="num">
                            共计{{ totalNum[index] }}件
                        </div>
                        <div class="price">
                            合计 ￥{{ totalPrice[index] }}
                        </div>
                    </div>
                </div>
            </div>
         </div>
     </div>
  </div>
</template>

<script>
import {
    findOrder,
    removeOrder,
    receive
} from "@/api/order";
import {
    mapState
} from "vuex";

export default {
    name: "MyOrder",
    data() {
        return {
            active:0,
            currentList: [],
            totalNum: [],
            totalPrice: []
        }
    },
    methods: {
        receive(item) {
            if (item.status !== 1) {
                return
            }
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&oid=" + item.oid
            receive(str).then(res => {
                if (res.data.code === 80000) {
                    this.$toast.success("确认收货成功")
                    this.findOrder()
                }
                console.log(res.data)
            }).catch(res => {
                this.$toast.fail("确认收货失败")
            })
        },
        deleteOrder(oid) {
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&oid=" + oid
            removeOrder(str).then(res => {
                if (res.data.msg === '删除订单成功') {
                    this.$toast.success("删除订单成功!")
                    this.findOrder()
                }
            }).catch(res => {
                this.$toast.fail("删除订单失败!")
            })
        },
        goBack() {
            this.$router.push({ path: 'user' })
        },
        changeOrderList(index) {
            this.active = index
            this.findOrder()
        },
        findOrder() {
            findOrder({
                appkey: this.$appkey,
                tokenString: this.tokenString,
                status: this.active
            }).then(res => {
                this.currentList = []
                if (res.data.result.length > 0) {
                    let oid = res.data.result[0].oid
                    let num = 1;
                    res.data.result.forEach(item => {
                        if (item.oid !== oid) {
                            num++;
                            oid = item.oid
                        }
                        item.createdAt = new Date(item.createdAt).toLocaleString().replaceAll("/", "-")
                    })
                    if (num > 1) {
                        this.currentList[0] = res.data.result.filter(item => item.oid !== oid)
                        for (let i = 1; i < num; i++) {
                            this.currentList[i] = res.data.result.filter(item => item.oid !== this.currentList[i - 1][0].oid)
                        }
                    } else {
                        this.currentList[0] = [...res.data.result]
                    }
                    this.currentList.forEach(item => {
                        let num = 0
                        let price = 0;
                        item.forEach(item2 => {
                            num += item2.count
                            price += Number(item2.price) * item2.count
                        })
                        this.totalNum.push(num)
                        this.totalPrice.push(price)
                    })
                } else {
                    this.currentList = []
                }
            }).catch(res => {
                console.log(res)
            })
        },
    },
    created() {
        this.findOrder()
    },
    computed: {
        ...mapState([
            'tokenString',
            'userBg'
        ])
    }
}
</script>

<style lang="less" scoped>
  .container {
      padding-bottom: 50px;
      .top {
        .back {
          color: #0C34BA;
        }
      }
    .bgc {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center;
    }
    .order {
      .tab {
        display: flex;
        text-align: center;
        width: 90%;
        padding: 10px;
        margin: 0 auto;
        background-color: #fff;
        margin-top: -20px;
        border-radius: 10px 10px 0 0;
        height: 30px;
        line-height: 30px ;
        .all {
          width: 33%;
          height: 100%;
        }
        .line {
          width: 40%;
          margin: 0 auto;
          background-color: #0C34BA;
          height: 3px;
          margin-top: 8px;
          border-radius: 30px;
        }
        .progress {
          width: 33%;
          height: 100%;
        }
        .finish {
          width: 33%;
          height: 100%;
        }
      }
    }
    .orderList {
      .order {
        margin-top: 20px;
        .orderInfo {
          width: 90%;
          padding: 10px;
          background-color: #fff;
          border-radius: 10px;
          border-bottom: 1px dashed gray;
          margin: 0 auto;
          .top {
            display: flex;
            justify-content: space-between;
            color: gray;
            font-size: 13px;
            .statusText {
              display: flex;
              align-items: center;
              .icon {
                font-size: 17px;
                margin-top: 5px;
                margin-left: 5px;
              }
            }
          }
          .productList {
            margin-top: 20px;
            .productItem {
              margin-top: 10px;
              display: flex;
              .img {
                width: 120px;
                img {
                  width: 100px;
                }
              }
              .text {
                width: 200px;
                .name {
                  display: flex;
                  .rule {
                    margin-left: 20px;
                    color: gray;
                  }
                }
                .ename {
                  font-size: 13px;
                  color: gray;
                  margin-top: 10px;
                }
                .price {
                  margin-top: 30px;
                  font-weight: bold;
                  color: #0C34BA;
                }
              }
              .num {
                align-self: flex-end;
              }
            }
          }
        }
        .total {
          width: 90%;
          margin: 0 auto;
          background-color: #fff;
          padding: 10px;
          border-radius: 10px 10px 0 0;
          color: gray;
          font-size: 15px;
          .time {
            margin-top: 10px;
          }
          .priceAndNum{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .price {
              font-weight: bold;
              color: #0C34BA;
            }
          }
        }
      }
    }
  }
</style>
