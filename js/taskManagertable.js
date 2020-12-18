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
                  <!-- More info of task 1 starts here -->
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
                  <!-- More info of task 1 ends here -->
                </td>
                <td class="w-25">
                            <button class="btn btn-outline-success done-button ${
                              newAddStatus === "To-Do" ? "visible" : "invisible"
                            }">Mark As Done</button>

                </td>

                <td>
                  <!-- Tooltip of edit Modal of task 1 Starts here -->
                  <a
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit item"
                  >
                    <!-- Edit Modal of task 1 Starts here -->
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      data-toggle="modal"
                      data-target="#exampleModalLong1"
                      data-keyboard="false"
                      data-backdrop="static"
                    >
                      <!-- Edit icon of task 1 starts here -->
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
                      <!-- Edit icon of task 1 ends here -->
                    </button>
                  </a>
                  <!-- Tooltip of edit Modal of task 1 ends here -->
                  <div
                    class="modal fade"
                    id="exampleModalLong1"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLongTitle1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h2 class="modal-title" id="exampleModalLongTitle1">
                            Edit Task
                          </h2>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <form>
                          <div class="modal-body bgcolor">
                            <section id="edit1">
                              <div
                                class="container border card w-75 formcolor py-2"
                              >
                                <div class="form-group col-md-10">
                                  <label for="inputEmail4">Task Name</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="inputEmail4"
                                    name="inputEmail4"
                                    value="Wireframe"
                                  />
                                </div>
                                <div class="form-group col-md-10">
                                  <label for="exampleFormControlTextarea1"
                                    >Description</label
                                  >
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                  >
  Wireframe the project using ninjamock
                                  </textarea>
                                </div>

                                <div class="form-group col-md-10">
                                  <label for="inputPassword4">Due Date</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="inputPassword4"
                                    value="12-11-2020"
                                  />
                                </div>
                                <div class="form-group col-md-10">
                                  <label for="inputState">Assigned To</label>
                                  <select id="inputState" class="form-control">
                                    <option selected>Reny</option>
                                    <option>Angel</option>
                                  </select>
                                </div>
                                <div class="form-group col-md-10">
                                  <label for="inputState">Status</label>
                                  <select id="inputState" class="form-control">
                                    <option selected>Done</option>
                                    <option>To do</option>
                                    <option>In progress</option>
                                    <option>Review</option>
                                  </select>
                                </div>
                                <!-- <button type="submit" class="btn btn-success">Save Changes</button>
                                  <button type="submit" class="btn btn-success">Cancel</button> -->
                              </div>
                            </section>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!-- Edit Modal of task 1 Ends here -->
                </td>

                <td>
                  <!-- Tooltip of delete Modal of task 1 Starts here -->
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete item"
                  >
                    <!--Delete Modal of task 1 Starts here-->
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      data-toggle="modal"
                      data-target="#exampleModal1"
                      data-keyboard="false"
                      data-backdrop="static"
                    >
                      <!-- delete icon 1 starts here -->
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
                      <!-- delete icon 1 ends here -->
                    </button>
                  </a>
                  <!-- Tooltip of delete Modal of task 1 ends here -->
                  <div
                    class="modal fade"
                    id="exampleModal1"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel1">
                            Confirm
                          </h5>
                          <button
                            type="button"
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
                            class="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Delete Modal of task 1 Ends here-->
                </td>
              </tr>
              <!-- Task 1 ends here -->
            `;
};
//end of function createTaskHtml

//create an instance of class taskManager
//const taskList = new TaskManager();
//call the newAddTask method
// taskList.addTask(
//   "wireframe",
//   "Wireframe the project using ninjamock",
//   "16-12-2020",
//   "Reny"
// );
// taskList.addTask(
//   "wireframe2",
//   "Wireframe the project using ninjamock",
//   "16-12-2020",
//   "Angel"
// );
//console.log(taskList.tasks);

// Call the render function

//taskList.render();
