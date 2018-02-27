import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Course from '@/components/Course'
import Micro from '@/components/Micro'
import News from '@/components/News'
import CourseDetail from '@/components/CourseDetail'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/course-detail/:id/',
      name: 'courseDetail',
      component: CourseDetail
    },
    {
      path: '/micro',
      name: 'micro',
      component: Micro
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history'
})
