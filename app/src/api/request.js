import axios from "axios";
import store from '@/store' 

//引入nprogress进度条
import nprogress from "nprogress";
//start进度条开始
//done:j进度条结束
//引入进度条样式
import "nprogress/nprogress.css"
const requests =axios.create({
    //配置对象
    //基本路径，发请求时会出现api
    baseURL:"/api",
    timeout:5000,
});
//请求拦截，发请求前，请求拦截器可以检测到，可以在请求发出去前做一些事情
requests.interceptors.request.use((config)=>{
    //游客身份加入购物车
    if(store.state.detail.uuid_token){
        //请求头添加一个字段(userTempId):和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
      }
     // 需要携带token带给服务器
      if(store.state.user.token){
        config.headers.token = store.state.user.token;
      }
    nprogress.start();
return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
nprogress.done()
return res.data;
}),(error)=>{
    return Promise.reject(error)
}

export default requests;
