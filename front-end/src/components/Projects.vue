<template>
<div class="main">
  <div class="menu">
    <div class="createArea">
      <p v-if="!show"><a class="clickable" @click="toggleCreate">+ New Project</a></p><br>
      <project-creator :show="show" @close="close" @createFinished="createFinished" />
      <br><br>
    </div>
    <div class="logoutContainer">
      <p class="username">{{user.firstName}} {{user.lastName}}</p>
      <a class="clickable" @click="logout">Logout</a>
    </div>
  </div>
  <project-list :projects="projects" />
  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
//import Uploader from '@/components/Uploader.vue';
import ProjectList from './ProjectList.vue';
import ProjectCreator from './ProjectCreator.vue';

export default {
  name: 'Projects',
  components: {
    //Uploader,
    ProjectList,
    ProjectCreator
  },
  data() {
    return {
      show: false,
      projects: [],
      error: '',
    }
  },
  created() {
    this.getProjects();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getProjects() {
      try {
        this.response = await axios.get("/api/projects");
        this.projects = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleCreate() {
      this.show = true;
    },
    async createFinished() {
      this.show = false;
      this.getProjects();
    },
  }
}
</script>

<style>
h2, p {
    color: white;
    text-decoration: none;
}

.logoutContainer {
  float: right;
  float: top;
  margin-right: 60px;
  padding-left: 40px;
  margin-top: -60px;
  position: sticky;
}

.clickable {
  cursor: pointer;
  border: 1px white solid;
  border-radius: 4px;
  padding: 3px;
  padding-left: 9px;
  padding-right: 9px;
  background-color: #2c3e50;
  color: white;
}

.clickable:hover {
  background-color: #293a4b;
}

.createArea {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
}
</style>
