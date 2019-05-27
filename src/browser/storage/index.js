class Storage {
    constructor(storage) {
        this._storage = storage;
    }

    get(id) {
        return JSON.parse(this._storage.getItem(id));
    }
    set(id, value){
        this._storage.setItem(id, JSON.stringify(value));
    }
    delete(id){
        this._storage.removeItem(id);
    }
}

const local = new Storage(window.localStorage);
const session = new Storage(window.sessionStorage);

export default {
    local,
    session
};
