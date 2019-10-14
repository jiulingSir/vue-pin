<template>
  <div>
    <NavBar title="牛人信息完善"></NavBar>
    <div class="container">
      <cube-scroll>

        <div class="default-wrapper">
          <div class="default-avatar">
            <img :src=' "../../components/x-grid/"+ model.avatar +".png" ' alt="">
          </div>
        </div>

        <Avatar-select :gridRowCount="gridRowCount" @handleSelectItem="handleSelectItem"></Avatar-select>
        <!-- <cube-form
          :model="model"
          :schema="schema"
          @validate="validateHandler"
          @submit="submitHandler"></cube-form> -->
        <mt-field label="求职职位"
                  placeholder="请输入求职职位"
                  v-model="model.title">
        </mt-field>
        <mt-field label="个人描述"
                  type="textarea"
                  placeholder="请输入个人描述"
                  v-model="model.desc">
        </mt-field>
        <mt-button type="primary" size="large" @click="submitHandler">确定</mt-button>
      </cube-scroll>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import NavBar from '../../components/NavBar/NavBar'
  import InputItem from '../../components/InputItem/InputItem'
  import AvatarSelect from '../../components/x-grid/x-grid'
  import {showToast} from '../../util/util'

  export default {
    name: "bossInfo",
    data() {
      return {
        model: {
          avatar: 'boy',
          title: '',
          desc: '',
        },
        gridRowCount: 5
      }
    },
    computed: {
      ...mapGetters(['initState'])
    },
    components: {
      NavBar,
      AvatarSelect
    },
    methods: {
      ...mapActions(['update']),
      validateHandler() {
        console.log('ok')
      },
      submitHandler(e) {
        if (!this.model.title || !this.model.desc) {
          showToast('个人信息不能为空')
          return;
        }

        e.preventDefault()
        this.update(this.model)
          .then(res => {
            this.$router.push({path: this.initState.redirectTo})
          })
          .catch(err => {
            showToast(err.msg)
          })
      },
      handleSelectItem(items) {
        this.model.avatar = items
      }
    }
  }
</script>

<style lang="stylus">
  .container {
    position absolute
    top: 44px
    bottom: 0
    left: 0
    width 100%
    overflow hidden
  }

  .default-wrapper {
    display flex
    justify-content center
    align-items center
    .default-avatar {
      width 60px
      height 60px
      margin 20px 0
      border-radius 50%
      border: 1px solid #e7e7e7
      box-shadow 0 0px 10px #dddddd
      overflow hidden
      img {
        width 100%
      }
    }
  }

  .cube-form_standard .cube-textarea-wrapper.cube-textarea_expanded {
    height: 90px !important
  }
</style>
