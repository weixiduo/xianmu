<template>
  <div>
  <Header/>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  components:{
    Header,Footer
  },
  name: 'AppApp',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>