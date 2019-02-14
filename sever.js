const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
GAMENUMBER = 0;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

// route font-end
app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/html/index.html");
})

app.get("/games/:id",function(req,res){
    res.sendFile(__dirname + "/public/html/table.html");
});

// route get data ajax
app.post('/createGame',function(req,res){
    console.log("create game");
    const PlayerList = req.body.PlayerList;
    console.log(PlayerList);
    let gameList = [];
    try {
        gameList = JSON.parse(fs.readFileSync("database.json"));
        console.log("read successful");
    } catch (error) {
        console.log(error);
        res.status(500).end(error.message);
    }

    const newGame = {
        playerList: PlayerList,
    }

    gameList.push(newGame);
    fs.writeFileSync("database.json", JSON.stringify(gameList));
    res.json({
        success:true, 
    });
});

app.get("/getGameID",function(req,res){
    let gameList = [];
    try {
        gameList = JSON.parse(fs.readFileSync("database.json"));
    } catch (error) {
        console.log(error);
        res.status(500).end(error.message);
    } 

    res.json(gameList.length);
});

app.listen("9999",function(error){
    if(error){
        console.log(error);
    }else{
        console.log("server start successful!");
    }
});



