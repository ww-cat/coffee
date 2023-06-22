<template>
    <div class="container">
        <div class="top">
            <div class="back" @click="goBack">
                <span><van-icon name="arrow-left" /> 返回</span>
            </div>
            <div class="title">
                {{ aid !== '' ? '编辑地址' : '新增地址' }}
            </div>
        </div>
        <div class="filed">
            <van-address-edit
                :area-list="areaList"
                show-postal
                show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                save-button-text="保存地址"
                :show-delete="aid!==''"
                @delete="onDelete"
            />
        </div>
    </div>
</template>

<script>
import areaList from '../assets/js/area'
import {
    addUserAddress,
    editAddress,
    deleteAddress
} from "@/api/user";
export default {
    name: "AddAddress",
    data() {
        return {
            tokenString: this.$route.query.tokenString,
            areaList,
            aid: ''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onSave(content) {
            let a = content.isDefault === true ? "1" : "0";
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&name=" + content.name + "&tel="
                + content.tel + "&province=" + content.province + "&city=" + content.city + "&county=" + content.county +
                "&addressDetail=" + content.addressDetail + "&areaCode=" + content.areaCode + "&postalCode=" +
                content.postalCode + "&isDefault=" + a
            if (this.aid !== '') {
                str += '&aid=' + this.aid
                editAddress(str).then(res => {
                    this.$toast.success("编辑地址成功")
                    this.$router.go(-1)
                })
            } else {
                addUserAddress(str).then(res => {
                    this.$toast.success("新增地址成功")
                    this.$router.go(-1)
                })
            }
        },
        onDelete() {
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&aid=" + this.aid
            deleteAddress(str).then(res => {
                this.$toast.success("删除地址成功")
                this.$router.go(-1)
            })
        }
    },
    computed: {

    },
    created() {
        if (this.$route.query.item) {
            this.aid = this.$route.query.item.aid
        }
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
    /deep/ .van-button--danger {
        background-color: #0C34BA;
        border: 1px solid #0C34BA;
    }
}
</style>
