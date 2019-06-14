const { EmptyError } = require("project-z-errors");

function validate(params) {
    params.forEach(({ key, value, type, optional }) => {
        switch (type) {
            case String:
                if (optional && value == null) break;

                if (typeof value !== "string")
                    throw TypeError(`${value} is not a string`);

                if (!value.trim().length)
                    throw new EmptyError(`${key} is empty or blank`);

                break;
            case Boolean:
                if (optional && value == null) break;

                if (typeof value !== "boolean")
                    throw TypeError(`${value} is not a boolean`);

                break;
            case Number:
                if (optional && value == null) break;

                if (typeof value !== "number")
                    throw TypeError(`${value} is not a number`);

                break;
            case Array:
                if (optional && (value == null || value === "")) break;

                if (
                    !value instanceof Array ||
                    (typeof value === "undefined" &&
                        typeof value !== "function")
                )
                    throw TypeError(`${value} is not an array`);

                if (value.length === 0)
                    throw new EmptyError(`${key} is an empty array`);

                break;
            case Object:
                if (optional && (value == null || value === "")) break;

                if (
                    !value instanceof Object ||
                    (typeof value === "undefined" &&
                        typeof value !== "function")
                )
                    throw TypeError(`${value} is not an object`);

                if (!Object.keys(value).length)
                    throw new EmptyError(`Object cannot be empty`);

                break;
        }
    });
}

module.exports = validate;