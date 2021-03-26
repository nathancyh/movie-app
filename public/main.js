"use strict";

$(function () {
  //corejs-typeahead
  const movies = new Bloodhound({
    datumTokenizer: (datum) => Bloodhound.tokenizers.whitespace(datum.value),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      // url: "/movie/typeahead/%QUERY",
      url: `http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d`,

      wildcard: "%QUERY",
      // Map the remote source JSON array to a JavaScript object array
      filter: (movies) => {
        return $.map(movies.results, function (movie) {
          let releaseDate;
          releaseDate = movie.release_date
            ? movie.release_date.slice(0, 4)
            : "N/A";

          return {
            value: movie.original_title,
            id: movie.id,
            release_date: releaseDate,
            poster: `http://image.tmdb.org/t/p/w92${movie.poster_path}`,
          };
        });
      },
    },
  });

  // Initialize the Bloodhound suggestion engine
  movies.initialize();

  // Instantiate the Typeahead UI
  $(".typeahead").typeahead(
    { minLength: 3 },
    {
      displayKey: "value",
      source: movies.ttAdapter(),
      templates: {
        suggestion: Handlebars.compile(
          "<div class='row'><div class='text-center col-auto'><img src='{{poster}}' width=auto height=90px></div><h5 class='align-self-center'>{{value}}- <b>{{release_date}}</b> </h5></div></div>"
        ),
        footer: Handlebars.compile("<b>Searched for '{{query}}'</b>"),
      },
    }
  );

  $(".typeahead").on("typeahead:select", function (event, suggestion) {
    console.log(suggestion);
    console.log(suggestion.value);
    window.location.href = "/movie/" + suggestion.id;
  });

  $(".typeahead").on("keypress", function (e) {
    console.log(e.target.value);
    if (e.key === "Enter") {
      window.location.href = "/search/" + e.target.value;
    }
  });

  $(".watchlist-btn").on("click", (e) => {
    e.preventDefault();

    window.location.href = "/watchlist";
  });
});

// Nav bar drop down
const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";

$(window).on("load resize", function () {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown.hover(
      function () {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function () {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});
