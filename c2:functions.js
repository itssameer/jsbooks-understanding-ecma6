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

//rest parameter restrictions.
//1. there can only be one rest parameter and rest parameters has to be last.
//2. can not be used in object literal setters.
/**
 let object = {
 // Syntax error: Can't use rest param in setter
 set name(...value) {
 // do something
 }
};
// the reason is that setters can have only one value.
 */

//---------------------------------------END-----------------------------------------------------

//The name Property
//For debugging reasons, ECMAScript 6 adds the name property to all functions.
// name will not refer to the actual function its just for debugging
function doSomething() {
  // empty
}
var doAnotherThing = function () {
  // empty
};
console.log(doSomething.name); // "doSomething"
console.log(doAnotherThing.name); // "doAnotherThing"

// Special Cases of the name Property
//1. bind() function will be prefixed by bound word
//2. functions created using Function constructors will named anonymous
var doSomething = function () {
  // empty
};
console.log(doSomething.bind().name); // "bound doSomething"
console.log(new Function().name); // "anonymous"

//---------------------------------------END-----------------------------------------------------

//Clarifying the Dual Purpose of Functions
//functions serve the dual purpose of being callable with or without new
// functions which are called with new, the 'this' is a new object and it will returned

function Person(name) {
this.name = name; // when called without 'new' name will be set to global object bcz this is pointing to GO --> GlobalObject
}
var person = new Person("Nicholas");
var notAPerson = Person("Nicholas");
console.log(person);// "[Object object]"
console.log(notAPerson); // "undefined"

//but function without new will execute the function
//In ES6 we have [[call]] which is used to call function(without new)
//[[construct]] which is used to construct and return new this obj
// arrow functions do not have [[construct]] method