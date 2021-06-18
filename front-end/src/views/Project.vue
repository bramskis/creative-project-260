<template>
    <div v-if="project" class="container">
        <div class="projectInfo">
          <span class="projectName">{{project.name}}</span><br>
          <p class="projectDescription">{{project.description}}</p>
          <i><p class="projectDate">Created {{formatDate(project.created)}}</p></i>
          <hr><br><br>
          <sketch-list :sketches="sketches" />
        </div>

        <div class="contentArea">
            <span v-if="!showNote && !showSketch" style="margin-right: 70px; margin-left: -80px;"><a class="clickable" @click="toggleNoteCreator">+ New Note</a></span>
            <span v-if="!showNote && !showSketch"><a class="clickable" @click="toggleSketchUploader">+ Add Sketch</a></span><br>
            <note-creator :show="showNote" @close="close" @createFinished="createFinished" />
            <sketch-uploader :show="showSketch" @close="close" @createFinished="createFinished" />
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
import SketchList from '../components/SketchList.vue';
import SketchUploader from '../components/SketchUploader.vue';

export default {
    name: 'project',
    components: {
        NoteList,
        NoteCreator,
        SketchList,
        SketchUploader
    },
    data() {
        return {
            project: null,
            showNote: false,
            showSketch: false,
            notes: [],
            sketches: [],
            error: '',
        };
    },
    created() {
        this.getCurrentProject();
        this.getNotes();
        this.getSketches();
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
        async getSketches() {
            try {
                this.response = await axios.get("/api/projects/" + this.$route.params.id + "/sketches");
                this.sketches = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        close() {
            this.showNote = false;
            this.showSketch = false;
        },
        toggleNoteCreator() {
            this.showNote = true;
        },
        toggleSketchUploader() {
            this.showSketch = true;
        },
        async createFinished() {
            this.showNote = false;
            this.showSketch = false;
            this.getNotes();
            this.getSketches();
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
    margin-left: 100px;
    word-wrap: break-word;
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
    margin-left: 80px;
}
</style>