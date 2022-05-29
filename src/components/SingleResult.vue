<template>
  <v-card class="d-flex ma-1 pa-1 align-center">
    <TileImage v-if="tile"
      :tileName="tile"
      class="px-1"
    />
    <v-card-text class="pa-1">
      <div>
        {{text}}
      </div>
      <div>
        <TileImage v-for="(tn, idx) in analysis.ukeireList" :tileName="tn" :key="idx" text/>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import TileImage from '@/components/TileImage.vue'
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
      hasImprovment(){
        return this.analysis.avgWithImprovment > this.analysis.ukeire
      },
      textShanTen(){
        let s = ''
        if (this.isTenPai){
          s = this.analysis.ukeire > 0 ? '聽牌' : '空聽'
        } else {
          s = `${this.analysis.shanten}向聽`
        }
        return s
      },
      textSpeed(){
        return this.analysis.speedRef? `參考速度: ${this.analysis.speedRef.toFixed(2)}` : ''
      },
      textUkeire(){
        let s = ''
        s = this.isTenPai ? `聽${this.analysis.ukeireList.length}門` : '入章'
        s += `${this.analysis.ukeire}`
        s += this.hasImprovment ? `(${this.analysis.avgWithImprovment.toFixed(2)})張 ` : '張 '
        s += this.isTenPai ? '' : `下一向聽平均入章${this.analysis.avgNextUkeire.toFixed(2)}張`
        return s
      },
      text(){
        return this.textShanTen + ' ' + this.textUkeire + ' ' + this.textSpeed
      }
    }
  }
</script>