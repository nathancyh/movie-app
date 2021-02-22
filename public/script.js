"use strict";

$(function () {
  let node;
  let textnode;
  let message = [];

  // GET
  // let refreshPage = function () {
  //   $.get("http://localhost:8080/api/v1").done((data) => {
  //     for (let index = 0; index < Object.keys(data).length; index++) {
  //       if (Object.keys(data)[index] != undefined) {
  //         message[index] = data[index];
  //         node = document.createElement("LI");
  //         textnode = document.createTextNode(message[index]);
  //         node.appendChild(textnode);
  //         document.getElementById("notelist").appendChild(node);
  //       } else {
  //         message[index] = "";
  //       }
  //     }
  //   });
  // };
  // refreshPage();

  //POST
  $("#post").click((e) => {
    e.preventDefault();
    let data = $("#notearea").val();
    console.log(data);
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/v1",
      dataType: "text",
      data: { note: data },
      success: function () {
        console.log("post success");
        console.log(data);
      },
    }).done(refreshPage());
  });

  //Edit note: onclick of "textarea", get index of content using indexof, then put request on query .focusout()

  //Delete note: onclick of delete button, get index of content using indexof, then do delete request on said index
});
