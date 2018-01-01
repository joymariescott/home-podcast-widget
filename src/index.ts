import Vue from "vue";
import PodcastContainer from './components/PodcastContainer.vue';

const v = new Vue({
    el: "#root",
    template: `
        <podcast-container/>
    `,
    components: {
        PodcastContainer
    }
});
