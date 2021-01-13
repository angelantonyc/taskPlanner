//TaskManager class defined
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  //function addTask
  addTask(newAddTaskName, newAddDesc, newAddDate, newAddAssign) {
    //create a new object from the details of the add task
    console.log(this.currentId);
    const newAddTask = {
      newAddId: this.currentId++,
      newAddTaskName: newAddTaskName,
      newAddDesc: newAddDesc,
      newAddDate: newAddDate,
      newAddAssign: newAddAssign,
      newAddStatus: "To-Do",
    };
    //push the object into the book arra
    this.tasks.push(newAddTask);
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
  // function to display the book on the browser
  render() {
    const addModalDiv = document.querySelector("#tableBody");
    const addTableHeader = document.querySelector("#tableHeader");

    addTableHeader.innerHTML = `<tr>
              <th scope="col">#</th>
              <th scope="col" class="w-25">Task Name</th>
              <th scope="col">Status</th>
              <th scope="col" class="w-25 pl-2 text-center">Assigned to</th>
              <th scope="col" class="w-25">Due Date</th>
              <th scope="col" class="w-25">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>`;

    addModalDiv.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      const tasksHtml = createTaskHtml(
        this.tasks[i].newAddId,
        this.tasks[i].newAddTaskName,
        this.tasks[i].newAddDesc,
        this.tasks[i].newAddDate,
        this.tasks[i].newAddAssign,
        this.tasks[i].newAddStatus
      );
      addModalDiv.innerHTML += tasksHtml;
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
//html input
const createTaskHtml = (
  newAddId,
  newAddTaskName,
  newAddDesc,
  newAddDate,
  newAddAssign,
  newAddStatus
) => {
  return `  
  <!-- Task 1 starts here -->
  
              <tr data-task-id=${newAddId}>
                <th scope="row">${newAddId}</th>
                <td>${newAddTaskName}</td>
                <td>
                  <span class="badge ${
                    newAddStatus === "To-Do" ? "badge-danger" : "badge-success"
                  }">${newAddStatus}</span>
                </td>
                <td class="text-center">${newAddAssign}</td>
                <td>${newAddDate}</td>
                <td class="w-25">
                  <!-- More info of task starts here -->
                  <a
                    class="btn btn-outline-info pt-0 mt-0"
                    data-toggle="collapse"
                    href="#collapseExample1"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample1"
                  >
                    More Info...
                  </a>
                  <div class="collapse" id="collapseExample1">
                    <div class="card card-body border-0 mt-1 infocolor">
                      ${newAddDesc}
                    </div>
                  </div>
                  <!-- More info of task ends here -->
                </td>
                <td class="w-25">
                            <button id ="markAsDone" class="btn btn-outline-success done-button ${
                              newAddStatus === "To-Do" ? "visible" : "invisible"
                            }">Mark As Done</button>

                </td>

                <td>
                  <!-- Tooltip of edit button Starts here -->
                  <a
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit item"
                  >
                    <!-- Edit button Starts here -->
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      data-toggle="modal"
                      data-target="#exampleModalLong1"
                      data-keyboard="false"
                      data-backdrop="static"
                    >
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
                    <!-- Edit button ends here -->
                  </a>
                  <!-- Tooltip of edit button ends here -->
                    <!--Edit modal code in index.html-->
                </td>

                <td>
                  <!-- Tooltip of delete button Starts here -->
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete item"
                  >
                    <!--Delete button Starts here-->
                    <button
                      type="button"
                      class="btn btn-outline-danger deleteModal delete-button"
                      data-toggle="modal"
                      data-target=""
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
                  </a>
                  <!-- Tooltip of delete button ends here -->
                  <!-- Delete Modal code in index.html-->
                </td>
              </tr>
              <!-- Task ends here -->
            `;
};

//piechart view
// const pieButton = document.querySelector("#pieButton");
// const pieChart = document.querySelector("#pieChart");
// pieButton.addEventListener("click", drawPie);
// console.log("pie");
// function drawPie() {
//   // x <- c(10, 20, 30, 40);
//   // pie(x);
//   console.log("pie button clicked");
//   pieChart.className = "pieChartClass";
// }


