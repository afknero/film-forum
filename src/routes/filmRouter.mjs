import express from 'express';
import {getFilm} from '../components/api.mjs';

const base_url = 'https://api.themoviedb.org/3/movie/';
const api_url = `?api_key=${process.env.TOKEN}&query=`;

const router = express.Router();
router.use(express.json());

router.get('/:id', async (req, res) => {
    // validate the id number
    const id = req.params.id
    const film = await getFilm(base_url + id + api_url);
    res.render('film', {film});
});

export default router;