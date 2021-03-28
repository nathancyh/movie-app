"use strict";

$(function () {
  //ADD WATCHLIST
  $(".watchlist-add-btn").on("click", (e) => {
    e.preventDefault();
    console.log("search btn", e.currentTarget.dataset.movieid);
    $.ajax({
      type: "POST",
      data: { api_id: e.currentTarget.dataset.movieid },
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("INSERT WATCHLIST DATA SUCCESS");
        let id = e.currentTarget.dataset.movieid;
        document.getElementById(`${id}`).classList.remove("fa-plus");
        document.getElementById(`${id}`).classList.add("fa-check");
        $(`#${id}`)
          .closest(".watchlist-add-btn")
          .attr("style", "background: #28a745 !important");
      },
    })
      .done
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100)
      ()
      .fail(console.log("fail"));
  });

  //DELETE WATCHLIST
  $(".watchlist-del-btn").on("click", (e) => {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: `/watchlist/${e.currentTarget.dataset.movieid}`,
      success: function () {
        console.log("watchlist deleted item");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  // OLD SCRIPTS
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

  // $(".index-watchlist-add-style").on("click", (e) => {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     data: { api_id: e.currentTarget.dataset.movieid },
  //     url: `/watchlist/${e.currentTarget.dataset.movieid}`,
  //     success: function () {
  //       console.log("INSERT WATCHLIST DATA SUCCESS");
  //       let id = e.currentTarget.dataset.movieid;
  //       document.getElementById(`${id}`).classList.remove("fa-plus");
  //       document.getElementById(`${id}`).classList.add("fa-check");
  //       // $(`#${id}`).css("background-color", "green");
  //     },
  //   })
  //     .done(console.log("search insert done"))
  //     .fail(console.log("fail"));
  // });
});
