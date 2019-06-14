'use strict';

import Xtorage from '.';

describe('Xtorage', () => {
	beforeEach(() => sessionStorage.clear());

	describe('set', () => {
		it('should store on string value', () => {
			const value = 'text';
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toBe(value);
		});

		it('should store stringified-value on number value', () => {
			const value = 1;
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toBe(value.toString());
		});

		it('should store stringified-value on boolean value', () => {
			const value = true;
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toBe(value.toString());
		});

		it('should store stringified-value on undefined value', () => {
			const value = undefined;
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toBe(value + '');
		});

		it('should store stringified-object on object value', () => {
			const value = { a: 1 };
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toEqual(JSON.stringify(value));
		});

		it('should store stringified-array on array value', () => {
			const value = { a: 1 };
			Xtorage.session.set('a', value);
			expect(sessionStorage.getItem('a')).toEqual(JSON.stringify(value));
		});

		it('should store on number key', () => {
			const value = 'text';
			Xtorage.session.set(1, value);
			expect(sessionStorage.getItem(1)).toBe(value);
		});

		it('should store on boolean key', () => {
			const value = 'text';
			Xtorage.session.set(true, value);
			expect(sessionStorage.getItem(true)).toBe(value);
		});

		it('should store on undefined key', () => {
			const value = 'text';
			Xtorage.session.set(undefined, value);
			expect(sessionStorage.getItem(undefined)).toBe(value);
		});

		it('should store on null key', () => {
			const value = 'text';
			Xtorage.session.set(null, value);
			expect(sessionStorage.getItem(null)).toBe(value);
		});
	});

	describe('get', () => {
		it('should retrieve string on string value', () => {
			const value = 'text';
			sessionStorage.setItem('a', value);
			expect(Xtorage.session.get('a')).toBe(value);
		});

		it('should retrieve number on number value', () => {
			const value = 1;
			sessionStorage.setItem('a', value);
			expect(Xtorage.session.get('a')).toBe(value);
		});

		it('should retrieve boolean on boolean value', () => {
			const value = true;
			sessionStorage.setItem('a', value);
			expect(Xtorage.session.get('a')).toBe(value);
		});

		it('should retrieve undefined on undefined value', () => {
			const value = undefined;
			sessionStorage.setItem('a', value);
			expect(Xtorage.session.get('a')).toBe(value);
		});

		it('should retrieve null on null value', () => {
			const value = null;
			sessionStorage.setItem('a', value);
			expect(Xtorage.session.get('a')).toBe(value);
		});

		it('should return object on stringified-object value', () => {
			const value = { a: 1 };
			sessionStorage.setItem('a', JSON.stringify(value));
			expect(Xtorage.session.get('a')).toEqual(value);
		});

		it('should return array on stringified-array value', () => {
			const value = [1, 2, 3];
			sessionStorage.setItem('a', JSON.stringify(value));
			expect(Xtorage.session.get('a')).toEqual(value);
		});

		it('should retrieve on number key', () => {
			const value = 'text';
			sessionStorage.setItem(1, value);
			expect(Xtorage.session.get(1)).toBe(value);
		});

		it('should retrieve on boolean key', () => {
			const value = 'text';
			sessionStorage.setItem(true, value);
			expect(Xtorage.session.get(true)).toBe(value);
		});

		it('should retrieve on undefined key', () => {
			const value = 'text';
			sessionStorage.setItem(undefined, value);
			expect(Xtorage.session.get(undefined)).toBe(value);
		});

		it('should retrieve on null key', () => {
			const value = 'text';
			sessionStorage.setItem(null, value);
			expect(Xtorage.session.get(null)).toBe(value);
		});
	});

	describe('remove', () => {
		it('should remove on string value', () => {
			const value = 'text';
			sessionStorage.setItem('a', value);
			expect(sessionStorage.getItem('a')).toBe(value);
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on number value', () => {
			const value = 1;
			sessionStorage.setItem('a', value);
			expect(sessionStorage.getItem('a')).toBe(value.toString());
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on boolean value', () => {
			const value = true;
			sessionStorage.setItem('a', value);
			expect(sessionStorage.getItem('a')).toBe(value.toString());
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on undefined value', () => {
			const value = undefined;
			sessionStorage.setItem('a', value);
			expect(sessionStorage.getItem('a')).toBe(value + '');
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on null value', () => {
			const value = null;
			sessionStorage.setItem('a', value);
			expect(sessionStorage.getItem('a')).toBe(value + '');
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on stringified-object value', () => {
			const value = { a: 1 };
			sessionStorage.setItem('a', JSON.stringify(value));
			expect(sessionStorage.getItem('a')).toBe(JSON.stringify(value));
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on stringified-array value', () => {
			const value = [1, 2, 3];
			sessionStorage.setItem('a', JSON.stringify(value));
			expect(sessionStorage.getItem('a')).toBe(JSON.stringify(value));
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on number key', () => {
			const value = 'text';
			sessionStorage.setItem(1, value);
			expect(sessionStorage.getItem(1)).toBe(value);
			Xtorage.session.remove('a');
			expect(sessionStorage.getItem('a')).toBeNull();
		});

		it('should remove on boolean key', () => {
			const value = 'text';
			sessionStorage.setItem(true, value);
			expect(sessionStorage.getItem(true)).toBe(value);
			Xtorage.session.remove(true);
			expect(sessionStorage.getItem(true)).toBeNull();
		});

		it('should remove on undefined key', () => {
			const value = 'text';
			sessionStorage.setItem(undefined, value);
			expect(sessionStorage.getItem(undefined)).toBe(value);
			Xtorage.session.remove(undefined);
			expect(sessionStorage.getItem(undefined)).toBeNull();
		});

		it('should remove on null key', () => {
			const value = 'text';
			sessionStorage.setItem(null, value);
			expect(sessionStorage.getItem(null)).toBe(value);
			Xtorage.session.remove(null);
			expect(sessionStorage.getItem(null)).toBeNull();
		});
	});

	describe('clear', () => {
		it('should clear all items', () => {
			sessionStorage.setItem('a', 1);
			sessionStorage.setItem('b', 2);
			sessionStorage.setItem('c', 3);
			expect(sessionStorage.length).toBe(3);
			Xtorage.session.clear();
			expect(sessionStorage.length).toBe(0);
		});
	});

	describe('length', () => {
		it('should count all items', () => {
			sessionStorage.setItem('a', 1);
			sessionStorage.setItem('b', 2);
			sessionStorage.setItem('c', 3);
			expect(sessionStorage.length).toBe(3);
			expect(Xtorage.session.length).toBe(3);
		});
	});

	describe('constructor', () => {
		/**
		 * Demo storage that does not extend Storage (it cannot be extended, see https://stackoverflow.com/questions/17912703/create-a-storage-subclass-with-proto), but it implements the same methods defined in Storage and required in Xtorage.
		 */
		class ComplianceStorage {
			constructor() {
				this.data = {};
			}

			setItem(key, value) {
				this.data[key] = value;
			}

			getItem(key) {
				return this.data[key];
			}

			removeItem(key) {
				return this.data[key];
			}

			get length() {
				return Object.keys(this.data).length;
			}

			clear() {
				this.data = {};
			}
		}

		it('should succeed with Storage-compliance storage', () => {
			expect(() => new Xtorage(new ComplianceStorage())).not.toThrow();
		});

		/**
		 * Non-Storage-compliance storage
		 */
		class NonComplianceStorage {
			constructor() {
				this.data = {};
			}

			// non-Storage-compliance method
			setData(key, value) {
				this.data[key] = value;
			}

			// non-Storage-compliance method
			getData(key) {
				return this.data[key];
			}

			// non-Storage-compliance method
			removeData(key) {
				return this.data[key];
			}

			get length() {
				return Object.keys(this.data).length;
			}

			clear() {
				this.data = {};
			}
		}

		it('should fail with non-Storage-compliance storage', () => {
			expect(() => new Xtorage(new NonComplianceStorage())).toThrow();
		});
	});
});
