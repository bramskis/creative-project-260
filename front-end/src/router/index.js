import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Project from "../views/Project.vue";
import Note from "../views/Note.vue";
import Sketch from "../views/Sketch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
  },
  {
    path: "/note/:id",
    name: "Note",
    component: Note,
  },
  {
    path: "/sketch/:id",
    name: "Sketch",
    component: Sketch,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
