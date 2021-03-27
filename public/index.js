"use strict";

$(function () {
  //   $(".genre_action").click((e) => {
  //     // e.preventDefault();
  //     console.log(e);
  //     window.location.href = "/search?genre=action";
  //   });

  $(".genre_div").click((e) => {
    console.log(e.currentTarget.dataset);
    let destination = e.currentTarget.dataset.genre;
    window.location.href = `/search?genre=${destination}`;
  });
});
