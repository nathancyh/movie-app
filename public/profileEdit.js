"use strict";

$(function () {

  $(".fav-genres").select2({
    maximumSelectionLength: 3
  });

  const movies = new Bloodhound({
    datumTokenizer: (datum) => Bloodhound.tokenizers.whitespace(datum.value),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url:
        "http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d",

      wildcard: "%QUERY",
      // Map the remote source JSON array to a JavaScript object array
      filter: (movies) => {
        console.log(movies.results[0].release_date);
        return $.map(movies.results, function (movie) {
          if (movie.release_date) {
            return {
              value: movie.original_title,
              id: movie.id,
              release_date: movie.release_date.slice(0, 4),
              poster: `http://image.tmdb.org/t/p/w92${movie.poster_path}`,
            };
          } else {
            return {
              value: movie.original_title,
              id: movie.id,
              release_date: movie.release_date,
              poster: `http://image.tmdb.org/t/p/w92${movie.poster_path}`,
            };
          }
        });
      },
    },
  });

  // Initialize the Bloodhound suggestion engine
  movies.initialize();

  // Instantiate the Typeahead UI
  $(".typeahead1").typeahead(null, {
    displayKey: "value",
    source: movies.ttAdapter(),
    templates: {
      suggestion: Handlebars.compile(
        "<p style='padding:6px'><img src='{{poster}}'><strong>{{value}}</strong></p>"
      ),
      footer: Handlebars.compile("<b>Searched for '{{query}}'</b>"),
    },
  });
  let value;
  $(".typeahead1").on("typeahead:select", function (event, suggestion) {
    // console.log(suggestion);
    console.log(suggestion.id);
    value = suggestion.id
    return value;
  });

  $(".update-btn").click((e) => {
    e.preventDefault();

    let favGen = $(".fav-genres").val();
    let favMovie = Number(value);
    let intro = $(".introduce-area").val();


    $.ajax({
      type: "PUT",
      url: "/profile",
      data: { fav_movie: favMovie, fav_genre: favGen, intro: intro },
      success: function () {
        console.log("profile edit put")
      }
    }).done((data) => {
      // window.location.reload();
      console.log("done", data)
    })

  })
})