<template>
<div>
  <podcast
    v-for="(podcast, index) in podcasts"
    :title="podcast.title"
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
import {
  httpPodcastFeedUrls,
  httpsPodcastFeedUrls,
  fallbackPodcastData
} from "../constants";

export default Vue.extend({
  components: {
    Podcast
  },
  data() {
    return {
      podcasts: []
    };
  },
  mounted(): void {
    let feeds: string[] = window.location.protocol.includes("https")
      ? httpsPodcastFeedUrls
      : httpPodcastFeedUrls;
    feeds.forEach(async (url: string) => {
      try {
        const podcast: IPodcast = await getPodcast(url);
        const { meta, episodes } = podcast;

        this.podcasts.push({
          title: meta.title,
          image: meta.imageURL,
          chatter: meta.description,
          file: episodes[0].audioFileURL
        });
      } catch (error) {
        this.podcasts = fallbackPodcastData;
      }
    });
  }
});
</script>
