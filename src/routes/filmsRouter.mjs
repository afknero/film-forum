import express from 'express';
import {getFilms} from '../components/api.mjs';

const base_url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TOKEN}`;

const genres = {'action': 28, 'adventure': 12, 'animation': 16, 'comedy': 35, 'documentary': 99, 'drama': 18, 
    'family': 10751, 'fantasy': 14, 'history': 36, 'horror': 27, 'music': 10402, 'mystery': 9648, 'romance': 10749,
    'science-fiction': 878, 'thriller': 53, 'tv-movie': 10770, 'war': 10752, 'western': 37};

const services = {'netflix': 8, 'prime-video': 9, 'hulu': 15, 'disney-plus': 337, 'max': 1899};

const router = express.Router();
router.use(express.json());

function validateParam(key, value, param, page) {
    if (key == 'decade') {
        const decade = value.replace(/s$/, '');
        if (decade >= 1910 && decade <= 2020) {
            param += `&primary_release_date.gte=${decade}-01-01&primary_release_date.lte=${parseInt(decade) + 10}-12-31`;
        }
    }
    else if (key == 'genre') {
        const genre = genres[value];
        if (genre != undefined) {
            param += `&with_genres=${genre}`;
        }
    }
    else if (key == 'service') {
        const service = services[value];
        if (service != undefined) {
            param += `&watch_region=US&with_watch_providers=${service}`;
        }
    }
    else if (key == 'page') {
        if (value >= 1 && value <= 20000) {
            page = (value * 3) - 2;
        }
        else {
            page = 1;
        }
    }
    return {param, page};
}

router.get('/:param1?/:value1?/:param2?/:value2?/:param3?/:value3?/:param4?/:value4?/', async (req,res) => {
    let param = '';
    let page = 1;
    for (let i = 1; i <= 4; i++) {
        const key = req.params[`param${i}`];
        const value = req.params[`value${i}`];
        if (key && value) {
            ({param, page} = validateParam(key, value, param, page));
        }
    }  
    try {
        const films = await getFilms(base_url + param, page);
        res.render('films', {films: films.filteredFilms, results: films.results});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;