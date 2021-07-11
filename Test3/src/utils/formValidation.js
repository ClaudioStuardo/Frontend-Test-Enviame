export function minLengthValidation(inputData, minLength) {
	const { value } = inputData;

	if (value.trim().length >= minLength) {
		inputData.value = value;
		return true;
	} else {
		inputData.value = value.trim();
		return false;
	}
}
