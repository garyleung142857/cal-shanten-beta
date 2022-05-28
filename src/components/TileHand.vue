<template>
  <v-card
    flat
    class="hand d-flex ma-0 flex-wrap"
    width="100%"
  >
    <TileImage tileName="1m" />
    <TileImage tileName="9m" />
    <TileImage tileName="1p" />
    <TileImage tileName="9p" />
    <TileImage tileName="1s" />
    <TileImage tileName="9s" />
    <TileImage tileName="1z" />
    <TileImage tileName="2z" />
    <TileImage tileName="3z" />
    <TileImage tileName="4z" />
    <TileImage tileName="5z" />
    <TileImage tileName="6z" />
    <TileImage tileName="7z" />
    <TileImage tileName="4m" />
    <TileImage tileName="5m" />
    <TileImage tileName="6m" />
    <TileImage tileName="7z" />
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

    },
  }
</script>

<style scoped>
  .hand {
    justify-content: flex-start;
    align-items: center;
    border: 1px black solid;
    line-height: 1.15;
  }
</style>