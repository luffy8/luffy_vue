<template>
  <div>
    <h1>课程详细</h1>
    <h3>{{course_detail.course_slogan}}</h3>
    <div>
      <span class="subpart_toggle" id="course_total" @click="part_toggle('course_total_part')">课程概述</span>
      <span class="subpart_toggle" id="course_section" @click="part_toggle('course_section_part')">课程章节</span>
      <span class="subpart_toggle" id="offen_question" @click="part_toggle('offen_question_part')">常见问题</span>
    </div>
    <div id="course_parts">
      <div id="course_total_part">
        <ul>
          <li>课程概述: {{ course_detail.brief}}</li>
          <li>难度:  {{course_detail.level}}</li>
          <li>学习时间:  {{course_detail.period}}</li>
        </ul>
        <div>
          <table>
            <tr>
              <td v-for="item in course_detail.price_policy">
                <span class="price_policy_part"
                      @click="select_pricepolicy(item.id, item.price, item.valid_period, $event)">价格:{{item.price}}/时长:{{item.valid_period}}</span>
              </td>
            </tr>
          </table>
          <div>
            <button style="background: rgb(85, 196, 171);" @click="buy">点击购买</button>
            <button style="background: rgb(85, 196, 171);" @click="add_cart">加入购物车</button>
          </div>
        </div>
      </div>
      <div id="course_section_part" class="hides">
        <div v-for="item in course_detail.CourseChapter">
          <p>第{{item.chapter}}章，{{item.name}}</p>
          <ul>
            <li v-for="section in item.section">{{section.name}}</li>
          </ul>
        </div>
      </div>
      <div id="offen_question_part" class="hides">
        <h4>常见问题</h4>
        <ul v-for="question_answer in course_detail.offten_asked_question">
          <li>{{question_answer.question}}</li>
          <li>{{question_answer.answoer}}</li>
        </ul>
      </div>
    </div>
    <h4>为什么学习这门课程</h4>
    <ul>
      <li>{{course_detail.why_study}}</li>
    </ul>
    <h4>我将学到哪些内容</h4>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{course_detail.what_to_study_brief}}</p>
    <div>
      <div class="per-outline" v-for="item in course_detail.course_outline">
        <span>{{item.title}}</span>
        <span>{{item.content}}</span>
      </div>
    </div>
    <h4>此项目将如何有助于我的职业生涯？</h4>
    <ul>
      <li>{{course_detail.career_improvement}}</li>
    </ul>
    <h4>课程先修要求</h4>
    <ul>
      <li>{{course_detail.prerequisite}}</li>
    </ul>
    <h4>常见问题</h4>
    <ul v-for="question_answer in course_detail.offten_asked_question">
      <li>{{question_answer.question}}</li>
      <li>{{question_answer.answoer}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        course_detail: '',
        price_policy_id: '',
      }
    },
    mounted: function () {
      this.initCourseDetail()
    },
    methods: {
      initCourseDetail() {
        var nid = this.$route.params.id;
        var that = this
        var url = 'http://127.0.0.1:8081/courses/' + nid + '/';
        this.$axios.request({
          url: url,
          method: 'GET',
          responseType: 'json'
        }).then(function (response) {
          console.log(response);
          that.course_detail = response.data
        })
      },
      part_toggle(part_id) {
        var current_ele = document.getElementById(part_id);
        var course_parts = document.getElementById('course_parts').children;
        for (var ele of course_parts) {
          if (current_ele == ele) {
            current_ele.classList.remove('hides');
          } else {
            ele.classList.add('hides');
          }
        }
      },
      select_pricepolicy(id, price, valid_period, event) {
        // 这里提供了后面支付需要使用到的数据接口，即普通课程的选中销售策略
        console.log(id);
        console.log(price);
        console.log(valid_period);
        this.price_policy_id = id

        event.currentTarget.classList.add('pricepolicy_active')
        var policy_elements = document.getElementsByClassName('price_policy_part')
        for (var ele of policy_elements) {   // 切换效果
          if (ele !== event.currentTarget) {
            ele.classList.remove('pricepolicy_active')
          }
        }
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
          return;
        }
        if (!this.price_policy_id) {
          alert("请选择价格策略");
          return;
        }

        console.log(this.course_detail.price_policy)
        var that = this;
        this.$axios.request({
          url: 'http://127.0.0.1:8081/cart/?token='+this.$store.state.token,
          method: 'POST',
          data: {
            course_id: that.$route.params.id,
            policy_id: that.price_policy_id
          },
          responseType: 'json'
        }).then(function (response) {
          console.log(response.data)
          alert("购物车添加成功")
        })

      },
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hides {
    display: none;
  }

  .price_policy_part {
    display: inline-block;
    padding: 10px;
    background-color: rosybrown;

  }

  .pricepolicy_active {
    background-color: aqua;
  }

  .per-outline {

    background-color: bisque;
    padding: 20px;
  }
</style>
