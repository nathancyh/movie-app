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

  $(".watchlist-add-btn").on("click", (e) => {
    e.preventDefault();
    console.log("search btn", e.currentTarget.dataset.movieid);
    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("INSERT WATCHLIST DATA SUCCESS");
      },
    })
      .done(console.log("search insert .done"))
      .fail(console.log("fail"));
  });

  // $(".watchlist-add-btn").click((e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "PUT",
  //     url: `/watchlist/${e.currentTarget.dataset.movieid}`,
  //     success: function () {
  //       let id = e.currentTarget.id;
  //       console.log(id);
  //       e.currentTarget.id = `${e.currentTarget.id}`;

  //       document.getElementById(`${id}`).classList.add("hidden");

  //       let likebtn = document.getElementById(`${id}hidden`);
  //       likebtn.classList.remove("hidden");
  //     },
  //   }).done(console.log("watchlist add done"));
  // });
});
