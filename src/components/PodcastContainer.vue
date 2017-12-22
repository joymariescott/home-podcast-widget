<template>
  <podcast
    image="http://ww1.hdnux.com/photos/70/05/35/14702404/4/500x500.jpg"
    chatter="Test chatter"
    file="http://www.expressnews.com/file/261/7/2617-END122217.mp3"
  />
</template>
<script lang="ts">
import Vue from "vue";
import Podcast from "./Podcast.vue";

export default Vue.extend({
  components: {
    Podcast
  }
});
</script>
