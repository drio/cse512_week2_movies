import {range, keys} from 'lodash';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';

import {HEADER, numericalAttributes } from './constants.js';
import {drd_histogram} from './viz/histogram.js';
import {getDirectorsToMovies} from './processing.js';
import {dotPlot} from './viz/dotplot.js';

const DIRECTORS_SEL = '#viz-directors';
const BIG_DOT_R = 30;
const SMALL_DOT_R = 4;

export const directorsViz = (movies) => {
  const directors = getDirectorsToMovies(movies);

  const scaleNumberMovies = scaleLinear()
    .domain(extent(directors.map((d) => d.movies.length))).nice()
    .range([SMALL_DOT_R, BIG_DOT_R]);

  dotPlot({
    elementIDSel: DIRECTORS_SEL,
    width: 850,
    height: 850,
    xLabel: 'revenue',
    yLabel: 'rating',
    background: 'ghostwhite',
    onClickLogic: (d) => console.log(d.name, d.movies),
    data: directors.map((director) => {
      const color = 'black';
      return {
        x: director.averageGross,
        y: director.averageRating,
        fill: 'Brown',
        r: scaleNumberMovies(director.movies.length),
        movies: director.movies,
        name: director.name,
      };
    })
  });

};

