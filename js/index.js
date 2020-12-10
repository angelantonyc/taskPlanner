// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const newTaskStatusInput = document.querySelector("#newTaskStatusInput");
  const errorMessage = document.querySelector("#alertMessage");

  /*
        Validation code here
    */

  // Get the values of the inputs
  const newName = newTaskNameInput.value;
  const newDescription = newTaskDescription.value;
  const newAssignedTo = newTaskAssignedTo.value;
  const newDueDate = newTaskDueDate.value;
  const newStatus = newTaskStatusInput.value;
  if (!validFormFieldInput(newName)) {
    errorMessage.innerHTML = "Invalid name input";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }

  if (!validFormFieldInput(newDescription)) {
    errorMessage.innerHTML = "Invalid description input";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
    // if (!validFormFieldInput(newAssignedTo)) {
    //   errorMessage.innerHTML = "Invalid Assigned to input";
    //   errorMessage.style.display = "block";
    // } else {
    //   errorMessage.style.display = "none";
    // }

    // if (!validFormFieldInput(newDueDate)) {
    //   errorMessage.innerHTML = "Invalid date input";
    //   errorMessage.style.display = "block";
    // } else {
    //   errorMessage.style.display = "none";
    // }

    // if (!validFormFieldInput(newStatus)) {
    //   errorMessage.innerHTML = "Invalid status input";
    //   errorMessage.style.display = "block";
    // } else {
    //   errorMessage.style.display = "none";
    // }
});


function validFormFieldInput(data) {
  return data !== null && data !== "";
}
