<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
  export default{
    name: 'App'
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
    min-width: 350px;
    margin: auto;
  }

</style>
