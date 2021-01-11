// Set appId
//const appId = "ebff93434917c879197142ac42340760";

// getDataForCity function that fetches weather info from openweathermap api
//const localTime = document.querySelector("#localTime");

//
// selecting all the things needed

// event listener for a click event on the "Go!" button
// localTime.addEventListener("click", (e) => {
//   // get the city from the input field
//   const city = cityInput.value;
//   // get the weather data for the city
//   getDataForCity(city);
// });
//Holiday API
//let newTaskDueDate = document.querySelector('#newTaskDueDate');
let holidayMsg = document.querySelector("#holidayMsg");
newTaskDate.addEventListener("blur", checkHoliday);

function checkHoliday() {
  console.log(newTaskDate.value);
  //let day = 2;
  //let month = 01;
  //let year = 2021;

  fetch(
    `https://holidays.abstractapi.com/v1/?api_key=594f8fb8f98b4c91a8db10f4f3d2d6c8&country=AU&year=2021&month=01&day=26`
  )
    .then((response) => response.json())
    .then((data) => {
      // get the data we need for our html from the response
      const name = data[0].name;
      console.log(name);
      holidayMsg.innerHTML = `The chosen date is a public Holiday - ${name}`;
      holidayMsg.style.color = 'red';
      holidayMsg.style.fontWeight = 'bold';
    })
    .catch((error) => {
      holidayMsg.innerHTML = " ";
    });
}
