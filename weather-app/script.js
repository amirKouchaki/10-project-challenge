const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const main = document.querySelector('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const getWeatherByLocation = async city => {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();
    

    addWeatherToPage(respData);
}

const addWeatherToPage = (data) => {
    const weather = document.createElement('div')
    weather.classList = 'weather'
    main.innerHTML = ''
    weather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
    <h1>${KtoC(data.main.temp)}</h1>
    
    <small>${data.weather[0].main}</small>`
    main.appendChild(weather)
}


const KtoC = kelvin => (kelvin - 273.15).toFixed(2)

form.addEventListener('submit',e => {
    e.preventDefault()
    getWeatherByLocation(search.value)
})