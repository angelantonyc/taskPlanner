// Set appId
//const appId = "ebff93434917c879197142ac42340760";

// getDataForCity function that fetches weather info from openweathermap api
const localTime = document.querySelector("#localTime");

const getLocalTime = () =>
  fetch(
    `https://api.xmltime.com/timeservice?accesskey=Yt7QB7oKxz&expires=2021-01-07T04%3A26%3A15%2B00%3A00&signature=lTB5vxy7YxNUGSn2yHAq1Uzuy2w%3D&version=3&placeid=750`
  )
    .then((response) => response.json())
    .then((data) => {
      // get the data we need for our html from the response
      const name = data.locations[0].time.iso;
     
      //const emoji = emojis[data.weather[0].icon];
     // const temp = Math.round(data.main.temp);
      //const feelsLike = Math.round(data.main.feels_like);
      //const description = data.weather[0].description;

      // create the card html
    //   const cardHtml = createCardHtml(
    //     name
    //   );

      // render!
     localTime.innerHTML = name;
    })
    .catch((error) => {
      localTime.innerHTML = `<em>Server returned error: "${error.message}".</em>`;
    });
    getLocalTime();
// selecting all the things needed

// event listener for a click event on the "Go!" button
// localTime.addEventListener("click", (e) => {
//   // get the city from the input field
//   const city = cityInput.value;
//   // get the weather data for the city
//   getDataForCity(city);
// });

