<template>
    <div class="container">
        <div class="top">
            <van-nav-bar title="安全中心">
                <template #left>
                    <div class="back" @click="goBack">
                        <van-icon name="arrow-left" color="#0c34ba" />
                        返回
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="bgc" ></div>
        <div class="operation">
            <div class="changePwd item" @click="showChangePwd">
                修改密码
                <div class="icon">
                    <van-icon name="arrow" />
                </div>

            </div>
            <div class="cancelUser item" @click="showDialog = true">
                注销账号
                <div class="icon">
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <van-popup v-model="changePassword" position="bottom" :style="{ height: '35%' }" closeable >
            <div class="popupContent">
                <div class="top">
                    修改密码
                </div>
                <div class="field">
                    <van-field v-model="oldPwd" type="password" label="旧密码" placeholder="旧密码(首字符必须为字母)" />
                    <van-field v-model="newPwd" type="password" label="新密码" placeholder="新密码(首字符必须为字母)" />
                </div>
                <div class="commit" @click="toChangePwd">
                    <button class="btn">
                        提交
                    </button>
                </div>
            </div>
        </van-popup>
        <div class="dialog">
            <van-dialog v-model="showDialog" title="注销账号" show-cancel-button confirmButtonColor="#0c34ba" @confirm="cancelAccount">
                <div>是否确定注销账号, 一旦注销无法恢复</div>
            </van-dialog>
        </div>
    </div>
</template>

<script>

import {
    mapState
} from "vuex";
import {
    updatePassword,
    destroyAccount
} from "@/api/safety";

export default {
    name: "UserSafetyCenter",
    data() {
        return {
            changePassword: false,
            oldPwd: '',
            newPwd: '',
            showDialog: false
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        showChangePwd() {
            this.changePassword = true
        },
        cancelAccount() {
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString
            destroyAccount(str).then(res => {
                if (res.data.code === 'G001') {
                    this.$toast.success("注销账号成功")
                    this.$router.push({ path: 'login' })
                }
            }).catch(res => {
                this.$toast.fail(res.data.msg)
            })
        },
        toChangePwd() {
            if (this.oldPwd === '') {
                this.$toast.fail("旧密码不能为空")
                return
            } else if (this.newPwd === '') {
                this.$toast.fail("新密码不能为空")
                return
            } else if (!(/^[A-Za-z]$/.test(this.newPwd.charAt(0)))) {
                this.$toast.fail("新密码格式不正确 (首字符必须是字母)")
                return
            }
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&password=" + this.newPwd + "&oldPassword=" + this.oldPwd
            updatePassword(str).then(res => {
                if (res.data.code === "E003") {
                    this.$toast.fail("旧密码不正确")
                } else {
                    this.$toast.success("修改成功, 请重新登录")
                    this.$router.push({ path: 'login' })
                }
            })
        },
    },
    computed: {
        ...mapState([
            'tokenString',
            'userBg'
        ])
    },
    created() {
    }
}
</script>

<style lang="less" scoped>
.container {
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
    .operation {
        width: 90%;
        padding: 10px;
        margin: 0 auto;
        background-color: #fff;
        margin-top: -30px;
        border-radius: 20px 20px 0 0;
        color: gray;

        .changePwd {
            border-bottom: 1px solid #e5e5e5;
        }
        .item {
            display: flex;
            justify-content: space-between;
            height: 50px;
            line-height: 50px;
        }
    }
    .popupContent {
        padding: 10px;
        .top {
            color: gray;
        }
        .field {
            margin-top: 40px;
        }
        .commit {
            .btn {
                position: fixed;
                width: 90%;
                bottom: 5px;
                left: 20px;
                height: 40px;
                border: none;
                border-radius: 30px;
                background-color: #0C34BA;
                color: white;
            }
        }
    }
    .dialog {
        div {
            width: 100%;
            text-align: center;
            margin: 20px 0 ;
        }
    }
}
</style>
