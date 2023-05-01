<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
  export default{
    name: 'App',
    metaInfo: {
      title: '少牌三麻計數機',
      meta: [
        { 
          name: 'description', 
          content: '少牌三麻：分析麻雀牌效、向聽、入章、及改良。'
            + 'Short Tile Sanma: Online tool for analyzing Mahjong tile-efficiency with shanten, tile-acceptance, and improvements. '
        }
      ]
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: rgb(222, 250, 234);
    padding: 20px;
    height: '100vh';
    max-width: 700px;
    min-width: 400px;
    margin: auto;
  }

</style>
