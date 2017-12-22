<template>
      <div class="podContainer">
        <img class="podcastImage" :src="image">
        <h2 class="podhed">Start your day with local news</h2>
        <p class="podtext">{{ chatter }}</p>
        <div class="audioContainer">
            <audio
            ref="audio"
            preload="metadata"
            v-on:timeupdate="updateTime"
            v-on:loadedmetadata="handleMetadata"
            :src="file">
            </audio>
            <div class="controlContainer">
                <p class="play" v-on:click="togglePlay">{{ playing ? `||` : `►`}}</p>
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
    }
  },
  components: {
    ProgressBar
  },
  methods: {
    updateTime: function(event: Event) {
      const audio = event.target as HTMLAudioElement;
      this.currentTime = audio.currentTime;
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
    getTimeAsString: getTimeAsString
  }
});
</script>


<style>
.podcastimage {
  float: left;
  padding-right: 10px;
  width: 72px;
}

.podtext {
  line-height: 20px;
  margin-bottom: 0;
}

.audioContainer {
  margin-bottom: 0.5em;
}

.controlContainer {
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
