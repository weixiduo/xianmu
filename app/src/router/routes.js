import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Trade from "@/pages/Trade"
import Pay from '@/pages/Pay'
import PaySuccess from "@/pages/PaySuccess"
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupBuy from '@/pages/Center/groupOrder'


export default[{ 
       
    name: 'detail',  // 是当前路由的标识名称
    path: '/detail/:skuid',
    component: Detail,
        },
        {
            path: '/center',
            component: Center,
            children: [
              {
                // path: '/center/myorder',
                path: 'myorder',
                component: MyOrder,
              },
              {
                path: 'groupbuy',
                component: GroupBuy,
              },
        
              {
                path: '',
                redirect: 'myorder'
              }
            ]
          },
        
        {
            path:'/pay',
            component:Pay,
        },
        {
            name:'paysuccess',
            path:'/paysuccess',
            component:PaySuccess
        },
        {
            path:'/trade',
            component:Trade,
            name:'trade'
        },
        {
            path:'/shopcart',
            component:ShopCart,
            name:'shopcart',
            meta:{show:true}
        },
        {
            path:'/addcartsuccess',
            component:AddCartSuccess,
            name:'addcartsuccess',
            meta:{show:true}
        },
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search',
            component:resolve => require(['@/pages/Search'],resolve),
            name:'search',
            meta:{show:true}
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        //重定向，在项目跑起来的时候，访问/。立马让他定向到首页
     {
         path:'*',
         redirect:'/home'
     }
]