<template>
  <div class="home">
    <hero/>
  </div>
</template>

<script>
import hero from '@/components/Hero.vue';

export default {
  name: 'home',
  components: {
    hero,
  },
};
</script>
<style src="../assets/mobile.sass" lang="sass"></style>
