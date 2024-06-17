import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes/router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
app.use(router)
app.use()
/* 将 axios 挂载到全局，今后，每个组件中，
都可以直接通过this.$http 代替 axios 发起 Ajax 请求 */
app.config.globalProperties.$http = axios
/* 配置请求的根路径 */
axios.defaults.baseURL = "http://127.0.0.1:9311"

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)

app.config.globalProperties.$isLogin = false; //判断是否已经登陆
app.config.globalProperties.$loginType = ''; //登录类型
