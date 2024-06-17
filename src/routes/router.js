import { createRouter, createWebHashHistory } from "vue-router"

// 页面导入
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import RegisterPage from "@/views/RegisterPage.vue"
import UserPage from "@/views/UserPage.vue"
import FlightPage from "@/views/FlightPage.vue"
import BuyTicketPage from "@/views/BuyTicketPage.vue"
import checkFlightPage from "@/views/checkFlightTime.vue"

import CompanyPage from "@/views/company/CompanyPage.vue"
import CompanyManage from "@/views/company/companyManage.vue"
import CompanySelfManage from "@/views/company/companySelfManage.vue"

import TouristHome from "@/views/tourist/touristHome.vue"
import TouristSelfInformation from "@/views/tourist/touristSelfInformation.vue"
import TouristTicketManage from "@/views/tourist/touristTicketManagement.vue"
import TouristOrderManage from "@/views/tourist/touristOrderManagement.vue"
import TouristPurchaseManage from "@/views/tourist/touristPurchaseManage.vue"
import TouristSelfManage from "@/views/tourist/touristSelfManagement.vue"

import MerchantHome from "@/views/merchant/merchantHome.vue"
import MerchantGoodsManage from "@/views/merchant/merchantGoodsManage.vue"
import MerchantSelfManage from "@/views/merchant/merchantSelfManage.vue"
import MerchantOrderManage from "@/views/merchant/merchantOrderManage.vue"

import AdminHome from "@/views/admin/adminHome.vue"
import AdminSelfManage from "@/views/admin/adminSelfManage.vue"
import AdminLuggageManage from "@/views/admin/adminLuggageManage.vue"
import AdminParkingManage from "@/views/admin/adminParkingManage.vue"
import AdminApplyManage from "@/views/admin/adminApplyManage.vue"

const routes = [
    {
        name: "HomePage",
        path: '/',
        component: HomePage
    },

    {
        name: "LoginPage",
        path: '/login',
        component: LoginPage
    },

    {
        name: "RegisterPage",
        path: '/register',
        component: RegisterPage
    },

    {
        name: "UserPage",
        path: '/user',
        component: UserPage
    },

    {
        name: "FlightPage",
        path: '/flight',
        component: FlightPage
    },

    {
        name: "BuyTicketPage",
        path: '/buyTicket',
        component: BuyTicketPage
    },

    {
        name: "checkFlightTime",
        path: '/checkflight',
        component: checkFlightPage
    },
    

    {
        name: "CompanyPage",
        path: '/company',
        component: CompanyPage,
    },

    {
        name: "CompanyManage",
        path: '/company/manage',
        component: CompanyManage,
    },

    {
        name: "CompanySelfManage",
        path: '/company/selfmanage',
        component: CompanySelfManage,
    },

    {
        name: "TouristHome",
        path: '/tourist',
        component: TouristHome,
    },


    {
        name: "TouristSelfInformation",
        path: '/tourist/touristSelfInformation',
        component: TouristSelfInformation,
    },

    {
        name: "TouristTicketManage",
        path: '/tourist/ticketmanage',
        component: TouristTicketManage,
    },

    {
        name: "TouristOrderManage",
        path: '/tourist/ordermanage',
        component: TouristOrderManage,
    },

    {
        name: "TouristPurchaseManage",
        path: '/tourist/purchasemanage',
        component: TouristPurchaseManage,
    },

    {
        name: "TouristSelfManage",
        path: '/tourist/selfmanage',
        component: TouristSelfManage,
    },

    {
        name: "MerchantHome",
        path: '/merchant',
        component: MerchantHome,
    },

    {
        name: "MerchantGoodsManage",
        path: '/merchant/goodsmanage',
        component: MerchantGoodsManage,
    },

    {
        name: "MerchantSelfManage",
        path: '/merchant/selfmanage',
        component: MerchantSelfManage,
    },

    {
        name: "MerchantOrderManage",
        path: '/merchant/ordermanage',
        component: MerchantOrderManage,
    },

    {
        name: "AdminHome",
        path: '/admin',
        component: AdminHome,
    },

    {
        name: "AdminSelfManage",
        path: '/admin/selfmanage',
        component: AdminSelfManage,
    },

    {
        name: "AdminLuggageManage",
        path: '/admin/luggagemanage',
        component: AdminLuggageManage,
    },

    {
        name: "AdminParkingManage",
        path: '/admin/parkingmanage',
        component: AdminParkingManage,
    },

    {
        name: "AdminApplyManage",
        path: '/admin/applymanage',
        component: AdminApplyManage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;