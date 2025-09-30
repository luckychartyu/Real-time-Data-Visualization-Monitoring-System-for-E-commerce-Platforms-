<template>
  <div class="screen_container" :style="containerStyle">
    <header class="screen_header">
      <div>
        <img :src="headerSrc" alt="">
      </div>
      <span class="logo">
        <img :src="logoSrc" alt="">
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title_right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen_body">
      <section class="screen_left">
        <div id="left_top" :class="[fullscreenStatus.trend ? 'fullscreen' : '']">
          <Trend ref="trend"></Trend>
          <div class="resize">
            <span @click="changeSize('trend')" :class="['iconfont', fullscreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left_bottom" :class="[fullscreenStatus.seller ? 'fullscreen' : '']">
          <Seller ref="seller"></Seller>
          <div class="resize">
            <span @click="changeSize('seller')" :class="['iconfont', fullscreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen_middle">
        <div id="middle_top" :class="[fullscreenStatus.map ? 'fullscreen' : '']">
          <Map ref="map"></Map>
          <div class="resize">
            <span @click="changeSize('map')" :class="['iconfont', fullscreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="middle_bottom" :class="[fullscreenStatus.rank ? 'fullscreen' : '']">
          <Rank ref="rank"></Rank>
          <div class="resize">
            <span @click="changeSize('rank')" :class="['iconfont', fullscreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen_right">
        <div id="right_top" :class="[fullscreenStatus.hot ? 'fullscreen' : '']">
          <Hot ref="hot"></Hot>
          <div class="resize">
            <span @click="changeSize('hot')" :class="['iconfont', fullscreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="right_bottom" :class="[fullscreenStatus.stock ? 'fullscreen' : '']">
          <Stock ref="stock"></Stock>
          <div class="resize">
            <span @click="changeSize('stock')" :class="['iconfont', fullscreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hot from '@/components/Hot.vue'
import Map from '@/components/Map.vue'
import Rank from '@/components/Rank.vue'
import Seller from '@/components/Seller.vue'
import Stock from '@/components/Stock.vue'
import Trend from '@/components/Trend.vue'
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  created () {
    this.$socket.registerCallBack('fullScreen',this.recvData)
    this.$socket.registerCallBack('themeChange',this.recvThemeChange)
  },
  destroyed () {
    this.$socket.unregisterCallBack('fullScreen')
    this.$socket.unregisterCallBack('themeChange')
  },
  data () {
    return {
      fullscreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  },
  components: {
    Hot,
    Map,
    Rank,
    Seller,
    Stock,
    Trend
  },
  computed: {
    logoSrc () {
      return '/static/img/' + getThemeValue(this.theme).logoSrc
    },
    headerSrc () {
      return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    themeSrc () {
      return '/static/img/' + getThemeValue(this.theme).themeSrc
    },
    containerStyle () {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    },
    ...mapState(['theme'])
  },
  methods: {
    changeSize (chartName) {
      this.fullscreenStatus[chartName] = !this.fullscreenStatus[chartName]
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
      // const targetValue = !this.fullscreenStatus[chartName]
      // this.$socket.send({
      //   action: 'fullScreen',
      //   socketType: 'fullerScreen',
      //   chartName: chartName,
      //   value: targetValue
      // })
    },
    recvData (data) {
      const chartName = data.chartName
      const targetValue = data.value
      this.fullscreenStatus[chartName] = targetValue
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
    handleChangeTheme () {
      this.$store.commit('changeTheme')
      // this.$socket.send({
      //   action: 'themeChange',
      //   socketType: 'themeChange',
      //   chartName: '',
      //   value: ''
      // })
    },
    recvThemeChange () {
      this.$store.commit('changeTheme')
    }
  }
}
</script>

<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen_container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen_header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title_right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen_body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen_left {
    height: 100%;
    width: 27.6%;
    #left_top {
      height: 53%;
      position: relative;
    }
    #left_bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen_middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle_top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle_bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen_right {
    height: 100%;
    width: 27.6%;
    #right_top {
      height: 46%;
      position: relative;
    }
    #right_bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
