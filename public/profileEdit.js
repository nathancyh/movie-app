"use strict";

$(function () {
  ///////PROFILE PAGE
  $(".edit-profile").click((e) => {
    // e.preventDefault();
    let userid = window.location.pathname.slice(9);
    window.location.href = `/profile/edit/${userid}`;
  });

  /////PROFIEL EDIT
  $(".edit-cancel-btn").click((e) => {
    console.log("edit cancel");
    console.log(e);
    window.location.href = `/profile/${e.currentTarget.dataset.userid}`;
  });

  $(".fav-genres").select2({
    maximumSelectionLength: 3,
  });

  //Trigger form-submit and axios put texts
  $(".update-btn").on("click", (e) => {
    e.preventDefault();
    //press update-btn will trigger screenshot-upload-btn
    $(".screenshot-upload-btn").trigger("click");

    let favGen = $(".fav-genres").val();
    let favMovie = Number(value);
    let intro = $(".introduce-area").val();
    let userid = window.location.pathname.slice(14);
    axios
      .put(`/profile/edit/${userid}`, {
        fav_movie: favMovie,
        fav_genre: favGen,
        intro: intro,
      })
      .then(function (response) {
        setTimeout(function () {
          window.location.href = "/";
        }, 5000);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // Profile image

  // document.getElementById("buttonid").addEventListener("click", openDialog1);
  // function openDialog1() {
  //   document.getElementById("fileid").click();
  // }

  // // Screenshot 1
  // document.getElementById("buttonid1").addEventListener("click", openDialog2);
  // function openDialog2() {
  //   document.getElementById("screenshotpic0").click();
  // }

  // // Screenshot 2
  // document.getElementById("buttonid2").addEventListener("click", openDialog3);
  // function openDialog3() {
  //   document.getElementById("screenshotpic1").click();
  // }

  //Profile edit uploaded nametag
  $("#fileid").on("change", function () {
    var file = $("#fileid")[0].files[0].name;
    console.log(file);
    $("#name-propic").text(file);
  });

  $("#screenshotpic0").on("change", function () {
    var file = $("#screenshotpic0")[0].files[0].name;
    console.log(file);
    $("#name-screenshotpic0").text(file);
  });

  $("#screenshotpic1").on("change", function () {
    var file = $("#screenshotpic1")[0].files[0].name;
    console.log(file);
    $("#name-screenshotpic1").text(file);
  });

  ///////////TWITTER-TYPEAHEAD/////////////

  const movies = new Bloodhound({
    datumTokenizer: (datum) => Bloodhound.tokenizers.whitespace(datum.value),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url:
        "http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d",

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
    console.log(suggestion.id);
    value = suggestion.id;
    return value;
  });
});
