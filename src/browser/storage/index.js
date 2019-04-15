import stringify from '../../utility/stringify';
import parseJSON from '../../utility/parse-json';

const type = {
    local: 'localStorage',
    session: 'sessionStorage'
};

const core = {
    get: (type, id, def /* default value */) => {
        const result = self[type].getItem(id);
        return parseJSON(result) || def;
    },
    set: (type, id, value) => {
        const result = stringify(value);
        self[type].setItem(id, result);
    },
    del: (type, id) => {
        self[type].removeItem(id);
    }
};

export const local = {
    get: (id, def /* default value */) => { return core.get(type.local, id, def); },
    set: (id, value) => { core.set(type.local, id, value); },
    del: (id) => { core.del(type.local, id); }
};

export const session = {
    get: (id, def /* default value */) => { return core.get(type.session, id, def); },
    set: (id, value) => { core.set(type.session, id, value); },
    del: (id) => { core.del(type.session, id); }
};

export default {
    local,
    session
};
