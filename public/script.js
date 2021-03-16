"use strict";

$(function () {
  console.log("document running");

  $("#post").click((e) => {
    e.preventDefault();
    let data = $("#text-area").val();
    //getting :id from /movie/:id
    let movieid = window.location.pathname.slice(7);
    console.log(movieid, data);
    $.ajax({
      type: "POST",
      url: `/movie/${movieid}`,
      dataType: "text",
      data: { note: data },
      success: function () {
        console.log("post success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });
});
