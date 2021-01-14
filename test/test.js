const assert = require("assert");
const TaskManager = require("./../js/taskManagertable.js");
describe("Testing taskManager class funciton", () => {
  it("should add Task", () => {
    //setup
    const taskManager = new TaskManager(0);

    //explain
    taskManager.addTask("shoppping", "At Aldi", "Lavina", "24/01/2021");
    let len = taskManager.tasks.length;
    //verify
    assert.strictEqual(len, 1);
  });
  it("should Delete Task", () => {
    //setup
    //predefined arraylength
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "Lavina", "24/01/2021");
    taskManager.addTask("shoppping", "At Aldi", "Lavina", "24/01/2021");
    let expectedlength = 1;
    //excercise
    taskManager.deleteTask(0);
    let actuallength = taskManager.tasks.length;

    //verify
    assert.strictEqual(actuallength, expectedlength);
  });
  it("should GetTaskById for MarkasDone", () => {
    //setup
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "24/01/2021", "Lavina");
    taskManager.addTask("shoppping1", "At Aldi1", "30/01/2021", "Lavina1");
    //explain
    let expected = {
      newAddAssign: 'Lavina',
      newAddDate: '24/01/2021',
      newAddDesc: 'At Aldi',
      newAddId: 0,
      newAddStatus: 'To-Do',
      newAddTaskName: 'shoppping',
    };

    let result = taskManager.getTaskById(0);
    console.log(result);

    //verify
    assert.deepStrictEqual(result, expected);
  });
});
