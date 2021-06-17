<template>
<div>
  <section class="projectList">
    <div class="project" v-for="project in projects" v-bind:key="project._id">
      <router-link :to="{ name: 'Project', params: { id: project._id }}" class="link">
        <div class="projectInfo">
          <h2 class="projectName">{{project.name}}</h2>
          <p class="projectDescription">{{project.description}}</p>
        </div>
        <p class="projectDate">{{formatDate(project.created)}}</p>
      </router-link>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ProjectList',
  props: {
    projects: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.projectList {
    margin-bottom: 50px;
    text-decoration: none;
}

.project {
    margin: auto;
    padding-bottom: 5px;
    margin-bottom: 0px;
    border-top: 1px whitesmoke solid;
    width: 70%;
    height: fit-content;
    min-height: 100px;
    text-decoration: none;
}

.project:hover {
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #293a4b, rgba(0, 0, 0, 0));
}

.projectDate {
    font-style: italic;
}

h2, p, link {
    color: white;
    text-decoration: none;
}
</style>
