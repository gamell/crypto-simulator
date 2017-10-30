<template>
  <div id="parameters">
    <h2>Parameters</h2>
    <form id="parametersForm">
      <ul>
        <li>
          <label for="length">Length of the simulation in Months: </label>
          <input type="number" id="lenght" placeholder="120">
        </li>
        <li>
          <label for="quantity">Initial quantity of Asset: </label>
          <input type="number" id="quantity" placeholder="10.5">
        </li>
        <li>
          <label for="price">Initial price of asset in USD: </label>
          <input type="number" id="price" placeholder="6000">
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'parameters',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    }
  };
</script>
