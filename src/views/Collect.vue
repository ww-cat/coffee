<template>
    <div class="container">
        <div class="top">
            <div class="back" @click="goBack">
                <span><van-icon name="arrow-left" /> 返回</span>
            </div>
            <div class="title">
                我的收藏
            </div>
        </div>
        <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="bgc" >
        </div>
        <div class="collectList" v-if="productList.length > 0">
            <div class="product" v-for="(item, index) in productList" :key="index" @click="gotoDetail(item.pid)">
                <div class="img">
                    <img :src="item.smallImg" alt="">
                </div>
                <div class="name">{{ item.name }}</div>
                <div class="enname">{{ item.enname }}</div>
                <div class="price">
                    ￥{{ item.price }}
                    <div class="icon" @click.stop="cancelCollect(item.pid)">
                        <van-icon name="delete-o" />
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <van-empty description="还未收藏商品" />
        </div>
    </div>
</template>

<script>
import {
    getUserCollect
} from '@/api/user'
import {
    deleteCollect
} from "@/api/detail";
import {
    mapState
} from "vuex";

export default {
    name: "Collect",
    data() {
        return {
            productList: []
        }
    },
    methods: {
        cancelCollect(pid) {
            let str = "appkey=" + this.$appkey + "&pid=" + pid + "&tokenString=" + this.tokenString
            deleteCollect(str).then(res => {
                if (res.data.code === 900) {
                    this.$toast.success("取消收藏成功")
                    this.getUserCollect()
                }
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        getUserCollect() {
            getUserCollect({
                appkey: this.$appkey,
                tokenString: this.tokenString
            }).then(res => {
                this.productList = [...res.data.result]
            })
        },
        gotoDetail(pid) {
            this.$router.push({ path: '/detail', query: { pid: pid } })
        }
    },
    computed: {
      ...mapState([
          'tokenString',
          'userBg'
      ])
    },
    created() {
        this.getUserCollect()
    }
}
</script>

<style lang="less" scoped>
.container {
  .top {
    display: flex;
    height: 50px;
    align-items: center;
    width: 100%;
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
  .bgc {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }
    .collectList {
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
                display: flex;
                justify-content: space-between;
                .icon {
                    color: gray;
                    margin-top: 3px;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
