import '../css/style.css';

import {csv} from 'd3-fetch';
import {map, drop, each} from 'lodash';

import moviesData from '../assets/movies_small.csv'

const loadData = () => {
	const data = [];
	return map(drop(moviesData, 1), (row) => {
		const newObj = {};
		return {
			'title'        : row[0],
			'us_gross'     : +row[1],
			'world_gross'  : +row[2],
			'us_dvd_sales' : +row[3],
			'budget'       : +row[4],
			'release_date' : row[5],
			'rating'       : row[6],
			'run_time'     : row[7],
			'distributor'  : row[8],
			'source'       : row[9],
			'genre'        : row[10],
			'type'         : row[11],
			'director'     : row[12],
			'rating'       : { rt: row[13], imdb: row[14]},
			'imdb_votes'   : row[15],
		}
	});
};

window.onload = () => {
	const data = loadData();
	console.log(_.first(moviesData));
	each(data, (m) => { console.log(m.release_date)} );
}
