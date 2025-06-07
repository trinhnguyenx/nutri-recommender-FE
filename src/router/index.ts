import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    redirect: "/login", 
  },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/register",
    component: () => import("../views/register/index.vue"),
  },
  {
    path: "/menu-home",
    component: () => import("../views/landingpage/index.vue")
  },
  {
    path: "/caculate-calories",
    component: () => import("../views/form/index.vue"),
  }
  ,
  {
    path: "/recommend/:id",
    name: "Recommend",
    component: () => import("../views/menurecommend/index.vue"),
  },
  {
    path: "/chatbot",
    component: () => import("../views/chatbot/index.vue"),
  },
  {
    path: "/account-details",
    component: () => import("../views/account-details/index.vue"),
  },
  {
    path: "/payment-prenium",
    component: () => import("../views/payos/index.vue"),
  },
  {
    path: "/payment-success",
    component: () => import("../views/payos/status/payment.success.vue"),
  },
  {
    path: "/payment-cancel",
    component: () => import("../views/payos/status/payment.cancel.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
