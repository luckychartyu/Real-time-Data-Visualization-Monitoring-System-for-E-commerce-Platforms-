<template>
  <div class="com_container" @dblclick="revertMap">
    <div class="com_chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize',this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref,this.theme)
      // 获取中国地图的矢量数据//由于我们现在获取的地图矢量数据并不是位于KOA2的后台,所以我们不能使用this.$http
      const ret = await axios.get('http://localhost:8999/static/map/china.json')
      this.$echarts.registerMap('china',ret.data)
      const initOption = {
        title: {
          text: '▎ 商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click',async arg => {
        const provinceInfo = getProvinceMapInfo(arg.name)
        // arg.name得到所点击的省份，得到的省份是中文判断当前所点击的省份地图矢量数据是否在mapData
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get('http://localhost:8999' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key,ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    async getData () {
      const { data: ret } = await this.$http.get('map')
      this.allData = ret
      console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      const legendArr = this.allData.map(item => {
        return item.name
      })  
      const seriesArr = this.allData.map(item => {
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children, 
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 回到中国地图
    revertMap () {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      this.chartInstance.dispose()
      this.initChart()
      this.screenAdapter()
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
