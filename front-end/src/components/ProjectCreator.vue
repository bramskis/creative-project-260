<template>
    <div>
        <form v-if="show" @submit.prevent="create">
            <p>New Project</p>
            <input id="name" v-model="name" placeholder="Name"><br><br>
            <input id="description" v-model="description" placeholder="Description"><br><br>
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
  name: 'ProjectCreator',
  props: {
    show: Boolean,
  },
  data() {
    return {
      name: '',
      description: '',
      error: '',
    }
  },
  methods: {
    close() {
        this.name = "";
        this.description = "";
        this.$emit('close');
    },
    async create() {
      try {
        await axios.post("/api/projects", { 'name': this.name, 'description': this.description });
        this.name = "";
        this.description = "";
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
    width: 60%;
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
</style>
