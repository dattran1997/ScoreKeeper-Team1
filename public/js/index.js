$(document).ready(function(){
    console.log('js loaded');
    var id = 0;
    $.ajax({
        type: "GET",
        url: "/getGameID",
        success: function (data) {
            const gameNumber = data;
            id = gameNumber;
        },
        error: function (__xhr,__statuscode,error){
            console.log(error);
        }
    });

    $(".submit-button").on("click", function(event){
        event.preventDefault();
        var PlayerList = [];
        let i;
        for(i =1; i<5; i++){
            let playerName = $(`#${i}`).val();
            console.log(playerName);
            if(playerName != ""){
                console.log("áasa");
                const player = {
                    name : playerName,
                    score : [],
                }

                PlayerList.push(player);
            }
        }

        console.log(PlayerList.length);

        if(PlayerList.length == 0 ){
            console.log("no player");
            alert('need at least 1 player');
        }else{
            $.ajax({
                url: "/createGame",
                type: "POST",
                data: {
                    'PlayerList': PlayerList,
                },
                success: function (data) {
                    console.log(`${PlayerList}`);
                    window.location.href = `/games/${id}`; 
                },
                error: function(__xhr,__statuscode,error){
                    if(error) console.log(error);
                }
            });
        }
    });
});