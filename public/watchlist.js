"use strict";

$(function () {
  $(".watchlist-del-btn").click((e) => {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("watchlist deleted item");
        window.location.reload();
        // let id = e.currentTarget.id;
        // console.log("like", id);
        // e.currentTarget.id = `${e.currentTarget.id}hidden`;

        // document.getElementById(`${id}hidden`).classList.add("hidden");

        // let addbtn = document.getElementById(`${id}`);
        // console.l;
        // addbtn.classList.remove("hidden");
      },
    }).done(console.log("watchlist delete done"));
  });

  //$(".watchlist-add-btn").click((e) => {
  //  e.preventDefault();
  //  console.log("search btn", e.currentTarget);
  //  $.ajax({
  //  type: "POST",
  //data: { api_id: e.currentTarget.dataset.movieid },
  // url: `/watchlist/${e.currentTarget.id}`,
  // success: function () {
  //  console.log("INSERT WATCHLIST DATA SUCCESS");
  // },
  // })
  // .done(console.log("search insert done"))
  // .fail(console.log("fail"));
  //});

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
