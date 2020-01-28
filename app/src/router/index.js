import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
import IntroLayout from "../layouts/IntroLayout.vue";
import TopicLayout from "../layouts/TopicLayout.vue";
import ProjectLayout from "../layouts/ProjectLayout.vue";
import PostLayout from "../layouts/PostLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import TestLayout from "../layouts/TestLayout.vue";
import Topic from "../views/Topic.vue";
import Content from "../views/Content.vue";
import Project from "../views/Project.vue";
import Post from "../views/Post.vue";
import Writer from "../views/Writer.vue";
import AdminPost from "../views/AdminPost.vue";
import AdminUser from "../views/AdminUser.vue";
import AdminProject from "../views/AdminProject.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "intro",
    component: IntroLayout
  },
  {
    path: "/writer",
    name: "writer",
    component: Writer
  },
  {
    path: "/test",
    name: "test",
    component: TestLayout
  }, {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    children: [{
        path: "",
        component: AdminPost
      },
      {
        path: "post",
        component: AdminPost
      },
      {
        path: "project",
        component: AdminProject
      },
      {
        path: "user",
        component: AdminUser
      }
    ]
  },
  {
    path: "/project",
    name: "project",
    component: ProjectLayout,
    children: [{
      path: ":project",
      name: "git",
      component: Project
    }]
  },
  {
    path: "/post",
    components: {
      postcard: PostLayout
    },
    children: [{
      path: ":post",
      name: 'postpage',
      component: Post
    }]
  },
  {
    path: "/topic",
    component: TopicLayout,
    children: [{
      path: ":inspiration",
      name: "topic",
      component: Topic,
      children: [{
        path: ":post",
        name: "post",
        components: {
          postcard: Post
        }
      }]
    }]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    console.log('inroute, scrollBehavior:', to);
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

router.beforeEach((to, from, next) => {
  console.log('beforeEach exeuted from: ', from.name)
  console.log('to', to.name)

  if ((to.name == 'post') || (from.name == 'post') || (to.name == 'postpage') || (from.name == 'postpage')) {
    next();
    return;
  }
  store.commit('movePage', to.name);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });

  var timing = 1000;
  setTimeout(() => {
    next();
  }, timing);
});

export default router;