import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state={
    //state数据别乱写,服务器返回数据，返回数组【根据服务器返回的类型】
    goodInfo: {},
  //游客临时身份
  uuid_token:getUUID()
}
//修改state的唯一手段
const mutations={
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
    
    
}
//处理action，可以书写自己的业务逻辑，也可以处理自己的异步
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
          commit("GETGOODINFO", result.data);
        }
      },
  //ADD产品到购物车
  // async AddOrUpdateShopCart({commit},{skuId,skuNum}){
  //   let result= await AddOrUpdateShopCart(skuId,skuNum)
  //   commit('ADDOR',result.data)
  // }
  //加入购物车的||修改某一个产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      //返回的是成功的标记
      return "ok";
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("faile"));
    }
  },
};
//getters:理解为计算属性，用于简化仓库数据，让组件区数据更方便
const getters={
    categoryView(state) {
        //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {};
      },
      //简化产品信息的数据
      skuInfo(state) {
        return state.goodInfo.skuInfo || {};
      },
      spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
      }
}
export default({
    state,
    mutations,
    actions,
    getters
})