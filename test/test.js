const assert = require("assert");
const TaskManager = require("./../js/taskManagertable.js");
describe("Testing taskManager class funciton", () => {
  it("should add Task", () => {
    //setup
    const taskManager = new TaskManager(0);
    let expectedLength = 1;

    //explain
    taskManager.addTask("Wireframing", "Using Ninjamock", "reny", "24/05/2021");
    let actualLength = taskManager.tasks.length;
    
    //verify
    assert.strictEqual(actualLength, expectedLength);
  });
  it("should Delete Task", () => {
    //setup
    //predefined arraylength
    const taskManager = new TaskManager(0);
    taskManager.addTask("Wireframing", "Using Ninjamock", "reny", "24/05/2021");
    taskManager.addTask("Collaboration", "Using Github", "angel", "24/06/2021");
    let expectedLength = 1; //predefined arraylength after deletion
    //explain
    taskManager.deleteTask(0);
    let actualLength = taskManager.tasks.length; //actual arraylength after deletion

    //verify
    assert.strictEqual(actualLength, expectedLength);
  });
  it("should GetTaskById for MarkasDone", () => {
    //setup
    const taskManager = new TaskManager(0);
    taskManager.addTask("Wireframing", "Using Ninjamock", "reny", "24/05/2021");
    taskManager.addTask("Collaboration", "Using Github", "angel", "24/06/2021");
    //explain
    let expected = taskManager.tasks[0];

    let result = taskManager.getTaskById(0);

    //verify
    assert.deepStrictEqual(result, expected);
  });
});
