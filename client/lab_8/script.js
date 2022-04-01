function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax-newMin +1) + newMin
  );
}

function restoArrayMake(dataArray) {
  //console.log('fired dataHandler');
  //console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);

    return dataArray[restNum];
  });
    //console.log(listItems);
  return listItems;

}
function createHtmlList(collection) {
  //console.log('fired HTML creator');
  //console.log(collection);
  const targetList = document.querySelector(".resto-list");
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;

  });

}

function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;

}


// As the last step of your lab, hook this up to index.html
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.submit_button');

  const  resto = document.querySelector('#resto_name');
  const  zipcode = document.querySelector('#zipcode');
  const map = initMap();
  submit.style.display = 'none';

  //const results = await fetch('/api/foodServicesPG');
  //const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  //console.log(arrayFromJson);
  let arrayFromJson = {data: []};

  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async(event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {
        return;

      }

      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });

      console.log(selectResto);
      createHtmlList(selectResto);
    });


    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      //console.log('form submission'); // this is substituting for a "breakpoint"

      currentArray = restoArrayMake(arrayFromJson.data);
      console.log(currentArray)
      createHtmlList(currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests