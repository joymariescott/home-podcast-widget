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
                <div class="scrubberContainer">
                    <div class="length"></div>
                    <div class="progress"></div>
                </div>
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
    getTimeAsString: function(seconds: number): string {
      const fullMinutes = Math.floor(seconds / 60);

      const remainingSeconds = addLeadingZeroIfNecessary(
        Math.floor(seconds - fullMinutes * 60)
      );

      const timeString = `${fullMinutes}:${remainingSeconds}`;

      return timeString;

      function addLeadingZeroIfNecessary(number) {
        const numberAsString = number.toString();
        if (numberAsString.length === 1) {
          return `0${numberAsString}`;
        } else {
          return numberAsString;
        }
      }
    }
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

.scrubberContainer {
  flex-basis: 50%;
  margin: auto 0;
  position: relative;
}

.scrubberContainer div {
  position: absolute;
}

.scrubberContainer .length {
  background-color: gray;
  height: 5px;
  width: 100%;
}

.scrubberContainer .progress {
  background-color: black;
  height: 5px;
  width: 0px;
  z-index: 5;
}
</style>
