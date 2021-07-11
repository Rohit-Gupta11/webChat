// logout button 
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {
    fetch('/auth/logout', {
        method: 'DELETE',
    }).then(() => {
        console.log('logout')
        location.href = '/'
    })
})

//profile user
const profileUser = document.querySelector('.profile-user')
profileUser.innerText = 'Hi, Rohit!'

const yourList = document.querySelector('.your-list')


function populateYourChat() {
    let markup = `
        <div class="your-list-item">
            <div class="avatar">
                <p class="is-size-5">R</p>
            </div>
            <div class="avatar-description">
                <h4 class="is-size-5">Rahul</h4>
                <p class="is-size-6">I will talk to them later.</p>
            </div>
        `
    const temp = document.createElement('div')
    temp.className = 'your-list-item'
    temp.innerHTML = markup
    yourList.appendChild(temp)
}
