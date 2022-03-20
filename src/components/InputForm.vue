<template>
  <v-card width="300px" class="ma-6">
    <v-card-text>
      <v-text-field
        suffix="萬子"
        v-model="manSuitStr"
        :rules="[validPlain]"
        dense
      ></v-text-field>
      <v-text-field
        suffix="筒子"
        v-model="pinSuitStr"
        :rules="[validPlain]"
        dense
      ></v-text-field>
      <v-text-field
        suffix="索子"
        v-model="souSuitStr"
        :rules="[validPlain]"
        dense
      ></v-text-field>
      <v-text-field
        suffix="番子"
        v-model="ziSuitStr"
        :rules="[validHonour]"
        dense
      ></v-text-field>
      <v-select
        v-model="selectedRule"
        :items="r"
        suffix="規則"
        dense
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="submit"
      >計算</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { rulesNames } from '../scripts/Helper.js'
  export default {
    name: 'InputForm',
    data(){
      return {
        manSuitStr: '',
        souSuitStr: '',
        pinSuitStr: '',
        ziSuitStr: '',
        selectedRule: rulesNames[0],
        r: rulesNames,
        validPlain: s => s.length == 0 || s.match(/^[1-9]+$/) != null,
        validHonour: s => s.length == 0 || s.match(/^[1-7]+$/) != null
      }
    },
    methods:{
      submit: function(){
        this.$emit('handle-query', {
          suitStrArr: [
            this.manSuitStr,
            this.pinSuitStr,
            this.souSuitStr,
            this.ziSuitStr
          ],
          ruleName: this.selectedRule
        })
      }
    }
  }
</script>