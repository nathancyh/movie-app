"use strict";

$(function () {
  $(".watchlist-liked-btn").click((e) => {
    e.preventDefault();
    console.log("del btn pressed");
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("watchlist item delete success");
        $(e.currentTarget.classList).addClass("hidden");
        $(e.currentTarget.classList).removeClass("hidden");
      },
    }).done(console.log("watchlist delete done"));
  });

  $(".watchlist-add-btn").click((e) => {
    e.preventDefault();
    console.log("add btn pressed");
    console.log("currentTar");
    console.log(e.currentTarget);
    $.ajax({
      type: "PUT",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("watchlist item add success");
        $(e.currentTarget.classList).addClass("hidden");
        $(e.currentTarget.classList).removeClass("hidden");
      },
    }).done(console.log("watchlist delete done"));
  });
});
