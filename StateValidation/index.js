import { nonEmptyNameValidator, ageRangeValidator } from './Validators.js';
import { Observable } from './Observable.js';

const config = {
    initialState: { name: "John", age: 30 },
    validators: [nonEmptyNameValidator, ageRangeValidator],
    onSuccess: (newState) => {
        console.log("State successfully updated:", newState);
    },
    onFailure: (error) => {
        console.log("State update failed due to:", error);
    }
};

const myObject = new Observable(config);

myObject.subscribe((newState) => {
    console.log("Subscriber: State updated to:", newState);
});

myObject.setState({ name: "Jane" }).setState({ age: 13 }).setState({ name: "" }).setState({ age: 251 });

console.log(myObject);