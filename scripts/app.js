//The overall list of lists
let masterList = [];

//Sets the list key for storage
let LIST_KEY = "masterList";

//A counter that keeps track of how many lists the user has created.
let listCount = 0;


//List object - each list has a name and an array of tasks, which are objects. Each task has a name and also a complete/incomplete status.
//The initial taskList will have an example list for the user.
let taskList = function(){
    this.listName="test";
    this.tasks=[{taskName: "make a list", done: false}]
};

function createNewList(){
    let newList = function(){
        this.listName="New List";
        this.tasks=[{taskName: "New Task", done: false}]
    };
    masterList.push(newList);
    saveLists(masterList);
}

function deleteList(){

}

function editListTitle(currentList){

}

function editTask(currentList){

}

function selectList(){

}

function initializeLists(){
    var lists = getLists();

    if (lists == ""){
        $(".list-box").html("<div id='no-lists'></div>");
    }
}


//storage
function getLists(){
    return JSON.parse(localStorage.getItem(LIST_KEY));
}

function saveLists(lists){
    localStorage.setItem(this.MASTER_LIST_KEY, JSON.stringify(lists));
}


//test list
let testList = new taskList();
listCount++;

masterList.push(testList);

console.log(masterList[0]);