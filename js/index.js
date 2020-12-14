// Select the New Task Date
const newTaskDate = document.querySelector("#newTaskDueDate");

// Add an on click event for due date
newTaskDate.addEventListener("click", (currentDate) => {
  let dateToday = new Date();
  let dd = String(dateToday.getDate()).padStart(2, "0");
  let mm = String(dateToday.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = dateToday.getFullYear();
  let dateString = yyyy + "-" + mm + "-" + dd;
  document.querySelector("#newTaskDueDate").min = dateString;
});

// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  //   Select the inputs
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const newTaskStatusInput = document.querySelector("#newTaskStatusInput");

  //Select alert messages
  const newTaskNameAlert = document.querySelector("#newTaskNameAlert");
  const newTaskDescAlert = document.querySelector("#newTaskDescAlert");
  const newTaskDateAlert = document.querySelector("#newTaskDateAlert");
  const newTaskAssignAlert = document.querySelector("#newTaskAssignAlert");

  //   /*
  //         Validation code here
  //     */

  // Get the values of the inputs
  const newName = newTaskNameInput.value;
  const newDescription = newTaskDescription.value;
  const newAssignedTo = newTaskAssignedTo.value;
  const newDueDate = newTaskDueDate.value;
  const newStatus = newTaskStatusInput.value;

  // Alert message for new task name
  if (!validFormFieldInput(newName)) {
    document.getElementById("newTaskNameInput").focus();
    newTaskNameAlert.innerHTML = "Name field is required";
    newTaskNameAlert.style.display = "block";
    newTaskNameAlert.style.color = "red";
    newTaskNameInput.style.borderColor = "red";
  } else {
    newTaskNameAlert.style.display = "none";
    newTaskNameInput.style.borderColor = "";
  }

  // Alert message for new task description
  if (!validFormFieldInput(newDescription)) {
    newTaskDescAlert.innerHTML = "Description field is required";
    newTaskDescAlert.style.display = "block";
    newTaskDescAlert.style.color = "red";
    newTaskDescription.style.borderColor = "red";
  } else {
    newTaskDescAlert.style.display = "none";
    newTaskDescription.style.borderColor = "";
  }

  // Alert message for new assign name
  if (!validFormFieldInput(newAssignedTo)) {
    newTaskAssignAlert.innerHTML = "Please Choose from list";
    newTaskAssignAlert.style.display = "block";
    newTaskAssignAlert.style.color = "red";
    newTaskAssignedTo.style.borderColor = "red";
  } else {
    newTaskAssignAlert.style.display = "none";
    newTaskAssignedTo.style.borderColor = "";
  }

  // Alert message for new task date
  if (!validFormFieldInput(newDueDate)) {
    newTaskDateAlert.innerHTML = "Please pick a date";
    newTaskDateAlert.style.display = "block";
    newTaskDateAlert.style.color = "red";
    newTaskDueDate.style.borderColor = "red";
  } else {
    newTaskDateAlert.style.display = "none";
    newTaskDueDate.style.borderColor = "";
  }
});

// function declaration for data validation
function validFormFieldInput(data) {
  return data.trim().length;
}

// For adding tooltip for edit and delete button
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
