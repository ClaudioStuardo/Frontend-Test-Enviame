const prompt = require("prompt-sync")();
const prime = require("./controllers/primeNumber");
const validator = require("./controllers/validator");

const number = prompt("Ingrese un número: ");
if (validator.onlyDigits(number)) {
	const value = prime.getPrimes(number);
	console.log("Lo números primos son: ", value);
} else {
	console.log("Solo se aceptan número naturales");
}
