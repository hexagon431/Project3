class Storage{
    contstructor(){
        this.CURRENT_LIST_KEY = 'currentList';
        this.LISTS_KEY = 'lists';
    }

    saveCurrentList(list){
        localStorage.setItem(this.CURRENT_LIST_KEY, JSON.stringify(list));
    }

    getCurrentList(){
        return JSON.parse(localStorage.getItem(this.CURRENT_LIST_KEY));
    }

    saveLists(lists){
        localStorage.setItem(this.LISTS_KEY, JSON.stringify(lists))
    }

    getLists(){
        return JSON.parse(localStorage.getItem(this.LISTS_KEY));
    }
}