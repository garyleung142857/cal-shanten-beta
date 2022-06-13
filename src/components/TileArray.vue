<template>
  <v-container class="d-flex flex-wrap pa-0 py-1 tile-array">
    <span
      class="text--secondary"
      :class="{'text-label': !small, 'text-label-small': small}"
    > {{ title }} </span>
    <template v-for="(tn, idx) in formatted">
      <p class="tile-num text--secondary" :key="idx"> {{ tn[0] }} </p>
      <TileImage 
        v-for="(t, idx2) in tn[1]" :key="idx+'_'+idx2" 
        :tileName="t" :text="!small" :small="small" 
      />
    </template>
  </v-container>
</template>

<script>
  import TileImage from '@/components/TileImage'
  export default {
    name: 'TileArray',
    components: {
      TileImage
    },
    props: {
      title: {type: String, default: ''},
      tiles: {type: Object, default: null},
      small: {type: Boolean, default: false}
    },
    computed: {
      formatted(){
        const list = Object.entries(this.tiles).map(kv => {
          return {
            tile: kv[0],
            num: kv[1]
          }
        })
        const map = new Map();
        list.forEach((item) => {
          const key = item.num == 0 ? '' : item.num
          const collection = map.get(key)
          if (collection) {
            collection.push(item.tile)
          } else {
            map.set(key, [item.tile])
          }
        })
        return Array.from(map).sort((a, b) => a[0] > b[0] ? -1 : 1)
      }
    }
  }
</script>

<style>
  .tile-array{
    line-height: 1 !important
  }
  .text-label{
    font-size: 12px;
    line-height: 36px;
  }
  .text-label-small{
    font-size: 12px;
    line-height: 28px;
  }
  .tile-num{
    font-size: 12px;
    font-style: italic;
    font-weight: 900;
    margin-left: 5px;
    margin-right: 1px;
  }
</style>