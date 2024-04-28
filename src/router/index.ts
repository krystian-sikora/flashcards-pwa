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
    path: '/sets/:name/study',
    name: 'study',
    props: true,
    component: () => import('../views/StudyView.vue')
  },
  {
    path: '/sets/new',
    name: 'newset',
    component: () => import('../views/NewSet.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/SetsLibrary.vue')
  },
  {
    path: '/sets/:name',
    name: 'setview',
    props: true,
    component: () => import('../views/SetView.vue')
  },
  {
    path: '/sets/new/:name',
    name: 'addflashcard',
    props: true,
    component: () => import('../views/AddFlashcard.vue')
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: () => import('../views/PasswordResetView.vue'),
    meta: {
      requiresAuth: false
    }
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  
  if (to.meta.requiresAuth !== false && !currentUser) {
    return {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUp.vue"),
    };
  }
  if (currentUser && to.meta.requiresAuth === false) {
    return {
      path: "/menu",
      name: "menu",
      component: MenuView,
    };
  }

});
