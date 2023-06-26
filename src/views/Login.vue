<template>
    <div class="container">
        <div class="top">
            <img src="../assets/images/home_active.png" alt="">
            <div class="title">Luckin Coffee</div>
            <div class="text">先逛一逛</div>
        </div>
        <div class="login">
            <h2>{{ headLineText }}</h2>
            <p>{{ englishText }}</p>
            <div class="field" v-if="findPwd">
                <van-field v-model="forgetTel" type="tel" label="手机号" placeholder="手机号" />
                <van-field v-model="forgetPwd" type="password" label="密码" placeholder="密码必须为字母开头" />
                <div class="forget" @click="findPassword">
                    {{  help }}
                </div>
            </div>
            <div class="field" v-else>
                <van-field v-model="tel" type="tel" label="手机号" placeholder="手机号" />
                <van-field v-model="pwd" type="password" label="密码" placeholder="密码必须为字母开头" />
                <div class="forget" @click="findPassword">
                    {{  help }}
                </div>
            </div>
            <button class="toLogin btn" type="button" @click="toLogin">
                {{ findPwd ? '提交' : '登录' }}
            </button>
            <button class="register btn" type="button" @click="register">
                {{ findPwd ? '返回' : '注册' }}
            </button>
        </div>
        <van-action-sheet v-model="show" title="标题" :round="false">
            <div class="content">
                <h2>注册</h2>
                <div class="field">
                    <van-field v-model="registerTel" type="tel" label="手机号" placeholder="11位手机号" />
                    <van-field v-model="registerPwd" type="password" label="密码" placeholder="密码必须为字母开头" />
                    <van-field v-model="nick" label="昵称" placeholder="昵称" />
                    <button class="register" type="button" @click="toRegister">
                        注册
                    </button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import {
    register,
    login,
    getValidCode,
    retrievePassword
} from '@/api/login'
import {mapMutations} from "vuex";
export default {
    name: 'LoginComponent',
    data() {
        return {
            tel: '',
            pwd: '',
            show: false,
            registerTel: '',
            registerPwd: '',
            nick: '',
            findPwd: false,
            sms: '',
            email: '',
            forgetTel: '',
            forgetPwd: ''
        }
    },
    computed: {
      help: function() {
          return this.findPwd ? '已有账号, 立即登录' : '忘记密码?'
      },
      headLineText: function() {
          return this.findPwd ? '找回密码!' : '欢迎回来!'
      },
      englishText: function() {
          return this.findPwd ? 'Find Password' : 'Please login to your accounts'
      }
    },
    methods: {
        ...mapMutations({
            setTokenString: 'SET_TOKEN_STRING'
        }),
        getValidCode() {
            let str = "appkey=" + this.$appkey + "&email=" + this.email.trim()
            getValidCode(str).then(res => {
                console.log(res)
            })
        },
        register() {
            if (this.findPwd) {
                this.findPwd = !this.findPwd
                return
            }
            this.show = true
        },
        findPassword() {
            this.findPwd = !this.findPwd;
        },
        toRegister() {
            if (this.registerTel === '') {
                this.$toast.fail("手机号不能为空")
                return
            } else if (!(/^1[3456789]\d{9}$/).test(this.registerTel)) {
                this.$toast.fail("手机号格式不正确")
                return
            } else if (this.registerPwd === '') {
                this.$toast.fail("密码不能为空")
                return
            } else if (!(/^[A-Za-z]$/).test(this.registerPwd.charAt(0))) {
                this.$toast.fail("密码格式不正确(首字符必须为字母)")
                return
            } else if (this.nick === '') {
                this.$toast.fail("昵称不能为空")
                return
            }
            let str = "appkey=" + this.$appkey + "&nickName=" + this.nick + "&password=" + this.registerPwd + "&phone=" + this.registerTel
            register(str).then(res => {
                console.log(res)
                if (res.data.msg === '注册成功') {
                    this.$toast.success("注册成功")
                    this.show = false;
                } else {
                    this.$toast.fail(res.data.msg)
                }
            })
        },
        toLogin() {
            if (this.findPwd) {
                if (this.forgetTel === '') {
                    this.$toast.fail("手机号不能为空")
                    return
                } else if (!(/^1[3456789]\d{9}$/).test(this.forgetTel)) {
                    this.$toast.fail("手机号格式不正确")
                    return
                } else if (this.forgetPwd === '') {
                    this.$toast.fail("密码不能为空")
                    return
                } else if (!(/^[A-Za-z]$/).test(this.forgetPwd.charAt(0))) {
                    this.$toast.fail("密码格式不正确(首字符必须为字母)")
                    return
                }
                let str = "appkey=" + this.$appkey + "&phone=" + this.forgetTel + "&password=" + this.forgetPwd
                retrievePassword(str).then(res => {
                    this.findPwd = false
                    if (res.data.code === "L001") {
                        this.$toast.success(res.data.msg)
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                })
                return
            }
            let str = "appkey=" + this.$appkey + "&password=" + this.pwd + "&phone=" + this.tel;
            login(str).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$toast.success(res.data.msg)
                    this.setTokenString(res.data.token)
                    localStorage.setItem("userToken", res.data.token)
                    this.$router.go(-1)
                } else {
                    this.$toast.fail(res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  background-color: #fff;
  padding-bottom: 80px;
  .top {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #e5e5e5;
    line-height: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      margin-right: 5px;
    }
    .title {
      color: gray;
      width: 65%;
    }
    .text {
      color: #0c34b5;
    }
  }
  .login {
    margin-top: 150px;
    h2 {
      color: gray;
    }
    p {
      margin-top: 30px;
      color: gray;
    }
    .field {
      margin-top: 50px;
    }
    .forget {
      font-size: 12px;
      text-align: right;
      margin-top: 10px;
      margin-right: 18px;
    }
    .btn {
      width: 100%;
      height: 40px;
      border-radius: 30px;
      margin-top: 30px;
    }
    .toLogin {
      background-color: #0c34b5;
      border: none;
      color: white;
    }
    .register {
      background-color: #fff;
      border: 1px solid #e5e5e5;

    }
  }
  .content {
    padding: 10px;
    h2 {
      color: gray;
    }
    .field {
      margin-top: 30px;
      .register {
        background-color: #0c34b5;
        width: 100%;
        color: white;
        height: 40px;
        border-radius: 30px;
        margin-top: 30px;
        border: none;
      }
    }
  }
}
</style>
