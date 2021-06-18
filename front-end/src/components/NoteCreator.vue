<template>
    <div>
        <form v-if="show" @submit.prevent="create">
            <p>New Note</p>
            <textarea id="text" v-model="text" placeholder="Add a new note..."></textarea><br><br>
            <p v-if="error" class="error">{{error}}</p>
            <button class="clickable" style="margin-right: 50px;" type="button" @click="close">Cancel</button>
            <button class="clickable" type="submit">Create</button>
            <br><br>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NoteCreator',
  props: {
    show: Boolean,
  },
  data() {
    return {
      text: '',
      error: '',
    }
  },
  methods: {
    close() {
        this.text = "";
        this.$emit('close');
    },
    async create() {
      try {
        await axios.post("/api/projects/" + this.$route.params.id + "/notes", { 'text': this.text });
        this.text = "";
        this.$emit('createFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }

  }
}
</script>

<style scoped>
form {
    width: 80%;
    background-color: #293a4b;
    box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
    font-size: 24px;
    color: white;
}

::placeholder {
    color: #ccc;
}

input {
    font-size: 24px;
    background-color: #2c3e50;
    border-radius: 5px;
    color: white !important;
    border: solid 1px white;
    margin: 7px;
    padding: 15px;
    width: 75%;
}

#name {
    text-align: center;
    width: 45%;
}

#description {
    height: 100px;
}

div {
    display: flex;
    justify-content: center;
}

button {
    font-size: 20px;
}

#text {
  height: 150px;
  width: 90%;
  background-color: #2c3e50;
  border-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
  resize: vertical;
  color: whitesmoke;
  font-size: 20px;
  word-break: break-word;
}
</style>
