//connect to the socket server
const socket = io("ws://localhost:3000");

//get the elements on the webpage that are needed for the program
const gameId = document.getElementById("game-id");
const users = document.getElementById("users");

//This is used to keep track of the users connected to a specific game
let userList = []

//When the host has the game id from the server, it displays it on the screen.
socket.on('gameid',(id) =>{
    console.log(id);
    gameId.innerHTML = `Game ID = ${id}`
})

//set up a peer to peer connection object, allowing connections from other peers.
let peer = new Peer();
peer.on('open',(peerId)=>{
    console.log(peerId)
    //Tell the server that it is ready to accept clients
    socket.emit('host',[socket.id,peerId])
})

//When a client connects to the host:
peer.on('connection',conn =>{
    console.log(peer.connections)
    //What to do when data is recieved. Data is an array that contains the type of data, and then the data that it is sending.
    conn.on('data',(data)=>{
        //The switch statement figures out how to use the data sent based on what kind of data is specified at index 0 of the data array
        switch(data[0]){
            case 'username':
                let username = data[1]
                while(username in userList){
                    username += "-2"
                }
                userList.push(username)
                users.innerHTML += `<p>${data[1]}</p>`;
                conn.send('Hello, '+data[1])
                break;
            default:
                //nada means 'nothing' in spanish. It also means 'it swims.'
                //Que hace un pez? Nada!
                console.log('nada');
                break;
        }
    });
});