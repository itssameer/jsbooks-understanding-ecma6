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
// var notAPerson = Person("Nicholas");
console.log(person); // "[Object object]"
console.log(notAPerson); // "undefined"

//but function without new will execute the function
//In ES6 we have [[call]] which is used to call function(without new)
//[[construct]] which is used to construct and return new this obj
// arrow functions do not have [[construct]] method

//to distinguish whether the function is called with new or not
//pre ES6 would check this instance
//ex:
function Person(name) {
  if (this instanceof Person) {
    this.name = name;
    // using new
  } else {
    throw new Error("You must use new with Person.");
  }
}
var person = new Person("Nicholas");
// var notAPerson = Person("Nicholas"); // throw an error
// but his has flaw
// you easy change the this binding ex:
var notAPerson = Person.call(person, "Michael"); // it will work

// to avoid this ES6 introduced new metaproperty
`new.target`;

function Person(name) {
  console.log(new.target); ///[Function: Person]

  if (typeof new.target !== "undefined") {
    this.name = name;
  } else {
    throw new Error("You must use new with Person.");
  }
}
var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael"); // error!

//when [[construct]] method is called new.target metapropery is filled with constructor of newly created object instance
//Ex:
function Person(name) {
  console.log(new.target === Person);
}

var person = new Person("Nicholas"); //true
//warning: Using new.target outside a function is a syntax error.

//---------------------------------------END-----------------------------------------------------

//Block-Level Functions in strict mode
`"use strict";
if (true) {
  // throws a syntax error in ES5, not so in ES6
  function doSomething() {
    // empty
  }
}`;
//functions declared inside the block, ES6 supports it not ES5
// BLF in strict mode hoist to top of the block
//BLF in non-strict mode hoist to function or to global object ex:
// ECMAScript 6 behavior
if (true) {
  console.log(typeof doSomething);
  // "function"
  function doSomething() {
    // empty
  }
  doSomething();
}
console.log(typeof doSomething);

//---------------------------------------END-----------------------------------------------------

//Arrow Functions
// 1. No this, super, arguments, and new.target bindings: all these values are taken from the closest non array function(lexical)
// 2. Cannot be called with new: arrow functions do not have [[construct]] method
// 3. No prototype: no prototype property on arrow functions (no new so no need to prototype)
// 4. you can not change "this" for arrow function it remains same during entire execution
// 5. No duplicate named parameters : Arrow functions cannot have duplicate named parameters-
// in strict or non-strict mode, as opposed to non-arrow functions, which cannot have duplicate named parameters only in strict mode
// best place to use arrow functions are in event handlers..

/* Arrow functions are more performant as its simple execution of code and there is no dual purposes as normal function 
so js engines can optimize code better */

//Arrow functions also have a name property that follows the same rule as other functions.

//Arrow Function Syntax
//when there is only one argument and single line of function body then we can write like below
let reflect = (value) => value;
//even though there is no explicit return statement value will be returned from the reflect function
//but if you have more lines in function body then you have to use {} and write return explicitly.
let reflect1 = (value) => {
  //code
  //...
  return value;
};

// if you are returning object literal then we can use shorthand "({})" to do so
let OL = () => ({
  a: "a",
  b: "b",
  c: "c",
});

// arrow functions can access "this" and "argument" objects from container non arrow functions
//ex:
function createArrowFunctionReturningFirstArg() {
  return () => arguments[0];
}
var arrowFunction = createArrowFunctionReturningFirstArg(5);
console.log(arrowFunction());

// you can still use call bind and apply on arrow functions except you can not over-ride the this.

//---------------------------------------END-----------------------------------------------------

//IIFE

//an anonymous function and call it immediately without saving a reference
//good for creating private scope

(function () {
  //do something
})();

//ex:

let person = (function (name) {
  return {
    getName: function () {
      return name;
    },
  };
})("sam");

//---------------------------------------END-----------------------------------------------------

//Tail calls
//Calling another function at the end of the function

//Tail call optimization done only in strict mode.
//Tail call situation JS engine can clear the container function from the call stack if all the below 3 conditions are satisfied.
//1. The tail call does not require access to variables in the current stack frame (meaning the function is not a closure).
//2. The function making the tail call has no further work to do after the tail call returns.
//3. The result of the tail call is returned as the function value.
//Ex:
("use strict");
function doSomething() {
  // optimized b
  return doSomethingElse();
}

//***most important ex:
("use strict");
function doSomething() {
  // not optimized - call isn't in tail position
  var result = doSomethingElse();
  return result;
} // its better to return the function call directly if you are not using result in container functions so that Optimization can happen.

// most important place where Tail calls optimization is in recursive functions
//ex:

//Not Optimized code
function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    // not optimized - must multiply after returning
    return n * factorial(n - 1);
  }
}
//Optimized code
function factorial(n, p = 1) {
  if (n <= 1) {
    return 1 * p;
  } else {
    let result = n * p;
    // optimized
    return factorial(n - 1, result);
  }
}
