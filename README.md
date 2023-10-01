# Mafia-Style Game
 
## Overview

This is the start of a game where the computer acts as the narrator for a game of Mafia. It was built to be in the style of Jackbox games, where there is one screen that everyone sees, and then everyone is on their own devices. Currently, the project is in a state where a game can be hosted, and each hosted game can be joined by any amount of players.

Here is a video Demonstration and runthrough of my code.
[Software Demo Video](https://youtu.be/lxouZsMSLp0)

# Network Communication

I used two tcp libraries to create connections. First, I used socket.io to connect every user to a server. Then, I used peerjs to connect each player to the host of the game that they joined. In this way, I have both client/server connections, and peer-to-peer connections. The server is hosted on port 3000, and other than that, the other pages can be hosted at any page, but generally 8080 (for the player client) and 8081 (for the host). The messages sent back and forth between the client and server are largely meant for connecting to a hosted game. The client sends the server a game code, and the server sends back a peer.js peer id, which the client then connects to. Then, the name of the user is sent to the host so it can be displayed on screen.

# Development Environment

The IDE program that I used was VS code, and it was written in javascript using http, socket.io, and peerjs.

# Useful Websites

A couple websites/videos I referred to often:
* [Peerjs documentation](https://peerjs.com/)
* [Server.io documentation](https://socket.io/docs)
* [Stackoverflow, of course](https://stackoverflow.com/)
* [Socket.io tutorial from Dave Gray](https://www.youtube.com/watch?v=SGQM7PU9hzI&t=9s&ab_channel=DaveGray)

# Future Work

Well, the game is certainly not completed, but for the most part, the networking works well!
* In the future, I hope to build the whole game around this start.