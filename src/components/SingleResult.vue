<template>
  <v-card class="ma-1">
    <v-card-subtitle class="pt-2 pb-0">{{title}}{{subtitle}}</v-card-subtitle>
    <v-card-text class="pt-0 pb-2">{{text}}</v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'SingleResult',
    props: {
      tile: String,
      analysis: Object
    },
    computed: {
      title: function(){
        if(this.tile){
          return '打' + this.tile + ': '
        } else {
          return ''
        }
      },
      subtitle: function(){
        let s = ''
        if (this.analysis.shanten == 0){
          s += `聽牌 ${this.analysis.ukeireList} ${this.analysis.ukeire}張`
          return s
        } else {
          s += `${this.analysis.shanten}向聽 入章${this.analysis.ukeire}張 ${this.analysis.ukeireList}`
          return s
        }
      },
      text: function(){
        let s = ''
        if (this.analysis.shanten == 0){
          if(this.analysis.avgWithImprovment > this.analysis.ukeire){
            s += `改良平均${this.analysis.avgWithImprovment.toFixed(2)}張`
          }
          return s
        } else {
          if(this.analysis.avgWithImprovment > this.analysis.ukeire){
            s += `改良平均${this.analysis.avgWithImprovment.toFixed(2)}張 `
            s += `入章後，下一向聽平均入章${this.analysis.avgNextUkeire.toFixed(2)}張`
          }
          
          return s
        }
      }
    }
  }
</script>