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
        newState => console.log("Subscriber: State updated to:", newState)
    ]
});

myObject.setState({ name: "Jane" }).setState({ age: 13 }).setState({ date: '2023-12-31' });

console.log(myObject);