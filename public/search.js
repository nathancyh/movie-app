"use strict";

$(function () {
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

  $(".search-add-btn").click((e) => {
    e.preventDefault();
    console.log("search btn", e.currentTarget);
    $.ajax({
      type: "PUT",
      url: `/search/${e.currentTarget.id}`,
      success: function () {
        let id = e.currentTarget.id;
        console.log("search", id);

        e.currentTarget.id = `${e.currentTarget.id}hidden`;

        document.getElementById(`${id}hidden`).classList.add("hidden");

        let likebtn = document.getElementById(`${id}`);
        likebtn.classList.remove("hidden");
      },
    })
      .done(console.log("search add done"))
      .fail(console.log("fail"))
      .always(console.log("always"));
  });
});
