import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
import IntroLayout from "../layouts/IntroLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Topic from "../views/Topic.vue";
import Content from "../views/Content.vue";
import Writer from "../views/Writer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    component: IntroLayout
  },
  {
    path: "/:inspiration",
    name: "inspiration",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Topic
      },
      {
        path: ":contentId",
        component: Content
      }
    ]
  },
  {
    path: "/topic",
    name: "topic",
    component: Topic,
    children: [
      {
        path: "more",
        component: Content
      }
    ]
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
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    console.log(to);
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes
});

export default router;
