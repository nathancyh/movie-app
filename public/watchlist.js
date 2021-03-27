"use strict";

$(function () {
  $(".watchlist-del-btn").click((e) => {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        // console.log("watchlist deleted item");
        window.location.reload();
      },
    }).done(console.log("watchlist delete done"));
  });
});
