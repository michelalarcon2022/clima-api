//API UTILIZADA PARA LA APP
const api = {
  key: "9e122cd782b2d0333f5fe4e7fa192062",
  url: `https://api.openweathermap.org/data/2.5/weather`,
};
//constantes usadas para asignar valores en el html
const card = document.getElementById("card");

const city = document.getElementById("city");
const date = document.getElementById("date");
const tempImg = document.getElementById("temp-img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const range = document.getElementById("range");
const table = document.getElementById("table");
const icono = document.getElementById("icono");

//Metodo usado para setear la imagen relativa a la temperatura
function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = "images/temp-mid.png";
  if (temp > 26) {
    src = "images/temp-high.png";
  } else if (temp < 20) {
    src = "images/temp-low.png";
  }
  tempImg.src = src;
  
  if(data.weather[0].description == 'algo de nubes'){
    icono.innerHTML = `<img src="./images/nubes.png" width="100">`;
  }
  if(data.weather[0].description == 'nubes dispersas'){
    icono.innerHTML = `<img src="./images/sol.png" width="100">`;
  }
  if(data.weather[0].description == 'nubes'){
    icono.innerHTML = `<img src="./images/nubes.png" width="100">`;
  }
  if(data.weather[0].description == 'nubes'){
    icono.innerHTML = `<img src="./images/nubes.png" width="100">`;
  }
  if(data.weather[0].description == 'muy nuboso'){
    icono.innerHTML = `<img src="./images/nuboso.png" width="100">`;
  }
  if(data.weather[0].description == 'cielo claro'){
    icono.innerHTML = `<img src="./images/nubes.png" width="100">`;
  }
  if(data.weather[0].description == 'lluvia ligera'){
    icono.innerHTML = `<img src="./images/lluvia.png" width="100">`;
  }
  if(data.weather[0].description == 'nevada ligera'){
    icono.innerHTML = `<img src="./images/nieve.png" width="100">`;
  } 
  if(data.weather[0].description == 'niebla'){
    icono.innerHTML = `<img src="./images/nieve.png" width="100">`;
  } 
}

async function search(query) {
  if(query.length!=0){

    try {
      
      const response = await fetch(
        `${api.url}?q=${query}&appid=${api.key}&lang=es`
      );
      const data = await response.json();
      card.style.display = "block";
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      data.innerHTML = new Date().toLocaleDateString();
      temp.innerHTML = `${toCelsius(data.main.temp)}c°`;
      weather.innerHTML = data.weather[0].description;
      range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(
        data.main.temp_max
      )}c`;
      updateImages(data);
      table.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <td>${data.name}</td>
          <td>${toCelsius(data.main.temp)}c°</td>
          <td></td>
        </tr>
        `
      );
    } catch (err) {
      console.log(err);
    } 
}else{
  alert('Ingrese por favor una ciudad o pais')
}
}


function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}
function onClean(event) {
  document.getElementById("searchbox").value = "";
}
const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");
const btnSearch = document.getElementById("btnSearch");
const btnClean = document.getElementById("btnClean");
btnSearch.addEventListener("click", onSubmit, true);
btnClean.addEventListener("click", onClean, true);
searchform.addEventListener("submit", onSubmit, true);
