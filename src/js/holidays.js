import {HEADER} from './constants.js';

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
	const listMoviesPerMonth = processMovies(movies);
	console.log(listMoviesPerMonth);
	return 123;
};

