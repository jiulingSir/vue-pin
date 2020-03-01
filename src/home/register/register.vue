<template>
  <div>
    <NavBar :onLeft="onLeft" @handleGoBack="handleGoBack" title="注册"></NavBar>
    <Logo></Logo>
    <div class="form-wrapper">
      <mt-field class="input-margin" 
                  placeholder="请输入用户名" 
                  v-model="model.User">
      </mt-field>
      <mt-field class="input-margin" 
                placeholder="请输入密码" 
                type="password" 
                v-model="model.Pwd">
      </mt-field>
      <mt-field class="input-margin" 
                placeholder="请输入确认密码" 
                type="password" 
                v-model="model.repeatPwd">
      </mt-field>
      <mt-radio v-model="model.type" :options="options" align="right"></mt-radio>
      <div class="padd"></div>
      <mt-button type="default" class="registerBtn" size="large" @click="HandlerRegister">注册</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {getRedirectPath, showConfirm, showToast} from '../../util/util'
  import Logo from '../../components/Logo/Logo'
  import NavBar from '../../components/NavBar/NavBar'

  export default {
    name: "register",
    components: {
      Logo,
      NavBar
    },
    data() {
      return {
        onLeft: true,
        model: {
          User: '',
          Pwd: '',
          repeatPwd: '',
          type: 'genius',
        },
        options: [
          {
            label: '我是BOSS',
            value: 'boss',
          },
          {
            label: '我是牛人',
            value: 'genius',
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['initState'])
    },

    methods: {
      ...mapActions(['register']),
      showBtn() {
        showConfirm('是否返回登录页？').then(action => {
            this.$router.push({path: '/login'});
        })
        .catch(err => { 
        });
      },
      handleGoBack() {
        this.showBtn()
      },
      HandlerRegister() {
        if (!this.model.User || !this.model.Pwd) {
          showToast('账号密码不能为空')
          return;
        }

        if (this.model.Pwd !== this.model.repeatPwd) {
          showToast('两次输入密码不一致')
          return;
        }

        this.register({
          user: this.model.User,
          pwd: this.model.Pwd,
          type: this.model.type
        }).then(res => {
          showToast(res.msg, 'icon icon-success')
          this.model = {
            User: '',
            Pwd: '',
            repeatPwd: '',
            type: 'boss',
          }
          setTimeout(() => {
            this.$router.push({path: this.initState.redirectTo})
          }, 1500)
        }).catch(err => {
          showToast(err.msg, 'icon icon-error')
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .form-wrapper {
    padding: 12px;
    .input-margin {
      margin 10px 0
      min-height 40px
      border 1px solid #ddd
    }
    .padd {
      margin-top 60px
    }

    .loginBtn {
      margin-top 20px
      margin-bottom 10px
    }

    .registerBtn {
      box-shadow: none
      border: 1px solid #ddd
    }

    .mint-radiolist {
      color #666
      border 1px solid #ddd
    }
  }

</style>
