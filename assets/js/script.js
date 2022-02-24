

//Sets ID for each new task as increment ++
var taskIdCounter = 0;
//DOM Object Reference to task list(claifies button id is "save-task")
var formEl = document.querySelector("#task-form");
//DOM Object Reference to task item(clarifies ul id is "tasks-to-do")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress ");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

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
    var completeEditTask = function(taskName, taskType, taskId){
        //find the matching list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        //set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        //loop through tasks array and task object with new content
        for(var i =0; i < tasks.length; i++){
            if(tasks[i].id === parseInt(taskId)){
                tasks[i].name = taskName;
                tasks[i].type = taskType;
            }
        };
        alert("Task Updated!");
        //Resets button after editing task
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    };
    var isEdit = formEl.hasAttribute("data-task-id");
    //has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create as normal and pass to createTaskEl function
    else{
        //Package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        //send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
  


    //Resets form input when submitted
    formEl.reset();
}
var createTaskEl = function(taskDataObj){
    console.log(taskDataObj);
    console.log(taskDataObj.status);
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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

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
//Event Listener for delete button
var taskButtonHandler = function(event){
    // get a target element from event
    var targetEl = event.target;

    //if edit button was clicked
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //if delete button was clicked
    else if(targetEl.matches(".delete-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
// Changes status of tasks
var taskStatusChangeHandler = function(event){
    //get task items ID
    var taskId = event.target.getAttribute("data-task-id");

    //gets the currently slected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the ID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //If/else statement to move task to desired list
    //Appends to To Do List
    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    //Appends to In Progress List
    else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    //Appends to Completed List 
    else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
    //update task's in task's array
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
        console.log(tasks);
    }
};
//Edits Tasks
var editTask = function(taskId){
    console.log("editing task #" + taskId);

    //get task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" +taskId + "']");

    //get content from task name anmd type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name'").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type'").value = taskType;

    //Create 'Save Task' Button while in edit mode
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
    
};
//Deletes Tasks
var deleteTask = function(taskId){
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for(var i = 0; i < tasks.length; i++){
        //if tasks[i].id doesn't match the value of taskId, lets keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    };

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

