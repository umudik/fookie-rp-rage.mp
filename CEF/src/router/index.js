import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Setting from "../views/Setting.vue";
import View from "../views/View.vue";
import Dashboard from "../views/Dashboard.vue";
import ApiSetting from "../views/ApiSetting.vue";

Vue.use(VueRouter);

const routes = [{
        path: "login",
        name: "login",
        component: Login,
    },
    {
        path: "View",
        name: "View",
        component: View,
    },
    {
        path: "Dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "ApiSetting",
        name: "ApiSetting",
        component: ApiSetting,
    },
    {
        path: "Setting",
        name: "Setting",
        component: Setting,
    }
]







const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;