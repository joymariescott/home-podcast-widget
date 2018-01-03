<template>
      <div class="podcast" :class="{ active }">
        <img class="podcastImage" :src="image">
        <h2 class="podhed">{{ title }}</h2>
        <p class="podtext">{{ chatter }}</p>
        <div class="audioContainer">
            <audio
            ref="audio"
            preload="metadata"
            v-on:timeupdate="updateTime"
            v-on:loadedmetadata="handleMetadata"
            v-on:ended="handleAudioEnd"
            v-on:ended.once="sendGAPodcastEvent(`Podcast Full Playthrough`, generatePodcastTitleForGA())"
            :src="file">
            </audio>
            <div class="controlContainer">
                <p class="play"
                v-on:click="togglePlay"
                v-on:click.once="sendGAPodcastEvent(`Podcast Play`, generatePodcastTitleForGA())">
                {{ playing ? `||` : `►`}}</p>
                <progress-bar
                :percent="calculateCurrentPlayPercentage()"
                :update-function="setTime"
                /> 
                <div class="time">
                    <span class="current">{{ getTimeAsString(currentTime) }}</span> /
                    <span class="duration">{{ getTimeAsString(duration) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
interface PodcastState {
  fourthEventSent: boolean;
  halfEventSent: boolean;
  threeQuartersEventSent: boolean;
  currentTime: number;
  duration: number;
  playing: boolean;
}

import Vue from "vue";
import ProgressBar from "./ProgressBar.vue";
import { getTimeAsString } from "../util";
import eventHub from "./eventHub";

export default Vue.extend({
  data(): PodcastState {
    return {
      fourthEventSent: false,
      halfEventSent: false,
      threeQuartersEventSent: false,
      currentTime: 0,
      duration: 0,
      playing: false
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    chatter: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  components: {
    ProgressBar
  },
  created: function() {
    eventHub.$on("reset", this.reset);
  },
  beforeDestroy: function() {
    eventHub.$off("reset", this.reset);
  },
  methods: {
    updateTime: function(event: Event) {
      const audio = event.target as HTMLAudioElement;
      this.currentTime = audio.currentTime;

      this.sendPlayPercentageEvents();
    },
    togglePlay: function(event: Event) {
      const audio = this.$refs.audio as HTMLAudioElement;
      if (this.playing) {
        audio.pause();
      } else {
        audio.play();
      }
      this.playing = !this.playing;
    },
    handleMetadata: function(event: Event) {
      const audio = event.target as HTMLAudioElement;
      this.duration = audio.duration;
    },
    calculateCurrentPlayPercentage: function(): number {
      if (this.currentTime === 0) return 0;

      return this.currentTime / this.duration * 100;
    },
    setTime: function(percentage: number): void {
      const audio = this.$refs.audio as HTMLAudioElement;
      audio.currentTime = this.duration * percentage;
    },
    handleAudioEnd: function(event: Event): void {
      this.currentTime = 0;
      this.playing = false;
    },
    sendGAPodcastEvent(action: string, label: string): void {
      if (window.ens_specialEvent) {
        window.ens_specialEvent("Podcasts", action, label);
      }
    },
    generatePodcastTitleForGA: function(): string {
      return `${this.$props.title} - ${new Date().toLocaleDateString()}`;
    },
    sendPlayPercentageEvents: function(): void {
      const currentPlayPercentage = this.calculateCurrentPlayPercentage();
      if (currentPlayPercentage < 25) return;
      const podcastTitle = this.generatePodcastTitleForGA();

      if (currentPlayPercentage >= 25 && !this.fourthEventSent) {
        this.sendGAPodcastEvent("Podcast 1/4 Playthrough", podcastTitle);
        this.fourthEventSent = true;
      } else if (currentPlayPercentage >= 50 && !this.halfEventSent) {
        this.sendGAPodcastEvent("Podcast 1/2 Playthrough", podcastTitle);
        this.halfEventSent = true;
      } else if (currentPlayPercentage >= 75 && !this.threeQuartersEventSent) {
        this.sendGAPodcastEvent("Podcast 3/4 Playthrough", podcastTitle);
        this.threeQuartersEventSent = true;
      }
    },
    reset: function(): void {
      const audio = this.$refs.audio as HTMLAudioElement;
      audio.pause();
      this.playing = false;
      // Use if you want to also reset the time.
      // audio.currentTime = 0;
      // this.currentTime = 0;
    },
    getTimeAsString: getTimeAsString
  }
});
</script>


<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.podcast {
  display: none;
}
.podcast.active {
  animation: fadeIn 0.5s linear;
  display: block;
}
.podcastImage {
  float: left;
  padding-right: 10px;
  width: 72px;
}

.podtext {
  line-height: 20px;
  margin-bottom: 0;
}

.audioContainer {
  margin: .5em 0;
}

.controlContainer {
  clear: both;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.controlContainer .play {
  cursor: pointer;
  font-weight: bold;
}

.controlContainer .time,
.controlContainer .play {
  margin: auto 0;
}
</style>
