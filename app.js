// const express = require("express");
// const app = express();

const app = require('express')();
const http = require('http').createServer(app);
// this make socket enabled server
const io = require('socket.io')(http);
io.on("connection",function(socket){
    console.log("new client connected");
    socket.on("color",function(color){
        socket.broadcast.emit('colorchange',color);
    })
    socket.on("md",function(point){
        socket.broadcast.emit("onmd",point);
    })
    socket.on("mm",function(point){
        socket.broadcast.emit("onmm",point);
    })
})

// app.get("/home",function(req,res){
//      res.send("<h1>Welcome to HomePage</h1>");
// })
let port = process.env.PORT || 3000;
http.listen(port,function(){
    console.log("server started at port 3000");
})