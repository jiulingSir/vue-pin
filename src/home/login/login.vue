<template>
    <div>
      <NavBar title="登录"></NavBar>
      <Logo></Logo>
      <div class="form-wrapper">
        <mt-field class="input-margin" placeholder="请输入账号" v-model="model.User"></mt-field>
        <mt-field class="input-margin" placeholder="请输入密码" type="password" v-model="model.Pwd"></mt-field>
        <div class="padd"></div>
        <mt-button type="primary" class="loginBtn" size="large" @click="HandlerSubmit">登录</mt-button>
        <mt-button type="default" class="registerBtn" size="large" @click="HandlerRegister">注册</mt-button>
      </div>
    </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import Fade from '../../components/Fade/Fade'
  import Logo from '../../components/Logo/Logo'
  import NavBar from '../../components/NavBar/NavBar'
  import axios from 'axios'

  export default {
    name: "login",
    data() {
      return {
        model: {
          User: '',
          Pwd: ''
        }
      }
    },
    components: {
      Fade,
      Logo,
      NavBar
    },
    computed:{
      ...mapGetters(['initState'])
    },
    methods: {
      ...mapActions(['login']),
      showToastType(text, type = 'warn') {
        this.$createToast({
          txt: text,
          time: 1500,
          type
        }).show()
      },
      HandlerSubmit() {
        if (!this.model.User || !this.model.Pwd) {
          this.showToastType('账号或密码不能为空')
          return false
        }
        this.login({
          user:this.model.User,
          pwd:this.model.Pwd,
        }).then(res => {
          this.$router.push({path: this.initState.redirectTo})
        })
        .catch(err => {
          this.showToastType(err.msg,'error')
        })
      },
      HandlerRegister() {
        this.$router.push({path: '/register'})
      }
    }
  }
</script>

<style lang="stylus" scoped>


  .form-wrapper {
    padding: 12px;
    .input-margin {
      margin 20px 0
      min-height: 40px
      border: 1px solid #ddd
    }
    .padd {
      margin-top 60px
    }

    .loginBtn {
      margin-bottom 10px
    }

    .registerBtn {
      box-shadow: none
      border: 1px solid #ddd
    }

  }


</style>
