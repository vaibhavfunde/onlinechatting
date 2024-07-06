const chatform = document.getElementById('chat-form');
const chatmessages =document.querySelector('.chat-messages');

//get username and room form url
const {username ,room}= Qs.parse(location.search,{
    ignoreQueryPrefix :true
})


//get room and room


//message form server 
const socket = io();

//join chatroom
socket.emit('joinRoom',{username, room});

socket.on("message", message=>{
    console.log(message);
    outputMessage(message);

    chatmessages.scrollTop= chatmessages.scrollHeight;
})


//add the chat form chat box or message submit

chatform.addEventListener('submit',(e)=>{
   e.preventDefault();
   
  // get message text
   const msg = e.target.msg.value;

   //emit messsage to server;
  socket.emit('chatmessage',msg);

   //Clear input 
   e.target.msg.value='';
   e.target.msg.focus();

})


//output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

