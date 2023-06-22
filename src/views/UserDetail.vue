<template>
  <div class="container">
      <div class="top">
          <div class="back" @click="goBack">
              <span><van-icon name="arrow-left" /> 返回</span>
          </div>
          <div class="title">
              个人资料
          </div>
      </div>
      <div :style='{ backgroundImage: userBg === "" ? "url(\"" + require("../assets/images/defaultBackground.jpg") + "\")" : "url(\"" + userBg + "\")" }' class="bgc" ></div>
      <div class="info">
          <div class="avatar">
              <div class="text">
                  头像
              </div>
              <div class="img">
                  <img :src="userInfo.userImg" alt="">
              </div>
          </div>
          <div class="field">
              <div class="text">
                  用户id
              </div>
              <div class="content">
                {{ userInfo.userId }}
              </div>
          </div>
          <div class="field">
              <div class="text">
                  昵称
              </div>
              <div class="content">
                  {{ userInfo.nickName }}
              </div>
          </div>
          <div class="field">
              <div class="text">
                  简介
              </div>
              <div class="content">
                  {{ userInfo.desc === '' ? '这家伙很懒, 什么也没留下!' : userInfo.desc }}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    name: "UserDetail",
    data() {
        return {
          userInfo: JSON.parse(this.$route.query.userInfo)
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
    },
    computed: {
        ...mapState([
            'userBg'
        ])
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
    .info {
      width: 90%;
      padding: 10px;
      height: 200px;
      margin: 0 auto;
      margin-top: -30px;
      background-color: #fff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      .avatar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        height: 50px;
        .img {
          img {
            width: 40px;
            border-radius: 50%;
          }
        }
      }
      .field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        height: 50px;
        .content {
          color: gray;
        }
      }
      .field:last-child {
        border: none;
      }
    }
  }
</style>
