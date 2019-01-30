import {HEADER} from './constants.js';
import {dotPlot} from './dotplot.js';
import { select, selectAll } from 'd3-selection';

export const usVsWorldViz = (movies) => {
  dotPlot({
    elementID: '#viz-usvsworld-container',
    width: 400,
    height: 400,
    xLabel: 'us',
    yLabel: 'world',
    background: 'ivory',
    data: movies.map((m) => {
      const color = 'black';
      return { 
        x: +m[HEADER.us_gross],
        y: +m[HEADER.world_gross],
        fill: color,
        r: 3,
        movie: m
      };
    })
  });
};
