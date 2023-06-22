<template>
    <div class="container">
        <div class="top">
            <div class="back" @click="goBack">
                <span><van-icon name="arrow-left" /> 返回</span>
            </div>
            <div class="title">
                购物袋
            </div>
            <div class="edit" @click="isEdit = !isEdit">
                {{ topText }}
            </div>
        </div>
        <div class="topImg">
            <img src="../assets/images/shopbag_bg.png" alt="">
        </div>
        <div class="productList">
            <van-checkbox-group v-model="checkBox" ref="checkBoxGroup" @change="totalPriceChange">
                <div class="listItem" v-for="(item, index) in shopBagList" :key="index">
                    <div class="checkbox">
                        <van-checkbox checked-color="#0c34ba" :name="item" @click="check"></van-checkbox>
                    </div>
                    <div class="img">
                        <img :src="item.small_img" alt="">
                    </div>
                    <div class="info">
                        <div class="cname">
                            {{ item.name }}
                            <span class="rule">{{ item.rule }}</span>
                        </div>
                        <div class="ename">
                            {{ item.enname }}
                        </div>
                        <div class="price">
                            ￥{{ item.price }}
                        </div>
                    </div>
                    <div class="num">
                        <button class="btn" @click="changeShopBagNum(item, false)">-</button>
                        <div>
                            {{ item.count }}
                        </div>
                        <button class="btn" @click="changeShopBagNum(item, true)">+</button>
                    </div>
                </div>
            </van-checkbox-group>
        </div>
        <div class="bottomBtn">
            <van-submit-bar :price="totalPrice" v-if="!isEdit" button-color="#0c34ba" button-text="提交订单" @submit="createOrder">
                <van-checkbox @click="checkAll" checked-color="#0c34ba" v-model="allCheck">全选</van-checkbox>
            </van-submit-bar>
            <van-submit-bar v-else button-color="red" button-text="删除选择" @submit="removeShopCart">
                <van-checkbox @click="checkAll" checked-color="#0c34ba" v-model="allCheck" style="width: 250px;">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <van-dialog v-model="show" title="标题" show-cancel-button @confirm="toRemoveShopBag">
           <div class="dialog">
               是否删除该购物袋?
           </div>
        </van-dialog>
        <div class="text">
            哎呀, 没有数据可加载了!
        </div>
    </div>
</template>
<script>
import {
    getUserShopBag,
    removeShopCart,
    modifyShopCartCount
} from "@/api/shopBag";
import {
    mapState
} from "vuex";

export default {
    data() {
        return {
            shopBagList: [],
            checkBox: [],
            totalPrice: 0,
            allCheck: false,
            isEdit: false,
            show: false,
            sid: ''
        }
    },
    methods: {
        totalPriceChange() {
            this.totalPrice = 0
            this.checkBox.forEach(item => {
                this.totalPrice += Number(item.price * 100) * item.count
            })
        },
        goBack(){
            this.$router.go(-1);
        },
        createOrder() {
          this.$router.push({ path: "createOrder", query: { sids: this.checkBox } })
        },
        getUserShopBag() {
            getUserShopBag({
                appkey: this.$appkey,
                tokenString: this.tokenString
            }).then(res => {
                this.shopBagList = res.data.result
                console.log(res.data)
            })
        },
        checkAll() {
            this.$refs.checkBoxGroup.toggleAll(this.allCheck)
        },
        check() {
            if (this.checkBox.length === this.shopBagList.length) {
                this.allCheck = true
            } else {
                this.allCheck = false
            }
        },
        toRemoveShopBag() {
            this.checkBox.push(this.sid)
            this.removeShopCart()
        },
        removeShopCart() {
            let arr = []
            console.log(this.checkBox)
            this.checkBox.forEach(item => {
                arr.push(item.sid)
            })
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&sids=" + JSON.stringify(arr)
            removeShopCart(str).then(res => {
                this.$toast.success("删除购物袋成功")
                this.isEdit = false
                this.getUserShopBag()
            })
        },
        changeShopBagNum(item, flag) {
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&sid=" + item.sid;
            if (!flag) {
                if (item.count === 1) {
                    this.sid = item
                    this.show = true
                    return
                } else {
                    str += "&count=" + --item.count
                }
            } else {
                str += "&count=" + ++item.count
            }
            modifyShopCartCount(str).then(res => {
                this.$toast.success("修改购物袋数量成功")
                this.getUserShopBag()
            })
        }
    },
    computed: {
        ...mapState([
            'tokenString'
        ]),
        topText: function() {
            return this.isEdit ? "完成" : "编辑"
        }
    },
    created() {
        this.getUserShopBag();
    }
}
</script>

<style lang="less" scoped>
.container {
    padding-bottom: 70px;
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
    .edit {
      width: 25%;
      text-align: right;
      color: gray;
    }
  }
  .topImg {
    width: 100%;
    img {
      width: 100%;
    }
  }
    .productList {
        margin-top: 20px;
        .listItem {
            display: flex;
            background-color: #fff;
            width: 90%;
            margin: 0 auto;
            padding: 10px;
            border-radius: 20px;
            margin-top: 20px;
            .img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
                img {
                    width: 100%;
                }
            }
            .info {
                font-size: 13px;
                width: 150px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .cname {
                    .rule {
                        color: gray;
                    }
                }
                .ename {
                    width: 150px;
                    color: gray;
                    margin-top: -30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .price {
                    color: #0c34b5;
                    font-weight: bold;
                }
            }
            .checkbox {
                align-self: center;
                width: 30px;
            }
            .num {
                display: flex;
                align-self: flex-end;
                width: 100px;
                justify-content: space-around;
                .btn {
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    text-align: center;
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
    }
    .dialog {
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
    .text {
        text-align: center;
        color: gray;
        margin-top: 10px;
    }
    /deep/ .van-submit-bar__price {
        color: #0C34BA;
    }
    }
</style>
