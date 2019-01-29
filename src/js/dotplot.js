import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';

const getMinMax = (arrayPoints) => [ min(arrayPoints), max(arrayPoints) ];

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 10, right: 20, bottom: 50, left: 20};

export const dotPlot = (opts) => {
  const data = opts.data || [],
        default_fill = 'black',
        default_r = 2;

  const width  = opts.width - margin.left - margin.right,
        height = opts.height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.x)))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(getMinMax(data.map((point) => point.y)))
    .range([height, 0]);

  const svg = select(opts.elementID)
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
      .attr("r", (d) => d.r || default_r);

	/*
	svg.selectAll("text")
		 .data(data)
		 .enter()
		 .append("text")
			 .text((d) => d.x + "," + d.y)
			 .attr('x', (d) => xScale(d.x))
			 .attr('y', (d) => yScale(d.y))
			 .attr("font-family", "sans-serif")
			 .attr("font-size", "11px")
			 .attr("fill", "red");
	*/
}
