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
    return dateString;
  }

  //function to set the value of filterVar for filtering the tasks
  filterView() {
    this.filterVar = document.querySelector(
      "#filterStatus"
    ).selectedOptions[0].value;
    this.render();
  }

  //Calculating no. of working days between today's date and due date
  workingDaysBetweenDates = (dateNow, dueDate) => {
    //holidays in the year of 2021 & 2022
    let holidays = [
      "2021-01-01",
      "2021-01-26",
      "2021-04-02",
      "2021-04-05",
      "2021-04-25",
      "2021-12-27",
      "2021-12-28",
      "2022-01-03",
      "2022-01-26",
      "2022-04-15",
      "2022-04-18",
      "2022-04-25",
      "2022-12-26",
    ];
    let startDate = parseDate(dateNow); // convert today's date to date object
    let endDate = parseDate(dueDate); // convert task's due date to date object

    // startDate.setHours(0, 0, 0, 0); // Start just after midnight
    // endDate.setHours(0, 0, 0, 0); // End at midnight

    // Validate input
    if (dateNow === dueDate) {
      return `Due Today`; // returns 0 if the dates are less than or same.
    } else if (endDate < startDate) {
      return `Over Due`;
    }

    // Calculate days between dates
    let millisecondsPerDay = 86400 * 1000; // Day in milliseconds (24*60*60*1000)
    startDate.setHours(0, 0, 0, 1); // Start just after midnight
    endDate.setHours(23, 59, 59, 999); // End just before midnight

    let diff = endDate - startDate; // Milliseconds between datetime objects
    let days = Math.ceil(diff / millisecondsPerDay);
    // Subtract two weekend days for every week in between
    let weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    let startDay = startDate.getDay();
    let endDay = endDate.getDay();

    // Remove weekend which is not previously removed.
    if (startDay - endDay > 1) {
      days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6) {
      days--;
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0) {
      days--;
    }
    /* Here is the code for subtracting holidays*/
    holidays.forEach((day) => {
      if (day >= dateNow && day <= dueDate) {
        /* If it is not saturday (6) or sunday (0), subtract it */
        if (parseDate(day).getDay() % 6 != 0) {
          days--;
        }
      }
    });
    if (days == 1) {
      return `${days} day remaining`;
    } else if (days == 0) {
      return "Due Today";
    } else {
      return `${days} days remaining`;
    }
  };

  // function to render the output
  render() {
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
        let countDays = this.workingDaysBetweenDates(
          this.todaysDate(),
          filteredTasks[i].newAddDate
        ); //calling function to calculate no. of working days for each tasks

        let noOfDaysBadge;  //to store days badge color
        if (this.colorCodeNoOfDays.hasOwnProperty(countDays)) {
          noOfDaysBadge = this.colorCodeNoOfDays[countDays];
        } else {
          noOfDaysBadge = this.colorCodeNoOfDays["remaining"];
        }

        const tasksHtml = createTaskHtml(
          filteredTasks[i].newAddId,
          filteredTasks[i].newAddTaskName,
          filteredTasks[i].newAddDesc,
          filteredTasks[i].newAddDate,
          filteredTasks[i].newAddAssign,
          filteredTasks[i].newAddStatus,
          this.colorCode[filteredTasks[i].newAddStatus],
          noOfDaysBadge,
          countDays
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
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  // Create the load method
  load() {
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

const createTaskHtml = (
  newAddId,
  newAddTaskName,
  newAddDesc,
  newAddDate,
  newAddAssign,
  newAddStatus,
  newStatusColor,
  countBadge,
  countDays
) => {
  return `  
  <!-- Task starts here -->
  
  
  <section data-task-id=${newAddId}>           
     <a class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
              <h3 class="mb-1 taskName">${newAddTaskName} 
              </h3>
              <small><badge id="countDay" class="badge-pill p-1 ${countBadge} ${
                newAddStatus === "Done" ? "hideElement" : " "
                }  ">${countDays} </badge></small>
              

      </div>
      <span>Due Date:   ${newAddDate} </span>
    <p>
    <button class="btn-sm btn-info moreInfo"
                    data-toggle="collapse"
                    href="#collapseExample-${newAddId}"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    id="moreInfo-${newAddId}"
                  >
                    Description
                  </button> </p>
        <p class="collapse border-1 mt-1 ml-1 mb-3 infocolor taskdetails" id="collapseExample-${newAddId}"><span> 
                      
                  ${newAddDesc}</span></p>
                  
                  
      <p class="mt-1"><span>Assigned To: ${newAddAssign}</span>
      <span class="mt-1 ml-5  badge ${newStatusColor}">${newAddStatus}</span>
    
      <span class="donedelete">
      
        <small><button id ="markAsDone" class="btn pt-0 mt-0 btn-outline-success done-button ${
          newAddStatus !== "Done" ? "visible" : "invisible"
        }">Mark As Done</button>
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
        
            <div class="modal fade "
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
     </span></p>

     </a> 
    </section>`;
};

const parseDate = (input) => {
  // Transform date from text to date
  let parts = input.split("-");
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
};

if (typeof module != "undefined") {
  module.exports = TaskManager;
}
