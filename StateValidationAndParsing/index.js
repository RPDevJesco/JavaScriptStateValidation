import { Observable } from './Observable.js';
import { nonEmptyNameValidator, ageRangeValidator, emailValidator, positiveNumberValidator, requiredFieldsValidator,
    passwordStrengthValidator, maxLengthValidator, dateFormatValidator, uniqueValueValidator, phoneNumberValidator,
    minLengthValidator, rangeValidator, alphanumericValidator, urlValidator, oneOfValidator, equalValidator,
    regexValidator, maxItemsValidator, nonNegativeValidator, matchOtherFieldValidator, isBooleanValidator,
    startsWithValidator } from '../StateValidation/Validators.js';

const myObject = new Observable({
    initialState: { name: "John", age: 30, date: "2021-01-01" },
    validators: [nonEmptyNameValidator, ageRangeValidator, dateFormatValidator],
    subscribers: [
        newState => console.log("Subscriber: State updated to:", newState)
    ]
});

myObject.setState({ name: "Jane" }).setState({ age: 13 }).setState({ date: "20333-01-01" });

console.log(myObject);