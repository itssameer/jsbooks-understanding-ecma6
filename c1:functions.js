/**
 * Functions
 */

// Functions with default parameters
function makeRequest(url, timeout, callback) {
  timeout = timeout || 2000;
  callback = callback || function () {};
  // the rest of the function
}

//timeout and callback are the optional parameters
//but main flow is that if timeout value 0 then it will construed  as falsy and 2000 will the value of timeout

// to fix this
function makeRequest(url, timeout, callback) {
  timeout = typeof timeout !== "undefined" ? timeout : 2000;
  callback = typeof callback !== "undefined" ? callback : function () {};
  // the rest of the function
}

//ES6 fix
function makeRequest(url, timeout = 2000, callback = function () {}) {
  // the rest of the function
}

// uses default timeout
makeRequest("/foo", undefined, function (body) {
  doSomething(body);
});

// doesn't use default timeout
makeRequest("/foo", null, function (body) {
  doSomething(body);
}); //here null is considered as valid value for the timeout and null will be the value of timeout

//Default Parameter Expressions
//default value need not be a primitive value
function getValue() {
  return 5;
}
function add(first, second = getValue()) {
  return first + second;
}

// when the add() function is call getValue is executed and each time value will be incremented regardless of whether is used or not
let value = 5;
function getValue() {
  return value++;
}
function add(first, second = getValue()) {
  return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 6
console.log(add(1)); // 7

//---------------------------------------END-----------------------------------------------------

// if you forget the parenthesis then will become the reference to the function like a callback
/**
 function add(first, second = getValue) {
 return first + second;
}
 */

//you can pass first arguments for later arguments as its default parameters
function add(first, second = first) {
  return first + second;
} // so sending one arg is enough here if both args are same
//earlier arguments don’t have access to later arguments.
/* 
//this will not work as it doesn't have reference of second arg yet 
function add(first = second, second) {
 return first + second;
}
*/

//you can use this concept to extend for function expressions
function getValue(value) {
  return value + 5;
}
function add(first, second = getValue(first)) {
  return first + second;
}
//---------------------------------------END-----------------------------------------------------

//Working with Unnamed Parameters
//Rest
function pick(object, ...keys) {
  let result = Object.create(null);
  for (let i = 0, len = keys.length; i < len; i++) {
    result[keys[i]] = object[keys[i]];
  }
  return result;
}

let book = {
  title: "Understanding ECMAScript 6",
  author: "Nicholas C. Zakas",
  year: 2016,
};
let bookData = pick(book, "author", "year");
console.log(bookData.author); // "Nicholas C. Zakas"
console.log(bookData.year); // 2016
