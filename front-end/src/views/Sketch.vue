<template>
    <div>
        hi
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'photo',
    data() {
        return {
            photo: null,
        };
    },
    created() {
        this.getPhoto();
    },
    methods: {
        async getPhoto() {
            try {
                let response = await axios.get("/api/photos/" + this.$route.params.id);
                this.photo = response.data;
            } catch (error) {
                console.log(error);
            }
        },
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
.image {
    max-width: 75vw;
}

.photoTitle {
    font-weight: bolder;
    font-size: 24px;
}
</style>