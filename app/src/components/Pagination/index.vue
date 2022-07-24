<template>
    <div>
       <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start>1">1</button>
         <button v-if="startNumAndEndNum.start>2">...</button>
              <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)">{{page}}</button>
             <button v-if="startNumAndEndNum.end<totalPage-1">...</button>
              <button v-if="startNumAndEndNum.end<totalPage">{{totalPage}}</button>
               <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
               <button>共{{total}}条</button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props:['pageNo','pageSize','total','continues'],

    data() {
        return {
            
        };
    },
    computed:{
        totalPage(){
           return Math.ceil(this.total/this.pageSize)
        },
        //连续分页
        startNumAndEndNum(){
           const { pageNo, continues, totalPage } = this;
            let start = pageNo - parseInt(continues / 2);
            let end = pageNo + parseInt(continues / 2);
              if (start < 1) {
           start = 1;
        end = continues;
      }
      //pageNo 32 33
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      return {start,end}
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>