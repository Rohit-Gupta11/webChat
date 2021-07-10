// logout button 
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {
    fetch('/auth/logout', {
        method : 'DELETE',
    }).then(() => {
        console.log('logout')
        location.href = '/'
    })
})