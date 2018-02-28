<template>
  <div class="index">
    <h1>深科技</h1>
    <div v-for="item in newsList">

            <h3><b>文章{{item.id}}</b></h3>
      <h5>文章标题： <router-link :to="{'path':'/new-detail/'+item.id}">{{item.title}}</router-link></h5>
      <h5>发表日期： {{item.date}}</h5>
      <h5>文章摘要： {{item.brief}}</h5>
      <h5>配图： <img :src="item.head_img" alt=""></h5>
      <h5>来源：{{item.source.name}} 🌚阅读数：{{item.view_num}} 🌚评论：{{item.comment_num}} 🌚收藏：{{item.collect_num}}</h5>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      newsList:[]
    }
  },
  mounted: function () {
    this.initCourses()
  },
  methods: {
   initCourses: function () {
    var that = this;
    this.$axios.request({
      url: 'http://127.0.0.1:8081/news/',
      method:'GET',
      }).then(function (response) {
        console.log(that.newsList);
        console.log('=====', response.data);
      that.newsList = response.data
    })
  }
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
