<template>
    <div v-if="show">
      <form @submit.prevent="upload">
        <h3 id="title">Upload a sketch</h3><br>
        
          <div class="uploader">
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <br><br>
          <input v-model="description" placeholder="Description"><br>
          <p v-if="error" class="error">{{error}}</p><br>
          <button type="button" @click="close" class="clickable" style="margin-right: 50px;">Close</button>
          <button type="submit" class="clickable">Upload</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SketchUploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      description: '',
      url: '',
      file: null,
      error: '',
    }
  },
  methods: {
    fileChanged(event) {
        this.file = event.target.files[0];
        this.url = URL.createObjectURL(this.file);
    },
    close() {
        this.description = '',
        this.url = '',
        this.file = '',
        this.error = '',
        this.$emit('close');
    },
    async upload() {
      try {
        console.log('hi');
        const formData = new FormData();
        formData.append('sketch', this.file, this.file.name);
        formData.append('description', this.description);
        await axios.post("/api/projects/" + this.$route.params.id + "/sketches", formData);
        this.file = null;
        this.url = "";
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

form {
    width: 80%;
    background-color: #293a4b;
    box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
    font-size: 24px;
    color: white;
    padding-top: 15px;
    padding-bottom: 30px;
}

img {
    max-width: 500px;
}

</style>
