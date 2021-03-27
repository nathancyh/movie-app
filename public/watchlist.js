"use strict";

$(function () {
  $(".watchlist-del-btn").on("click", (e) => {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        // console.log("watchlist deleted item");
        window.location.reload();
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });
});
