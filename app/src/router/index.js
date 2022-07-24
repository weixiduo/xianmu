import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
import routes from './routes'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
let originPush=VueRouter.prototype.push
let originRepalce=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        //call.apply区别
        //相同点。都可以调用函数一次，都可以修改上下文一次
        //不同点call apply ,传递参数用逗号隔开
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }

}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        //call.apply区别
        //相同点。都可以调用函数一次，都可以修改上下文一次
        //不同点call apply ,传递参数用逗号隔开
        originRepalce.call(this,location,resolve,reject)
    }else{
        originRepalce.call(this,location,()=>{},()=>{})
    }

}
 let router=new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }

})
//全局守卫，前置守卫，（在路由跳转之间判断）
router.beforeEach(async(to,from,next)=>{
 //用户只有登录才会有token
 let token=store.state.user.token;
 //用户信息
 let name=store.state.user.userInfo.name;
 if(token){
    //用户已经登录去不了login
    if(to.path=='/login'){
        next('/home')
    }else{
        //登录去放不上login
        //如果有用户信息
        if(name){
                next()
        }else{
      try{
//获取用户信息
        await store.dispatch('getUserInfo')
        next()
      }catch(error){
        await store.dispatch('userLogout')
        next('/login')

      }
      
    }
}
 }else{
    //没登录全部放行
   next() 
 }
})
export default router