//import {} from 'lodash';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

import {HEADER, GENRES} from './constants.js';
import {dotPlot} from './viz/dotplot.js';

const MOVIES_SEL = '#viz-genre';

const onMouseOverLogic = (d) => {
}

const onMouseOutLogic = (d) => {
}

const onClickLogic = (d) => {
  console.log(d.movie);
}

export const genreViz = (movies) => {
  dotPlot({
    elementIDSel: MOVIES_SEL,
    width: 800,
    height: 800,
    xLabel: 'number votes',
    yLabel: 'rating',
    background: 'floralwhite',
    onClickLogic,
    onMouseOutLogic,
    onMouseOverLogic,
    data: movies.map((m) => {
      const color = 'black';
      return {
        x: +m[HEADER.imdb_votes],
        y: +m[HEADER.imdb_rating],
        fill: 'Maroon',
        r: 5,
        movie: m,
      };
    })
  });

};

