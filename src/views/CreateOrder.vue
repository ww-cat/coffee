<template>
    <div class="container">
        <div class="top">
            <div class="back" @click="goBack">
                <span><van-icon name="arrow-left" /> 返回</span>
            </div>
            <div class="title">
                订单结算
            </div>
        </div>
        <div class="address">
            <div class="text" @click="show = true">
                选择地址
                <van-icon name="arrow" />
            </div>
            <div class="addressItem" v-if="defaultAddress !== null">
                <div class="info">
                    <div class="name">{{ defaultAddress.name }}</div>
                    <div class="tel">{{ defaultAddress.tel }}</div>
                    <div class="tag" v-if="defaultAddress.isDefault">
                        默认
                    </div>
                </div>
                <div class="detailAddress">
                    {{ defaultAddress.province + defaultAddress.city + defaultAddress.county + defaultAddress.addressDetail
                        + defaultAddress.postalCode }}
                </div>
            </div>
        </div>
        <div class="orderInfo">
            <div class="text">订单信息</div>
            <div class="shopBagList">
                <div class="shopBag" v-for="(item, index) in sids" :key="index">
                    <div class="img">
                        <img style="width: 100px;" :src="item.small_img" alt="">
                    </div>
                    <div class="info">
                        <div class="name">
                            {{ item.name }}
                            <div class="rule">
                                {{ item.rule }}
                            </div>
                        </div>
                        <div class="ename">
                            {{ item.enname }}
                        </div>
                        <div class="price">
                            ￥{{ item.price }}
                        </div>
                    </div>
                    <div class="num">
                        x{{ item.count }}
                    </div>
                </div>
            </div>
        </div>
        <div class="total">
            <div class="now">
                {{ now }}
            </div>
            <div class="numAndPrice">
                <div class="num">
                    共计{{ totalNum }}件
                </div>
                <div class="price">
                    合计￥{{ totalPrice }}
                </div>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
            <div class="allAddress">
                <div class="top">
                    <div class="text">
                        选择地址
                    </div>
                    <div class="cancel" @click="show = false">
                        <van-icon name="cross" />
                    </div>
                </div>
                <div class="listItem" v-for="(item, index) in userAddressList" :key="index">
                    <div class="checkBox">
                        <van-checkbox v-model="item.check" @click="changeAddress(item)"
                            checked-color="#0c34ba"></van-checkbox>
                    </div>
                    <div class="info">
                        <div class="user">
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <div class="tel">
                                {{ item.tel }}
                            </div>
                            <div class="tag" v-if="item.isDefault">
                                默认
                            </div>
                        </div>
                        <div class="detailAddress">
                            {{ item.province + item.city + item.county + item.addressDetail + item.postalCode }}
                        </div>
                    </div>
                </div>
                <van-button class="bottomBtn" round color="#0c34ba" size="large" @click="toAddress">新增地址</van-button>
            </div>
        </van-popup>
        <div class="bottom">
            <van-button color="#0c34ba" class="commit" @click="payOrder">立即结算</van-button>
        </div>
    </div>
</template>

<script>
import {
    getUserAddress
} from "@/api/user";
import {
    payShopBag
} from '@/api/order'
import {
    mapState
} from "vuex";

export default {
    name: "CreateOrder",
    data() {
        return {
            sids: this.$route.query.sids,
            userAddressList: [],
            defaultAddress: null,
            show: false,
            totalPrice: 0,
            totalNum: 0,
            now: ''
        }
    },
    methods: {
        changeAddress(item) {
            this.userAddressList.forEach(item2 => {
                if (item !== item2) {
                    item2.check = false
                }
            })
            this.defaultAddress = item
        },
        toAddress() {
            this.$router.push({ path: 'addAddress', query: { tokenString: this.tokenString } })
        },
        goBack() {
            this.$router.go(-1)
        },
        getUserAddress() {
            getUserAddress({
                appkey: this.$appkey,
                tokenString: this.tokenString
            }).then(res => {
                if (res.data.result.length > 0) {
                    this.userAddressList = res.data.result
                    this.userAddressList.forEach(item => {
                        item.check = false
                        item.isDefault = Boolean(item.isDefault)
                        item.check = item.isDefault
                        if (item.isDefault) {
                            this.defaultAddress = item
                        }
                    })
                    if (this.defaultAddress == null) {
                        this.defaultAddress = this.userAddressList[0]
                    }
                } else {
                    this.defaultAddress = null;
                }
            }).catch(res => {
                this.$toast.fail(res.data.msg)
            })
        },
        payOrder() {
            let arr = []
            this.sids.forEach(item => {
                arr.push(item.sid)
            })
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&sids=" + JSON.stringify(arr) +
                "&phone=" + this.defaultAddress.tel + "&address=" + this.defaultAddress.province + this.defaultAddress.city +
                this.defaultAddress.county + this.defaultAddress.addressDetail + "&receiver=" + this.defaultAddress.name
            payShopBag(str).then(res => {
                this.$toast.success("结算成功!")
                this.$router.push({ path: 'myOrder' })
            }).catch(res => {
                this.$toast.fail("结算失败")
            })
        }
    },
    created() {
        this.getUserAddress()
        if (this.sids.length > 0) {
            this.sids.forEach(item => {
                this.totalPrice += Number(item.price) * Number(item.count)
                this.totalNum += item.count
            })
        }
        this.now = new Date().toLocaleString()
        console.log(this.$route.query.sids)
    },
    computed: {
        ...mapState([
            'tokenString'
        ])
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: #f5f5f5;
    padding-bottom: 70px;

    .top {
        display: flex;
        height: 50px;
        align-items: center;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;

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

    .address {
        padding: 10px;
        background-color: #fff;
        width: 90%;
        height: 100px;
        margin: 10px auto;
        border-radius: 10px;

        .text {
            color: gray;
        }

        .addressItem {
            margin-top: 20px;

            .info {
                display: flex;

                .name {
                    margin-right: 10px;
                    color: #0c34ba;
                    font-weight: bold;
                }

                .tel {
                    margin-right: 10px;
                    color: gray;
                }

                .tag {
                    background-color: #0c34b5;
                    font-size: 12px;
                    width: 40px;
                    text-align: center;
                    color: white;
                    border-radius: 30px;
                }
            }
        }

        .detailAddress {
            margin-top: 20px;
            color: gray;
            font-size: 15px;
        }
    }

    .allAddress {
        .top {
            justify-content: space-between;

            .text {
                color: gray;
            }

            .cancel {
                color: gray;
                font-size: 20px;
            }
        }

        padding: 10px;

        .listItem {
            display: flex;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
            padding: 10px;

            .checkBox {
                align-self: center;
                margin-right: 20px;
            }

            .info {
                display: flex;
                flex-direction: column;

                .user {
                    display: flex;

                    .name {
                        margin-right: 20px;
                    }

                    .tel {
                        margin-right: 20px;
                    }

                    .tag {
                        border-radius: 30px;
                        font-size: 12px;
                        width: 40px;
                        text-align: center;
                        margin-bottom: 15px;
                        background-color: #0C34BA;
                        color: white;
                    }
                }

                .detailAddress {
                    font-size: 14px;
                }
            }
        }

        .bottomBtn {
            position: fixed;
            bottom: 10px;
            width: 95%;
            height: 40px;
            left: 10px;
        }
    }

    .orderInfo {
        padding: 10px;
        width: 90%;
        background-color: #fff;
        margin: 10px auto;
        border-bottom: 1px gray dashed;
        border-radius: 10px;
        margin-bottom: 0;

        .text {
            color: gray;
            margin-bottom: 20px;
        }

        .shopBagList {
            .shopBag {
                display: flex;
                margin-bottom: 15px;

                .info {
                    margin-left: 15px;
                    width: 200px;

                    .name {
                        display: flex;

                        .rule {
                            margin-left: 15px;
                            color: gray;

                        }
                    }

                    .ename {
                        font-size: 12px;
                        width: 150px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-top: 10px;
                        margin-bottom: 30px;
                        color: gray;
                    }

                    .price {
                        color: #0C34BA;
                        font-weight: bold;
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
        height: 70px;
        background-color: #fff;
        padding: 10px;
        border-radius: 10px 10px 0 0;

        .now {
            margin-top: 15px;
            font-size: 13px;
            color: gray;
        }

        .numAndPrice {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;

            .num {
                color: gray;
            }

            .price {
                color: #0C34BA;
                font-weight: bold;
            }
        }
    }

    .bottom {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 50px;

        .commit {
            width: 90%;
            border-radius: 30px;
            margin-left: 20px;
        }
    }
}</style>
