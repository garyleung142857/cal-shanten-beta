<template>
  <span
    class="tileFace"
    :class="{'tile-text': text, 'tile-button': button, 'tile-text-small': small}"
    @click="tileFaceClick"
  >
    {{tileChar}}
  </span>
</template>

<script>
  import tileMap from '@/constants/TileMap2.json'
  export default {
    name: 'TileImage',
    props: {
      tileName: {type: String},
      text: {type: Boolean, default: false},
      small: {type: Boolean, default: false},
      button: {type: Boolean, default: false}
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
    },
    methods: {
      tileFaceClick(){
        this.$emit('tileFaceClick', this.tileName)
      }
    }
  }
</script>

<style scoped>
  .tileFace {
    height: 48px;
    line-height: 0.6;
    font-size: 48px;
    font-family: 'Mahjong';
    text-align: center;
    margin: 2px;
  }
  .tile-text {
    height: 40px;
    font-size: 40px;
    line-height: 0.8;
    margin: 1px;
  }
  .tile-text-small{
    height: 36px;
    font-size: 36px;
    line-height: 0.6;
    margin: 1px;
  }
  .tile-button {
    height: 60px;
    font-size: 60px;
    padding: 1px;
    overflow-x: hidden;
  }
</style>