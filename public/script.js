"use strict";

$(function () {
  //POST
  $("#post").click((e) => {
    e.preventDefault();
    let data = $("#notearea").val();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/v1",
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

  //PUT
  $(".existingnote").focusout((e) => {
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/api/v1/${e.target.dataset.textarea}`,
      dataType: "text",
      data: { note: e.target.value },
      success: function () {
        console.log("put success");
      },
    }).done(
      setTimeout(() => {
        window.location.reload();
      }, 200)
    );
  });

  //DELETE
  $(".deletebtn").click((e) => {
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/api/v1/${e.target.dataset.btn}`,
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
