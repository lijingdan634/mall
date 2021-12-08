import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('@/views/home/Home') 
const Cart = ()=> import('@/views/cart/Cart') 
const Profile = ()=> import('@/views/profile/Profile') 
const Category = ()=> import('@/views/category/Category') 
const Detail = ()=> import('@/views/detail/Detail')
//1.使用路由
Vue.use(VueRouter)

var routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      TabBarShow: true,
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      TabBarShow: true,
    }
  },
  {
    path:'/category',
    component:Category,
    meta:{
      TabBarShow: true,
    }
  },
  {
    path:'/cart',
    component:Cart,
    meta:{
      TabBarShow: true,
    }
  },
  {
    path:'/detail/:id',
    component: Detail,
    meta:{
      TabBarShow: false,
    }
  }
]

var router = new VueRouter({
  routes,
  mode:'history'
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err=>err)
}
export default router
