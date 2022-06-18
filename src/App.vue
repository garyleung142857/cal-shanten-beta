<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
  export default{
    name: 'App',
    metaInfo: {
      title: '純牌效率計算機(Beta)',
      meta: [
        { 
          name: 'description', 
          content: '分析麻雀牌效、向聽、入章、及改良。支援日本麻雀、國標麻雀、港式台灣牌、及多種牌例。'
            + 'Online tool for analyzing Mahjong tile-efficiency with shanten, tile-acceptance, and improvements. '
            + 'Support Riichi, MCR, HK style Taiwan and many other variants. '
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
    background-color: rgb(252, 249, 243);
    padding: 20px;
    height: '100vh';
    max-width: 700px;
    min-width: 400px;
    margin: auto;
  }

</style>
