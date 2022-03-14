const main = document.querySelector('main')
const form = document.querySelector('form')
const input = form.querySelector('input')

const GetProfile = async q =>{
    const res = await fetch(`https://api.github.com/users/${q}`)
    const user = await res.json()
    showProfile(user)
}




const showProfile = user => {
    const {name,login,followers,following,avatar_url,bio,created_at,public_repos} = user

    
    const profileHTML = `  <div class="profile-card">
    <div class="avatar-container"><img class="profile-avatar" src="${avatar_url}" alt="" /></div>
        <section class="info-section spacing">
        <h1 class="profile-name">${name ?? login}</h1>
        <p class="timeStamp">${new Date(created_at)}</p>
        <p class="bio">${bio ?? ''}</p>
        <div class="profile-stats">
            <span class="stat">followers : ${followers}</span>
            <span class="stat">following : ${following}</span>
            <span class="stat">public :${public_repos}</span>
        </div>
        </section>
    </div>`

    main.innerHTML = profileHTML
    
} 

form.addEventListener('submit', e =>{
    e.preventDefault()
    const {value} = input
    if(!value)
        return
    GetProfile(value)
    input.value = ''
    
})