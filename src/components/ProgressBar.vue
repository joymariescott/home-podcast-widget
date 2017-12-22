<template>
    <div class="progressContainer">
        <div ref="length" class="length"></div>
        <div ref="progress" class="progress"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    percent: {
      type: Number,
      required: true
    }
  },
  watch: {
    percent: function(newPercent, oldPercent): void {
      const progressBar = this.$refs.progress as HTMLDivElement;
      const newWidthInPx = this.calculateProgressWidth(newPercent);

      progressBar.style.width = `${newWidthInPx}px`;
    }
  },
  methods: {
    calculateProgressWidth: function(percent: number): number {
      const lengthBar = this.$refs.length as HTMLDivElement;
      const lengthBarWidth = lengthBar.getBoundingClientRect().width;

      return lengthBarWidth * (percent / 100);
    }
  }
});
</script>


<style>
.progressContainer {
  flex-basis: 50%;
  margin: auto 0;
  position: relative;
}

.progressContainer div {
  position: absolute;
}

.progressContainer .length {
  background-color: gray;
  height: 5px;
  width: 100%;
}

.progressContainer .progress {
  background-color: black;
  height: 5px;
  width: 0px;
  z-index: 5;
}
</style>
