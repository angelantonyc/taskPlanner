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
//let newTaskDate = document.querySelector('#newTaskDueDate');
let holidayMsg = document.querySelector("#holidayMsg");
newTaskDate.addEventListener("blur", checkHoliday);

// checkHoliday function that fetches holiday info from api
function checkHoliday() {
  console.log(newTaskDate.value);
  let checkdate = new Date(`${newTaskDate.value}`); // current timestamp is stored inside dateToday
  console.log(checkdate);
  let checkdd = String(checkdate.getDate()).padStart(2, "0"); //date is extracted
  let checkmm = String(checkdate.getMonth() + 1).padStart(2, "0"); //January is 0!, month is extracted
  let checkyyyy = checkdate.getFullYear(); // Year is extracted

  // let dateString = yyyy + "-" + mm + "-" + dd;
  // document.querySelector("#newTaskDueDate").min = dateString;
  //let day = 2;
  //let month = 01;
  //let year = 2021;

  fetch(
    `https://holidays.abstractapi.com/v1/?api_key=594f8fb8f98b4c91a8db10f4f3d2d6c8&country=AU&year=${checkyyyy}&month=${checkmm}&day=${checkdd}`
  )
    .then((response) => response.json())
    .then((data) => {
      // get the data we need for our html from the response

      holidayMsg.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "National" || data[i].type === "Local holiday") {
          const holidayCaption = data[i].name;
          console.log(holidayCaption);
          holidayMsg.innerHTML = `The chosen date is a public holiday : ${holidayCaption}`;
          holidayMsg.style.color = "yellow";
          console.log(data[i].type);
          return;
          // console.log(holidayCaption);
          //   holidayMsg.style.fontWeight = "bold";
        } else {
          holidayMsg.innerHTML = "";
          console.log(`else part ${data[i].type}`);
        }
      }
    })
    .catch((error) => {
      holidayMsg.innerHTML = "";
    });
}
