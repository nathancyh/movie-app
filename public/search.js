"use strict";

$(function () {
  // $(".search-add-btn").click((e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "PUT",
  //     url: `/search/${e.currentTarget.id}`,
  //     success: function () {
  //       let id = e.currentTarget.id;

  //       e.currentTarget.id = `${e.currentTarget.id}hidden`;

  //       document.getElementById(`${id}hidden`).classList.add("hidden");

  //       let likebtn = document.getElementById(`${id}`);
  //       likebtn.classList.remove("hidden");
  //     },
  //   })
  //     .done(console.log("search add done"))
  //     .fail(console.log("fail"))
  //     .always(console.log("always"));
  // });

  $(".search-watchlist-add-style").click((e) => {
    e.preventDefault();
    console.log(e);

    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        let id = e.currentTarget.dataset.movieid;
        console.log(id);
        // $(`[data-movieid=${e.currentTarget.dataset.movieid}]`).css(
        //   "background-color",
        //   "green"
        // );

        document.getElementById(`${id}`).classList.remove("fa-plus");
        document.getElementById(`${id}`).classList.add("fa-check");

        id = `${e.currentTarget.dataset.movieid}hidden`;
        console.log(id);
        document.getElementById(`${id}`).classList.add("green");
      },
    })
      .done(console.log("search insert done"))
      .fail(console.log("fail"));
  });

  //   $(".search-liked-btn").click((e) => {
  //     e.preventDefault();
  //     $.ajax({
  //       type: "DELETE",
  //       url: `/search/${e.currentTarget.dataset.movieid}`,
  //       success: function () {
  //         let id = e.currentTarget.id;
  //         console.log("like", id);
  //         e.currentTarget.id = `${e.currentTarget.id}`;

  //         document.getElementById(`${id}`).classList.add("hidden");

  //         let addbtn = document.getElementById(`${id}hidden`);
  //         console.l;
  //         addbtn.classList.remove("hidden");
  //       },
  //     }).done(console.log("search delete done"));
  //   });
});
