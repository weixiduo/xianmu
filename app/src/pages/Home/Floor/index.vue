<template>
<div class="outer">
  <div class="floor">
      <div class="py-container">
        <div class="title clearfix">
          <h3 class="fl">{{list.name}}</h3>
          <div class="fr">
            <ul class="nav-tabs clearfix">
              <li class="active" v-for="(nav,index) in list.navList" :key="index">
                <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
              </li>
        
            </ul>
          </div>
        </div>
        <br>
        <br>
        <div class="tab-content">
          <div class="tab-pane">
            <div class="floor-1">
              <div class="blockgary">
                <ul class="jd-list">
                  <li v-for="(keyword,index) in list.keywords" :key="index">{{keyword}}</li>
                </ul>
                <img :src="list.imgUrl" />
              </div>
              <div class="floorBanner">
             <Carsouel :list="list.carouselList"/>
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[0]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[1]" />
                </div>
              </div>
              <div class="split center">
                <img :src="list.bigImg" />
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[1]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[1]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: '',
  props:['list'],
  // mounted(){
  //   //第一次书写Swiper的时候，在mounted当中书写时不可以的，但是这里的数据是父亲发的，数据已经遍历好的的，数据早就有的了
  //   var mySwiper = new Swiper (
  //               this.$refs.cur, {
  //              // 垂直切换选项
  //            loop: true, // 循环模式选项
    
  //         // 如果需要分页器
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable:true
  //   },
    
  //   // 如果需要前进后退按钮
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
    
  //   // 如果需要滚动条
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //   },
  // })        
  // },
 
}
</script>

<style scoped>
 .floor {
  margin-top: 15px;
}
.outer .floor .py-container {
  width: 1200px;
  margin: 0 auto;
}
.outer .floor .py-container .title .fl {
  float: left;
  color: #c81623;
  font-size: 20px;
  line-height: 30px;
  margin: 9px 0;
  font-weight: 700;
  position:absolute;
}
.outer .floor .py-container .title .fr {
  margin-top:-40px;
 left:30%;
  float: right;
  position:absolute;
  padding: 50px;
}
.outer .floor .py-container .title .fr .nav-tabs {
  margin: 10px 0 0;
  display: inline-block;
}
.outer .floor .py-container .title .fr .nav-tabs li {
  float: left;
  line-height: 18px;
}
.outer .floor .py-container .title .fr .nav-tabs li a {
  padding-top: 1px;
  font-weight: 400;
  background-color: #fff;
}
.outer .floor .py-container .title .fr .nav-tabs li a::after {
  content: "|";
  padding: 0 10px;
}
.outer .floor .py-container .title .fr .nav-tabs li:nth-child(7) a::after {
  content: "";
}
.outer .floor .py-container .title .fr .nav-tabs li.active a {
  color: #e1251b;
}
.outer .floor .py-container .tab-content {
  border-top: 2px solid #c81623;
  border-bottom: 1px solid #e4e4e4;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 {

  height: 360px;
  display: flex;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .blockgary {
  width: 210px;
  height: 100%;
  background: #f7f7f7;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list {
  padding: 15px 0;
  overflow: hidden;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list li {
  list-style-type: none;
  float: left;
  width: 40%;
  margin: 0 10px;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
  line-height: 26px;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .blockgary img {
  width: 100%;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .floorBanner {
  width: 330px;
  height: 100%;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .split {
  width: 220px;
  height: 100%;
  position: relative;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-x-line {
  position: absolute;
  background: #e4e4e4;
  width: 220px;
  height: 1px;
  top: 180px;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit {
  width: 100%;
  height: 50%;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit img {
  width: 100%;
  height: 100%;
  transition: all 400ms;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit img:hover {
  opacity: 0.8;
}
.outer .floor .py-container .tab-content .tab-pane .floor-1 .center {
  border: 1px solid #e4e4e4;
}
</style>
