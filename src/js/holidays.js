import {HEADER} from './constants.js';
import {dotPlot} from './dotplot.js';

const processMovies = (movies) => {
	const monthToMovies = {};
	movies.forEach((movie) => {
		const dateString = movie[HEADER.release];
		const month = new Date(dateString).getMonth(); /* We know it is going to be parse-able */
		if (month < 0 || month > 11) 
			console.warn("holidays.js processMovies(): found an invalid month.");
		if (!monthToMovies.hasOwnProperty(month)) 
			monthToMovies[month] = [];
		monthToMovies[month].push(movie);
	});
	return monthToMovies;
};

export const holidaysViz = (movies) => {
	const monthToMovies = processMovies(movies);
	console.log(monthToMovies);
	dotPlot({
		elementID: '#viz-container',
		width: 200,
	  height: 200,
		data: monthToMovies[7].map((m) => ({x: +m[HEADER.budget], y: +m[HEADER.imdb_rating]})),
  });

};

