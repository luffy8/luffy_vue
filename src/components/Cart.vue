<template>
  <div>
    <h1>购物车</h1>
    <div v-for="item in courses">
      {{item}}
      <button style="background: rgb(85, 196, 171);" @click="drop(item.id)">删除课程</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        courseData: {},
        courses: [],
      }
    },
    mounted: function () {
      this.initCourses()
    },
    methods: {
      initCourses: function () {
        var that = this;
        this.$axios.request({
          url: 'http://127.0.0.1:8081/cart/?token='+that.$store.state.token,
          method: 'GET',
        }).then(function (response) {
          console.log(response.data);
          that.courses = response.data;
        })
      },

      drop(course_id){
        if (!this.$store.state.username) {
          alert("请先登录");
          this.$route.push('/login')
        }
        var that = this;
        this.$axios.request({
          url: 'http://127.0.0.1:8081/cart/?token='+that.$store.state.token+'&pk='+course_id,
          method: 'DELETE',
        }).then(function (response) {
          console.log(response.data);
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
