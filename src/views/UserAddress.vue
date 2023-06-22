<template>
    <div class="container">
        <div class="top">
            <div class="back" @click="goBack">
                <span><van-icon name="arrow-left" /> 返回</span>
            </div>
            <div class="title">
                地址列表
            </div>
        </div>
        <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="bgc" ></div>
        <div class="addressList">
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
            />
        </div>
    </div>
</template>

<script>

import {
    mapState
} from "vuex";
import {
    getUserAddress
} from '@/api/user'
export default {
    name: "UserAddress",
    data() {
        return {
            chosenAddressId: 0,
            list: []
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        findAddress() {
            getUserAddress({
                appkey: this.$appkey,
                tokenString: this.tokenString
            }).then(res => {
                this.list = res.data.result
                this.list.forEach(item => {
                    item.isDefault = Boolean(item.isDefault)
                    item.address = item.province + " " + item.city + " " + item.county + " " + item.addressDetail
                    if (item.isDefault) {
                        this.chosenAddressId = item.id
                    }
                })
            })
        },
        onAdd() {
            this.$router.push({ path: 'addAddress', query: { tokenString: this.tokenString } })
        },
        onEdit(item) {
            this.$router.push({ path: 'addAddress', query: { tokenString: this.tokenString, item: item } })
        }
    },
    computed: {
        ...mapState([
            'tokenString',
            'userBg'
        ])
    },
    created() {
        this.findAddress();
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
    /deep/ .van-button--danger {
        background-color: #0C34BA;
        border: 1px solid #0C34BA;
    }
    /deep/ .van-address-item .van-radio__icon--checked .van-icon {
        background-color: #0c34ba;
        border: #0C34BA;
    }
    /deep/ .van-tag--danger {
        background-color: #0C34BA;
    }
}
</style>
