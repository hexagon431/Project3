//The overall list of lists
let masterList = [];

// $(function(){
//     masterList = storage.getLists();
//
//     if (masterList.length == 0){
//         $("#no-lists").show();
//         $("#delete-list-button").hide();
//         $("#clear-completed-button").hide();
//         $("#save-list-button").hide();
//     }
//     else{
//         $("#no-lists").hide();
//         displayExistingLists(masterList);
//         displayNewestList(masterList[masterList.length-1]);
//     }
// });

//The list whose contents are being displayed
let selectedList;

//List object - each list has a name and an array of tasks, which are objects. Each task has a name and also a complete/incomplete status.
//The initial taskList will have an example list for the user.
let list = function(){
    this.listName="New List";
    this.tasks=[{taskName: "New Task", done: false}];
};

let task = function(){
  this.taskName = "New Task";
  this.done = false;
};

//Sets the list key for storage
let LIST_KEY = "masterList";

//Initialize storage functions
let storage = new Storage(LIST_KEY);


$(document).keypress(function(e) {
    if(e.which == 13) {
        if (masterList.length > 0){
            updateList();
        }
    }
});

function displayNewestList(list){
    if (masterList.length > 0){
        $("#delete-list-button").show();
        $("#clear-completed-button").show();
        $("#save-list-button").show();
        selectedList = list;
        $("#list-title").text(selectedList.listName);
        displayTasksOfSelectedList(selectedList);
    }
    else{
        $("#list-title").text("");
        $("#list-tasks").text("");
        $("#delete-list-button").hide();
        $("#clear-completed-button").hide();
        $("#save-list-button").hide();
        $("#no-lists").show();
    }
}

function createNewList(){
    let newList = new list();
    let newTask = new task();
    newList.tasks.push(newTask);

    masterList.push(newList);

    displayNewestList(masterList[masterList.length-1]);
    displayExistingLists();
    storage.saveLists(masterList);
}

function displayExistingLists(){
    $("#no-lists").hide();

    $("#listDropdown").empty();

    if (masterList.length > 0){
        //I thought it would be nice to display the newer lists towards the top, so we'll be doing this loop backwards
        for(let i = masterList.length-1; i > -1; i--){
            $("#listDropdown").append("<li><a href=\"#\" onclick='displaySelectedList(this.id)' id='list"+ i +"'>"+ masterList[i].listName +"</a></li>");
        }
    }
    else{
        $("#no-lists").show();
    }
}

function displaySelectedList(id){
    let num = id.replace( /^\D+/g, '');
    selectedList = masterList[num];
    $("#list-title").text(selectedList.listName);

    displayTasksOfSelectedList(selectedList);
}

function displayTasksOfSelectedList(list){
    $("#list-tasks").empty();

    for (var i = 0; i < list.tasks.length-1; i++){
        if (list.tasks[i].done == false){
            $("#list-tasks").append("<li class='list-group-item'><input type='checkbox' style='margin-right: 5px;' onclick='updateTaskStatus(this.id)' id='task-check" + i + "'><span contenteditable='true' id='task" + i + "'>"+ list.tasks[i].taskName + "</span><span style='margin-left: 20px;' class='glyphicon glyphicon-trash' aria-hidden='true' onclick='deleteTask(this.id)' id='delete-button"+ i +"'></span></li>");
        }
    }

    $("#list-tasks").append("<button type='button' class='btn btn-success' onclick='createNewTask()'>+ Add New Task</button>")
}

function createNewTask(){
    updateList();
    var list = selectedList;
    var newTask = new task();

    list.tasks.push(newTask);
    storage.saveLists(masterList);
    displayTasksOfSelectedList(list);
}

function deleteList(){
    if (masterList.length > 0){

        var delList = selectedList;
        masterList.splice(masterList.indexOf(delList), 1);

        storage.saveLists(masterList);

        selectedList = masterList[masterList.length - 1];
    }

    displayNewestList(selectedList);
    displayExistingLists();

}

function deleteTask(id){
    var theID = id.replace( /^\D+/g, '');

    selectedList.tasks.splice(theID, 1);

    displayTasksOfSelectedList(selectedList);
    updateList();
}

function updateTaskStatus(id){
    var theID = id.replace( /^\D+/g, '');

    if($("#task-check" + theID).prop('checked')){
        selectedList.tasks[theID].done=true;
    }
    else{
        selectedList.tasks[theID].done=false;
    }

    storage.saveLists(masterList);
}

function clearCompleted(){
    var list = selectedList;

    for(var i = 0; i < list.tasks.length-1; i++){
        if (list.tasks[i].done == true) {
            $("#task" + i).closest("li").hide();
        }
    }
}

function updateList(){
    var list = selectedList;

    list.listName = $("#list-title").text();

    for (var i = 0; i < list.tasks.length-1; i++){
        list.tasks[i].taskName = $("#task" + i).text();
    }

    displayExistingLists();

    storage.saveLists(masterList);
}