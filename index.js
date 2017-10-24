const simulationParams = {
  months: 120, // 10Y
  btc: 162,
  btcPx: 6000,
  monthlyVol: 0.35, // Highest historical 30-day vol is 16.1%, assuming 25% to be on safe side
  nonCryptoAssets: 1500000,
  totalAssets: 0,
  chanceOfRuin: 1/120 // chances of BTC going to 0, ~1 per each month
};

let res = [];
const scenarios = 100;

function newPrice({currPx, monthlyVol, chanceOfRuin}){
  const ruin = Math.random() < chanceOfRuin;
  if (ruin) return 0;
  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  const variation = plusOrMinus * (Math.round(Math.random() * monthlyVol * 100) + 1) / 100;
  const newPx = currPx + (currPx * variation);
  // console.log(`Px0: ${currPx}, Variation: ${variation}, newPx: ${newPx}`);
  return newPx;
}

class Simulation {
  constructor(params){
    this.p = Object.assign({}, params); //local copy of params
  }

  applyStrategy() {
    const p = this.p;
    if (p.btcPx > p.prevMax) {
      const sellOrder = p.btc * 0.1; // Sell 10%;
      p.totalAssets = p.totalAssets + (p.btcPx * p.sellOrder);
      p.btc = p.btc - sellOrder;
    }
    if(p.prevMax < p.btcPx) p.prevMax = p.btcPx;
  }

  run() {
    const p = this.p;
    p.prevMax = 0;
    p.totalAssets = (p.btcPx * p.btc) + p.nonCryptoAssets;
    for(let i = 0; i < p.months && p.btcPx > 0; i++) {
      p.btcPx = newPrice(p);
      this.applyStrategy();
    }
    return p.totalAssets;
  }

}

function exec() {
  for(let i = 0; i < scenarios; i++) {
    console.log(`Running scenario ${i}`);
    const simulation = new Simulation(simulationParams);
    // const strategy = new strategy();
    res.push(simulation.run());
  }
}

exec();
console.log(res);
