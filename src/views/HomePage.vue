<template>
  <v-container class="d-flex flex-column">    
    <h1> {{ $t('msg.title') }} </h1>
    <v-container flat class="d-flex align-self-start pa-0 pb-2">
      <v-select class="lang-select pa-0 ma-0 mb-2"
        v-model="$i18n.locale"
        :items="langs"
        prepend-inner-icon="mdi-translate"
        dense hide-details
      >
        <template v-slot:selection="{ item }">
          <span class="d-flex justify-center" style="width: 100%;">
            {{ item.text }}
          </span>
        </template>
      </v-select>
      <v-btn 
        class="mx-1 ml-auto" text
        href="https://github.com/garyleung142857/cal-shanten-beta"
        target="_blank"
      >
        <v-icon dark class="mr-2"> mdi-github </v-icon>
        {{ $t('msg.about') }}
      </v-btn>
    </v-container>

    <InputKeyboard
      :ruleName="ruleName"
      @inputTile="(tileName) => inputTile(tileName)"
      @removeLastTile="removeLastTile"
      @clearAll="clearAll"
      @submitQuery="handleQuery"
      @sortHand="sortHand"
    />
    
    <TileHand class="tile-hand" :hand="hand" @tileFaceClick="(idx) => removeTile(idx)" />
    
    <v-container flat class="d-flex align-self-start pa-0 pb-4" >
      <v-select class="rule-select pa-0 ma-0"
        v-model="ruleName"
        :items="r"
        :label="$t('rules.rule')"
        dense hide-details
      >
        <template v-slot:selection="{ item }">
          <span class="d-flex justify-center" style="width: 100%;">
            {{ item.text }}
          </span>
        </template>
      </v-select>
      <v-btn
        text tile small outlined class="px-1 mx-1 ml-auto link-btn"
        @click="copyToClipboard(false)"
      > {{ $t('msg.copyLink') }} </v-btn>
      <v-btn
        text tile small outlined class="px-1 mx-1 link-btn"
        @click="copyToClipboard(true)"
      > {{ $t('msg.copyLinkWithResult') }} </v-btn>
    </v-container>

    <v-alert
      v-if="error"
      color="red"
      type="error"
    > {{error}}
    </v-alert>

    <template v-if="queryResults && !error">
      <h3> {{ $t('msg.results' )}}</h3>
      <template v-if="queryResults.shanten>=0">
        <template v-for="t in tiles">
          <SingleResult
            :tile="t.tile" 
            :analysis="t.analysis"
            :key="t.tile"
            @changeTile="changeTile"
          ></SingleResult>
        </template>
      </template>
      <h5 v-else> {{ $t('term.agari') }} </h5>
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
import { sortHand, checkTile, rulesNames } from '@/scripts/Helper.js'

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
      langs:[
        {text: 'EN', value: 'en'},
        {text: '繁體', value: 'tc'},
      ],
      overlay: false,
      hand: [],
      handSinceResult: [],
      ruleName: 'Menzu',
      queryResults: null
    }
  },
  watch: {
    '$i18n.locale'(){
      window.document.title = this.$t('msg.title')  
    }
  },
  methods: {
    handleQuery(){
      if(this.hand.length > 0){
        this.overlay = true
        this.queryResults = null
        sortHand(this.hand)
        this.handSinceResult = [...this.hand]
        bgCalc.postMessage({
          method: 'tilesQuery',
          args: [this.hand, this.ruleName]
        })
        window.scrollTo(0, 0)
      }
    },
    sortHand(){
      sortHand(this.hand)
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
    changeTile(outTile, inTile){
      this.hand = [...this.handSinceResult]
      if(outTile !== null){
        const removeIdx = this.hand.findIndex(t => t === outTile)
        this.removeTile(removeIdx)
      }
      if(inTile !== null){
        this.inputTile(inTile)
      }
      this.handleQuery()
    },
    async copyToClipboard(calc=false){
      try {
        var q = {...this.urlQuery}
        if(calc){
          q.calc = 't'
        }
        const newUrl = window.location.origin + this.$router.resolve({name: 'HomePage', query: q}).href
        await navigator.clipboard.writeText(newUrl)
        alert(this.$t('msg.copied'))
      } catch($e){
        alert($e)
      }
    }
  },
  computed:{
    r(){
      return rulesNames.map(rn => {
        return {
          text: this.$t(`rules.${rn.value}`),
          value: rn.value
        }
      })
    },
    tiles(){
      return this.queryResults ? this.queryResults['tiles'] || [{tile: null, analysis: this.queryResults}] : null
    },
    error(){
      // return this.queryResults ? this.queryResults['error'] : null
      if(this.queryResults && this.queryResults['error']){
        const err = this.queryResults['error']
        if(err.error == 'handLen'){
          return this.$t('errorMsg.handLen', [err.len])
        } else if(err.error == 'extraCopies'){
          return this.$t('errorMsg.extraCopies', [this.$t(`tiles.${'t' + err.tile}`), err.count])
        }
      }
      return null
    },
    urlQuery(){
      return {
        lang: this.$i18n.locale,
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
    this.$i18n.locale = q.lang || 'tc'
    this.ruleName = q.rn || 'Menzu'
    this.hand = q.ts ? q.ts.match(/.{1,2}/g).filter(tileName => checkTile(tileName)) : []
    if(q.calc){
      this.handleQuery()
    }
  },
  mounted(){
    window.document.title = this.$t('msg.title')
  }
}
</script>

<style>
  .lang-select{
    height: unset !important;
    flex-grow: 0 !important;
    display: inline-block !important;
    font-size: smaller !important;
    width: 100px;
  }
  .rule-select{
    height: unset !important;
    flex-grow: 0 !important;
    display: inline-block !important;
    width: 100px;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: smaller !important;
    text-align: center;
  }
  .link-btn{
    text-transform: none !important
  }
  @font-face {
    font-family: "Mahjong";
    src: url(../fonts/S-Mahjong.ttf) format("truetype");
  }
  .tile-hand{
    position: sticky;
    top: 0px;
    z-index: 4;
  }

</style>
