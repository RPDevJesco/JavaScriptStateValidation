export class Observable {
    constructor(config = {}) {
        const { initialState = {}, validators = [], onSuccess = () => {}, onFailure = () => {} } = config;

        this.state = { ...initialState };
        this.subscribers = [];
        this.validators = validators;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return this; // Chainable
    }

    addValidator(validator) {
        this.validators.push(validator);
        return this; // Chainable
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

    setState(newState) {
        const validationResult = this.validate(newState);
        if (validationResult === true) {
            this.state = { ...this.state, ...newState };
            this.notify();
            this.onSuccess(this.state); // Success hook
        } else {
            console.log("State update failed:", validationResult);
            this.onFailure(validationResult); // Failure hook
        }
        return this; // Allow chaining
    }

    notify() {
        for (const cb of this.subscribers) {
            cb(this.state);
        }
    }

    getState() {
        return this.state;
    }
}