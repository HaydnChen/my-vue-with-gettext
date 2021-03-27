<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="homepage-hero-module">
      <!-- <div class="video-container">
        <video :style="fixStyle" muted autoplay="autoplay" loop class="fillWidth" v-on:canplay="canplay">
          <source :src="PATH_TO_MP4" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source :src="PATH_TO_WEBM" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
      </div> -->
      <div class="bg-img-container">
        <img :style="fixStyle" :src="PATH_TO_BG_IMG" alt=""/>
        <div class="blur"></div>
      </div>
    </div>
    <div class="login-con">
      <div class="login-des">
        <h1>Rainbow UI 不仅仅是UI</h1>
        <span>专业的前端设计团队<br/>细致、漂亮的UI组件<br/>事无巨细的文档<br/>友好的API</span>
      </div>
      <Card class="login-con-card" icon="log-in" :bordered="false">
        <img class="log-in-img" :src="LOGO" alt=""/>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">欢迎使用Rainbow Pro</p> -->
        </div>
      </Card>
    </div>
    <div class="login-copyright">
      &copy;&nbsp;2009-{{this.thisYear}}&nbsp;rainbow.ebaotech.com&nbsp;版权所有
    </div>
  </div>
</template>

<script>
// import PATH_TO_MP4 from '@/assets/videos/vedio.mp4'
// import PATH_TO_WEBM from '@/assets/videos/vedio.webm'
import PATH_TO_BG_IMG from '@/assets/images/bg_img.jpg'
import LOGO from '@/assets/images/logo.png'
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      // PATH_TO_MP4,
      // PATH_TO_WEBM,
      PATH_TO_BG_IMG,
      LOGO,
      thisYear:2009
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        this.$router.push({
          name: this.$config.homeName
        })
        // })
      })
    },
    canplay () {
      this.vedioCanPlay = true
    }
  },
  mounted () {
    this.thisYear = new Date().getFullYear()
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  }
}
</script>

<style>
.login-des{
  padding-top: 38px;
}
.login-des > h1{
  font-size: 30px;
  color: #fff;
}
.login-des > span{
  font-size: 16px;
  line-height: 30px;
  margin: 20px 0;
  color: #fff;
  display: inline-block;
}
</style>