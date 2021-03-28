"use strict";

$(function () {
  if ($(".edit-area").val() == undefined) {
    $(".review").removeClass("hidden");
  }

  // Add Review
  $("#post").click((e) => {
    e.preventDefault();
    let title = $(".note-title").val();
    let data = $(".note-area").val();
    //getting star rating value
    let rating;
    let starValue = $("input[type = 'radio']");
    for (let i = 0; i < starValue.length; i++) {
      if (starValue[i].checked) {
        rating = starValue[i].value;
      }
    }
    //getting :id from /movie/:id
    let movieid = window.location.pathname.slice(7);

    $.ajax({
      type: "POST",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { note: data, title: title, rating: rating },
      // data: { note: data, title: title, rating: rating },
      success: function () {
        console.log("post success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  // Edit Review
  $(".edit-btn").click((e) => {
    e.preventDefault();
    $(".edit-myreview").removeClass("hidden");
    $(".my-review").addClass("hidden");
  });

  $(".cancel-btn").click((e) => {
    e.preventDefault();
    $(".edit-myreview").addClass("hidden");
    $(".my-review").removeClass("hidden");
  });

  $(".save-btn").click((e) => {
    e.preventDefault();
    let title = $(".edit-title").val();
    let rating = $(".edit-rating").val();
    let data = $(".edit-area").val();
    let movieid = window.location.pathname.slice(7);

    $.ajax({
      type: "PUT",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { edit: data, title: title, rating: rating },
      success: function () {
        console.log("put success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  // Delete Review
  $(".del-btn").click((e) => {
    e.preventDefault();
    console.log("delete button");
    let movieid = window.location.pathname.slice(7);

    $.ajax({
      type: "DELETE",
      url: `/movie/${movieid}`,
      success: function () {
        console.log("delete success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  //DO NOT USE, DUPLICATED
  // $(".review-watchlist-add-style").click((e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   $.ajax({
  //     type: "POST",
  //     data: { api_id: e.currentTarget.dataset.movieid },
  //     url: `/watchlist/${e.currentTarget.dataset.movieid}`,
  //     success: function () {
  //       let id = e.currentTarget.dataset.movieid;
  //       document.getElementById(`${id}`).classList.remove("fa-plus");
  //       document.getElementById(`${id}`).classList.add("fa-check");
  //     },
  //   })
  //     .done(console.log("search insert done"))
  //     .fail(console.log("fail"));
  // });
});

//stars
// starButtons() {
//   const buttons = [...document.querySelectorAll(".radio");
// console.log(buttons);
// buttons.forEach((button) => {
//   // let id = button.dataset.id;
// })
// }

// Rating Initialization
// $(document).ready(function () {
//   $("#rateMe1").mdbRate();
// });
