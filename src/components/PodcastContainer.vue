<template>
<div>
  <podcast
    v-for="(podcast, index) in podcasts"
    :image="podcast.image"
    :chatter="podcast.chatter"
    :file="podcast.file"
    :key="index"
  />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Podcast from "./Podcast.vue";
import {
  Podcast as IPodcast,
  PodcastMeta,
  PodcastEpisode,
  getPodcast
} from "libsyn-feed-parser";
import { podcastFeedUrls } from "../constants";

export default Vue.extend({
  components: {
    Podcast
  },
  data() {
    return {
      podcasts: []
    };
  },
  mounted() {
    podcastFeedUrls.forEach(async (url: string) => {
      try {
        const podcast: IPodcast = await getPodcast(url);
        const { meta, episodes } = podcast;

        this.podcasts.push({
          image: meta.imageURL,
          chatter: meta.description,
          file: episodes[0].audioFileURL
        });
      } catch (e) {}
    });
  }
});
</script>
