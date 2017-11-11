//The overall list of lists
let masterList = [];

//Sets the list key for storage
let LIST_KEY = "masterList";

//A counter that keeps track of how many lists the user has created.
let listCount = 0;

//Initialize storage functions
let storage = new Storage(LIST_KEY);

//List object - each list has a name and an array of tasks, which are objects. Each task has a name and also a complete/incomplete status.
//The initial taskList will have an example list for the user.
let list = function(){
    this.listID = listCount;
    this.listName="New List";
    this.tasks=[{taskID: 0, taskName: "New Task", done: false}];
    this.taskCount = 0;
};

function createNewList(){
    let newList = new list();
    listCount++;
    masterList.push(newList);

    displayNewestList(masterList[listCount-1]);
    storage.saveLists(masterList);
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

    //I thought it would be nice to display the newer lists towards the top, so we'll be doing this loop backwards
    for(let i = masterList.length-1; i > -1; i--){
        $("#listDropdown").append("<li><a href=\"#\" onclick='selectList(this.id)' id='list"+ i +"'>"+ masterList[i].listName +"</a></li>");
    }
}

function displayTasks(){

}

function displayNewestList(list){

}

function displayTasksForExistingLists(currentList){
    let targetElem="#list" + currentList.listID;

    if (currentList.tasks.length > 1){
        for(let i = 0; i < currentList.tasks.length - 1; i++){
            $(targetElem).append("<div class='task' contenteditable='true'>" + currentList.tasks[i].taskName + "</div>");
            i++;
        }
    }
    else{
        $(targetElem).append("<div class='task' contenteditable='true'>" + currentList.tasks[0].taskName + "</div>");
    }

}

function createNewTask(id){

}

function deleteList(){

}

function selectList(id){

}

function clearCompleted(){

}

//rewrite this one down here
