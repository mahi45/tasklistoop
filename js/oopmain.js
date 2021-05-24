// Define UI element
let form = document.querySelector('#task_form');
let taskId = document.querySelector('#taskId');
let newTask = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('#task-list');
let clearBtn = document.querySelector('#clear_task_btn');


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
        <td>${task.newTask}</td>
        <td>${task.taskId}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        taskList.appendChild(row);
    }
    // Clear input field after adding task
    static clearField() {
        taskId.value = '';
        newTask.value = '';
    }
    //Delete Task
    static removeFromTaskList(target) {
        if (target.hasAttribute('href')) {
            if (confirm("Are you sure to delete ?")) {
                target.parentElement.parentElement.remove();
                //Store.deleteTask(target.parentElement);
                Store.deleteTask(target.parentElement.previousElementSibling.textContent.trim());
                UI.showAlert("You have removed a task successfully", "warning");
            }
        }
    }
    //Clear All Task
    static clearAllTask(target) {
        taskList.innerHTML = '';

        // while (taskList.firstChild) {
        //     taskList.removeChild(taskList.firstChild);
        // }
        localStorage.clear();
    }

    //Filter Task
    static filterAllTask(target) {
        console.log(target.value);
        let text = target.value.toLowerCase();
        document.querySelectorAll('td').forEach(task => {
            let item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        })
        console.log(text);
    }

    //Showing Alert Message
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#task_form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000);
    }
}

//Local Storage Class
class Store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task) {
        let tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static displayTasks() {
        let tasks = Store.getTasks();
        tasks.forEach(task => {
            UI.addToTaskList(task);
        })
    }

    static deleteTask(taskId) {
        let tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            if (task.taskId === taskId) {
                tasks.splice(index, 1);
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}



// Define Event Listner
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', Store.displayTasks());






// Define Function
function addTask(e) {
    let taskId = document.querySelector('#taskId').value;
    let newTask = document.querySelector('#new_task').value;

    let task = new Tasks(taskId, newTask);

    if (taskId === '' || newTask === '') {
        UI.showAlert("Field must not be empty", "error");
    } else {
        UI.addToTaskList(task);
        UI.clearField();
        UI.showAlert("You have added a task successfully", "success");
        Store.addTask(task);
    }
    e.preventDefault();
}

function removeTask(e) {
    UI.removeFromTaskList(e.target);

    e.preventDefault();
}

function clearTask(e) {
    UI.clearAllTask(e.target);
}

function filterTask(e) {
    UI.filterAllTask(e.target);
}
