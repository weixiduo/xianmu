<template>
<div class="outer">
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 三级联动结构||过渡动画效果-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件的委派更加合理一些 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
              >
                <h3 :class="{show: currentIndex === index }">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a>服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
//这样的引入方式把所有lodash函数全部引入
//按需引入
import {throttle} from 'lodash'
export default {
    name: 'TypeNav',
    data(){
   return{
     //存储移上那一级的一级
     currentIndex:-1,
     show:true
     
    }
    },
    methods:{

    changeIndex:throttle(function(index){
      //当鼠标鼠标修改响应式数据时currentIndex属性
   //回调函数里面业务代码很多，卡顿、业务没有完整完成。
    //节流功能
      this.currentIndex=index;
    },50),
  goSearch(event){

  //编程式导航按钮的回调函数
      //点击a标签进行路由跳转：父节点代理的子节点的类型很多 div h3 dd dt em a
      //通过event可以获取到当前触发事件的节点
      let nodeElement = event.target;
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      //执行if语句：只能区分点击的标签是不是a
      if (categoryname) {
        //准备路由跳转的参数
        let location = { name: "search" };
        //  let location = { name: "detail" };//临时改
        let query = { categoryName: categoryname };
        //一级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
          //二级分类的a标签
        } else if (category2id) {
          query.category2Id = category2id;
          //三级分类a标签
        } else {
          query.category3Id = category3id;
        }
        //路由跳转之前：看一下有没有params参数，如果有params参数需要携带给search
        if (this.$route.params) {
          //query参数
          location.query = query;
          //params
          location.params = this.$route.params;
          //如有有params参数也需要携带给search模块
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          if (this.$route.path != "/home") {
            this.$router.replace(location);
          } else {
            this.$router.push(location);
          }
        }
      } 
  },
    changeShow() {
      //鼠标移上去三级联动需要隐藏
      //下面代码只有在serach模块的时候，才会执行
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //修改show的属性的方法（鼠标离开）
    leaveShow() {
      //鼠标移出的时候，三级联动的一级菜单没有背景颜色
      this.currentIndex = -1;
      //需要把三级联动展示出来
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  
    mounted(){
      this.$store.dispatch('categoryList');
     //当组件挂载完毕，让show改成false
    //  this.show=false
    //如果不是Home组件，show就为false
    if(this.$route.path!='/home'){
      this.show=false
    }
    },
    computed: {
      ...mapState({
        //右侧需要的是一个函数，当使用时会使用这个计算属性的时候，右侧函数会立即执行一次
        //当注入一个参数state的。即为大仓库数据
       categoryList: (state) => state.home.categoryList,
      })
    },
};
</script>

<style scoped>
/*.item:hover{
  background-color: rgb(115, 132, 122);
}*/
.item-list a{
  text-decoration: none;
}
.cur:hover{
  background-color: rgb(22, 202, 130);
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #36a97b;
  line-height: 35px;
  text-align: center;
  color: rgb(30, 29, 29);
  font-size: 14px;
  font-weight: 2000;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0px;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: rgb(203, 21, 21);
  text-decoration: none;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #779663;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;

}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 60px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 400px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

/*.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list{
  display:block;
}*/
</style>