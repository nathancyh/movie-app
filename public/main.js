"use strict";

$(function () {
  //corejs-typeahead
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
  $(".typeahead").typeahead(null, {
    displayKey: "value",
    source: movies.ttAdapter(),
    templates: {
      suggestion: Handlebars.compile(
        "<p style='padding:6px'><strong>{{value}}</strong> - {{release_date}}</p>"
        // "<img src='{{poster}}'><p style='padding:6px'>{{value}}-<b>{{release_date}}</b> </p>"
      ),
      footer: Handlebars.compile("<b>Searched for '{{query}}'</b>"),
    },
  });

  $(".typeahead").on("typeahead:select", function (event, suggestion) {
    console.log(suggestion);
    console.log(suggestion.value);
    window.location.href = "/movie/" + suggestion.id;
  });
});
