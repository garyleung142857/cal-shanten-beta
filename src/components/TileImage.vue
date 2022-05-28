<template>
  <span
    class="tileFace"
  >
    {{tileChar}}
  </span>
</template>

<script>
  import tileMap from '@/constants/TileMap2.json'
  export default {
    name: 'TileImage',
    props: {
      tileName: {type: String}
    },
    data(){
      return {
        tileMap: tileMap,
      }
    },
    computed: {
      tileChar(){
        return tileMap[this.tileName]
      }
    }
  }
</script>

<style scoped>
  .tileFace {
    height: 60px;
    line-height: 1;
    font-size: 48px;
    font-family: 'Mahjong';
    text-align: center;
  }

</style>