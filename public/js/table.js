$(document).ready(function(){
    const id = window.location.pathname.split("/")[2];
    $.ajax({
        type: "GET",
        url: "/getGame",
        success: function (data) {
            
        },
        error: function (__xhr,__statuscode,error){
            if(error){
                console.log(error);
            }
        }
    });
});