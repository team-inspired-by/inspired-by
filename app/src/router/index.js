import Vue from "vue";
import VueRouter from "vue-router";
import MainIntro from "../views/MainIntro.vue";
import Topic from "../views/Topic.vue";
import Content from "../views/Content.vue";
import Writer from "../views/Writer.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "mainIntro",
    component: MainIntro
  },
  {
    path: "/topic",
    name: "topic",
    component: Topic,
    children: [{
      path: 'more',
      component: Content
    }]
  },
  {
    path: "/writer",
    name: "writer",
    component: Writer
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;