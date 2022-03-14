/**
 * * should go to config.js
 */
const API_KEY = 'k_lpd4vsrw'
const LANG = 'en'

const main = document.querySelector('main')
const searchEl = document.querySelector('input')
const form = document.getElementById('form')




const getTopMovies = async () => {
    const res = await fetch(`https://imdb-api.com/${LANG}/API/MostPopularMovies/${API_KEY}`)
    const data = await res.json()
    showMovies(data.items)
    
}

const searchMovies = async q => {
    const res = await fetch(`https://imdb-api.com/en/API/SearchMovie/k_lpd4vsrw/${q}`)
    const data = await res.json()
    showMovies(data.results)
}



const showMovies = (movies)=> {
    main.innerHTML = ''
    movies?.forEach( movie => {
        const{description,crew,title,fullTitle,imDbRating,image} = movie

        const div = document.createElement('div')
        div.classList.add('movie')

        div.innerHTML = `
        <img class="movie-poster" src="${image}" alt="" /> 
        <div class="movie-info">
          <h2 class="movie-title">${fullTitle ?? title}</h2>
          <span class="rating ${$convertRating(imDbRating??'')}">${imDbRating??''}</span>
          <div class="overview">
            <h3>Overview</h3>
            <p>${crew ?? description}</p>
          </div>
        </div>`
        main.appendChild(div)
    });
}

const $convertRating = imDbRating => {
    if(imDbRating > 8)
        return 'green'
    else if(imDbRating > 6)
        return 'orange'
    else if(imDbRating > 3)
        return 'yellow'
    else
        return 'red'

}

form.addEventListener('submit', e => {
    e.preventDefault()
    searchEl.value = ''
    searchMovies(searchEl.value)
})

getTopMovies()