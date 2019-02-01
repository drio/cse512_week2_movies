import {range, keys} from 'lodash';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';

import {HEADER, numericalAttributes } from './constants.js';
import {drd_histogram} from './viz/histogram.js';
import {getDirectorsToMovies} from './processing.js';
import {dotPlot} from './viz/dotplot.js';

const DIRECTORS_SEL = '#viz-directors';

export const directorsViz = (movies) => {
  const directors = getDirectorsToMovies(movies);

  const biggestDotSize = 12;
  const scaleNumberMovies = scaleLinear()
    .domain(extent(directors.map((d) => d.movies.length))).nice()
    .range([3, biggestDotSize]);

  dotPlot({
    elementIDSel: DIRECTORS_SEL,
    width: 800,
    height: 800,
    xLabel: 'revenue',
    yLabel: 'rating',
    background: 'ivory',
    data: directors.map((director) => {
      const color = 'black';
      return {
        x: director.averageGross,
        y: director.averageRating,
        fill: 'Brown',
        r: scaleNumberMovies(director.movies.length),
        data: director
      };
    })
  });

};

