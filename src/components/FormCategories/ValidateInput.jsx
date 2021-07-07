export function validate(input) {
    let errors = {};
    if (!input) {
        errors = 'Username is required';
    } else if (!/([a-z])\w+/.test(input)) {
        errors = 'Username is invalid';
    }
    return errors;
}