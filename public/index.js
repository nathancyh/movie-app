"use strict";

$(function () {
  $(".genre_div").click((e) => {
    console.log(e.currentTarget.dataset);
    let destination = e.currentTarget.dataset.genre;
    window.location.href = `/search?genre=${destination}`;
  });
});
