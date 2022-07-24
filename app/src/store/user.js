import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout}from '@/api'
import {setToken,getToken,removeToken} from "@/utils/token";
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
      state.token=token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
     //清除本地数据
  CLEAR(state){
    //帮仓库中先关用户信息清空
    state.token = '';
    state.userInfo={};
    //本地存储数据清空
    removeToken();
  }
}
const actions={
    //获取验证码
   async getCode({commit},phone){
   let result=await reqGetCode(phone)
   if(result.code==200){
    commit('GETCODE',result.data)
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
   console.log(result)
    },
     //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //登录
  async userLogin({commit},data){
    let result=await reqUserLogin(data)
    //服务器下发的token用户的唯一标识
    //带着token找服务器拿数据
    if(result.code==200){
      commit('USERLOGIN',result.data.token)
      //本地存储token
     setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //用户信息
 //获取用户信息
 async getUserInfo({ commit }) {
  let result = await reqUserInfo();
  console.log(result)
  if (result.code == 200) {
    //提交用户信息
    commit("GETUSERINFO", result.data);
    return 'ok';
  }
},
//退出登录
async userLogout({commit}) {
  //只是向服务器发起一次请求，通知服务器清除token
  let result = await reqLogout();
  //action里面不能操作state，提交mutation修改state
  if(result.code==200){
    commit("CLEAR");
    return 'ok';
  }else{
    return Promise.reject(new Error('faile'));
  }
},
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}