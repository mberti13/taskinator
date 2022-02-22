//DOM Object Reference to task list(claifies button id is "save-task")
var buttonEl = document.querySelector("#save-task");
//DOM Object Reference to task item(clarifies ul id is "tasks-to-do")
var taskToDoEl = document.querySelector("#tasks-to-do");


//Task Handler Function to dynamically create the task item, follows single-responsibility principle.
var createTaskHandler = function(){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    taskToDoEl.appendChild(listItemEl);
}
//Event Listener for "click"
buttonEl.addEventListener("click", createTaskHandler);