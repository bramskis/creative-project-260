<template>
    <div v-if="project" class="container">
        <div class="projectInfo">
          <span class="projectName">{{project.name}}</span><br>
          <p class="projectDescription">{{project.description}}</p>
          <i><p class="projectDate">Created {{formatDate(project.created)}}</p></i>
        </div>

        <div class="contentArea">
            <p v-if="!show"><a class="clickable" @click="toggleCreate">+ New Note</a></p><br>
            <note-creator :show="show" @close="close" @createFinished="createFinished" />
            <br><br>
            <div id="contentContainer">
            <note-list :notes="notes" />
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import NoteList from '../components/NoteList.vue';
import NoteCreator from '../components/NoteCreator.vue';

export default {
    name: 'project',
    components: {
        NoteList,
        NoteCreator
    },
    data() {
        return {
            project: null,
            show: false,
            notes: [],
            error: '',
        };
    },
    created() {
        this.getCurrentProject();
        this.getNotes();
    },
    methods: {
        async getCurrentProject() {
            try {
                let response = await axios.get("/api/projects/" + this.$route.params.id);
                this.project = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getNotes() {
            try {
                this.response = await axios.get("/api/projects/" + this.$route.params.id + "/notes");
                this.notes = this.response.data;
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
            this.getNotes();
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
.container {
    display: flex;
    flex: number;
    margin-top: 30px;
}

.projectInfo {
    flex: 1;
    text-align: left;
    margin-left: 120px;
}

.projectName {
    font-size: 50pt;
    font-weight: bolder;
}

.projectDescription {
    font-size: 25pt;
}

.contentArea {
    flex: 3;
}
</style>