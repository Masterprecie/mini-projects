const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input')
const display_output = document.querySelector('.display .output')

let input = " ";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == 'clear') {
			input = " ";
			display_input.innerHTML = " ";
			display_output.innerHTML = " ";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			display_input.innerHTML = cleanInput(input);
		} else if (value == "=") {
			let result = eval(prepareInput(input));
			display_output.innerHTML = cleanOuput(result);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 ||
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 &&
				input.indexOf(")") == -1 ||
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

			display_input.innerHTML = cleanInput(input);
		} else {
			if (validateInput(value)) {
				input += value;
				display_input.innerHTML = cleanInput(input)
			}
		}
	})
}


function cleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = `<span class="operator">x</span>`;
		} else if (input_array[i] == "/") {
			input_array[i] = `<span class="operator">÷</span>`;
		} else if (input_array[i] == "+") {
			input_array[i] = `<span class="operator">+</span>`;
		} else if (input_array[i] == "-") {
			input_array[i] = `<span class="operator">-</span>`;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="brackets">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="brackets">)</span>`;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}
	return input_array.join("");
}


function cleanOuput(output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");

	if (output_array.length > 3) {
		for (i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}
	return output_array.join("");
}


function validateInput(value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	//This checks for dots (only 1 dot is allowed)(E.g, 3.3.4.4x3.4.)
	if (value == "." && last_input == ".") {
		return false
	}

	//This checks for multiple operators without any value(e.g 8xxx9--2)
	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}
	return true
}

function prepareInput(input) {
	let input_array = input.split("");

	//gives the percentage of any value
	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}
	return input_array.join("");
}