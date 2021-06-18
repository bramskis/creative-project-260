<template>
<div>
  <section class="noteList">
    <div class="note" v-for="note in notes" v-bind:key="note._id">
        <p class="noteText">{{note.text}}</p>
        <i><p class="noteDate">{{formatDate(note.created)}}</p></i>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'NoteList',
  props: {
    notes: Array
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
.note {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px whitesmoke solid;
}

.note:hover {
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #293a4b, rgba(0, 0, 0, 0));
}

.noteText {
    text-align: center;
    font-size: 18pt;
}

.noteDate {
    font-size: 11pt;
}

</style>
