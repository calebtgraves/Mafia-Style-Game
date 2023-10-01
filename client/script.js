//connect to the socket server
const socket = io("ws://localhost:3000");

//set up a peer to peer connection object
let peer = new Peer();
peer.on('open', id =>{
  console.log(id);
})

//get all of the elements on the webpage required for the program
const joinButton = document.getElementById('join-button');
let invaildCode = document.getElementById("invalid-code");
let username = document.getElementById("name-input");
let gameId = document.getElementById("game-id-input");
let welcome = document.getElementById("welcome");
const entryForm = document.getElementById('entry-form');

joinButton.onclick = () => {
  //tell the server the client is trying to connect to a game, and send the game id and username that was typed in.
  socket.emit('join', [gameId.value.toUpperCase(),username.value])
  //clear the gameId field, in case the game id was invalid.
  gameId.value = ""
}

//what to do when the client joins a game. info is an array that contains the host's peer id and the username typed in by the user.
socket.on('join',info => {
  let hostId = info[0]
  let user = info[1]
  //connect to the host of the game
  const conn = peer.connect(hostId)
  //when a connection is made between the client and game host
  conn.on('open', () => {
    console.log("connection established")
    entryForm.style.display = "none";
    welcome.innerHTML = `Welcome ${user}! See your name on the screen?`
    //This is just a placeholder for now, but it would be similar to the host code, figuring out how to use the data it is sent.
    conn.on('data',data =>{
      console.log(data);
    })
    //This sends the name the user typed in to the host.
    conn.send(['username',user])
  })
})
//When a game code is invalid, it doesn't crash because of these 3 lines!
socket.on('codeinvalid',gameId =>{
  invaildCode.innerHTML = `INVALID CODE: ${gameId}`
})