/**
 * var Declarations and Hoisting
 */

//Hoisting:
//var treated as if they are at the top of function (or in global scope if declared outside of the function)

//example:
function getValue(condition) {
  if (condition) {
    var value = condition;
  }
  console.log(value);
  // value exists here with a value of undefined
  //the variable value is created regardless of whether if().. execute or not
}

getValue();

/**
 * which looks something like this
 function getValue(condition) {

 var value = undefined;

 if (condition) {
 value = "blue";
 // other code
 return value;
 } else {
 return null;
 }
 
}
 */

/**
 * Block lever delcaration
 *
 * it inaccessible outside give block and these scopes can be created
 * ** inside a function
 * ** inside a block(indicated by the { and } characters)
 */

//---------------------------------------END-----------------------------------------------------

//let 

// variable declared with let behaves same as var but the scope is within the block,

function getValue(condition) {
  if (condition) {
    let value = "blue";
    // other code
    return value;
  } else {
    // value doesn't exist here
    return null;
  }
  // value doesn't exist here
}

// // no re-declaration

  // if the identifier has been already defined in the scope then.
  // variable with let can be re defined.
  //ex:

  `var count = 30;
  let count = 40;
  // throws an error`;
  //in the below example the count variable inside if shadows the global count variable.
  //ex: //it doesn't throws error if same variable declared outside the scope

  `
  var count = 30;
  if (condition) {
  // doesn't throw an error
  let count = 40;
  // more code
  }`;
  
  //const

  //initialization is compulsory at the time to declaring the variable

  //these variable signifies as constants and their values can not be changed once declared.

  //ex:
  `
// valid constant
const maxItems = 30;
// syntax error: missing initialization
const name;
`;
  //both doesn't let re-declare the variable

  //const vs let

  `
var message = "Hello!";
let age = 25;
// each of these throws an error
const message = "Goodbye!";
const age = 30;
`; //ex: //variable declared with const and having object as its value can be modified after the declaration. // Object declaration with const
  `
const person = {
 name: "Nicholas"
};

// works
person.name = "Greg";

// throws an error
person = {
 name: "Greg"
};
`;

  //to prevent modification of objects when declared as const we can use,
  //freeze(), seal() methods

  //---------------------------------------END-----------------------------------------------------

  // temporal dead zone(TDZ)
  //variables declared with let and const can not be used before they are defined.
  //doing so results in error. and those variable which did not execute because of some error in the previous lines. they are in TDZ
  // this holds true even for safe operations like typeof
  //ex:
  `
if (condition) {
 console.log(typeof value); // throws an error
 let value = "blue";
}
`;

  //but you can use typeof outside of scope where the let or const variables are declared and they don't throw error but will return undefined

  `
console.log(typeof value); // "undefined"
if (condition) {
 let value = "blue";
}
`;

  //the reason is that value isn't in the TDZ as there were no error thrown and let value = "blue" got executed.

  //---------------------------------------END-----------------------------------------------------

  //functions in for loop

  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs.push(function () {
      console.log(i);
    });
  }
  funcs.forEach(function (func) {
    func(); // outputs the number "10" ten times
  });

  //i is shared and holds the same reference among all functions

  //for fix it pre ES6 we would use IIFE
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs.push(
      (function (value) {
        return function () {
          console.log(value);
        };
      })(i)
    );
  }
  funcs.forEach(function (func) {
    func(); // outputs 0, then 1, then 2, up to 9
  });
  // where each function creates its own copy of value i

  //but with the ES6 blocked scope variable(let) we can solve problem very easily.

  const funcns = [];
  for (let i = 0; i < 10; i++) {
    funcns.push(function () {
      console.log(i);
    });
  }

  funcns.forEach((func) => func());

  //The same is true for for-in and for-of loops,

  const funcObj = [];
  const obj = {
    a: true,
    b: true,
    c: true,
  };

  for (var key in obj) {
    funcObj.push(function () {
      console.log(key);
    });
  }

  funcObj.forEach((func) => func());

  const letFuncs = [];

  for (let key in obj) {
    letFuncs.push(function () {
      console.log(key);
    });
  }

  const constFuncs = [];

  for (const key in obj) {
    constFuncs.push(function () {
      console.log(key);
    });
  }

  constFuncs.forEach((func) => func());

  //in this example let and const behaving like same because
  //for loop creating new binding of key in each iteration.

  //---------------------------------------END-----------------------------------------------------

  //global block binding

  //if you use var in global scope then new property is added in global object(window in browser)
  //but if you use let or const no property is added to global object

  var RegExpp = "Hello!";
  console.log(RegExpp);
  // console.log(window.RegExpp) //it would work in browser


  let RegExp = 'Hi'
  console.log(RegExp)

  //console.log(window.RegExp) // it wont work in browser
  //---------------------------------------END-----------------------------------------------------