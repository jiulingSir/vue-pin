<template>
  <div>

    <div class="avatar">
      <img :src=' "../../components/x-grid/"+ initState.avatar +".png" ' alt="">
      <p class="user">{{initState.user}}</p>
    </div>

    <div class="infoContainer">
      <div class="information"> {{ initState.type === 'genius'? '求职简介':'招聘职位' }} </div>
      <div class="infomain">
        <h2 class="title">{{initState.title}}</h2>
        <h3 v-if="initState.company" class="company">公司：{{initState.company}}</h3>
        <h3 v-if="initState.money" class="company">月薪：{{initState.money}}</h3>
        <h3 class="company">描述：{{initState.desc}}</h3>
      </div>
    </div>

    <div class="pad">
        <mt-button type="primary" size="large" @click="showBtn">退出登录</mt-button>
    </div>


  </div>
</template>

<script>
  import browserCookie  from 'browser-cookies'
  import {mapGetters,mapActions} from 'vuex'
  import {showConfirm} from '../../util/util'

  export default {
    name: "person",
    computed: {
      ...mapGetters(['initState'])
    },
    methods: {
      ...mapActions(['logoutSubmit']),
      showBtn() {
        showConfirm('是否退出登录？').then(action => {
            // 清除cookies
            browserCookie.erase('userid')
            this.logoutSubmit()
            this.$router.push({path:'/login'})
        })
        .catch(err => { 
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .avatar {
    margin 20px auto 10px auto
    text-align center
    img {
      width 70px
      height: 70px
      border 1px solid #d9d9d9
      border-radius 50%
      overflow hidden
      vertical-align top
      background white
    }
    .user {
      padding-top 6px
      font-size 20px
      color: #737373
    }
  }


  .infoContainer{
    margin-top 30px
    .information{
      padding 10px
      font-size 16px
      color #3b3b3b
    }
    .infomain{
      padding 10px 0
      font-size 16px
      background white
      border:1px solid white
      border-radius 6px
      .title{
        font-size 20px
        padding 10px
      }
      .company{
        padding 10px
        color: #848484
      }
    }
  }
  .pad{
    padding 100px 20px 20px 20px
  }

</style>
