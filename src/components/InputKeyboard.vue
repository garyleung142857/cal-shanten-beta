<template>
  <v-card flat class="d-flex justify-start">
    <v-card flat class="pa-1">
      <v-row v-for="(r, rowid) in curSuitLayout" :key="rowid" dense class="d-flex justify-end">
        <TileButton
          v-for="tn in r" :key="tn"
          :tileName="tn" 
          @tileClick="inputTile(tn)"
        />
      </v-row>
    </v-card>
    <v-card flat class="pa-1 d-flex flex-column">
      <v-row dense class="d-flex" align-content="stretch">
        <v-btn class="suit-btn pa-1 ma-1 flex-grow-1" @click="changeSuit('man')">萬</v-btn>
        <v-btn class="suit-btn pa-1 ma-1" @click="changeSuit('pin')">筒</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" @click="changeSuit('sou')">索</v-btn>
        <v-btn class="suit-btn pa-1 ma-1" @click="changeSuit('zi')">字</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" @click="changeSuit('sou')">取消</v-btn>
        <v-btn class="suit-btn pa-1 ma-1" @click="changeSuit('zi')">=</v-btn>
      </v-row>
    </v-card>
  </v-card>
</template>
<script>
  import TileButton from '@/components/TileButton.vue'
  import LAYERS from '@/constants/KeyboardPattern.js'
  export default {
    name: 'TileKeyboard',
    components: {
      TileButton
    },
    data(){
      return {
        curSuit: 'man'
      }
    },
    computed: {
      curSuitLayout(){
        if(LAYERS){
          return LAYERS[this.curSuit]
        }
        return null
      }
    },
    methods: {
      inputTile(tileName){
        this.$emit('inputTile', tileName)
      },
      removeLastTile(){
        this.$emit('removeLastTile')
      },
      clearAll(){
        this.$emit('clearAll')
      },
      changeSuit(suit){
        this.curSuit = suit
      }
    }
  }
</script>

<style scoped>
  .suit-btn{
    text-transform: unset !important;
    width: 30px;
    justify-content: center;
    align-items: center;
    position: relative;
    height: unset !important;
  }
</style>