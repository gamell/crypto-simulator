const ss = require('simple-statistics')

const simulationParams = {
  months: 120, // 10Y
  btc: 162,
  btcPx: 6000,
  monthlyVol: 0.35, // Highest historical 30-day vol is 16.1%, assuming 25% to be on safe side
  nonCryptoAssets: 1500000,
  totalAssets: 0,
  chanceOfRuin: 1/120 // chances of BTC going to 0, 1 in 10Y
};

let res = [];
const scenarios = 1000000;

function simulation({ months, btc, btcPx, monthlyVol, nonCryptoAssets, totalAssets, chanceOfRuin }) {

  let prevMax = btcPx;

  function applyStrategy() {
    if (btcPx > prevMax) {
      const sellOrder = btc * 0.1; // Sell 10%;
      totalAssets = totalAssets + (btcPx * sellOrder);
      btc = btc - sellOrder;
    }
    if(prevMax < btcPx) prevMax = btcPx;
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function newPrice(currPx, monthlyVol, chanceOfRuin) {
    const ruin = Math.random() < chanceOfRuin;
    if (ruin) return 0;
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const variation = plusOrMinus * (randomInRange(0, monthlyVol));
    const newPx = currPx + (currPx * variation);
    // console.log(`Px0: ${currPx}, Variation: ${variation}, newPx: ${newPx}`);
    return newPx;
  };

  function run() {
    prevMax = 0;
    totalAssets = nonCryptoAssets;
    for(let i = 0; i < months && btcPx > 0; i++) {
      btcPx = newPrice(btcPx, monthlyVol, chanceOfRuin);
      applyStrategy();
    }
    if (btcPx > 0) totalAssets += btc * btcPx;
    return totalAssets;
  };

  return { run };

};

function printSimulationInfo() {
  console.log(`#### ${scenarios.toLocaleString()} Scenarios ran for simulation with parameters:\n`);
  console.log(JSON.stringify(simulationParams, null, 2) + '\n');
  // console.log(`#### And strategy with parameters:\n`);
  // console.log(JSON.stringify(strategy, null, 2));
};

function formatNumber(num) {
  return Math.trunc(num).toLocaleString();
}

function printStats(res) {
  console.log(`#### Total Assets Stats after ${scenarios.toLocaleString()} scenarios:\n`);
  console.log(`       Min: ${formatNumber(ss.min(res))}`);
  console.log(`       Max: ${formatNumber(ss.max(res))}`);
  console.log(`      Mean: ${formatNumber(ss.mean(res))}`);
  console.log(`    Median: ${formatNumber(ss.median(res))}`);
  console.log(`  Variance: ${formatNumber(ss.variance(res))}`);
  console.log('');
}

function exec() {
  const res = [];
  for(let i = 0; i < scenarios; i++) {
    const scenario = simulation(simulationParams);
    // const strategy = new strategy();
    res.push(scenario.run());
  }
  printSimulationInfo();
  printStats(res);
}

exec();
