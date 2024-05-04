import {integerParser, stringParser, dateParser, floatParser, booleanParser, jsonParser, arrayParser, trimParser, dateTimeParser, currencyParser} from "./Parsers.js";

export class Observable {
    constructor(config = {}) {
        const {
            initialState = {},
            validators = [],
            subscribers = [],
            onSuccess = (state) => console.log("State successfully updated:", state),
            onFailure = (error) => console.log("State update failed due to:", error)
        } = config;

        this.state = { ...initialState };
        this.subscribers = subscribers;
        this.validators = [];
        this.parsers = {};
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;

        validators.forEach(validator => this.addValidator(validator));
        subscribers.forEach(subscriber => this.subscribe(subscriber));
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    addValidator(validator) {
        this.validators.push(validator);
        this.autoAddParser(validator);
    }

    autoAddParser(validator) {
        // Assuming mapping exists
        const parserMapping = {
            nonEmptyNameValidator: stringParser,
            ageRangeValidator: integerParser,
            // Add more mappings as necessary
        };

        const parser = parserMapping[validator.name]; // validator.name should match the key in parserMapping
        if (parser && !this.parsers[validator.field]) {
            this.parsers[validator.field] = parser;
        }
    }

    setState(newState) {
        Object.keys(newState).forEach(key => {
            if (this.parsers[key]) {
                try {
                    newState[key] = this.parsers[key](newState[key]);
                } catch (error) {
                    this.onFailure(`Parsing error on ${key}: ${error.message}`);
                }
            }
        });

        const validationResult = this.validate(newState);
        if (validationResult === true) {
            this.state = { ...this.state, ...newState };
            this.notify();
            this.onSuccess(this.state);
        } else {
            this.onFailure(validationResult);
        }
        return this; // Allow chaining
    }

    validate(newState) {
        for (const validator of this.validators) {
            const result = validator(this.state, newState);
            if (result !== true) {
                return result || "Invalid state update.";
            }
        }
        return true;
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }
}