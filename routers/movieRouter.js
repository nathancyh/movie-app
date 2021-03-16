module.exports = (express) => {
    console.log("router running")
    const router = express.Router();
    const axios = require('axios');

    // Knex Setup
    const knexConfig = require("../knexfile").development;
    const knex = require("knex")(knexConfig);

  
    const MovieService = require('../services/movieService') ;
    const movieService = new MovieService(knex);

    router.get('/:movieId', function (req, res) {
        function getMovieData() {
            return axios
                .get(`https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=d3fd18f172ad640f103d9cfa9fb37451`)
                .then((info) => {
                    return info.data;
                })
                .catch((err) => {
                    console.log("axios get err", err);
                });
        }

        function getMovieReview() {
            return movieService.list(req.params.movieId)
            .then((data) => {
                // console.log("get review", data)
                return data
            })
            .catch((err) => res.status(500).json(err));
        }

        Promise.all([getMovieData(), getMovieReview()])
        .then(function(results) {

            const data = results[0];
            const movieReview = results[1];

            // console.log("movieReview", movieReview)

            res.render('review', {
                        poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
                        title: data.title,
                        genres: data.genres[0].name,
                        releaseDate: data.release_date.slice(0, 4),
                        overview: data.overview,
                        reviewArr: movieReview
                    })
        })
        .catch((err) => res.status(500).json(err));
    })

    router.post('/:movieId', function(req, res) {
        console.log("post review")
        console.log(req.body)
        return movieService.add(req.params.movieId, 1, req.body.note)
        .then(() => res.redirect('/'))
        .catch((err) => res.status(500).json(err));
    })

    return router;

}