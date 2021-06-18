<template>
<div>
  <section class="sketchList">
    <div class="sketchContainer" v-for="sketch in sketches" v-bind:key="sketch._id">
      <img :src="sketch.path" />
      <div class="sketchInfo">
        <p class="sketchDescription">{{sketch.description}}</p>
      </div>
      <i><p class="sketchDate">{{formatDate(sketch.created)}}</p></i>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SketchList',
  props: {
    sketches: Array
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
img {
    max-width: 400px;
}

.sketchContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    border-bottom: 1px #25323f solid;
}

p {
    text-align: left;
}
</style>
