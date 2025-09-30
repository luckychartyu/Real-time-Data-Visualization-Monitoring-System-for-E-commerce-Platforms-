<template>
  <div class="com_container">
    <div class="title" :style="comStyle">
        <span>{{ '▎ ' + showTitle }}</span>
        <span class="iconfont title_icon" :style="comStyle" @click="showChoice = !showChoice">&#xe6eb;</span>
        <div class="select_con" v-show="showChoice" :style="marginStyle">
          <div class="select_item" v-for="item in selectTypes" :key="item.key" @click="handleSelect(item.key)">
            {{item.text}}
          </div>
        </div>
    </div>
    <div class="com_chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  data () {
    return {
      chartInstane: null,
      allData: null,
      showChoice: false,
      choiceType: 'map',
      titleFontSize: 0 
    }
  },
  created () {
    this.$socket.registerCallBack('trendData',this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend',
      value: ''
    })
    window.addEventListener('resize',this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize',this.screenAdapter)
    this.$socket.unRegisterCallBack('trendData')
  },
  computed: {
    selectTypes () {
      if (!this.allData) {
        return []
      } else {
        return this.allData.type.filter(item => {
          return item.key !== this.choiceType  
        })
      }  
    },
    showTitle () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    // 设置给标题的样式
    comStyle () {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    },
    marginStyle () {
      return {
        marginLeft: this.titleFontSize + 'px'
      }   
    },
    ...mapState(['theme'])
  },
  methods: {
    initChart () {
      this.chartInstane = this.$echarts.init(this.$refs.trend_ref,this.theme)
      const initOption = {
        grid: {
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabekl: true
        },
        tooltip: {
          trigger: 'axis'    
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'  
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstane.setOption(initOption)
    },
    getData (ret) {
      // const { data: ret } = await this.$http.get('trend')
      this.allData = ret
      this.updateChart()
    },
    updateChart () {
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      // 处理数据
      // 类目轴数据
      const timeArr = this.allData.common.month 
      // y轴的数据series下的数据
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              },
              {
                offset: 1,
                color: colorArr2[index]
              }
            ]) 
          }
        }
      })
      //   图例的数据
      const legendArr = valueArr.map(item => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr    
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstane.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6 
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
    handleSelect (currentType) {
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
    }
  },
  watch: {
    theme () {
      this.chartInstane.dispose()
      this.initChart()
      this.screenAdapter()
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>
.title{
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 10;
    color: white;
    .title_icon{
        margin-left: 10px;
        cursor: pointer;
    }
    .select_con{
        background-color: #222733; 
    }
}
</style>
