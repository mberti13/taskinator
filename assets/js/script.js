//Sets ID for each new task as increment ++
var taskIdCounter = 0;
//DOM Object Reference to task list(claifies button id is "save-task")
var formEl = document.querySelector("#task-form");
//DOM Object Reference to task item(clarifies ul id is "tasks-to-do")
var tasksToDoEl = document.querySelector("#tasks-to-do");


//Task Handler Function to dynamically create the task item, follows single-responsibility principle.
var taskFormHandler = function(){

    //Prevent browser from refreshing on form submission
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name= 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

    //Check if input values are empty strings
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }

    //Package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    //Resets form input when submitted
    formEl.reset();
}
var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //Add task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //Increase task counter for next unique ID
    taskIdCounter++;
};
var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = ("task-actions");

    //Create Edit Task Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Create Delete Task Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};
//Event Listener for "click" or enter/ SUBMIT ON FORM!
formEl.addEventListener("submit", taskFormHandler);