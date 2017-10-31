<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>Crypto-assets sell simulator</h1>
    <parameters v-on:run="run"></parameters>
    <results/>
  </div>
</template>

<script>
  import Parameters from './components/Parameters.vue';
  import Results from './components/Results.vue';
  export default {
    name: 'app',
    components: {
      Parameters, Results
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      run(params) {
        alert(`running with ${JSON.stringify(params, null, 2)}`);
      }
    }
  };
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
