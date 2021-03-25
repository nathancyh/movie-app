"use strict";

$(function () {
  $(".watchlist-liked-btn").click((e) => {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        let id = e.currentTarget.id;
        console.log(id);
        e.currentTarget.id = `${e.currentTarget.id}hidden`;

        document.getElementById(`${id}hidden`).classList.add("hidden");

        let addbtn = document.getElementById(`${id}`);

        addbtn.classList.remove("hidden");
      },
    }).done(console.log("watchlist delete done"));
  });

  $(".watchlist-add-btn").click((e) => {
    e.preventDefault();
    $.ajax({
      type: "PUT",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        let id = e.currentTarget.id;
        console.log(id);
        e.currentTarget.id = `${e.currentTarget.id}`;

        document.getElementById(`${id}`).classList.add("hidden");

        let likebtn = document.getElementById(`${id}hidden`);
        likebtn.classList.remove("hidden");
      },
    }).done(console.log("watchlist add done"));
  });
});
