<template>
  <div id="parameters">
    <h2>Parameters</h2>
    <form id="parametersForm" v-on:submit.prevent>
      <ul>
        <li>
          <label for="length">Length of the simulation in Months: </label>
          <input type="number" id="lenght" placeholder="120" v-model="params.length" />
        </li>
        <li>
          <label for="quantity">Initial quantity of Asset: </label>
          <input type="number" id="quantity" placeholder="10.5" />
        </li>
        <li>
          <label for="price">Initial price of asset in USD: </label>
          <input type="number" id="price" placeholder="6000" />
        </li>
        <li>
          <button id="submit" @click="emitRun">Run</button>
        </li>
      </ul>
    </form>
    <h2>Final parameters - Length: {{ params.length }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'parameters',
    data() {
      return {
        params: {
          length: 120
        }
      };
    },
    methods: {
      emitRun() {
        this.$emit('run', this.params);
        alert('button clicked!');
      }
    }
  };
</script>
