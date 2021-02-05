// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
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
  const newAddStatus = newTaskStatusInput.value;

  //   Validation code here
  // Alert message for Task Name
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

  // Alert message for task date
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

  // Alert message for assign name
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
    taskManager.addTask(
      newName,
      newDescription,
      newDueDate,
      newAssignedTo,
      newAddStatus
    );
    // Save the tasks to localStorage
    taskManager.save();

    $("#addTask").modal("hide");
    taskManager.render();

  }
});

// function declaration for data validation
function validFormFieldInput(data) {
  return data.trim().length; //return 0 if the length of the trimmed data is zero
}

// Add an event listener for the add task button to clear the form
const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", (event) => {
  newTaskNameInput.value = "";
  newTaskDescription.value = "";
  newTaskAssignedTo.value = "";
  newTaskDueDate.value = "";
  newTaskStatusInput.value = "To-Do";
  document.querySelector("#holidayMsg").innerHTML = "";
  newTaskNameAlert.style.display = "none";
  newTaskNameInput.style.borderColor = "";
  newTaskDescAlert.style.display = "none";
  newTaskDescription.style.borderColor = "";
  newTaskDateAlert.style.display = "none";
  newTaskDueDate.style.borderColor = "";
  newTaskAssignAlert.style.display = "none";
  newTaskAssignedTo.style.borderColor = "";
});

// Select the New Task Date
const newTaskDate = document.querySelector("#newTaskDueDate");
// Add an on click event for due date
newTaskDate.addEventListener("click", (currentDate) => {
  let dateString = taskManager.todaysDate();
  document.querySelector("#newTaskDueDate").min = dateString; //Passing the value of min to HTML
});



const editTaskName = document.querySelector(".editTaskName");
const editDesc = document.querySelector(".editDesc");
const editAssign = document.querySelector(".editAssign");
const editDate = document.querySelector(".editDate");
const editStatus = document.querySelector(".editStatus");


// Codes for Mark As Done
const tableBody = document.querySelector("#tableBody");
// Add an 'onclick' event listener to the Tasks List

tableBody.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked
  if (event.target.classList.contains("done-button")) {
    // Get the parent Task
    // const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
    //use closest() from jQuery for flexibility in parent element
    const parentTask = event.target.closest("section");
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'Done'
    task.newAddStatus = "Done";
    // Save the tasks to localStorage
    taskManager.save();
    // Render the tasks
    taskManager.render();
  }

  // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    //use closest() from jQuery for flexibility in parent element
    const parentTask = event.target.closest("section");
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Delete the task
    taskManager.deleteTask(taskId);

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }

  if (event.target.classList.contains("edit-button")) {
    
    const editNameVal = editTaskName.value;
    const editDescVal = editDesc.value;
    const editDateVal = editDate.value;
    const editAssignVal = editAssign.value;
    const editStatusVal = editStatus.value;
    
    // Get the parent Task
    // const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
    //use closest() from jQuery for flexibility in parent element
    const parentTask = event.target.closest("section");
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'Done'
    task.newAddTaskName = editNameVal;
    task.newAddDesc = editDescVal;
    task.newAddDate = editDateVal;
    task.newAddAssign = editAssignVal;
    task.newAddStatus = editStatusVal;
    console.log(task.newAddDate);
    // console.log(editName);
    // task.newAddStatus = "Done";
    // Save the tasks to localStorage
    taskManager.save();
    // Render the tasks
    taskManager.render();
  }
});

// Add an 'onclick' event listener to the status dropdown for fitering the tasks
// Check if dropdown for status filtering was clicked
let fiterStatus = document.querySelector("#filterStatus");
filterStatus.addEventListener("change", (event) => {
  taskManager.filterView(); // calling the function for calculating the filtervariable
});

// const editForm = document.querySelector("#${newAddId}");

// editForm.addEventListener("submit", (event) => {
//   console.log("edit submit clicked");
// });

//date and time display in the NavBar
const dateTime = () => {
  let dateT = new Date();
  let day = dateT.toDateString();
  let hours = dateT.getHours();
  let minutes = dateT.getMinutes();
  let seconds = dateT.getSeconds();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  const currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${day}  ${strTime} `;
};
setInterval(dateTime, 1000);
