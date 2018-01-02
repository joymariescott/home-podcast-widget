import Vue from "vue";
import PodcastContainer from './components/PodcastContainer.vue';

const v = new Vue({
    el: "#home-podcast-root",
    template: `
        <podcast-container/>
    `,
    components: {
        PodcastContainer
    }
});
