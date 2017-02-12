let Datastore = require('nedb');

class Store {

    constructor() {
        this.db = new Datastore({
            filename: 'store.bd',
            autoload: true
        });
    }
    
    addTemperature(t) {
        let entry = {
            date: new Date().toJSON(),
            temperature: t};
        this.db.insert(entry);
    }
}

module.exports = Store;
