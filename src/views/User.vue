<template>
    <div class="container">
        <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="topBgc" >
        </div>
        <div class="userInfo">
            <div class="avatar">
                <img :src="userInfo.userImg" alt="" v-if="tokenString !== ''" @click="toUploadFile">
                <img src="../assets/images/default_avatar.jpg" alt="" v-else  @click="toUploadFile">
                <div class="userDesc" v-if="tokenString !== ''">
                    <div class="username">
                        <span>{{ userInfo.nickName }}</span>
                    </div>
                    <div class="introduction">
                        <span>{{ desc }}</span>
                    </div>
                </div>
                <div class="loginText" v-else @click="toLogin">
                    <span>登录</span>
                </div>
            </div>
            <div class="list">
                <div class="info" @click="gotoUserDetail">
                    <span style="color: black">个人资料</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
                <div class="info" @click="gotoMyOrder">
                    <span style="color: black">我的订单</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
                <div class="info" @click="gotoCollect">
                    <span style="color: black">我的收藏</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
                <div class="info" @click="toUserAddressList">
                    <span style="color: black">地址管理</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
                <div class="info" @click="toSafetyCenter">
                    <span style="color: black">安全中心</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
                <div class="info" @click="logOut">
                    <span style="color: black">退出登录</span>
                    <span style="float: right"><van-icon name="arrow" /></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations
} from "vuex";
import {
    findMy,
    getUserInfo, logout,
} from "@/api/user";


export default {
    data() {
        return {
            userInfo: {},
            userBgI: '',
        }
    },
    methods: {
        ...mapMutations({
           setUserBg: "SET_USER_BACKGROUND_IMG",
            setUserToken: 'SET_TOKEN_STRING'
        }),
        toUploadFile() {
          this.$router.push({ path: 'uploadFile' })
        },
        gotoUserDetail() {
            this.$router.push({ path: '/userDetail', query: { userInfo: JSON.stringify(this.userInfo) } })
        },
        gotoMyOrder() {
            this.$router.push({ path: '/myOrder' })
        },
        toLogin() {
            this.$router.push({ path: 'login' })
        },
        findMy() {
            if (this.userBg === '') {
                findMy({
                    appkey: this.$appkey,
                    tokenString: this.tokenString
                }).then(res => {
                    if (res.data.code === 'A001') {
                        this.userBgI = res.data.result[0].userBg
                        this.setUserBg(this.userBgI)
                    }
                }).catch(res => {
                    this.$toast.fail(res.data.msg)
                })
            }
        },
        getUserInfo(){
            getUserInfo({
                appkey: this.$appkey,
                tokenString: this.tokenString
            }).then(res => {
                this.userInfo = res.data.result[0]
            }).catch(res => {
                    this.$toast.fail(res.data.msg)
                })
        },
        gotoCollect() {
            this.$router.push({ path: "collect" })
        },
        toUserAddressList() {
            this.$router.push({ path: 'userAddress' })
        },
        toSafetyCenter() {
            this.$router.push({ path: 'userSafety' })
        },
        logOut() {
            let str = "appkey=" + this.$appkey + "&tokenString=" + this.tokenString
            logout(str).then(res => {
                if (res.data.code === "F001") {
                    this.$toast.success(res.data.msg)
                    this.setUserToken('')
                    localStorage.clear()
                }
            }).catch(res => {
                this.$toast.fail(res.data.msg)
            })
        }
    },
    created() {
        if (this.tokenString !== '') {
            this.getUserInfo();
            this.findMy()
            this.userBgI = this.userBg
        }

    },
    computed: {
      ...mapState([
          "tokenString",
          "userBg"
      ]),
      desc: function() {
          if (this.userInfo.desc === '') {
              return '这家伙很懒, 什么也没有留下!'
          } else {
              return this.userInfo.desc
          }
      }
    }
}
</script>
<style lang="less" scoped>
    .container {
        background-color: #f5f5f5;
        padding-bottom: 150px;
        .topBgc {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-position: center;
        }
        .userInfo {
            width: 90%;
            height: 370px;
            margin: 0 auto;
            margin-top: -40px;
            &:before {
                content: '';
                position: absolute;
                height: 465px;
                width: 95%;
                background-color: #fff;
                top: 150px;
                left: 10px;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                opacity: 0.7;
                z-index: 0;
            }

            .avatar {
                display: flex;
                margin-bottom: 50px;
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    z-index: 2;
                }
                .loginText {
                    font-size: 20px;
                    margin-left: 20px;
                    color: #0c34b5;
                    z-index: 2;
                    align-self: center;
                }
                .userDesc {
                    z-index: 2;
                    margin-left: 20px;
                    align-self: center;

                    .username {
                        color: #0C34BA;
                        font-weight: bold;
                    }
                    .introduction {
                        margin-top: 20px;
                    }
                }
            }
            .list{
                position: relative;

                .info {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #e5e5e5;
                }
                .info:last-child {
                    border: none;
                }
            }
        }
    }
</style>
