

import { accumulatingWindow, path } from "../utils";
import { InterpolatePrevious as defaultOptions } from "./defaultOptionsForComputation";

export default function() {

	let options = defaultOptions;

	function calculator(data) {
		const { sourcePath } = options;

		const source = path(sourcePath);
		const target = path(sourcePath + "_interpolatePrevious");

		const interpolatePreviousCalculator = function(values){
			let output = [];
			let last;
			for (let value of values){
				if (value && source(value)){
					output.push(source(value));
					last = source(value);
				} else if (last != undefined){
					output.push(last);
				} else {
					output.push(undefined);
				}
			}
			return output;
		}

		const interpolatePrevious = interpolatePreviousCalculator(data);

		return interpolatePrevious;
	}
	calculator.undefinedLength = function(args) {
		console.log(args);
		return 2;
	};
	calculator.options = function(x) {
		if (!arguments.length) {
			return options;
		}
		options = { ...defaultOptions, ...x };
		return calculator;
	};

	return calculator;
}
