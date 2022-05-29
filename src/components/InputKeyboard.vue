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
        <v-btn 
          class="suit-btn pa-1 ma-1" 
          @click="changeSuit('man')"
          :class="curSuit == 'man' ? 'primary' : null"
        >萬子</v-btn>
        <v-btn 
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('pin')"
          :class="curSuit == 'pin' ? 'primary' : null"
        >筒子</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('sou')"
          :class="curSuit == 'sou' ? 'primary' : null"
        >索子</v-btn>
        <v-btn 
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('zi')"
          :class="curSuit == 'zi' ? 'primary' : null"
        >字牌</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" @click="removeLastTile()">取消</v-btn>
        <v-btn class="suit-btn pa-1 ma-1" @click="clearAll()">清除</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-select class="rule-select pa-1 ma-1"
          v-model="curRule"
          :items="r"
          :append-icon="null"
          dense hide-details
        />
        <v-btn class="suit-btn pa-1 ma-1" @click="submitQuery()">計算</v-btn>
      </v-row>
    </v-card>
  </v-card>
</template>
<script>
  import TileButton from '@/components/TileButton.vue'
  import LAYERS from '@/constants/KeyboardPattern.js'
  import { rulesNames } from '@/scripts/Helper.js'
  export default {
    name: 'TileKeyboard',
    components: {
      TileButton
    },
    data(){
      return {
        curSuit: 'man',
        curRule: 'Menzu',
        r: rulesNames,
      }
    },
    watch: {
      curRule(nv){
        this.$emit('ruleChange', nv)
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
  .suit-btn{
    justify-content: center;
    align-items: center;
    position: relative;
    height: unset !important;
  }
  .rule-select{
    height: unset !important;
    width: 64px;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: smaller;
    text-align: center;
  }
</style>