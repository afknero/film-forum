import express from 'express';
import {searchFilms} from '../components/api.mjs';

const base_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TOKEN}&query=`;

const router = express.Router();
router.use(express.json());

router.get('/:keyword', async (req, res) => {
    const films = await searchFilms(base_url + req.params.keyword)
    res.render('search', {films: films.filteredFilms, results: films.results});
});

export default router;