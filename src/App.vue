<template>
  <v-app id="app">
    <h1> 向聽入章計算機 </h1>

    <TileHand :hand="hand" @tileFaceClick="(idx) => removeTile(idx)" />
    <InputKeyboard
      @inputTile="(tileName) => inputTile(tileName)"
      @removeLastTile="removeLastTile"
      @clearAll="clearAll"
      @submitQuery="handleQuery"
    />
    <v-alert
      v-if="error"
      color="red"
      type="error"
    > {{error}}
    </v-alert>
    <template v-if="tiles">
      <h3>結果</h3>
      <template v-if="queryResults.shanten>=0">
        <template v-for="t in tiles">
          <SingleResult
            :tile="t.tile" 
            :analysis="t.analysis"
            :key="t.tile"
          ></SingleResult>
        </template>
      </template>
      <h5 v-else> 和牌 </h5>
    </template>
  </v-app>
</template>

<script>
import SingleResult from './components/SingleResult.vue'
import TileHand from './components/TileHand.vue'
import InputKeyboard from './components/InputKeyboard.vue'
import { tilesQuery } from './scripts/InOut.js'
import { sortHand } from './scripts/Helper.js'
export default {
  name: 'App',
  components: {
    SingleResult,
    TileHand,
    InputKeyboard
  },
  data(){
    return {
      // query: null,
      hand: [],
      ruleName: 'Menzu',
      queryResults: null,
      tiles: null,
      error: null,
    }
  },
  methods: {
    handleQuery(){
      this.overlay = true
      sortHand(this.hand)
      tilesQuery(this.hand, this.ruleName)
      .then(res => {
        this.queryResults = res
        this.error = null
        if (this.queryResults['tiles']){
          this.tiles = this.queryResults['tiles']
        } else {
          this.tiles = [{tile: null, analysis: this.queryResults}]
        }
      })
      .catch(err => {
        this.error = err
        this.tiles = null
        this.queryResults = null
      })
    },
    inputTile(tileName){
      this.hand.push(tileName)
    },
    clearAll(){
      this.hand = []
    },
    removeLastTile(){
      this.hand.pop()
    },
    removeTile(idx){
      this.hand = this.hand.filter((item, i) => i !== idx)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  max-width: 700px;
}

@font-face {
  font-family: "Mahjong";
  src: url(./fonts/S-Mahjong.ttf) format("truetype");
}
</style>
