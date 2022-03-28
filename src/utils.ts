
export function removeValidator(validator: <T>, validators: [T]): Array<String> {
    // Not sure if reduce or
    let alteredValidators = new Array<String>(0)
    for (let i = 0, k = validators.length; i < k; i++) {
        if (validators[i] != validator) {
            alteredValidators.push(validators[i])
        }
    }
    return alteredValidators
}

