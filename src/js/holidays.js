import {HEADER, combinedRatings, combinedGross} from './constants.js';
import {dotPlot} from './dotplot.js';
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

const addContainers = (elemID, monthToMovies) => {
	select(elemID)
		.selectAll("div")
		.data(_.keys(monthToMovies))
		.enter()
			.append("div")
			.attr("class", "dotplot-small")
			.attr("id", (d) => "dotplot-small-month" + d )
			.attr("style", (d) => ((+d>4 && +d<8) || (+d === 11)) ? "background: lightpink" : "");
}

export const holidaysViz = (movies) => {
	const monthToMovies = processMovies(movies);
	console.log(monthToMovies);
	addContainers("#viz-dotplot-container", monthToMovies);
	_.range(12).forEach((month) => {
		dotPlot({
			elementID: '#dotplot-small-month' + month,
			width: 300,
			height: 300,
			data: monthToMovies[month].map((m) => {
				const color = (m[HEADER.title] === 'Back to the Future') ?
					            'orangeRed' : 'black';	
				return { x: combinedGross(m), y: combinedRatings(m), fill: color, r: 3 };
			})
		});
	});
};

