'use strict'

/**
 * Common interface for session and local storage
 * 
 * Provides accessors for storing and retrieving any JSON-compliance type item (value)
 * 
 * @example
 * 
 * // session storage
 * 
 * Xtorage.session.set('user', { name: 'John', surname: 'Doe' })
 *
 * const user = Xtorage.session.get('user')
 * 
 * console.log(user.name, user.surname) // -> "John" "Doe"
 * 
 * // local storage
 * 
 * Xtorage.local.set('user', { id: 'abc123' })
 *
 * const user = Xtorage.local.get('user')
 * 
 * console.log(user.id) // -> "abc123"
 * 
 * @author manuelbarzi
 * @version 1.1.0
 */
class Xtorage {
	/**
	 * Creates an instance
	 * 
	 * @param {Storage} storage - An instance of Storage class (e.g. session or local storage in browser) or a compliance object (satisfying the methods defined in Storage class)
	 */
	constructor(storage) {
		if (!(storage instanceof Storage) && !(() => {
			// checks if provided storage object is compliance with the methods defined in Storage and required in Xtorage
			return ['setItem', 'getItem', 'removeItem', 'length', 'clear'].every(member => Reflect.has(storage, member))
		})()) throw TypeError('provided storage is not an instance of Storage or an object compliance with it')

		this.storage = storage
	}

	/**
	 * Stores a value in storage
	 * 
	 * @param {string} key - Identifies the value in storage
	 * @param {any} value - The value to be stored
	 */
	set(key, value) {
		this.storage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
	}

	/**
	 * Retrieves a value from storage
	 * 
	 * @param {string} key - The identifier of the value in storage 
	 * 
	 * @returns {any} - The stored value
	 */
	get(key) {
		const value = this.storage.getItem(key)

		try {
			return JSON.parse(value)
		} catch (e) {
			return value === "undefined" ? undefined : value
		}
	}

	/**
	 * Removes a value from storage
	 * 
	 * @param {string} key - The identifier of the value in storage
	 */
	remove(key) { this.storage.removeItem(key) }

	/**
	 * Clears all values from storage
	 */
	clear() { this.storage.clear() }

	/**
	 * Returns the number of items stored
	 */
	get length() { return this.storage.length }

	/**
	 * Session storage singleton
	 */
	//static session = new Xtorage(sessionStorage) // babel
	static get session() { return this._session ? this._session : this._session = new Xtorage(sessionStorage) }

	/**
	 * Local storage singleton
	 */
	//static local = new Xtorage(localStorage) // babel
	static get local() { return this._local ? this._local : this._local = new Xtorage(localStorage) }
}

export default Xtorage;