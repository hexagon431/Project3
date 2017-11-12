//The overall list of lists
let masterList = [];

//Sets the list key for storage
let LIST_KEY = "masterList";

//A counter that keeps track of how many lists the user has created.
let listCount;

//Initialize storage functions
let storage = new Storage(LIST_KEY);

//The list whose contents are being displayed
let selectedList;

//List object - each list has a name and an array of tasks, which are objects. Each task has a name and also a complete/incomplete status.
//The initial taskList will have an example list for the user.
let list = function(){
    this.listID = listCount;
    this.listName="New List";
    this.tasks=[{taskID: 0, taskName: "New Task", done: false}];
    this.taskCount = 1;
};

$(function(){
    masterList = storage.getLists();
    listCount = masterList.length;

    if (listCount == 0){
        $("#no-lists").show();
        $("#delete-list-button").hide();
        $("#save-list-button").hide();
    }
    else{
        $("#no-lists").hide();
        displayExistingLists(masterList);
        displayNewestList(masterList[listCount-1]);
    }
});

$(document).keypress(function(e) {
    if(e.which == 13) {
        if (listCount > 0){
            updateList();
        }


    }
});

function displayNewestList(list){
    if (listCount > 0){
        $("#delete-list-button").show();
        $("#save-list-button").show();
        selectedList = list;
        $("#list-title").text(selectedList.listName);
        displayTasksOfSelectedList(selectedList);
    }
    else{
        $("#list-title").text("");
        $("#list-tasks").text("");
        $("#delete-list-button").hide();
        $("#save-list-button").hide();
        $("#no-lists").show();
    }


}

function createNewList(){
    let newList = new list();
    listCount++;
    masterList.push(newList);

    displayNewestList(masterList[listCount-1]);
    displayExistingLists();
    storage.saveLists(masterList);
}

function displayExistingLists(){
    $("#no-lists").hide();

    $("#listDropdown").empty();

    if (listCount > 0){
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

    for (var i = 0; i < list.tasks.length; i++){
        $("#list-tasks").append("<li class='list-group-item'><input type='checkbox' style='margin-right: 5px;'><span contenteditable='true' id='task" + list.tasks[i].taskID + "'>"+ list.tasks[i].taskName + "</span><span style='margin-left: 20px;' class='glyphicon glyphicon-trash' aria-hidden='true' onclick='deleteTask(this.id)' id='delete-button'></span></li>");
    }

    $("#list-tasks").append("<button type='button' class='btn btn-success' onclick='createNewTask()'>+ Add New Task</button>")
}

function createNewTask(){
    updateList();
    var list = selectedList;
    list.taskCount += 1;
    var newTask = {taskID: list.taskCount-1, taskName: "New Task", done: false};

    list.tasks.push(newTask);
    storage.saveLists(masterList);
    displayTasksOfSelectedList(list);
}

function deleteList(){
    if (listCount > 0){
        listCount--;

        var delList = selectedList;
        masterList.splice(masterList.indexOf(delList), 1);

        storage.saveLists(masterList);

        selectedList = masterList[listCount - 1];
    }

    displayNewestList(selectedList);
    displayExistingLists();

}

function deleteTask(id){
    if (selectedList.taskCount > 0){
        selectedList.taskCount--;
        var task=$("#" + id).closest("span").prop("id");
        var idOfTask = task.replace( /^\D+/g, '');

        selectedList.tasks.splice(selectedList.tasks.indexOf(idOfTask), 1);
        storage.saveLists(masterList);
        displayTasksOfSelectedList(selectedList);
    }


}

function clearCompleted(){

}

function updateList(){
    var list = selectedList;

    list.listName = $("#list-title").text();

    for (var i = 0; i < list.tasks.length; i++){
        list.tasks[i].taskName = $("#task" + i).text();
    }

    storage.saveLists(masterList);
}