const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('send_container');
const messageInput = document.getElementById('message_inp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    };

};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt('Enter Your Name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});
socket.on('leave', name => {
    append(`${name} left the chat`, 'center');
});