import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
import IntroLayout from "../layouts/IntroLayout.vue";
import TopicLayout from "../layouts/TopicLayout.vue";
import ProjectLayout from "../layouts/ProjectLayout.vue";
import PostLayout from "../layouts/PostLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import TestLayout from "../layouts/TestLayout.vue";
import TreeviewLayout from "../layouts/TreeviewLayout.vue";
import Topic from "../views/Topic.vue";
import Content from "../views/Content.vue";
import Project from "../views/Project.vue";
import AdminPost from "../views/AdminPost.vue";
import AdminUser from "../views/AdminUser.vue";
import AdminProject from "../views/AdminProject.vue";
import AdminStatistics from "../views/AdminStatistics.vue";
import AdminGeneral from "../views/AdminGeneral.vue";
import AdminData from "../views/AdminData.vue";
import Treeview from "../views/Treeview.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "intro",
    component: IntroLayout
  },
  {
    path: "/invitation",
    name: "invitation",
    component: () =>
      import("../layouts/InvitationLayout.vue")
  },
  {
    path: "/test",
    name: "test",
    component: TestLayout
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/treeview",
    name: "treeview",
    component: TreeviewLayout,
    children: [{
      path: "",
      name: "treeview",
      component: Treeview,
    }]
  },
  {
    path: "/auth",
    name: "auth",
    component: () =>
      import("../views/Auth.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    children: [{
        path: "",
        component: AdminStatistics
      },
      {
        path: "post",
        name: "writer",
        component: AdminPost
      },
      {
        path: "project",
        name: "admin",
        component: AdminProject
      },
      {
        path: "user",
        name: "admin",
        component: AdminUser
      },
      {
        path: "statistics",
        name: "admin",
        component: AdminStatistics
      },
      {
        path: "general",
        name: "admin",
        component: AdminGeneral
      },
      {
        path: "data",
        name: "admin",
        component: AdminData
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
  // {
  //   path: "/post",
  //   components: {
  //     postcard: PostLayout
  //   },
  //   children: [{
  //     path: ":post",
  //     name: "postpage",
  //     component: Post
  //   }]
  // },
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
        // components: {
        //   postdetail: Post
        // }
      }]
    }]
  }
];

// const pagePosition = {
//   'intro': 1,
//   'topic': 1000
// }
// const timing = {
//   'topic': 5000
// }
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // scrollBehavior: (to, from, savedPosition) => {
  //   // return {
  //   //   x: 0,
  //   //   y: 0
  //   // };
  //   return null;
  // },
  // scrollBehavior: (to, from, savedPosition) => {
  //   // console.log("inroute, scrollBehavior from", from.name, ", to ", from.name);
  //   // let scrollTo = 0;
  //   // if (to.hash) {
  //   //   scrollTo = to.hash;
  //   // } else if (savedPosition) {
  //   //   scrollTo = savedPosition.y;
  //   // }

  //   // pagePosition[from.name] = savedPosition.y;

  //   var timing = store.getters.getTiming
  //   console.log(`timing: ${timing}`);
  //   setTimeout(() => {
  //     var position = store.getters.getPosition
  //     console.log(`scrollTo: ${position[to.name] | 0}`)
  //     window.scrollTo({
  //       top: position[to.name] | 0,
  //       left: 0,
  //       behavior: "smooth"
  //     });
  //   }, (timing[to.name] | 1000));

  //   return;
  //   // return goTo(scrollTo);
  // },
  routes
});

router.beforeEach((to, from, next) => {
  document.getElementsByTagName("html")[0].style.overflowX = "hidden";
  document.getElementsByTagName("html")[0].style.overflowY = "auto";
  console.log(`route from ${from.name} to ${to.name}`)
  let animation = true;

  switch (from.name) {
    case 'intro':
      switch (to.name) {
        case 'topic':
          break;

        default:
          break;
      }
      break;

    case 'topic':
      switch (to.name) {
        case 'post':
          document.getElementsByTagName("html")[0].style.overflowY = "hidden";
          animation = false
          break;
        case 'intro':
          break;
        default:
          break;
      }
      break;

    case 'post':
      switch (to.name) {
        case 'topic':
          store.commit("openPost", false);
          animation = false
          break;

        default:
          break;
      }
      break;

    case 'admin':
      store.commit("setTopic", "");
      switch (to.name) {
        case 'admin':
          animation = false
          break;
      }
      break;

    case 'writer':
      store.commit("setTopic", "");
      switch (to.name) {
        case 'admin':
          animation = false
          break;
      }
      break;

    default:
      break;
  }
  store.commit("movePage", {
    from: from.name,
    to: to.name,
    routingAnimation: animation
  });

  var timing = 1000;
  setTimeout(() => {
    next();
  }, animation ? timing : 10);
});

// router.beforeEach((to, from, next) => {
//   console.log("beforeEach exeuted from: ", from.name);
//   console.log("to", to.name);

//   if (
//     to.name == "post" ||
//     from.name == "post" ||
//     to.name == "postpage" ||
//     from.name == "postpage"
//   ) {
//     console.log("ignoring scrolling");
//     next();
//     return;
//   }
//   store.commit("movePage", to.name);
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth"
//   });
//   // console.log("scrolled");

//   var timing = 1000;
//   setTimeout(() => {
//     next();
//   }, timing);
//   next();
// });

export default router;