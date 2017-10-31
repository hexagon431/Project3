//The overall list of lists
let masterList = [];

//A counter that keeps track of how many lists the user has created.
let listCount = 0;

//List object - each list has a name and an array of tasks, which are objects. Each task has a name and also a complete/incomplete status.
//The initial taskList will have an example list for the user.
let taskList = function(){
    this.listName="test";
    this.tasks=[{taskName: "make a list", done: false}]
};

let testList = new taskList();
listCount++;

masterList.push(testList);

console.log(masterList[0]);