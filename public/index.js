"use strict";

$(function () {
  //   $(".genre_action").click((e) => {
  //     // e.preventDefault();
  //     console.log(e);
  //     window.location.href = "/search?genre=action";
  //   });

  $(".genre_div").click((e) => {
    console.log(e.currentTarget.dataset);
    let destination = e.currentTarget.dataset.genre;
    window.location.href = `/search?genre=${destination}`;
  });

  $(".index-watchlist-add").on("click", (e) => {
    e.preventDefault();
    console.log("search btn", e.currentTarget);
    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("INSERT WATCHLIST DATA SUCCESS");
      },
    })
      .done(console.log("search insert done"))
      .fail(console.log("fail"));
  });
});
