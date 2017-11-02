<!--
Based on:
  https://bl.ocks.org/mbostock/3048450
  https://github.com/CorpGlory/d3vue/blob/master/src/d3-components/pie-chart-local-component/pie.vue
Links:
  Props: https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props
  Methods: https://vuejs.org/v2/guide/events.html#Method-Event-Handlers
-->

<template>
  <svg width="960" height="500"></svg>
</template>

<script>
  const d3 = require('d3');
  export default {
    mounted: function() {
      //var data = d3.range(10000).map(d3.randomBates(10));
      this.draw(this.data);
    },
    props: ['data'],
    watch: {
      data: function(newData) {
        this.draw(newData);
      }
    },
    methods: {
      draw(data) {
        const formatCount = d3.format(",.0f");

        const svg = d3.select(this.$el),
            margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleLinear()
            .rangeRound([0, width]);

        const bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))
            (data);

        const y = d3.scaleLinear()
            .domain([0, d3.max(bins, function(d) { return d.length; })])
            .range([height, 0]);

        const bar = g.selectAll(".bar")
          .data(bins)
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
            .attr("height", function(d) { return height - y(d.length); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.length); });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
      }
    }
  };
</script>

<style>

  .bar rect {
    fill: steelblue;
  }

  .bar text {
    fill: #fff;
    font: 10px sans-serif;
  }

</style>
