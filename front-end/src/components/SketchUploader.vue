<template>
    <div>
      <form @submit.prevent="upload">
        <legend>Upload a picture</legend>
        <input v-model="title" placeholder="Title">
        <textarea v-model="description" placeholder="Description"></textarea>
          <div class="imageInput" @click="chooseImage">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="placeholder">
              Choose an Image
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
          <button type="button" @click="close" class="clickable">Close</button>
          <button type="submit" class="clickable">Upload</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
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
        this.$emit('close');
    },
    chooseImage() {
        this.$refs.fileInput.click()
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        await axios.post("/api/photos", formData);
        this.file = null;
        this.url = "";
        this.title = "";
        this.description = "";
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }

  }
}
</script>
