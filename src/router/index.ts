import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MainView from '../views/MainView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/active',
    name: 'active',
    component: MainView,
  },
  {
    path: '/completed',
    name: 'completed',
    component: MainView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
