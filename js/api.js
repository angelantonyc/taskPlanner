//Holiday API
// let newTaskDate = document.querySelector('#newTaskDueDate');
let holidayMsg = document.querySelector("#holidayMsg");
newTaskDate.addEventListener("blur", checkHoliday);

// checkHoliday function that fetches holiday info from api
function checkHoliday() {
  let checkdate = new Date(`${newTaskDate.value}`); // current timestamp is stored inside dateToday
  let checkdd = String(checkdate.getDate()).padStart(2, "0"); //date is extracted
  let checkmm = String(checkdate.getMonth() + 1).padStart(2, "0"); //January is 0!, month is extracted
  let checkyyyy = checkdate.getFullYear(); // Year is extracted

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
          holidayMsg.innerHTML = `The chosen date is a public holiday : ${holidayCaption}`;
          holidayMsg.style.color = "yellow";
          return;
        } else {
          holidayMsg.innerHTML = "";
        }
      }
    })
    .catch((error) => {
      holidayMsg.innerHTML = "";
    });
}
