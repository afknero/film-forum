import './src/components/config.mjs';
import filmsRouter from './src/routes/filmsRouter.mjs';
import searchRouter from './src/routes/searchRouter.mjs';
import filmRouter from './src/routes/filmRouter.mjs';
import {trendingFilms} from './src/components/api.mjs';
import url from 'url';
import path from 'path';
import express from 'express';
import './src/models/db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const User = mongoose.model('User');
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

const sessionOptions = {
    secret: process.env.SESSION,
    saveUninitialized: false,
    resave: false
}
app.use(session(sessionOptions));

app.use((req, res, next) => {
    res.locals.username = req.session.username;
    next();
});

app.get('/', async (req, res) => {
    const films = await trendingFilms();
    res.render('home', {films});
});

app.post('/register', async (req, res) => {
    const pattern = new RegExp(`^${req.body.username}$`, 'i')
    const existingUser = await User.findOne({username: pattern});
    if (existingUser) {
        res.render('register', {error: 'Existing User.'});
    }
    else {
        try {
            const user = new User({
                username: req.body.username, 
                password: req.body.password
            });
            const savedUser = await user.save();
            req.session.username = savedUser.username;
            res.redirect('/');
        }
        catch(e) {
            res.render('register', {error: 'Unable to login.'})
        }
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.use('/film', filmRouter);

app.use('/films', filmsRouter);

app.use('/search', searchRouter);

app.listen(process.env.PORT ?? 3000);