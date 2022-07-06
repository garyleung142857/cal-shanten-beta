<template>
  <v-card 
    class="d-flex ma-1 pa-1 align-center"
    :color="bgColor"
    :style="`border-left: 25px solid ${borderColor}`"
    flat tile
  >
    <v-card-text class="pa-1 card-text">
      <div class="d-flex">
        <TileImage v-if="tile"
          :tileName="tile"
          class="pr-2 main-tile"
          @tileFaceClick="() => chooseTile(null)"
        />
        {{text}}
      </div>
      <div v-if="Object.keys(analysis.ukeireList).length>0">
        <v-divider />
        <TileArray
          :title="$t('term.ukeire')"
          :tiles="analysis.ukeireList"
          @tileClicked="chooseTile"
        />
      </div>
      <div v-if="Object.keys(analysis.improvedUkeire).length>0">
        <v-divider />
        <TileArray
          :title="$t('term.improvement')"
          :tiles="analysis.improvedUkeire"
          @tileClicked="chooseTile"
          small
        />
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import TileImage from '@/components/TileImage.vue'
  import TileArray from '@/components/TileArray.vue'
  import { interpolateColor } from '@/scripts/colorMixing.js'
  export default {
    name: 'SingleResult',
    components: {
      TileImage,
      TileArray
    },
    props: {
      tile: String,
      analysis: Object
    },
    methods: {
      chooseTile(tn){
        this.$emit('changeTile', this.tile, tn)
      }
    },
    computed: {
      isTenPai(){
        return this.analysis.shanten == 0
      },
      improvementString(){
        return this.analysis.avgWithImprovement > this.analysis.ukeire ? `(${this.analysis.avgWithImprovement.toFixed(2)})` : null
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
          return this.$t('term.tenpaiUkeireMsg', [Object.keys(this.analysis.ukeireList).length, this.analysis.ukeire, this.improvementString]) 
        } else {
          return this.$t('term.ukeireMsg', [this.analysis.ukeire, this.improvementString, this.analysis.avgNextUkeire.toFixed(2)]) 
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
  .main-tile:hover{
    cursor: pointer;
  }
</style>