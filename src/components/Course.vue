<template>
  <div>
    <div v-for="item in courseList">
      <router-link :to="{'path':'/course-detail/'+item.id }">{{item.name}}</router-link>
        <ul>
          <li>
            {{ item.level }}
          </li>
          <li>
            {{ item.brief }}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        courseList: undefined
      }
    },
    mounted: function () {
      this.initCourses()
    },
    methods: {
      initCourses: function () {
        var that = this;
        this.$axios.request({
          url: 'http://127.0.0.1:8081/courses/',
          method: 'GET'
        }).then(function (response) {
          that.courseList = response.data;
          console.log(response.data)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
