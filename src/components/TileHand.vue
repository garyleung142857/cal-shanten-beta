<template>
  <v-card
    flat
    class="hand d-flex ma-0 flex-wrap"
    width="100%"
  >
    <TileImage v-for="(tn, idx) in hand" :tileName="tn" :key="idx"/>
  </v-card>
</template>
<script>
  import TileImage from './TileImage.vue'
  export default {
    name: 'TileHand',
    components: {
      TileImage
    },
    props: {
      hand: {type: Array, default: () => []}
    },
  }
</script>

<style scoped>
  .hand {
    min-height: 80px;
    justify-content: flex-start;
    align-items: center;
    border: 1px black solid;
    line-height: 1.15;
  }
</style>