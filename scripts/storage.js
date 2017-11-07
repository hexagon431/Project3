export class Storage{
    constructor(listName){
        this.MASTER_LIST_KEY = listName;

    }

    getLists(){
        return JSON.parse(localStorage.getItem(this.MASTER_LIST_KEY));
    }

    saveLists(lists){
        localStorage.setItem(this.MASTER_LIST_KEY, JSON.stringify(lists));
    }
}

