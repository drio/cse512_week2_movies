import {HEADER, combinedRatings, combinedGross} from './constants.js';
import {dotPlot} from './viz/dotplot.js';
import { select, selectAll } from 'd3-selection';

const processMovies = (movies) => {
	const monthToMovies = {};
	movies.forEach((movie) => {
		const dateString = movie[HEADER.release];
		const month = new Date(dateString).getMonth(); /* We know it is going to be parse-able */
		if (month < 0 || month > 11 || isNaN(month)) {
			console.warn("holidays.js processMovies(): found an invalid month.");
		}
		else {
			if (!monthToMovies.hasOwnProperty(month)) 
				monthToMovies[month] = [];
			monthToMovies[month].push(movie);
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

const updateSelects = () => {
  select("#year-start").append('option').attr('value', 1111).html('1111');
}

export const holidaysViz = (movies) => {
	const monthToMovies = processMovies(movies);
	addContainers("#viz-dotplot-container", monthToMovies);
  updateSelects();
	_.range(12).forEach((month) => {
		dotPlot({
			elementIDSel: '#dotplot-small-month' + month,
			width: 200,
			height: 200,
			xLabel: 'revenue',
			yLabel: 'ratings',
      xNumTicks: 3,
      yNumTicks: 3,
			background: ((month>4 && month<8) || (month === 11)) ? "lightpink" : "LightCyan",
			data: monthToMovies[month].map((m) => {
				const color = (m[HEADER.title] === 'Back to the Future') ?
					            'orangeRed' : 'black';	
				return { x: combinedGross(m), y: combinedRatings(m), fill: color, r: 3, movie: m };
			})
		});
	});
};

