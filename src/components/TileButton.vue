<template>
  <v-btn
    class="input-btn pa-1 ma-0"
    height="60"
    @click="tileClicked"
    text
  >
    <TileImage :tileName="tileName" button />
  </v-btn>
</template>

<script>
  import TileImage from './TileImage.vue'
  export default {
    name: 'TileButton',
    components: {
      TileImage
    },
    props: {
      tileName: {type: String}
    },
    methods: {
      tileClicked(){
        this.$emit('tileClick')
      }
    }
  }
</script>

<style scoped>
  .input-btn {
    text-transform: unset !important;
    min-width: 0 !important;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>