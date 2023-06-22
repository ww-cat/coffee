<template>
  <div class="container">
      <div class="top">
          <van-nav-bar title="上传头像或背景">
              <template #left>
                  <div class="back" @click="goBack">
                      <van-icon name="arrow-left" color="#0c34ba" />
                      返回
                  </div>
              </template>
          </van-nav-bar>
      </div>
      <div class="upload">
          <div class="avatar">
              <div class="text">
                  上传头像
              </div>
              <div class="file-upload">
                  <van-uploader :max-size="600 * 1024" :before-read="beforeReadAvatar" v-model="avatar" :after-read="uploadAvatar" multiple @oversize="onOversize" />
              </div>
              <div class="btn">
                  <van-button round color="#0c34ba" size="large" @click="toUpdateAvatar">上传</van-button>
              </div>
          </div>
          <div class="bg">
              <div class="text">
                  上传背景
              </div>
              <div class="file-upload">
                  <van-uploader :max-size="600 * 1024" :before-read="beforeReadBackgroundImg" v-model="backgroundImg" :after-read="uploadBackgroundImg" multiple @oversize="onOversize" />
              </div>
              <div class="btn">
                  <van-button round color="#0c34ba" size="large" @click="toUpdateBg">上传</van-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {
    updateAvatar,
    updateUserBg
} from "@/api/upload";
import {
    mapState,
    mapMutations
} from "vuex";

export default {
    name: "UploadFile",
    data() {
        return {
            uploader: '',
            type: '',
            avatar: [
            ],
            backgroundImg: [
            ],
            avatarStr: '',
            bgStr: ''
        }
    },
    methods: {
        ...mapMutations({
            setUserBg: 'SET_USER_BACKGROUND_IMG'
        }),
        onOversize() {
          this.$toast.fail("文件大小不能超过600KB")
        },
        toUpdateAvatar() {
            updateAvatar(this.avatarStr).then(res => {
                if (res.data.code === 'H001') {
                    this.$toast.success(res.data.msg)
                    this.setUserBg('')
                    this.$router.go(-1)
                } else {
                    this.$toast.fail(res.data.msg)
                }
            }).catch(res => {
                console.log(res)
                this.$toast.fail("上传失败")
            })
        },
        toUpdateBg() {
            updateUserBg(this.bgStr).then(res => {
                if (res.data.code === 'I001') {
                    this.$toast.success(res.data.msg)
                    this.setUserBg('')
                    this.$router.go(-1)
                } else {
                    this.$toast.fail(res.data.msg)
                }
            }).catch(res => {
                console.log(res)
                this.$toast.fail("上传失败")
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        uploadAvatar(file) {
            this.avatarStr = this.createStr(file)
        },
        createStr(file) {
            let type = file.file.name.substring(file.file.name.lastIndexOf(".") + 1)
            let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '')
            return "appkey=" + this.$appkey + "&tokenString=" + this.tokenString + "&imgType=" + type + "&serverBase64Img=" + base64
        },
        uploadBackgroundImg(file) {
            this.bgStr = this.createStr(file)
        },
        beforeReadAvatar(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$toast.fail("请上传图片")
                return false
            } else {
                this.avatar = []
                return true
            }
        },
        beforeReadBackgroundImg(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$toast.fail("请上传图片")
                return false
            } else {
                this.backgroundImg = []
                return true
            }
        }
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
        .top {
            .back {
                color: #0C34BA;
            }
        }
        .upload {
            padding: 10px;

            .avatar {
                display: flex;
                width: 100%;
                background-color: #fff;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                .btn {
                    width: 90%;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
            }
            .bg {
                margin-top: 20px;
                display: flex;
                width: 100%;
                background-color: #fff;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                .btn {
                    width: 90%;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
            }
            .file-upload {
                margin-left: 30px;
                margin-top: 5px;
            }
        }
    }
</style>
