import {reqGetSearchInfo} from '@/api'
const state={
    searchList:{}
}
//修改state的唯一手段
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
//处理action，可以书写自己的业务逻辑，也可以处理自己的异步
const actions={
    //至少传入一个空对象，params形参：当action派发的时候，第二个参数传递过来的时候，至少是一个空对象
    async getSearchList({commit},params={}){
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
//getters:理解为计算属性，用于简化仓库数据，让组件区数据更方便
const getters={
     //搜索模块【商品展示的数据】
     //state：它是当前小仓库（search）的state数据，没有home仓库中的state
     //只是当前仓库的state
     goodsList(state){
         //没网返回undefined
        return state.searchList.goodsList||[];
    },
    //品牌数据
    tradeMarkList(state){
      return state.searchList.trademarkList;
    },
    //平台属性
    attrsList(){
        return state.searchList.attrsList;
    }
}
export default({
    state,
    mutations,
    actions,
    getters
})