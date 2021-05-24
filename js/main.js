// Define UI element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');

// Define EventListner
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);



// Define Function
// Adding a task
function addTask(e) {
    if (taskInput.value === '') {
        alert("Please add any task");
    } else {
        // Create li
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + '       '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);

        // Data store in local storage
        storeTask(taskInput.value);
        //storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    } e.preventDefault();
}

// Remove single task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are you sure to delete?")) {
            let ele = e.target.parentElement;
            //console.log(ele);
            ele.remove();

            removeFromLocalStore(ele);
        }
    }
}

// Clear all task
function clearTask(e) {
    //taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// Data store in local storage
function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get data from local storage to browser
function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + '    '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
    })
}

// Remove data from local storage
function removeFromLocalStore(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);  //<a>X</a>
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
