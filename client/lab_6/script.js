function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax-newMin +1) + newMin
    );
}

function dataHandler(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);

    return dataArray[restNum];
  });
  console.log(listItems);
  return listItems;

//   range.forEach((item) => {
//     console.log('range item', item);
//   });
// } 

// As the last step of your lab, hook this up to index.html
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.submit_button');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG');
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);

  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"

      const restoArray = dataHandler(arrayFromJson.data);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests