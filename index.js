// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module


// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8080
var port = process.env.PORT || 8080;
var webServer = http.createServer(httpApp).listen(port);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer);

// Configure EasyRTC to load demos from /easyrtcdemos/
easyrtc.setOption("demosPublicFolder", "/easyrtcdemos");

// Start EasyRTC server with options to change the log level and add dates to the log.
var easyrtcServer = easyrtc.listen(
        httpApp,
        socketServer,
        {logLevel:"debug", logDateEnable:true},
        function(err, rtc) {

            // After the server has started, we can still change the default room name
            rtc.setOption("roomDefaultName", "SectorZero");

            // Creates a new application called MyApp with a default room named "SectorOne".
            // hamad: this one is the default one.
            // rtc.createApp(
            //     "easyrtc.iHealth",
            //     {"roomDefaultName":"SectorOne"},
            //     myEasyrtcApp
            // );
            rtc.createApp(
                "easyrtc.iHealth",
                {"roomDefaultName":"SectorOne"}
            );
        }
);

// Setting option for specific application
// var myEasyrtcApp = function(err, appObj) {
//     // All newly created rooms get a field called roomColor.
//     // Note this does not affect the room "SectorOne" as it was created already.
//     appObj.setOption("roomDefaultFieldObj",
//          {"roomColor":{fieldValue:"orange", fieldOption:{isShared:true}}}
//     );
// };
