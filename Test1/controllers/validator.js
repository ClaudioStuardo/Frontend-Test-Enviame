exports.onlyDigits = (number) => {
	const reg = new RegExp("^[0-9]+$");
	return reg.test(number);
};
