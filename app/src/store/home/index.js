import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
const state={
    //state数据别乱写,服务器返回数据，返回数组【根据服务器返回的类型】
    categoryList:[],
    bannerList:[],
    floorList:[]
}
//修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLLIST(state,floorList){
        state.floorList=floorList
    }
    
}
//处理action，可以书写自己的业务逻辑，也可以处理自己的异步
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList({commit}){
      let result=await reqCategoryList();
     if(result.code==200){
         commit('CATEGORYLIST',result.data)
     }
    },
    async getBannerList({ commit }) {
        //服务器返回banner数据--->存储于vuex当中
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    async getFloorList({ commit }) {
        //服务器返回floor数据--->存储于vuex当中
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLLIST", result.data);
        }
    },
};
//getters:理解为计算属性，用于简化仓库数据，让组件区数据更方便
const getters={}
export default({
    state,
    mutations,
    actions,
    getters
})