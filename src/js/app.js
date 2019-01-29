import '../css/style.css';
import {holidaysViz} from './holidays.js';
import {HEADER} from './constants.js';

import {csv} from 'd3-fetch';
import {chain, keys, filter} from 'lodash';

//const DATA_URL = '/src/assets/movies_small.csv';
const DATA_URL = '/src//assets/movies.csv';

const findAttributeValuesFor = (attrName, movieRows) => {
	const set = new Set([]);
	movieRows.forEach((movie) => set.add(movie[attrName]));
	const arr = Array.from(set);
	console.log("  ", attrName, arr.length);
	if (arr.length < 20) console.log("   ", arr);
}

const getMoviesByYear = (movieRows) => {
	const byYear = {};
	movieRows.forEach((movie) => {
		const dateString = movie[HEADER.release];
		const parsed = Date.parse(dateString);
		if (parsed && parsed > 0) {
			const year = new Date(dateString).getFullYear();
			if (!byYear.hasOwnProperty(year)) 
				byYear[year] = [];
			byYear[year].push(movie);
		}
	})
	/* Let's clean up and only return years where we have enough movies */
	const moviesByYearClean = {};
	const allMoviesClean = []; 
	keys(byYear).forEach((year) => {
		if (byYear[year].length > 5) {
			moviesByYearClean[year] = byYear[year];
			allMoviesClean.push(byYear[year]);
		}
	});
	return {moviesByYearClean, allMoviesClean};	
}

const reportStats = (movieRows) => {
	console.log("header attributes: ", movieRows.columns);
	console.log("Number of entries: ", movieRows.length);
	//console.log("Inspecting attribute values:");
	//keys(HEADER).forEach((attrAlias) => findAttributeValuesFor(HEADER[attrAlias], movieRows));
};

window.onload = () => {
  csv(DATA_URL).then((movieRows) => {
		reportStats(movieRows);

		const {moviesByYearClean, allMoviesClean} = getMoviesByYear(movieRows);
		let nMovies = 0;
		keys(moviesByYearClean).forEach((year) => {
			nMovies += moviesByYearClean[year].length
		});
		console.log("Number of movies after filtering: ", nMovies);

		holidaysViz(movieRows);
	});
	/*
	console.log(first(moviesData));
	console.log(data);
	*/
};
