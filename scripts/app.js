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

    displayNewList(masterList[listCount-1]);
    storage.saveLists(masterList);
}

function displayNewList(list){
    $(".lists-display").append("<div id='list" + list.listID +"' style='border: 1px solid white; padding: 5px; width: auto;'><div class='list-title'>" + list.listName + "</div></div>");
}

function createNewTask(id){

}

function deleteList(){

}

function editListTitle(currentList){

}

function editTask(currentList){

}

function selectList(){

}

function displayExistingLists(){
    $("#no-lists").remove();

    for(let i = 0; i < masterList.length-1; i++){
        $(".lists-display").append("<div class='list' id='list" + masterList[i].listID +"' style='border: 1px solid white; padding: 5px; width: auto;'><div class='list-title'>" + masterList[i].listName + "</div></div>");

        displayTasksForExistingLists(masterList[i]);

        // for(let j = 0; j < masterList[i].tasks[j].length-1; j++){
        //     $("#list" + masterList[i].listID).append("<div class='task'>" + masterList[i].tasks[j].taskName + "</div>");
        //     j++;
        // }


    }
}

function displayTasksForExistingLists(currentList){
    let targetElem="#list" + currentList.listID;

    if (currentList.tasks.length > 1){
        for(let i = 0; i < currentList.tasks.length - 1; i++){
            $(targetElem).append("<div class='task'>" + currentList.tasks[i].taskName + "</div>");
            i++;
        }
    }
    else{
        $(targetElem).append("<div class='task'>" + currentList.tasks[0].taskName + "</div>");
    }

}

function initializeLists(){
    masterList = storage.getLists();
    listCount = masterList.length;

    if (listCount == 0){
        $(".list-box").html("<div id='no-lists\'><p>You don't have any lists yet. Why not add one?</p></div>");
    }
    else{
        displayExistingLists(masterList);
    }
}

//test list
// let testList = new list();
// listCount++;
//
// masterList.push(testList);
//
// console.log(masterList[0]);