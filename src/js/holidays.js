import {HEADER, MONTHS, combinedRatings, combinedGross, YEAR_RANGE} from './constants.js';
import {dotPlot} from './viz/dotplot.js';
import {select, selectAll, event as d3event} from 'd3-selection';
import {range} from 'lodash';

const yearIDS = [ "#year-start", "#year-end" ];

const state = {
  allMovies: [],
  yearStart: YEAR_RANGE[0],
  yearEnd: YEAR_RANGE[1],
};

const updateCurrentYears = () => {
  const years =  yearIDS.map((selID) => {
    const node = select(selID).node();
    return +node.options[node.selectedIndex].value;
  });
  state.yearStart = years[0];
  state.yearEnd = years[1];
}

const processMovies = () => {
	const monthToMovies = {};
  updateCurrentYears();
	state.allMovies.forEach((movie) => {
		const dateString = movie[HEADER.release];
		const month = new Date(dateString).getMonth(); /* We know it is going to be parse-able */
    const year = new Date(dateString).getFullYear();
		if (month < 0 || month > 11 || isNaN(month)) {
			console.warn("holidays.js processMovies(): found an invalid month.");
		}
		else {
      if (year >= state.yearStart && year <= state.yearEnd) {
        if (!monthToMovies.hasOwnProperty(month)) 
          monthToMovies[month] = [];
        monthToMovies[month].push(movie);
      }
		}
	});
	return monthToMovies;
};

const addContainers = (elemIDSel, monthToMovies) => {
	select(elemIDSel)
		.selectAll("div")
		.data(_.keys(monthToMovies))
		.enter()
			.append("div")
			.attr("class", "dotplot-small")
			.attr("id", (d) => "dotplot-small-month" + d );
}


const prepareSelects = () => {
  const addYears = (sel, yearRange) => {
    sel
      .selectAll('option')
      .data(yearRange)
      .enter()
        .append('option')
        .attr('value', (d) => d)
        .html((d) => d);
    sel.on('change', renderViz);
  }

  const selStart = select("#year-start");
  const selEnd   = select("#year-end");
  addYears(selStart, range(YEAR_RANGE[0], YEAR_RANGE[1] + 1))
  addYears(selEnd, range(YEAR_RANGE[1], YEAR_RANGE[0] + 1))
}

const renderViz = () => {
	const monthToMovies = processMovies();
  selectAll('#viz-dotplot-container').selectAll('div').remove();
	addContainers("#viz-dotplot-container", monthToMovies);
	_.range(12).forEach((month) => {
		dotPlot({
      title: MONTHS[month],
			elementIDSel: '#dotplot-small-month' + month,
			width: 200,
			height: 200,
			xLabel: 'revenue',
			yLabel: 'ratings',
      xNumTicks: 3,
      yNumTicks: 3,
			background: ((month>4 && month<8) || (month === 11)) ? "lightpink" : "LightCyan",
			data: (monthToMovies[month] || []).map((m) => {
				const color = (m[HEADER.title] === 'Back to the Future') ?
					            'orangeRed' : 'black';	
				return { x: combinedGross(m), y: combinedRatings(m), fill: color, r: 3, movie: m };
			})
		});
	});
}

export const holidaysViz = (movies) => {
  state.allMovies = movies;
  prepareSelects();
  renderViz();
};
