// our refrences
const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();


// our functions
let updateUI = data => {
    // Destructuring
    const {cityDetails, weather} = data;
    // update details thml
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="my-3 display-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;
    // remove n-class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
    // day & night icons and images
    let timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';//ternary operator
    // appling the time src
    time.setAttribute('src', timeSrc);
    let iconSrc = `./images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};

// add event listener
form.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();
    // Get city value
    const city = form.city.value.trim();
    // reset the form
    form.reset();
    // update the UI with city information
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    // set local storage
    localStorage.setItem('city', city);
})
// show the city info if the user entered a one in past
if(localStorage.getItem('city')) {
    forecast.updateCity((localStorage.getItem('city')))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
} 
