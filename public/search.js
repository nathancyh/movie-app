"use strict";

$(function () {
  $(".search-watchlist-add-style").click((e) => {
    e.preventDefault();
    console.log(e);
    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        let id = e.currentTarget.dataset.movieid;
        document.getElementById(`${id}`).classList.remove("fa-plus");
        document.getElementById(`${id}`).classList.add("fa-check");
      },
    })
      .done(console.log("search insert done"))
      .fail(console.log("fail"));
  });
});
