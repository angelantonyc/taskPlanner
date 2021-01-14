// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(1);
// Select the New Task Date
const newTaskDate = document.querySelector("#newTaskDueDate");
// Add an on click event for due date
newTaskDate.addEventListener("click", (currentDate) => {
  let dateToday = new Date(); // current timestamp is stored inside dateToday
  let dd = String(dateToday.getDate()).padStart(2, "0"); //date is extracted
  let mm = String(dateToday.getMonth() + 1).padStart(2, "0"); //January is 0!, month is extracted
  let yyyy = dateToday.getFullYear(); // Year is extracted
  let dateString = yyyy + "-" + mm + "-" + dd;
  document.querySelector("#newTaskDueDate").min = dateString; //Passing the value of min to HTML
});

//   Select the inputs
const newTaskNameInput = document.querySelector("#newTaskNameInput");
const newTaskDescription = document.querySelector("#newTaskDescription");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newTaskDueDate = document.querySelector("#newTaskDueDate");

//Select alert messages
const newTaskNameAlert = document.querySelector("#newTaskNameAlert");
const newTaskDescAlert = document.querySelector("#newTaskDescAlert");
const newTaskDateAlert = document.querySelector("#newTaskDateAlert");
const newTaskAssignAlert = document.querySelector("#newTaskAssignAlert");
// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
let validFlag; //flag for data validation
// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();
// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Get the values of the inputs
  const newName = newTaskNameInput.value;
  const newDescription = newTaskDescription.value;
  const newAssignedTo = newTaskAssignedTo.value;
  const newDueDate = newTaskDueDate.value;

  //         Validation code here
  // Alert message for new task name
  validFlag = true;
  if (!validFormFieldInput(newName)) {
    validFlag = false;
    document.getElementById("newTaskNameInput").focus(); // give focus to task name when there is no input
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
    validFlag = false;
    newTaskDescAlert.innerHTML = "Description field is required";
    newTaskDescAlert.style.display = "block";
    newTaskDescAlert.style.color = "red";
    newTaskDescription.style.borderColor = "red";
  } else {
    newTaskDescAlert.style.display = "none";
    newTaskDescription.style.borderColor = "";
  }

  // Alert message for new task date
  if (!validFormFieldInput(newDueDate)) {
    validFlag = false;
    newTaskDateAlert.innerHTML = "Please pick a date";
    newTaskDateAlert.style.display = "block";
    newTaskDateAlert.style.color = "red";
    newTaskDueDate.style.borderColor = "red";
  } else {
    newTaskDateAlert.style.display = "none";
    newTaskDueDate.style.borderColor = "";
  }

  // Alert message for new assign name
  if (!validFormFieldInput(newAssignedTo)) {
    validFlag = false;
    newTaskAssignAlert.innerHTML = "Please Choose from list";
    newTaskAssignAlert.style.display = "block";
    newTaskAssignAlert.style.color = "red";
    newTaskAssignedTo.style.borderColor = "red";
  } else {
    newTaskAssignAlert.style.display = "none";
    newTaskAssignedTo.style.borderColor = "";
  }

  // Add the task to the task manager

  if (validFlag === true) {
    taskManager.addTask(newName, newDescription, newDueDate, newAssignedTo);
    // Save the tasks to localStorage
    taskManager.save();

    $("#addTask").modal("hide");
    taskManager.render();

    // Clear the form
    newTaskNameInput.value = "";
    newTaskDescription.value = "";
    newTaskAssignedTo.value = "";
    newTaskDueDate.value = "";
  }
});

// function declaration for data validation
function validFormFieldInput(data) {
  return data.trim().length; //return 0 if the length of the trimmed data is zero
}

// Select the Tasks List

const addModalDiv = document.querySelector("#tableBody");
console.log(addModalDiv);

// Add an 'onclick' event listener to the Tasks List
addModalDiv.addEventListener("click", (event) => {
  // console.log("printing event");
  // console.log(event);
  // Check if a "Mark As Done" button was clicked
  if (event.target.classList.contains("done-button")) {
    // Get the parent Task
    const parentTask = event.target.parentElement.parentElement;
    console.log(parentTask.dataset.taskId);

    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);

    // Update the task status to 'DONE'
    task.newAddStatus = "DONE";

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }
  // console.log(addModalDiv);
  

  
});


// Add an 'onclick' event listener to the Delete Modal
// Check if a "Delete" button was clicked

addModalDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    console.log("Found delete-button");
    console.log(event);
    // const parentTask =
    //   event.target.parentElement.parentElement.parentElement.parentElement
    //     .parentElement.parentElement;

    //uses closest() from jQuery for flexibility in parent element
    const parentTask = event.target.closest('tr');
    console.log(parentTask);
    console.log(parentTask.dataset.taskId);
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Delete the task
    taskManager.deleteTask(taskId);

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }
});

// For adding tooltip for edit and delete button
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
