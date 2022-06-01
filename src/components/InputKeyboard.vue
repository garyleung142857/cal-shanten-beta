<template>
  <v-card flat class="input-keyboard d-flex justify-start pa-2 mb-4">
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
          :color="curSuit == 'man' ? 'orange lighten-2' : 'blue-grey lighten-3'"
          depressed
        >萬子</v-btn>
        <v-btn 
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('pin')"
          :color="curSuit == 'pin' ? 'orange lighten-2' : 'blue-grey lighten-3'"
          depressed
        >筒子</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('sou')"
          :color="curSuit == 'sou' ? 'orange lighten-2' : 'blue-grey lighten-3'"
          depressed
        >索子</v-btn>
        <v-btn 
          class="suit-btn pa-1 ma-1"
          @click="changeSuit('zi')"
          :color="curSuit == 'zi' ? 'orange lighten-2' : 'blue-grey lighten-3'"
          depressed
        >字牌</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-btn class="suit-btn pa-1 ma-1" outlined color="deep-orange" @click="removeLastTile()">取消</v-btn>
        <v-btn class="suit-btn pa-1 ma-1" outlined color="red" @click="clearAll()">清除</v-btn>
      </v-row>
      <v-row dense class="d-flex">
        <v-select class="rule-select pa-1 ma-1"
          v-model="curRule"
          :items="r"
          :append-icon="null"
          dense hide-details
        >
          <template v-slot:selection="{ item }">
            <span class="d-flex justify-center" style="width: 100%;">
              {{ item.text }}
            </span>
          </template>
        </v-select>
        <v-btn class="suit-btn pa-1 ma-1 primary" @click="submitQuery()">計算</v-btn>
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
    props: {
      ruleName: {type: String}
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
    },
    mounted(){
      if(rulesNames.find(rule => rule.value == this.ruleName)){
        this.curRule = this.ruleName
      }
    }
  }
</script>

<style scoped>
  .input-keyboard{
    align-self: center;
    border: 3px rgb(139, 122, 105) solid;
  }
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