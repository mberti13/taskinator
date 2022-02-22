//DOM Object Reference to task list(claifies button id is "save-task")
var formEl = document.querySelector("#task-form");
//DOM Object Reference to task item(clarifies ul id is "tasks-to-do")
var taskToDoEl = document.querySelector("#tasks-to-do");


//Task Handler Function to dynamically create the task item, follows single-responsibility principle.
var createTaskHandler = function(){

    //Prevent browser from refreshing on form submission
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name= 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    taskToDoEl.appendChild(listItemEl);
}
//Event Listener for "click" or enter/ SUBMIT ON FORM!
formEl.addEventListener("submit", createTaskHandler);