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
    component:Home
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/detail/:id',
    component: Detail
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
