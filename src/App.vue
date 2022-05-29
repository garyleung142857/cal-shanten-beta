<template>
  <v-app id="app">
    <h1> 向聽入章計算機 (Beta) </h1>
    <p>
    <a 
      href="https://github.com/garyleung142857/cal-shanten-beta"
      target="_blank"
    >關於</a></p>
    <InputKeyboard
      @inputTile="(tileName) => inputTile(tileName)"
      @removeLastTile="removeLastTile"
      @clearAll="clearAll"
      @submitQuery="handleQuery"
      @ruleChange="(ruleName) => this.ruleName=ruleName"
    />
    <TileHand :hand="hand" @tileFaceClick="(idx) => removeTile(idx)" />
    <v-alert
      v-if="error"
      color="red"
      type="error"
    > {{error}}
    </v-alert>
    <template v-if="queryResults">
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
      this.queryResults = null
      this.tiles = null
      this.error = null
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
    background-color: rgb(252, 249, 243);
    padding: 20px;
    height: '100vh';
    max-width: 700px;
    min-width: 350px;
    margin: auto;
  }

  p {
    margin-bottom: 6px !important;
  }

  @font-face {
    font-family: "Mahjong";
    src: url(./fonts/S-Mahjong.ttf) format("truetype");
  }
</style>
