//TaskManager class defined
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.filterVar = "All";
    this.currentId = currentId;

    this.colorCode = {
      "To-Do": "badge-danger",
      Done: "badge-success",
      Review: "badge-info",
      "In progress": "badge-warning",
    };

    this.colorCodeNoOfDays = {
      "Due Today": "badge-warning",
      "Over Due": "badge-danger",
      remaining: "badge-primary",
    };
  }

  //function to add new task in add modal
  addTask(newAddTaskName, newAddDesc, newAddDate, newAddAssign, newAddStatus) {
    //create a new object from the details of the add task

    const newAddTask = {
      newAddId: this.currentId++,
      newAddTaskName: newAddTaskName,
      newAddDesc: newAddDesc,
      newAddDate: newAddDate,
      newAddAssign: newAddAssign,
      newAddStatus: newAddStatus,
    };
    //push the object into the tasks array
    this.tasks.push(newAddTask);
  }

  //function to get Task Id
  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.newAddId === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }

    // Return the found task
    return foundTask;
  }

  // Create the deleteTask method
  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.newAddId !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }
    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }

  //Return todays date
  todaysDate() {
    let dateToday = new Date(); // current timestamp is stored inside dateToday
    let dd = String(dateToday.getDate()).padStart(2, "0"); //date is extracted
    let mm = String(dateToday.getMonth() + 1).padStart(2, "0"); //January is 0!, month is extracted
    let yyyy = dateToday.getFullYear(); // Year is extracted
    let dateString = yyyy + "-" + mm + "-" + dd;
    // let daterev = dd + "-" + mm + "-" + yyyy;
    return dateString;
  }

  // format date to dd-mm-yyyy to display 
  changeFormatDate(addDate) {
    let dateR;
    dateR = addDate.toString().split("-").reverse().join("-");
    console.log(dateR);
    return dateR;
  }

  //function to set the value of filterVar for filtering the tasks
  filterView() {
    this.filterVar = document.querySelector(
      "#filterStatus"
    ).selectedOptions[0].value;
    this.render();
  }

  //Calculating no. of days between today's date and due date
  daysBetweenDates = (dateNow, dueDate) => {
    console.log(dateNow + "datenow");
    console.log(dueDate + "dueDate");
    let startDate = parseDate(dateNow); // convert today's date to date object
    let endDate = parseDate(dueDate); // convert task's due date to date object

    startDate.setHours(0, 0, 0, 0); // Start just after midnight
    endDate.setHours(0, 0, 0, 0); // End at midnight

    // Validate input
    if (dateNow === dueDate) {
      return `Due Today`; // returns 0 if the dates are less than or same.
    } else if (endDate < startDate) {
      return `Over Due`;
    }

    // Calculate days between dates
    let millisecondsPerDay = 86400 * 1000; // Day in milliseconds (24*60*60*1000)

    let diff = endDate - startDate; // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);

    if (days == 1) {
      return `${days} day remaining`;
    } else {
      return `${days} days remaining`;
    }
  };

  // function to render the output
  render() {
    console.log("render called");
    let taskNow;
    let filteredTasks = [];
    // check if filter variable is  All if yes, fetch its value and assign all tasks to filtered tasks, else filter the tasks
    if (this.filterVar === "All") {
      filteredTasks = this.tasks;
    } else {
      for (let i = 0; i < this.tasks.length; i++) {
        taskNow = this.tasks[i];
        if (taskNow.newAddStatus === this.filterVar) {
          filteredTasks.push(taskNow);
        }
      }
    }
    const tableBody = document.querySelector("#tableBody");

    if (filteredTasks.length > 0) {
      tableBody.innerHTML = "";
      for (let i = 0; i < filteredTasks.length; i++) {
        console.log(
          `filtered task ${i} printing date` + filteredTasks[i].newAddDate
        );
          let dateNow = this.todaysDate();
        let countDays = this.daysBetweenDates(
          dateNow,
          filteredTasks[i].newAddDate
        ); //calling function to calculate no. of days for each tasks

        let noOfDaysBadge; //to store days badge color
        if (this.colorCodeNoOfDays.hasOwnProperty(countDays)) {
          noOfDaysBadge = this.colorCodeNoOfDays[countDays];
        } else {
          noOfDaysBadge = this.colorCodeNoOfDays["remaining"];
        }
        let datedmy = this.changeFormatDate(filteredTasks[i].newAddDate);
        console.log("Reveresed date: " + datedmy);
        const tasksHtml = createTaskHtml(
          filteredTasks[i].newAddId,
          filteredTasks[i].newAddTaskName,
          filteredTasks[i].newAddDesc,
          filteredTasks[i].newAddDate,
          filteredTasks[i].newAddAssign,
          filteredTasks[i].newAddStatus,
          this.colorCode[filteredTasks[i].newAddStatus],
          noOfDaysBadge,
          countDays,
          dateNow,
          datedmy
        );
        tableBody.innerHTML += tasksHtml;
      }
    } else {
      if (this.tasks.length <= 0) {
        tableBody.innerHTML = `
          <h3>No tasks yet, Please click on Add task to add a new task</h3>
          `;
      } else {
        tableBody.innerHTML = `
          
            <h4>No tasks with the status "${this.filterVar}"</h4>
          
        `;
      }
    }
  }

  //localstorage starts here
  // Create the save method
  save() {
    // Create a JSON string of the tasks
    console.log("save called");
    console.log(this.tasks);
    const tasksJson = JSON.stringify(this.tasks);
    console.log(tasksJson);
    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  // Create the load method
  load() {
    console.log("load called");
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
} //end class

//Function to create inner HTML for rendering
const createTaskHtml = (
  newAddId,
  newAddTaskName,
  newAddDesc,
  newAddDate,
  newAddAssign,
  newAddStatus,
  newStatusColor,
  countBadge,
  countDays,
  dateNow,
  datedmy
) => {
  return `  
  <!-- Task starts here -->
  
  
 <section data-task-id=${newAddId}>           
   <a class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1 taskName">${newAddTaskName} 
              </h4>
              <small><badge id="countDay" class="badge-pill p-1 countD ${countBadge} ${
    newAddStatus === "Done" ? "hideElement" : " "
  }  ">${countDays} </badge></small>
    </div>
      
    <div class="border-1 mt-1 ml-1 mb-3 infocolor taskdetails" id="collapseExample-${newAddId}">
        <span> ${newAddDesc}</span>
        <span class="dat">Due Date: ${datedmy} </span>
    </div>
    <div class="mt-1 mb-1">
      <span>Assigned To: ${newAddAssign}</span>
      <span class="mt-2 mb-2 stat badge ${newStatusColor}">${newAddStatus}</span>
      <span class="donedelete"> 
        <small class="mr-1">
        <button id ="markAsDone" class="btn pt-0 mt-0 btn-outline-success done-button ${
          newAddStatus !== "Done" ? "visible" : "invisible"
        }">Mark As Done</button>
        </small>


        <small>
        
                
                <!-- Edit button Starts here -->
                <button type="button" id="editButton-${newAddId}" class="btn btn-outline-info pt-0 mt-0" data-toggle="modal" data-target="#editModal-${newAddId}" data-keyboard="false" data-backdrop="static" >
                <!-- Edit icon starts here -->
                <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-pencil-square"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                </svg>
                <!-- Edit icon ends here -->
                </button>
                <!-- edit button ends here-->
                <!--edit modal starts here -->
                <div
                  class="modal fade editModalClass"
                  id="editModal-${newAddId}"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="editmodallong-${newAddId}"
                  aria-hidden="true"
                  >
                  <div class="modal-dialog" role="document" id="edit-dialog-${newAddId}">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h2 class="modal-title" id="editmodallong-${newAddId}">
                          Edit Task
                        </h2>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">  
                        <span aria-hidden="true">&times;</span>                         
                        </button>
                      </div>
                      <form id="${newAddId}">
                        <div class="modal-body bgcolor">
                          <div id="edit1">
                            <div class="container border card w-75 formcolor py-2">
                              <div class="form-group col-md-10">
                                <label for="inputtask-${newAddId}">Task Name</label>
                                <input type="text" class="form-control editTaskName" id="inputtask-${newAddId}" name="inputtask-${newAddId}" value="${newAddTaskName}" />
                                <span id="editTaskNameAlert"> </span>
                              </div>
                              <div class="form-group col-md-10">
                                <label for="textarea-${newAddId}" >Description</label>
                                <textarea class="form-control editDesc" id="textarea-${newAddId}" rows="3" >${newAddDesc}
                                </textarea>
                                <span id="editTaskDescAlert"> </span>
                              </div>

                              <div class="form-group col-md-10">
                                <label for="duedate-${newAddId}">Due Date</label>
                                  <input type="date" class="form-control editDate" id="duedate-${newAddId}" value="${newAddDate}" min="${dateNow}" />
                                  <span id="editTaskDateAlert"> </span>
                              </div>
                              <div class="form-group col-md-10">
                                <label for="assign-${newAddId}">Assigned To</label>
                                <select id="assign-${newAddId}" class="form-control editAssign">
                                  <option value="Angel" ${
                                    newAddAssign == "Angel" ? "selected" : " "
                                  }>Angel</option>
                                  <option value="Reny" ${
                                    newAddAssign == "Reny" ? "selected" : " "
                                  }>Reny</option>
                                </select>
                              </div>
                              <div class="form-group col-md-10">
                                <label for="status-${newAddId}">Status</label>
                                <select id="status-${newAddId}" class="form-control editStatus">
                                  <option value="To-Do" ${
                                    newAddStatus == "To-Do" ? "selected" : " "
                                  }>To-Do</option>
                                  <option value="In progress" ${
                                    newAddStatus == "In progress"
                                      ? "selected"
                                      : " "
                                  }>In progress</option>
                                  <option value="Review" ${
                                    newAddStatus == "Review" ? "selected" : " "
                                  }>Review</option>
                                  <option value="Done" ${
                                    newAddStatus == "Done" ? "selected" : " "
                                  }>Done</option>
                                </select>
                              </div>
                              
                                
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal" >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary edit-button">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- Edit Modal of task 1 Ends here -->
              
              </small>

          <small> 
            <!--Delete button Starts here-->
            <button type="button" 
                      id="deleteModal-${newAddId}"
                      class="btn btn-outline-danger pt-0 mt-0"
                      data-toggle="modal"
                      data-target="#delModal-${newAddId}"
                      data-keyboard="false"
                      data-backdrop="static"
                      > 
                      <!-- delete icon starts here -->
                      <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          class="bi bi-trash"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                      </svg> 
                        <!-- delete icon ends here -->

            </button> 
            <!--Delete button ends here-->
          
             <!--Delete modal starts here-->
        
            <div class="modal fade"
              id="delModal-${newAddId}"
              tabindex="-1"
              aria-labelledby="ModalLabel-${newAddId}"
              aria-hidden="true">
              <div class="modal-dialog" id="modal-dialog-${newAddId}">
               <div class="modal-content">
                <div class="modal-header">
                 <h5 class="modal-title" id="ModalLabel-${newAddId}">Confirm</h5>
                  <button type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      >
                      <span aria-hidden="true">&times;</span>
  
                  </button>
                </div>
                <div class="modal-body bgcolor">
                    Are you sure you want to delete this?
                </div>
                <div class="modal-footer">
                    <button
                          type="button"
                          id= "deleteId"
                          class="btn btn-danger delete-button"
                          data-dismiss="modal"
                        >
                          Yes
                    </button>
                    <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal">
                          No
                    </button>
                </div>
               </div>
              </div>
            </div> 
            <!--Delete modal ends here-->
        </small>


           







      </span>
    </div>

   </a> 
  </section>`;
};

//Function definition for converting date into object from string
const parseDate = (input) => {
  // Transform date from text to date
  let parts = input.split("-");
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
};

//For testing the methods
if (typeof module != "undefined") {
  module.exports = TaskManager;
}
