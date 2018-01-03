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
    <h3>More podcasts:</h3>
    <div class="moreContainer">
      <img
      v-for="(podcast, index) in podcasts"
      :class="{active: index === currentPodcastIndex}"
      :key="index"
      :src="podcast.image"
      v-on:click="updatePodcastIndex(index)"
      />
    </div>
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
  computed: {
    previousPodcastTitle(): string {
      if (this.currentPodcastIndex === 0) {
        return this.podcasts[this.podcasts.length - 1].title;
      } else {
        return this.podcasts[this.currentPodcastIndex - 1].title;
      }
    },
    nextPodcastTitle(): string {
      if (this.currentPodcastIndex === this.podcasts.length - 1) {
        return this.podcasts[0].title;
      } else {
        return this.podcasts[this.currentPodcastIndex + 1].title;
      }
    }
  },
  mounted(): void {
    let feeds: string[] = window.location.protocol.includes("https")
      ? httpsPodcastFeedUrls
      : httpPodcastFeedUrls;

    const podcastData = feeds.map(async (url: string) => {
      const podcast: IPodcast = await getPodcast(url);
      const { meta, episodes } = podcast;

      return {
        title: meta.title,
        image: meta.imageURL,
        chatter: meta.description,
        file: episodes[0].audioFileURL
      };
    });

    Promise.all(podcastData)
      .then(loadedPodcasts => {
        this.podcasts = loadedPodcasts;
      })
      .catch(error => {
        this.podcasts = fallbackPodcastData;
      });
  },
  methods: {
    emitReset: function(): void {
      eventHub.$emit("reset");
    },
    updatePodcastIndex: function(newIndex: number): void {
      this.currentPodcastIndex = newIndex;
      this.emitReset();
    }
  }
});
</script>
<style>
.podcastContainer .more {
  cursor: pointer;
  text-decoration: underline;
}
.moreContainer {
  display: flex;
  flex-flow: row wrap;
}
.moreContainer img {
  cursor: pointer;
  flex-basis: 20%;
  max-height: 72px;
  max-width: 72px;
}
.moreContainer .active {
  display: none;
}
</style>
