export const integerParser = (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) throw new Error("Invalid integer");
    return parsed;
};

export const positiveIntegerParser = (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) throw new Error("Invalid integer");
    if (parsed <= 0) throw new Error("Number must be positive");
    return parsed;
};

export const dateParser = (input) => {
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) throw new Error("Invalid date");
    return parsed.toISOString().slice(0, 10); // Returns date in YYYY-MM-DD format
};

export const floatParser = (input) => {
    const parsed = parseFloat(input);
    if (isNaN(parsed)) throw new Error("Invalid float");
    return parsed;
};

export const booleanParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Invalid input type for boolean parsing");
    }
    const normalized = input.toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
    throw new Error("Invalid boolean");
};

export const jsonParser = (input) => {
    try {
        return JSON.parse(input);
    } catch (error) {
        throw new Error("Invalid JSON");
    }
};

export const arrayParser = (input) => {
    if (!Array.isArray(input)) {
        throw new Error("Input must be an array");
    }
    return input;
};

export const trimParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    return input.trim();
};

export const dateTimeParser = (input) => {
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) throw new Error("Invalid date-time format");
    return parsed.toISOString();  // Returns complete date-time in ISO format
};

export const currencyParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    const normalized = input.replace(/[^0-9.-]+/g, '');
    const parsed = parseFloat(normalized);
    if (isNaN(parsed)) throw new Error("Invalid currency");
    return parsed;
};

export const stringParser = (input) => {
    if (typeof input !== 'string') {
        throw new Error("Input must be a string");
    }
    // Basic sanitization to prevent XSS attacks
    input = input.replace(/<script.*?>.*?<\/script>/gi, '');
    // Normalize the case
    input = input.toLowerCase();
    // Enforce a maximum length
    const maxLength = 255;
    if (input.length > maxLength) {
        throw new Error(`Input must not exceed ${maxLength} characters`);
    }
    return input;
};
