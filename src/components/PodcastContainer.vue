<template>
  <div class="podcastContainer">
    <podcast
      v-for="(podcast, index) in podcasts"
      :title="podcast.title"
      :image="podcast.image"
      :chatter="podcast.chatter"
      :file="podcast.file"
      :active="currentPodcastIndex === index"
      :key="index"
    />
    <button v-on:click="handleDecrement">Previous</button>
    <button v-on:click="handleIncrement">Next</button>
    <p>Check out <a href="http://www.expressnews.com/podcasts/" title="Express-News podcasts">our podcast page</a> for more.</p>
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
import eventHub from "./eventHub";

export default Vue.extend({
  components: {
    Podcast
  },
  data() {
    return {
      podcasts: [],
      currentPodcastIndex: 0
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
  },
  methods: {
    handleIncrement: function(): void {
      this.incrementPodcastIndex();
      this.emitReset();
    },
    handleDecrement: function(): void {
      this.decrementPodcastIndex();
      this.emitReset();
    },
    emitReset: function(): void {
      eventHub.$emit("reset");
    },
    incrementPodcastIndex: function(): void {
      if (this.currentPodcastIndex === this.podcasts.length - 1) {
        this.currentPodcastIndex = 0;
      } else {
        this.currentPodcastIndex++;
      }
    },
    decrementPodcastIndex: function(): void {
      if (this.currentPodcastIndex === 0) {
        this.currentPodcastIndex = this.podcasts.length - 1;
      } else {
        this.currentPodcastIndex--;
      }
    }
  }
});
</script>
