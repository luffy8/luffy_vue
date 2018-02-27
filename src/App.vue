<template>
  <div id="app">
    <div class="header">
        <router-link to="/index">首页</router-link>
        <router-link to="/course">课程</router-link>
        <router-link to="/micro">luffyX学位</router-link>
        <router-link to="/news">深科技</router-link>
        <div>
          <div v-if="this.$store.state.username">
          <a>{{ this.$store.state.username }}</a>
          <a @click="logout">注销</a>
        </div>
          <router-link v-else to="/login">登录</router-link>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    logout(){
      this.$store.state.username = ''
      this.$store.state.token = ''
    }
  }
}
</script>

<style>
  body{
    margin: 0;
  }
  .header{
    background: aquamarine;height: 80px;
  }
</style>
