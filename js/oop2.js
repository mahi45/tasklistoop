// Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('#task-list');



// Define Class
class Tasks {
    constructor(taskId, newTask) {
        this.taskId = taskId;
        this.newTask = newTask;
    }
}

class UI {
    // Adding task
    static addToTaskList(task) {
        let taskList = document.querySelector('#task-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.taskId}</td>
        <td>${task.newTask}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        taskList.appendChild(row);
    }

}





// Define Event Listner
form.addEventListener('submit', addTask);


// Define Function
function addTask(e) {
    let taskId = document.querySelector('#taskId').value;
    let newTask = document.querySelector('#new_task').value;

    let task = new Tasks(taskId, newTask);

    if (taskId === '' || newTask === '') {
        console.log("Field must not be empty");
    } else {
        UI.addToTaskList(task);
    }
    e.preventDefault();
}

