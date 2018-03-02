<template>
  <div>
    <h1>学位课详细</h1>
    <button style="background: rgb(85, 196, 171);" @click="buy">点击购买</button>
    <button style="background: rgb(85, 196, 171);" @click="add_cart">加入购物车</button>
    <div>{{summary}}</div>
    <hr>
    <div>
      <h3>常见问题</h3>
      <ul>
        <li v-for="item in question_list">
          <p>{{item.question}}</p>
          <p>{{item.answer}}</p>
        </li>
      </ul>
    </div>
    <hr>
    <div>
      <h3>大纲</h3>
      <li v-for="course in course_list">
        {{course.name}}
        <div v-for="item in course.outlines">
          <p>{{item.title}}</p>
          {{item.content}}
        </div>
      </li>
    </div>
    <hr>
    <div>
      <h3>项目讲师简介</h3>
      <div v-for="course in course_list">
        <p v-for="item in course.teachers">
          {{item.name}}----------{{item.brief}}

        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        summary: '',
        question_list: [],
        course_list: [],
      }
    },
    mounted: function () {
      this.initCourseDetail()
    },
    methods: {
      initCourseDetail (){
        var nid = this.$route.params.id
        var that = this
        var url = 'http://127.0.0.1:8081/micro/' + nid + '.json'
        this.$axios.request({
          url: url,
          method: 'GET',
          responseType: 'json'
        }).then(function (response) {
          console.log(response)
          that.title = response.data.name
          that.summary = response.data.brief
          that.question_list = response.data.questions
          that.course_list = response.data.courses
        })
      },


      buy(){
        if (!this.$store.state.username) {
          alert("请先登录");
          this.$route.push('/login')
        }
        course_id = this.$route.params.id;

      },

      add_cart(){
        if (!this.$store.state.token) {
          alert("请先登录");
          this.$route.push('/login')
        }
        var that = this;
        this.$axios.request({
          url: 'http://127.0.0.1:8081/cart/',
          method: 'POST',
          data: {
            token: this.$store.state.token,
            course_id: this.$route.params.id
          },
          responseType: 'json'
        }).then(function (response) {
          console.log(response.data)

        })

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
