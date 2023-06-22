<template>
  <div class="container">
      <div class="top">
          <van-nav-bar>
              <template #left>
                  <div class="back" @click="goBack">
                      <van-icon name="arrow-left" color="#0c34ba" />
                      返回
                  </div>
              </template>
              <template #right>
                  <div class="cancel" @click="goBack">
                      取消
                  </div>
              </template>
              <template #title>
                  <div class="input">
                      <div class="icon" @click="searchProduct" >
                          <van-icon  name="search" color="#0C34BA" />
                      </div>
                      <input type="text" @change="searchProduct" v-model="searchText">
                  </div>
              </template>
          </van-nav-bar>
      </div>
      <div class="bg"></div>
      <div class="productList" v-if="productList.length > 0">
          <div class="product" v-for="(item, index) in productList" :key="index" @click="gotoDetail(item.pid)">
              <div class="img">
                  <img :src="item.smallImg" alt="">
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="enname">{{ item.enname }}</div>
              <div class="price">￥{{ item.price }}</div>
          </div>
      </div>
      <div class="empty" v-else>
          <van-empty image="search" description="未搜索到类似商品" />
      </div>
  </div>
</template>

<script>
import {
    searchByKey
} from "@/api/search";

export default {
    name: "Search",
    data() {
        return {
            searchText: '',
            productList: []
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        gotoDetail(pid) {
            this.$router.push({ path: '/detail', query: { pid: pid } })
        },
        searchProduct() {
            searchByKey({
                appkey: this.$appkey,
                name: this.searchText
            }).then(res => {
                this.productList = [...res.data.result]
                console.log(this.productList)
            })
        }
    }
}
</script>

<style lang="less" scoped>
  .container {
    .top {
      .back {
        color: #0C34BA;
      }
        .input {
            display: flex;
            .icon {
                position: relative;
                left: 40px;
            }
            input {
                background-color: #f5f5f5;
                border-radius: 30px;
                padding-left: 20px;
                margin-left: 20px;
            }
        }
    }
      .bg {
          width: 100%;
          height: 100px;
          background-color: #0c34ba;
      }
      .productList {
          width: 90%;
          padding: 10px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 20px 20px 0 0;
          margin-top: -20px;
          display: flex;
          flex-wrap: wrap;
          .product {
              width: 33%;
              height: 200px;
              .img {
                  text-align: center;
                  img {
                      width: 100px;
                  }
              }
              .name {
                  font-size: 14px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 100px;
              }
              .enname {
                  color: gray;
                  font-size: 13px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 100px;
                  margin-top: 5px;
              }
              .price {
                  color: #0C34BA;
                  font-weight: bold;
                  margin-top: 15px;
              }
          }
      }
  }
</style>
