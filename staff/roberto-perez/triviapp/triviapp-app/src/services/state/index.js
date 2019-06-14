'use strict';

class State {
	constructor(storage, key) {
		this.storage = storage;
		this.key = key;
	}

	set(value) {
		this.storage.setItem(
			this.key,
			typeof value === 'object' ? JSON.stringify(value) : value,
		);
	}

	get() {
        return this.allStorage();
    }
    
    allStorage() {

        const values = {};
    
        Object.keys(this.storage).forEach(key => {
            try {
                values[key] = JSON.parse(this.storage.getItem(key));
            } catch (e) {
                values[key] = this.storage.getItem(key)
            }
        });

        return values;
    }

	remove() {
		this.storage.removeItem(this.key);
	}

	clear() {
		this.storage.clear();
	}

	get length() {
		return this.storage.length;
	}
}

export default State;
