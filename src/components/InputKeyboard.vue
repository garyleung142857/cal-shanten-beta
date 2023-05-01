<template>
  <v-card flat class="input-keyboard d-flex justify-start pa-2 mb-4">
    <v-card flat class="pa-1">
      <v-row v-for="(r, rowid) in curSuitLayout" :key="rowid" dense class="d-flex justify-end">
        <TileImage
          v-for="tn in r" :key="tn"
          :tileName="tn" button
          @tileFaceClick="inputTile(tn)"
        />
      </v-row>
    </v-card>
    <v-card flat class="pa-1 d-flex flex-column">
      <v-row dense class="d-flex" align-content="stretch">
        <v-btn 
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('pin')"
          :color="curSuit == 'pin' ? 'yellow lighten-2' : 'blue-grey lighten-4'"
          depressed
        > {{ $t('suits.pin') }} </v-btn>
        <v-btn
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('sou')"
          :color="curSuit == 'sou' ? 'yellow lighten-2' : 'blue-grey lighten-4'"
          depressed
        > {{ $t('suits.sou') }} </v-btn>
      </v-row>
      <v-row dense class="d-flex" align-content="stretch">
        <v-btn 
          class="flex-grow-1 suit-btn pa-1 ma-1"
          @click="changeSuit('manzi')"
          :color="curSuit == 'manzi' ? 'yellow lighten-2' : 'blue-grey lighten-4'"
          depressed
        > {{ $t('suits.manzi') }}</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" outlined color="deep-orange" @click="removeLastTile()"> {{ $t('keyboard.cancel') }} </v-btn>
        <v-btn class="suit-btn pa-1 ma-1" outlined color="red" @click="clearAll()"> {{ $t('keyboard.clear') }} </v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" outlined color="amber darken-3" @click="sortHand()"> {{ $t('keyboard.sort') }} </v-btn>
        <v-btn class="suit-btn pa-1 ma-1 primary" @click="submitQuery()"> {{ $t('keyboard.calculate') }} </v-btn>
      </v-row>
    </v-card>
  </v-card>
</template>
<script>
  import TileImage from '@/components/TileImage.vue'
  import LAYERS from '@/constants/KeyboardPattern.js'
  export default {
    name: 'TileKeyboard',
    components: {
      TileImage
    },
    data(){
      return {
        curSuit: 'pin'
      }
    },
    computed: {
      curSuitLayout(){
        return LAYERS ? LAYERS[this.curSuit] : null
      }
    },
    methods: {
      inputTile(tileName){
        this.$emit('inputTile', tileName)
      },
      sortHand(){
        this.$emit('sortHand')
      },
      removeLastTile(){
        this.$emit('removeLastTile')
      },
      clearAll(){
        this.$emit('clearAll')
      },
      submitQuery(){
        this.$emit('submitQuery')
      },
      changeSuit(suit){
        this.curSuit = suit
      }
    }
  }
</script>

<style scoped>
  .input-keyboard{
    align-self: center;
    border: 3px rgb(139, 122, 105) solid;
    user-select: none;
  }
  .suit-btn{
    justify-content: center;
    align-items: center;
    position: relative;
    height: unset !important;
  }
</style>