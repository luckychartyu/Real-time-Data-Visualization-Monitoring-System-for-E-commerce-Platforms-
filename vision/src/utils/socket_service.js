export default class SocketService {
  static instance = null
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

    ws = null
    callBackMapping = {}
    connected = false
    sendRetryCount = 0
    connectRetryCount = 0
    
    connect () {
      if (!window.WebSocket) {
        return console.log('你的浏览器不支持websocket')
      }
      this.ws = new WebSocket('ws://localhost:9998')

      this.ws.onopen = () => {
        console.log('连接服务器成功了')
        this.connected = true
        this.connectRetryCount = 0
      }
      this.ws.onclose = () => {
        console.log('连接服务器失败')
        this.connected = false
        this.connectRetryCount++
        setTimeout(() => {
          this.connect()
        },500 * this.connectRetryCount)
      }
      this.ws.onmessage = msg => {
        console.log('从服务端获取到了数据')
        const recvData = JSON.parse(msg.data)
        const socketType = recvData.socketType
        if (this.callBackMapping[socketType]) {
          const action = recvData.action
          if (action === 'getData') {
            const realData = JSON.parse(recvData.data)
            this.callBackMapping[socketType].call(this, realData)
          } else if (action === 'fullScreen') {
            this.callBackMapping[socketType].call(this, recvData)
          } else if (action === 'themeChange') {
            this.callBackMapping[socketType].call(this, recvData)
          }
        }
      }
    }

    registerCallBack (socketType, callBack) {
      this.callBackMapping[socketType] = callBack
    }

    unRegisterCallBack (socketType) {
      this.callBackMapping[socketType] = null
    }

    send (data) {
      if (this.connected) {
        this.sendRetryCount = 0
        this.ws.send(JSON.stringify(data))
      } else {
        this.sendRetryCount++
        setTimeout(() => {
          this.send(data)
        }, this.sendRetryCount * 500)
      }
    }
}
