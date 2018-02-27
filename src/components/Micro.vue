<template>
  <div>
    <h1>学位课</h1>
    <ul>
      <li v-for="item in courseList" >
        <div>{{item.name}}</div>
        <p><small>{{item.brief.slice(0,20)}}...</small></p>
        <p><small><router-link :to="{'path':'/micro-detail/'+item.id }">课程详情>>></router-link></small></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      courseList: [
      ]
    }
  },
  mounted: function () {
    this.initCourses()
  },
  methods: {
    initCourses:function () {
      var that = this
      this.$axios.request({
        url: 'http://127.0.0.1:8081/micro/',
        method: 'GET'
      }).then(function (response) {
        that.courseList = response.data.courseList
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
