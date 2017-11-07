describe('Storage', function(){
    let storage;

    beforeEach(function () {
        storage = new Storage();
    });

    describe('saveCurrentList', function(){
        it('should save the given list as current list', function(){
            let list = {
                listName: 'listy',
                tasks: []
            };
            storage.saveCurrentList(list);

            expect(storage.getCurrentList()).toEqual(list);
        })
    });

    describe('saveLists', function(){
        it('should save given the lists', function(){
            let lists = [
                {
                    name: 'listy',
                    tasks: []
                },
                {
                    name: 'listo',
                    tasks: []
                }
            ];

            storage.saveLists(lists);

            expect(storage.getLists()).toEqual(lists);
        })
    })
})