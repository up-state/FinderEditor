import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Finder from '../views/Finder.vue';
import Results from '../views/Results.vue';
import Test from '../views/Test.vue';
import Start from '../views/Start.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login Seite',
    },
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    meta: {
      title: 'Editor',
    },
  },

  {
    path: '/finder',
    name: 'Finder',
    component: Finder,
    meta: {
      title: 'Förderfinder',
    },
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    meta: {
      title: 'Deine Resultate',
    },
    children: [
      {
        path: '/results/:cathegorie',
        component: Results,
        meta: {
          title: 'Deine Resultate',
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      title: 'Testtitle',
    },
    children: [
      {
        path: '/test/:cathegorie',
        component: Test,
        meta: {
          title: 'Test',
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
