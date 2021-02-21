"use strict";
let node;
let textnode;
let message = [];

$.ajax({
  url: `http://localhost:8080/api/v1`,
  method: "GET",
}).done((data) => {
  console.log(data);
  for (let index = 0; index < Object.keys(data).length; index++) {
    if (Object.keys(data)[index] != undefined) {
      message[index] = data[index];
      node = document.createElement("LI");
      textnode = document.createTextNode(message[index]);
      node.appendChild(textnode);
      document.getElementById("notelist").appendChild(node);
    } else {
      message[index] = "";
    }
  }
});

// Implement handlebars TODO:

//Edit note: onclick of "textarea", get index of content using indexof, then put request on query .focusout()

//Delete note: onclick of delete button, get index of content using indexof, then do delete request on said index
