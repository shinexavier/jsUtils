/*The MIT License (MIT)

Copyright (c) 2015 Shine Xavier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

function add(x) {
	"use strict";
	return function (y) {
		return x + y;
	};
}

function multiply(x) {
	"use strict";
	return function (y) {
		return x * y;
	};
}

//Courtesy: Douglas Crockford
Function.prototype.crockfordCurry = function () {
	"use strict";
	var slice = Array.prototype.slice,
		args = slice.apply(arguments),
		that = this;
	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
};

//Creating the curried functions
var adder = add.crockfordCurry();
var multiplier = multiply.crockfordCurry();

//Finding the sum of 1,2 & 3 with the curried function
//console.log(adder(adder(1)(2))(3));
//Finding the product of 1,2 & 3 with the curried function
//console.log(multiplier(multiplier(1)(2))(3));


//My Currying Implementation using the "Eval-Apply" Approach
Function.prototype.haskellCurry = function () {
	"use strict";
	var slice = Array.prototype.slice,
		that = this;
	return function () {
		var	jsEval,
			jsApply,
			fn,
			args = slice.apply(arguments),
			result = args[0];
		jsEval = function () {
			args = slice.apply(arguments);
			fn = that.call(null, result);
			jsApply.apply(null, args);
		};
		jsApply = function () {
			args = slice.apply(arguments);
			result = fn.call(null, args[0]);
			if (args.length > 1) {
				jsEval.apply(null, args.slice(1));
			}
		};
		jsEval.apply(null, args.slice(1));
		return result;
	};
};

var adder2 = add.haskellCurry(),
	multiplier2 = multiply.haskellCurry();
//console.log(adder2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14));
//console.log(multiplier2(1, 2, 3, 4, 5, 6));
