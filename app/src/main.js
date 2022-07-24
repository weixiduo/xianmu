import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carsouel from '@/components/Carsouel'
import Pagination from '@/components/Pagination'
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store'
import { Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsouel.name,Carsouel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mock的数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API = API;
  },
  router:router,
  store
}).$mount('#app')
