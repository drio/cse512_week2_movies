import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';

const getMinMax = (arrayPoints) => [ 0, max(arrayPoints) ];

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 20, right: 20, bottom: 40, left: 40};

export const dotPlot = (opts) => {
  const data = opts.data || [],
        default_fill = 'black',
        default_r = 2;

  const formatSIPrefix = format(".1s");

  const width  = opts.width - margin.left - margin.right,
        height = opts.height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.x))).nice()
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.y))).nice()
    .range([height, 0]);

  if (opts.background)
    select(opts.elementIDSel).style("background", opts.background);

  const svg = select(opts.elementIDSel)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg 
    .selectAll("circle")
    .data(data)
    .enter()
      .append("circle")
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('fill', (d) => d.fill || default_fill)
      .attr("r", (d) => d.r || default_r)
            .on("click", (d) => console.log(d.movie));

  /* Axis */ 
  const xAxis = axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickFormat(formatSIPrefix);

  const yAxis = axisLeft()
    .scale(yScale)
    .ticks(5)
    .tickFormat(formatSIPrefix);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis)
    .append("text")
      .text(opts.xLabel)
      .attr("fill", "black")
      .attr("x", width - 20)
      .attr("y", -5)

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + ",0)")
    .call(yAxis)
    .append("text")
      .text(opts.yLabel)
      .attr("fill", "black")
      .attr("x", -5)
      .attr("y", 10);

/*
svg.selectAll("text")
     .data(data)
     .enter()
     .append("text")
         .text((d) => f(d.x) + "," + d.y)
         .attr('x', (d) => xScale(d.x))
         .attr('y', (d) => yScale(d.y))
         .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
         .attr("fill", "red");
*/
}
