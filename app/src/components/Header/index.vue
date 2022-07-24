<template>
  <div class="outer">
    <div class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName"> 
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register"
                >免费注册</router-link
              >
            </p>
            <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link to="/home" class="logo">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword:'',
    };
  },
  mounted(){
this.$bus.$on('clear',()=>{
  this.keyword=""
})
  },
  methods: {
    goSearch() {
      this.$router.push({name:'search',query:{keyword:this.keyword}});
    },
    //退出登录
    async logout(){
     try{
   await this.$store.dispatch('userLogout')
      this.$router.push({name:home})
     }catch(error){}
    }
  },
  computed:{
      userName(){
      return this.$store.state.user.userInfo.name;
    },
  }
};
</script>

<style>
.outer.header.top {
  height: 30px;
  line-height: 30px;
}
.outer.header.top.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header .top .container .loginList {
  margin-top: -20px;
  margin-right: 150px;
  float: left;
}
.outer .header .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header .top .container .loginList p .register {
  border-left: 1px solid #b02b2b;
  padding: 0 5px;
  margin-left: 5px;
}

.outer .header .top .container .typeList {
  float: right;
}
.outer .header .top .container .typeList a {
  padding-right: 10px;
}

.bottom {
  width: 1200px;
  overflow: hidden;
}
.outer .header.bottom .logoArea {
  float: left;
}
.outer .header .bottom .logoArea .logo img {
  width: 155px;
  margin-left: 50px;
}
.outer .header .bottom .searchArea {
  float: right;
  margin-top: -130px;
}
.outer .header .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>