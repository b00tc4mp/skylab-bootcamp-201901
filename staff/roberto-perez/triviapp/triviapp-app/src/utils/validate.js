import ValueError from '../errors/value-error';

function validate(params) {
	params.forEach(({ key, value, type, optional }) => {
		switch (type) {
			case String:
				if (optional && value == null) break;

				if (typeof value !== 'string')
					throw TypeError(`${value} is not a string`);

				if (!value.trim().length)
					throw new ValueError(`${key} is empty or blank`);

				break;
			case Boolean:
				if (optional && value == null) break;

				if (typeof value !== 'boolean')
					throw TypeError(`${value} is not a boolean`);

				break;
			case Number:
				if (optional && value == null) break;

				if (typeof value !== 'number')
					throw TypeError(`${value} is not a number`);
				break;
			case Array:
				if (optional && value == null) break;

				if (
					!value instanceof Array ||
					(typeof value === 'undefined' && typeof value !== 'function')
				)
					throw TypeError(`${value} is not an array`);
				break;
			default:
				break;
		}
	});
}

export default validate;
