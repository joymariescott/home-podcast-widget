<template>
    <div class="progressContainer">
        <div ref="length" v-on:click="handleClick" class="length"></div>
        <div ref="progress" v-on:click="handleClick" class="progress"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    percent: {
      type: Number,
      required: true
    },
    updateFunction: {
      type: Function,
      required: false
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
    },
    handleClick: function(event: Touch | MouseEvent) {
      if (!this.$props.updateFunction) return;

      const eventX = event.clientX;
      const lengthBar = this.$refs.length as HTMLDivElement;
      const lengthBarRectangle = lengthBar.getBoundingClientRect();

      const newPercent =
        (eventX - lengthBarRectangle.left) / lengthBarRectangle.width;

      this.$props.updateFunction(newPercent);
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
