//The overall list of lists
let masterList = [];

//Sets the list key for storage
let LIST_KEY = "masterList";

//A counter that keeps track of how many lists the user has created.
let listCount = 0;

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

function createNewList(){
    let newList = new list();
    listCount++;
    masterList.push(newList);

    displayNewestList(masterList[listCount-1]);
    storage.saveLists(masterList);
}

function displayNewestList(list){

}

$(function(){
    masterList = storage.getLists();
    listCount = masterList.length;

    if (listCount == 0){
        $(".list-box").html("<div id='no-lists\'><p>You don't have any lists yet. Why not add one?</p></div>");
    }
    else{
        displayExistingLists(masterList);
    }
});

function displayExistingLists(){
    $("#no-lists").remove();

    if (listCount > 0){
        //I thought it would be nice to display the newer lists towards the top, so we'll be doing this loop backwards
        for(let i = masterList.length-1; i > -1; i--){
            $("#listDropdown").append("<li><a href=\"#\" onclick='displaySelectedList(this.id)' id='list"+ i +"'>"+ masterList[i].listName +"</a></li>");
        }
    }
    else{
        $("#listDropdown").append();
    }
}

function displaySelectedList(id){
    let num = id.replace( /^\D+/g, '');
    $("#list-title").text(masterList[num].listName);

    displayTasksOfSelectedList(masterList[num]);
}

function displayTasksOfSelectedList(list){
    $("#list-tasks").empty();

    for (var i = 0; i < list.tasks.length; i++){
        $("#list-tasks").append("<li class='list-group-item' id='task"+ list.tasks[i].taskID +"'><input type='checkbox'>" + list.tasks[i].taskName + "</li>");
    }

    $("#list-tasks").append("<button type='button' class='btn btn-success' onclick='createNewTask("+ list +")'>+ Add New Task</button>")
}

function createNewTask(list){

}

function deleteList(list){

}

function clearCompleted(){

}
