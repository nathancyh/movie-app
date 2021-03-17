"use strict";

$(function () {
  //POST
  $("#post").click((e) => {
    e.preventDefault();
    let data = $("#notearea").val();
    if (data.length > 0) {
      $.ajax({
        type: "POST",
        url: "/api/v1",
        dataType: "text",
        data: { note: data },
        success: function () {
          console.log("post success");
        },
      }).done(
        setTimeout(() => {
          window.location.reload();
        }, 200)
      );
    } else {
      alert("Cannot submit empty note!");
    }
  });

  //PUT
  $(".existingnote").focusout((e) => {
    $.ajax({
      type: "PUT",
      url: `/api/v1/${e.target.dataset.textarea}`,
      dataType: "text",
      data: { note: e.target.value },
      success: function () {
        console.log("put success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  //DELETE
  $(".deletebtn").click((e) => {
    $.ajax({
      type: "DELETE",
      url: `/api/v1/${e.target.dataset.btn}`,
      success: function () {
        console.log("delete success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

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
    window.location.href = "https://www.themoviedb.org/movie/" + suggestion.id;
  });
});

// var productId = $(".typeahead li").data("value");
// $(".typeahead").on("click", "li", function () {
//   window.location.href = "/product-details.php?i=" + productId;
// });
