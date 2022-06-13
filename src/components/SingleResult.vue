<template>
  <v-card 
    class="d-flex ma-1 pa-1 align-center"
    :color="bgColor"
    :style="`border-left: 25px solid ${borderColor}`"
    flat tile
  >
    <TileImage v-if="tile"
      :tileName="tile"
      class="px-1"      
    />
    <v-card-text class="pa-1 card-text">
      <div>
        {{text}}
      </div>
      <div v-if="analysis.ukeireList.length>0">
        <span class="text-label"> {{ $t('term.ukeire') }} </span>
        <TileImage v-for="(tn, idx) in analysis.ukeireList" :tileName="tn" :key="idx" text/>
      </div>
      <div v-if="analysis.improvedUkeire.length>0">
        <span class="text-label"> {{ $t('term.improvement') }} </span>
        <TileImage v-for="(tn, idx) in analysis.improvedUkeire" :tileName="tn" :key="idx" small/>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import TileImage from '@/components/TileImage.vue'
  import { interpolateColor } from '@/scripts/colorMixing.js'
  export default {
    name: 'SingleResult',
    components: {
      TileImage
    },
    props: {
      tile: String,
      analysis: Object
    },
    computed: {
      isTenPai(){
        return this.analysis.shanten == 0
      },
      improvmentString(){
        return this.analysis.avgWithImprovment > this.analysis.ukeire ? `(${this.analysis.avgWithImprovment.toFixed(2)})` : null
      },
      textShanTen(){
        let s = ''
        if (this.isTenPai){
          s = this.analysis.ukeire > 0 ? this.$t('term.tenpai') : this.$t('term.karaten')
        } else {
          s = this.$t('term.shanten', [this.analysis.shanten])
        }
        return s
      },
      textSpeed(){
        return this.analysis.speedRef? this.$t('term.speedref', [this.analysis.speedRef.toFixed(2)]) : ''
      },
      textUkeire(){
        if(this.isTenPai){
          return this.$t('term.tenpaiUkeireMsg', [this.analysis.ukeireList.length, this.analysis.ukeire, this.improvmentString]) 
        } else {
          return this.$t('term.ukeireMsg', [this.analysis.ukeire, this.improvmentString, this.analysis.avgNextUkeire]) 
        }
      },
      text(){
        return this.textShanTen + ' ' + this.textUkeire + ' ' + this.textSpeed
      },
      bgColor(){
        return interpolateColor(this.analysis.shanten - 1, this.analysis.avgNextUkeire, false)
      },
      borderColor(){
        return interpolateColor(this.analysis.shanten, this.analysis.ukeire, true)
      }
    }
  }
</script>

<style scoped>
  .card-text{
    color: unset !important;
    font-weight: 500;
    font-size: 18px;
  }
  .text-label{
    font-size: 12px;
  }
</style>