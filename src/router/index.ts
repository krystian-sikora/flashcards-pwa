import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getCurrentUser } from "vuefire";
import MenuView from "@/views/MenuView.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
    meta: {
      requiresAuth: false
    }
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
  },
  {
    path: '/newset',
    name: 'newset',
    component: () => import('../views/NewSet.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/SetsLibrary.vue')
  },
  {
    path: '/setview',
    name: 'setview',
    component: () => import('../views/SetView.vue')
  },
  {
    path: '/addflashcard',
    name: 'addflashcard',
    component: () => import('../views/AddFlashcard.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  
  if (to.meta.requiresAuth !== false) {
    if (!currentUser) {
      return {
        path: "/signup",
        name: "signup",
        component: () => import("../views/SignUp.vue"),
      };
    } 
  }
});
