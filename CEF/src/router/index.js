import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Setting from "../views/Setting.vue";
import View from "../views/View.vue";
import ApiSetting from "../views/ApiSetting.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [{
    path: "login",
    name: "login",
    component: Login,
},

{
    path: "game",
    name: "game",
    component: Game,
},
{
    path: "View",
    name: "View",
    component: View,
},
{
    path: "api",
    name: "api",
    component: ApiSetting,
},
{
    path: "setting",
    name: "setting",
    component: Setting,
}
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;