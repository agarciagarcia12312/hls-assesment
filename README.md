# hls assesment


======================= Hls assesment ==========

description: express powered app capable of dowloading hls videos and sending locally stored videos to client

usage: API endpoint accessible trough enpoint  "/stream?hlsurl=<hlsurl>"

fetchHLS(externalUri,desiredName)

video1: Playposit intro video length = 1:29
video2: cute animal video length = 21 seconds
defaultVideo: cute animal video length = 6 seconds

Modified hls-fetch index.js file to fit requirements for project;
added the ability to put in desired file names and a counter to correctly name all the different quality video versions
