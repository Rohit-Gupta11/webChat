//global variable 
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

var socket = io();

// logout button 
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {
    fetch('/auth/logout', {
        method: 'DELETE',
    }).then(() => {
        console.log('logout')
        localStorage.removeItem('currentUser')
        location.href = '/'
    })
})

//profile user
const profileUser = document.querySelector('.profile-user')
profileUser.innerText = `Hi, ${currentUser.fullname}!`


//userdash functions
const yourList = document.querySelector('.your-list')

function populateYourChat(fullname, message) {
    let markup = `
        <span class="icon is-medium is-left">
        <i class="fas fa-lg fa-user-alt" style="color: white;"></i>
        </span>
        <div class="your-list-subitem">
            <h1 id="your-friend" style="margin-bottom: -8px; font-weight: bold;">${fullname}</h1>
            <p id="your-message">${message}</p>
        </div>
        <span class="icon is-medium is-left">
            <i id="your-friend-status" class="fas fa-circle" style="color: rgb(194, 14, 14); margin-left: auto;"></i>
        </span>
        `
    const temp = document.createElement('div')
    temp.className = 'your-list-item'
    temp.innerHTML = markup
    yourList.appendChild(temp)
}

populateYourChat('Tony Stark ', 'hello buddy, take this')

// chat window
const msgInput = document.getElementById('message-input')
const sendBtn = document.getElementById('send-btn')

sendBtn.addEventListener('click', () => {
    if(msgInput.value){
        socket.broadcast.emit('chat message', msgInput.value);
        msgInput.value = '';
    }
})