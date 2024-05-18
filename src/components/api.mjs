import fetch from 'node-fetch';

const img_url = 'https://image.tmdb.org/t/p/w500';
const trending_url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TOKEN}`;

async function fetchFilms(url) {
    const res = await fetch(url);
    const data = await(res.json());
    return data;
}

async function getFilms(url, page) {
    const first = await fetchFilms(url + `&page=${page}`);
    const second = await fetchFilms(url + `&page=${page + 1}`);
    const third = await fetchFilms(url + `&page=${page + 2}`);
    const films = [...first.results, ...second.results, ...third.results];
    const results = first.total_results;
    const filteredFilms = films
        .filter(film => film.poster_path !== null)
        .map(film => ({ 
            id: film.id,
            poster: `${img_url}${film.poster_path}`,
            title: film.title,
            year: film.release_date.split('-')[0],
            average: film.vote_average
        }));
    return {filteredFilms, results};
}

async function searchFilms(url) {
    const res = await fetchFilms(url);
    const films = res.results;
    const results = res.total_results;
    const filteredFilms = films
        .filter(film => film.overview !== "" && film.poster_path !== null)
        .map(film => ({ 
            id: film.id,
            overview: film.overview,
            poster: `${img_url}${film.poster_path}`,
            title: film.title,
            year: film.release_date.split('-')[0],
        }));
    return {filteredFilms, results};
}

async function trendingFilms() {
    const res = await fetchFilms(trending_url);
    const films = res.results.slice(0,6);
    return films.map(film => ({
        id: film.id,
        poster: `${img_url}${film.poster_path}`,
        title: film.title,
        year: film.release_date.split('-')[0],
        average: film.vote_average
    }));
}


async function getFilm(url) {
    const res = await fetchFilms(url);
    return {
        title: res.title, 
        backdrop: `${img_url}${res.backdrop_path}`,
        poster: `${img_url}${res.poster_path}`,
        overview: res.overview,
        year: res.release_date.split('-')[0],
        vote_average: res.vote_average,
        vote_count: res.vote_count
    }
}

export {
    getFilms,
    searchFilms,
    trendingFilms,
    getFilm
}