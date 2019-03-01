<template id="countdown-template">
  <div class="countdown" v-bind:class="{ end: isEnding }">
    <div class="block">
      <i class="material-icons">query_builder</i>
    </div>
    <div class="block">
      <p class="digit">{{ minutes | two_digits }}:</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countdown-template',
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  },
  props: {
    date: {
      type: Date
    }
  },
  watch: {
    now: function (val) {
      let minutos = Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
      let segundos = (this.dateInMilliseconds - this.now) % 60
      if (minutos <= 0 && segundos <= 30 ) {
        this.isEnding = true
      }
      if (minutos <= 0 && segundos <= 0 ) {
        this.$emit('updateCart', false)
      }
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      isEnding: false
    }
  },
  filters: {
    two_digits: function (value) {
      if (value < 0) {
        return '00';
      }
      if (value.toString().length <= 1) {
        return `0${value}`;
      }
      return value;
    },
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    }
  }
}
</script>
<style lang="sass" scoped>
  .countdown
    display: flex
    align-items: center
    justify-content: center
    .block
      margin: 0px
      display: flex
      .digit
        font-size: 20px
        color: white
      i
        font-size: 20px
        margin-right: 8px
        color: white
    &.end
      animation: pulsate-bck 0.5s ease-in-out infinite both
      .digit
        font-size: 20px
        color: red
      i
        font-size: 20px
        margin-right: 8px
        color: red

  @keyframes pulsate-bck
    0%
      transform: scale(1)
    50%
      transform: scale(0.9)
    100%
      transform: scale(1)
</style>
