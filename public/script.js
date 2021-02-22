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
    }).done(window.location.reload());
  });

  //PUT
  $(".existingnote").focusout((e) => {
    e.preventDefault();
    let data = e.target.value;
    console.log(e.target.dataset.textarea);
    $.ajax({
      type: "PUT",
      url: `http://localhost:8080/api/v1/${e.target.dataset.textarea}`,
      dataType: "text",
      data: { note: data },
      success: function () {
        console.log("put success");
      },
    }).done();
  });

  //DELETE
  $(".deletebtn").click((e) => {
    e.preventDefault();
    console.log(e.target.dataset.btn);
    $.ajax({
      type: "DELETE",
      url: `http://localhost:8080/api/v1/${e.target.dataset.btn}`,
      success: function () {
        console.log("delete success");
      },
    }).done(window.location.reload());
  });

  //Edit note: onclick of "textarea", get index of content using indexof, then put request on query .focusout()

  //Delete note: onclick of delete button, get index of content using indexof, then do delete request on said index
});
