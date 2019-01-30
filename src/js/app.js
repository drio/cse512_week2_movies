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

const isValidMovie = (movie) => {
	const dateString = movie[HEADER.release];
	const parsed = Date.parse(dateString);
	return (
		parsed && parsed > 0 &&
	  +movie[HEADER.imdb_rating] > 0 &&
	  +movie[HEADER.imdb_rating] <= 10 &&
	  +movie[HEADER.rt_rating] > 0 &&
	  +movie[HEADER.rt_rating] <= 100 &&
	  +movie[HEADER.us_gross] > 100 &&
	  +movie[HEADER.world_gross] > 100 &&
	  +movie[HEADER.world_gross] !== +movie[HEADER.us_gross] &&
	  (+movie[HEADER.imdb_votes] && +movie[HEADER.imdb_votes] > 100)
	);	
};

const getMoviesByYear = (movieRows) => {
	/* Build a year to clean movies  data structure */
	const byYear = {};
	movieRows.forEach((movie) => {
		if (isValidMovie(movie)) {
			const year = new Date(movie[HEADER.release]).getFullYear();
			if (!byYear.hasOwnProperty(year)) {
				byYear[year] = [];
			}
			byYear[year].push(movie);
		}
	})

	/* Let's clean up and only return years where we have enough movies */
	const moviesByYearClean = {};
	const listAllMoviesClean = []; 
	keys(byYear).forEach((year) => {
		if (byYear[year].length > 5) {
			moviesByYearClean[year] = byYear[year];
			byYear[year].forEach((m) => listAllMoviesClean.push(m));
		}
	});

	return {moviesByYearClean, listAllMoviesClean};	
}

const reportStats = (movieRows) => {
	console.log("header attributes: ", movieRows.columns);
	console.log("Number of entries: ", movieRows.length);
	//console.log("Inspecting attribute values:");
	//keys(HEADER).forEach((attrAlias) => findAttributeValuesFor(HEADER[attrAlias], movieRows));
};

window.onload = () => {
  csv(DATA_URL).then((movieRows) => {
		//reportStats(movieRows);
		const {listAllMoviesClean} = getMoviesByYear(movieRows);
		console.log("Number of movies after filtering: ", listAllMoviesClean.length);
		holidaysViz(listAllMoviesClean);
	});
};
