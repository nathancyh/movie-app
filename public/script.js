"use strict";

$(function () {
  //POST
  $("#post").click((e) => {
    e.preventDefault();
    let data = $("#notearea").val();
    if (data.length > 0) {
      $.ajax({
        type: "POST",
        // url: "http://localhost:8080/api/v1",
        url: "/api/v1",
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
    } else {
      alert("Cannot submit empty note!");
    }
  });

  //PUT
  $(".existingnote").focusout((e) => {
    $.ajax({
      type: "PUT",
      url: `/api/v1/${e.target.dataset.textarea}`,
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
      url: `/api/v1/${e.target.dataset.btn}`,
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
