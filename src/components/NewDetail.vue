<template>
  <div class="index">
    <h1>深科技</h1>
    <div>
      <h1>{{ new_obj.title }}</h1>
      <h5><span>{{ new_obj.date }} 🎃阅读数：{{new_obj.view_num}} 🎃点赞：{{new_obj.agree_num}} 🎃收藏：{{new_obj.collect_num}}</span></h5>
      <p>{{ new_obj.content }}</p>
      <p>{{ new_obj.brief }}</p>
      <h2><img :src="new_obj.head_img"></h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      new_obj: []
    }
  },
  mounted: function () {
    this.initDetailCourses()
  },
  methods: {
   initDetailCourses: function () {
     var nid = this.$route.params.id;
     var that = this;
     var url = 'http://127.0.0.1:8081/news/'+ nid + '.json';
     console.log(url);
     this.$axios.request({
      url: url,
      method:'GET',
      }).then(function (response) {
        console.log('=====', response.data);
        that.new_obj = response.data
    })
  }
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
