"use strict";

$(function () {
  if ($(".edit-area").val() == undefined) {
    $(".text-box").removeClass("hidden");
  }

  // Add Review
  $("#post").click((e) => {
    e.preventDefault();
    let title = $(".note-title").val();
    let rating = $(".note-rating").val();
    let data = $(".note-area").val();
    //getting :id from /movie/:id
    let movieid = window.location.pathname.slice(7);

    $.ajax({
      type: "POST",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { note: data, title: title, rating: rating },
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
});
