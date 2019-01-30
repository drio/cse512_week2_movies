import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import { format } from 'd3-format';

const getMinMax = (arrayPoints) => [ 0, max(arrayPoints) ];

 /* https://bl.ocks.org/mbostock/3019563 */
const margin = {top: 10, right: 10, bottom: 10, left: 10};

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

	const f = format(".1s");

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
