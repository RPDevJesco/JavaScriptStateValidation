import { Observable } from './Observable.js';
import { nonEmptyNameValidator, ageRangeValidator, emailValidator, positiveNumberValidator, requiredFieldsValidator,
    passwordStrengthValidator, maxLengthValidator, dateFormatValidator, uniqueValueValidator, phoneNumberValidator,
    minLengthValidator, rangeValidator, alphanumericValidator, urlValidator, oneOfValidator, equalValidator,
    regexValidator, maxItemsValidator, nonNegativeValidator, matchOtherFieldValidator, isBooleanValidator,
    startsWithValidator } from '../StateValidation/Validators.js';

function updateUI(state) {
    document.getElementById('name').textContent = state.name;
    document.getElementById('age').textContent = state.age;
    document.getElementById('date').textContent = state.date;
}

const myObject = new Observable({
    initialState: { name: "John", age: 30, date: '2024-12-31' },
    validators: [nonEmptyNameValidator, ageRangeValidator, positiveNumberValidator('age'), dateFormatValidator('YYYY-MM-DD')],
    subscribers: [
        newState => {
            console.log("Subscriber: State updated to:", newState);
            updateUI(newState); // Update the UI whenever the state changes
        }
    ]
});

myObject.setState({ name: "Jane" }).setState({ age: 13 }).setState({ date: '2023-12-31' });

// Initial UI update
updateUI(myObject.getState());

// Expose the myObject for debugging purposes
window.myObject = myObject;

export { updateUI }; // Export the updateUI function