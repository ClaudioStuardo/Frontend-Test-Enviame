exports.getPrimes = (value) => {
	var primes = [];
	for (var n = 3; n <= value; n += 2) {
		if (
			primes.every(function (prime) {
				return n % prime != 0;
			})
		) {
			primes.push(n);
		}
	}
	primes.unshift(2);
	return primes;
};
