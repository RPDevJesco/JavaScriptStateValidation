import { Observable } from './Observable.js';
import { nonEmptyNameValidator, ageRangeValidator, emailValidator, positiveNumberValidator, requiredFieldsValidator,
    passwordStrengthValidator, maxLengthValidator, dateFormatValidator, uniqueValueValidator, phoneNumberValidator,
    minLengthValidator, rangeValidator, alphanumericValidator, urlValidator, oneOfValidator, equalValidator,
    regexValidator, maxItemsValidator, nonNegativeValidator, matchOtherFieldValidator, isBooleanValidator,
    startsWithValidator } from '../StateValidation/Validators.js';

const myObject = new Observable({
    initialState: { name: "John", age: 30, date: '2024-12-31' },
    validators: [nonEmptyNameValidator, ageRangeValidator, positiveNumberValidator('age'), dateFormatValidator('YYYY-MM-DD')],
    subscribers: [
        newState => {
            console.log("Subscriber: State updated to:", newState);
        }
    ]
});

// Define the elements to update as part of the state change
const elementsToUpdate = [
    { id: 'name', property: 'name' },
    { id: 'age', property: 'age' },
    { id: 'date', property: 'date' }
];

// Example of setting state and updating UI
myObject.setState({ name: "Jane" }, document, elementsToUpdate)
    .setState({ age: 13 }, document, elementsToUpdate)
    .setState({ date: '2023-12-31' }, document, elementsToUpdate);