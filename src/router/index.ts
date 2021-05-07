import authService from "@/service/auth-service";
import storageService from "@/service/storage-service";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import adminRoutes from "./routes/admin";
import homeRoutes from "./routes/home";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "homePage" */ "../views/Home/HomePage.vue"),
    children: homeRoutes,
  },
  {
    path: "/admin",
    component: () =>
      import(
        /* webpackChunkName: "adminPage" */ "../views/Admin/AdminPage.vue"
      ),
    children: adminRoutes,
    beforeEnter: (to, from, next) => {
      authService
        .validateToken()
        .then(() => {
          const user = storageService.extractUser();
          if (user) {
            if (user?.role.indexOf("ROLE_ADMIN") !== -1) {
              next();
            } else {
              next({ path: "/" });
            }
          }
          next();
        })
        .catch(() => {
          next({ path: "/login" });
        });
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginAdmin.vue"),
    beforeEnter: (to, from, next) => {
      const token = storageService.getToken();
      if (token) {
        next({ path: from.path });
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
