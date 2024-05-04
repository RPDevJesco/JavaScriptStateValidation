export const nonEmptyNameValidator = (oldState, newState) => {
    if ("name" in newState && newState.name.trim() === "") {
        return "Name cannot be empty.";
    }
    return true;
};

export const ageRangeValidator = (oldState, newState) => {
    if ("age" in newState && (newState.age < 0 || newState.age > 150)) {
        return "Age must be between 0 and 150.";
    }
    return true;
};

export const emailValidator = (oldState, newState) => {
    if ("email" in newState) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        if (!emailRegex.test(newState.email)) {
            return "Invalid email format.";
        }
    }
    return true;
};

export const positiveNumberValidator = (field) => (oldState, newState) => {
    if (field in newState && newState[field] <= 0) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number.`;
    }
    return true;
};

export const requiredFieldsValidator = (fields) => (oldState, newState) => {
    for (const field of fields) {
        if (!(field in newState) && !(field in oldState)) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
    }
    return true;
};

export const passwordStrengthValidator = (oldState, newState) => {
    if ("password" in newState) {
        const password = newState.password;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const minLength = password.length >= 8;

        if (!hasUppercase || !hasLowercase || !hasNumber || !minLength) {
            return "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, and a number.";
        }
    }
    return true;
};

export const maxLengthValidator = (field, maxLength) => (oldState, newState) => {
    if (field in newState && newState[field].length > maxLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${maxLength} characters.`;
    }
    return true;
};

export const dateFormatValidator = (format) => (oldState, newState) => {
    if ("date" in newState) {
        const date = newState.date;

        // Implement a simple date format check, e.g., YYYY-MM-DD
        const formatRegex = {
            "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$/,
            "MM/DD/YYYY": /^\d{2}\/\d{2}\/\d{4}$/,
            // Add other formats as needed
        }[format];

        if (!formatRegex || !formatRegex.test(date)) {
            return `Date must be in the format ${format}.`;
        }
    }
    return true;
};

export const uniqueValueValidator = (field, existingValues) => (oldState, newState) => {
    if (field in newState) {
        const value = newState[field];
        const currentValues = [...existingValues, oldState[field]].filter((v) => v !== undefined);

        if (currentValues.includes(value)) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`;
        }
    }
    return true;
};

export const phoneNumberValidator = (oldState, newState) => {
    if ("phone" in newState) {
        const phone = newState.phone;

        // Simple phone number format check (e.g., 123-456-7890 or (123) 456-7890)
        const phoneRegex = /^(?:\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;

        if (!phoneRegex.test(phone)) {
            return "Phone number must be in a valid format.";
        }
    }
    return true;
};

export const minLengthValidator = (field, minLength) => (oldState, newState) => {
    if (field in newState && newState[field].length < minLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters long.`;
    }
    return true;
};

export const rangeValidator = (field, min, max) => (oldState, newState) => {
    if (field in newState && (newState[field] < min || newState[field] > max)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be between ${min} and ${max}.`;
    }
    return true;
};

export const alphanumericValidator = (field) => (oldState, newState) => {
    if (field in newState) {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(newState[field])) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} must be alphanumeric.`;
        }
    }
    return true;
};

export const urlValidator = (oldState, newState) => {
    if ("url" in newState) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;
        if (!urlRegex.test(newState.url)) {
            return "URL is invalid.";
        }
    }
    return true;
};

export const oneOfValidator = (field, allowedValues) => (oldState, newState) => {
    if (field in newState && !allowedValues.includes(newState[field])) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be one of ${allowedValues.join(", ")}.`;
    }
    return true;
};

export const equalValidator = (field, compareTo) => (oldState, newState) => {
    if (field in newState && newState[field] !== compareTo) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be equal to ${compareTo}.`;
    }
    return true;
};

export const regexValidator = (field, regex, errorMessage) => (oldState, newState) => {
    if (field in newState && !regex.test(newState[field])) {
        return errorMessage || `${field.charAt(0).toUpperCase() + field.slice(1)} does not match the required pattern.`;
    }
    return true;
};

export const maxItemsValidator = (field, maxItems) => (oldState, newState) => {
    if (field in newState && Array.isArray(newState[field]) && newState[field].length > maxItems) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot have more than ${maxItems} items.`;
    }
    return true;
};

export const nonNegativeValidator = (field) => (oldState, newState) => {
    if (field in newState && newState[field] < 0) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be negative.`;
    }
    return true;
};

export const matchOtherFieldValidator = (field, otherField) => (oldState, newState) => {
    if (field in newState && newState[field] !== oldState[otherField] && newState[field] !== newState[otherField]) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must match ${otherField.charAt(0).toUpperCase() + otherField.slice(1)}.`;
    }
    return true;
};

export const isBooleanValidator = (field) => (oldState, newState) => {
    if (field in newState && typeof newState[field] !== "boolean") {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be a boolean.`;
    }
    return true;
};

export const startsWithValidator = (field, prefix) => (oldState, newState) => {
    if (field in newState && !newState[field].startsWith(prefix)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must start with "${prefix}".`;
    }
    return true;
};