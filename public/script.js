"use strict";

$(function(){
    console.log('document running')

    $("#post").click((e) => {
        e.preventDefault();
        let data = $("#text-area").val();
        console.log($("#text-area").val())
        console.log(window.location.search)
        $.ajax({
            type:"POST",
            url: "/movie/:movieId",
            dataType: "text",
            data: {note: data},
            success: function () {
                console.log("post success");
              },
            }).done(
              setTimeout(() => {
                // window.location.reload();
              }, 200)
            );
    });
})
