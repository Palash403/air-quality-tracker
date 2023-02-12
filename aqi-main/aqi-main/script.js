const api={
    key:"f6bf196015464b5fb8273e5522911cfc",
    base:"https://api.openweathermap.org/data/2.5/",
    base1: "https://api.openaq.org/v1/measurements"
    
} 




const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt)
{
    if(evt.keyCode==13)
    {
        getResults(searchbox.value);

        
    }
}
function getResults(query)
{
    try{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather=>{
         return weather.json();
     }).then(displayResults);
    } catch{
        alert('City Not Found')
    }

     
}


function displayResults(weather)
{
    try{
    fetch(`${api.base1}?coordinates=${weather.coord.lat},${weather.coord.lon}`)
     .then(ap =>{
         return ap.json();
     }).then(displayResults_aq)
    } catch{
        alert('Enter More Precise Location');
    }

    console.log(weather);
    let lat = document.getElementById('lat-value');
    lat.innerText = `${weather.coord.lat}`;
    let lon = document.getElementById('lon-value');
    lon.innerText = `${weather.coord.lon}`;
    let temp = document.getElementById('temp');
    temp.innerText =`${weather.main.temp}°C`;
    let location = document.querySelector('.location .city')
    location.innerText = `${weather.name},${weather.sys.country}`
    let date = new Date();
    let datenow = document.querySelector('.location .date')
    datenow.innerText = dateBuilder(date);

    
    

function dateBuilder(d)
{
    let months=[
        "January","February","March","April","May","June","July","August","September",
        "October","November","December",
    ];
    let days=[
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
}
