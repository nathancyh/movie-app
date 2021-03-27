"use strict";

$(function () {
  $(".genre_div").click((e) => {
    console.log(e.currentTarget.dataset);
    let destination = e.currentTarget.dataset.genre;
    window.location.href = `/search?genre=${destination}`;
  });

  $(".index-watchlist-add-style").on("click", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("INSERT WATCHLIST DATA SUCCESS");
        let id = e.currentTarget.dataset.movieid;
        document.getElementById(`${id}`).classList.remove("fa-plus");
        document.getElementById(`${id}`).classList.add("fa-check");
      },
    })
      .done(console.log("search insert done"))
      .fail(console.log("fail"));
  });
});
