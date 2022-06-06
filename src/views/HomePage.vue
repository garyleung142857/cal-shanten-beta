<template>
  <v-container class="d-flex flex-column">
    <h1> 向聽入章計算機 (Beta) </h1>
    <p><a 
      href="https://github.com/garyleung142857/cal-shanten-beta"
      target="_blank"
    >關於</a></p>
    <InputKeyboard
      :ruleName="ruleName"
      @inputTile="(tileName) => inputTile(tileName)"
      @removeLastTile="removeLastTile"
      @clearAll="clearAll"
      @submitQuery="handleQuery"
      @ruleChange="(ruleName) => this.ruleName=ruleName"
    />
    
    <TileHand :hand="hand" @tileFaceClick="(idx) => removeTile(idx)" />
    
    <v-container flat class="align-self-start pa-0 pb-4" >
      <v-btn
        text tile small outlined class="px-1 mx-1" color=""
        @click="copyToClipboard(false)"
      >複製鏈結</v-btn>
      <v-btn
        text tile small outlined class="px-1 mx-1"
        @click="copyToClipboard(true)"
      >複製鏈結(顯示結果)</v-btn>
    </v-container>

    <v-alert
      v-if="error"
      color="red"
      type="error"
    > {{error}}
    </v-alert>
    <template v-if="queryResults && !error">
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

    <v-overlay v-model="overlay" opacity="0">
      <v-progress-circular
        color="rgb(160, 112, 110)"
        indeterminate
        width="10"
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </v-container>
</template>

<script>
import SingleResult from '@/components/SingleResult.vue'
import TileHand from '@/components/TileHand.vue'
import InputKeyboard from '@/components/InputKeyboard.vue'
import { sortHand, checkTile } from '@/scripts/Helper.js'

const bgCalc = new Worker('@/scripts/bgWorker.js', {type: 'module'})

export default {
  name: 'Home',
  components: {
    SingleResult,
    TileHand,
    InputKeyboard
  },
  data(){
    return {
      overlay: false,
      hand: [],
      ruleName: 'Menzu',
      queryResults: null,
    }
  },
  methods: {
    handleQuery(){
      this.overlay = true
      this.queryResults = null
      sortHand(this.hand)
      bgCalc.postMessage({
        method: 'tilesQuery',
        args: [this.hand, this.ruleName]
      })
    },
    inputTile(tileName){
      this.hand.push(tileName)
    },
    clearAll(){
      this.hand = []
      this.queryResults = null
    },
    removeLastTile(){
      this.hand.pop()
    },
    removeTile(idx){
      this.hand = this.hand.filter((item, i) => i !== idx)
    },
    async copyToClipboard(calc=false){
      try {
        var q = {...this.urlQuery}
        if(calc){
          q.calc = 't'
        }
        const newUrl = window.location.origin + this.$router.resolve({name: 'HomePage', query: q}).href
        await navigator.clipboard.writeText(newUrl)
        alert('已複製')
      } catch($e){
        alert($e)
      }
    }
  },
  computed:{
    tiles(){
      return this.queryResults ? this.queryResults['tiles'] || [{tile: null, analysis: this.queryResults}] : null
    },
    error(){
      return this.queryResults ? this.queryResults['error'] : null
    },
    urlQuery(){
      return {
        rn: this.ruleName,
        ts: this.hand.reduce((a, b) => a + b, '')
      }
    }
  },
  created(){
    bgCalc.onmessage = (event) => {
      if (event.data.key !== 'working') {
        this[event.data.key] = event.data.value
        this.overlay = false
      }
    };
  },
  beforeMount(){
    var q = this.$route.query
    this.ruleName = q.rn || 'Menzu'
    this.hand = q.ts ? q.ts.match(/.{1,2}/g).filter(tileName => checkTile(tileName)) : []
    if(q.calc){
      this.handleQuery()
    }
  }
}
</script>

<style>
  p {
    margin-bottom: 6px !important;
  }

  @font-face {
    font-family: "Mahjong";
    src: url(../fonts/S-Mahjong.ttf) format("truetype");
  }
</style>
