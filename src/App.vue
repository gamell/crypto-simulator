<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>Crypto-assets sell simulator</h1>
    <parameters v-on:run="run"></parameters>
    <div id="results">
      <h2>Results</h2>
      <histogram :data="results" />
    </div>
  </div>
</template>

<script>
  import parameters from './components/Parameters.vue';
  import histogram from './components/Histogram.vue';
  import simEngine from './lib/sim-engine.js';
  //const simEngine = require('./lib/sim-engine.js');

  export default {
    name: 'app',
    components: {
      parameters, histogram
    },
    data() {
      return {
        results: [10, 234, 12, 50, 10, 10, 9, 10, 8, 10, 10, 10]
      }
    },
    methods: {
      run(params) {
        alert(`running with ${JSON.stringify(params, null, 2)}`);
        this.results = simEngine.exec();
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
