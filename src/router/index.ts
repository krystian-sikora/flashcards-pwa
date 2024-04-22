import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getCurrentUser } from "vuefire";
import MenuView from "@/views/MenuView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('../views/StudyView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  
  if (to.meta.requiresAuth) {
    if (!currentUser) {
      return {
        path: "/signup",
        name: "signup",
        component: () => import("../views/SignUp.vue"),
      };
    } 
  }
});
