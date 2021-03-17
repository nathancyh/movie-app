"use strict";

$(function () {
  
  if($('.edit-area').val() == undefined) {
    $('.text-box').removeClass('hidden')
  }


// Add Review
  $("#post").click((e) => {
    e.preventDefault();
    let title = $(".note-title").val();
    let rating = $(".note-rating").val();
    let data = $(".note-area").val();
    //getting :id from /movie/:id
    let movieid = window.location.pathname.slice(7);
    
    $.ajax({
      type: "POST",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { note: data, title:title, rating:rating},
      success: function () {
        console.log("post success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });


// Edit Review
  $(".edit-btn").click((e) => {
    e.preventDefault();
    $('.edit-myreview').removeClass('hidden')
  })

  $(".cancel-btn").click((e) => {
    e.preventDefault();
    $('.edit-myreview').addClass('hidden')
  })

  $(".save-btn").click((e) => {
    e.preventDefault();
    let title = $(".edit-title").val();
    let rating = $(".edit-rating").val();
    let data = $(".edit-area").val();
    let movieid = window.location.pathname.slice(7);
    // console.log("save button")
    // console.log(title, rating)

    $.ajax({
      type: "PUT",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { edit: data, title:title, rating:rating },
      success: function () {
        console.log("put success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  })

// Delete Review
  $(".del-btn").click((e) => {
    e.preventDefault();
    console.log("delete button")
    let movieid = window.location.pathname.slice(7);

    $.ajax({
      type: "DELETE",
      url: `/movie/${movieid}`,
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
