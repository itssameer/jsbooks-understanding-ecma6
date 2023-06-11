//Why destructuring ?
//To avoid duplicate code obj.something ; obj.something.something

//destructing syntax:
const obj = { name: "sameer", age: "30" };

const { name, age } = obj;

//don't forget the initializer(obj)

//Destructing assignment

let type = "Literal";
let name1 = 5;

console.log(type);
console.log(name1);

const node = {
  type: "Identifier",
  name1: "foo",
}; // semi-colon is important, it seems to have problem otherwise.

// assign different values using destructuring
({ type, name1 } = node);
/*
Note that you must put parentheses around
a destructuring assignment statement. The reason is that an opening curly
brace is expected to be a block statement, and a block statement cannot
appear on the left side of an assignment. The parentheses signal that the
next curly brace is not a block statement and should be interpreted as an
expression, allowing the assignment to complete.
*/
console.log(type);
console.log(name1);

//assignment can happen anytime  ex:
let node1 = {
    type2: "Identifier",
    name2: "foo",
    age2: 56,
  },
  type2 = "Literal",
  name2 = 5;
function outputInfo(value) {
  console.log(value);
  console.log(value === node1);
}
outputInfo(({ type2, name2 } = node1));
//The assignments to type and name behave normally, and node is passed to the outputInfo() function.
console.log(type2);
console.log(name2);

//Default Values
//if no property is available while destructing it will be assigned undefined
`
let node = {
type: "Identifier",
name: "foo"
};
let { type, name, value } = node;
// we can define default value also
let { type, name, value = true } = node;
console.log(type);// Identifier
console.log(name);// foo
console.log(value);//undefined
`;

//Assigning to Different Local Variable Names

`
let { type: localType, name: localName } = node;
`;

//You can add default values when you’re using a different variable name
`
let { type: localType, name: localName = 'mohiuddin'} = node;
`;

//Nested Object Destructuring
let node4 = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    },
  },
};

//let say you want to destructure start

const {
  loc: { start },
} = node4;
console.log(start);

`//waring
// no variables declared!
let {
  loc: {},
} = node;`;
//---------------------------------------END-----------------------------------------------------

//Array Destructuring
let colors = [
  "red",
  "green",
  "blue",
  undefined,
  ["purple", "lightpurple"],
  "a",
  "b",
  "c",
];
let [firstColor, secondColor] = colors;

let [, , thirdColor] = colors;

console.log(firstColor);
console.log(secondColor);
console.log(thirdColor);

//Default Values
let [, , , forthColor = "black"] = colors;
console.log(forthColor); //black

//Nested Array Destructuring
let [, , , , [purple, lightpurple]] = colors;
console.log(purple, lightpurple); //purple lightpurple

//Rest Items
let [, , , , , ...rest] = colors;
console.log(rest); //[ 'a', 'b', 'c' ]

// swapping variables in ECMAScript 6

let a = 1,
  b = 2;

console.log(a, b); // 1 2

[a, b] = [b, a]; // in right side the temporary array is created to swap the value.

console.log(a, b); // 2 1

//cloning an array
// cloning an array in ECMAScript 6
let [...clonedColors] = colors;
console.log(clonedColors);
//rest items are used to copy values from the colors array into the clonedColors array

//---------------------------------------END-----------------------------------------------------
// Mixed Destructuring

let mixedNode = {
  type: "Identifier",
  name: "foo",
  loc: {
    started: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    },
  },
  range: [0, 3],
};
let {
  loc: { started },
  range: [startIndex, endIndex],
} = mixedNode;

console.log(started, startIndex, endIndex);

//---------------------------------------END-----------------------------------------------------

//Destructured Parameters
// pre - es6 style to receive optional params
function setCookie(name, value, options) {
  options = options || {}; // we need to read whole function body in order to understand what are options expected
  let secure = options.secure,
    path = options.path,
    domain = options.domain,
    expires = options.expires;
  // code to set the cookie
}

//ES6 style
function setCookie(name, value, { secure, path, domain, expires }) {
  /* now we can expect that what are all the options. !!important: we have to pass 3rd param object
   otherwise it will error. if we want to make 3rd param optional we can default it to {}
   
   ex: function setCookie(name, value, { secure, path, domain, expires } = {}) 
   
// we can also default each optional params ex:

function setCookie(
  name,
  value,
  {
    secure = false,
    path = "/",
    domain = "example.com",
    expires = new Date(Date.now() + 360000000),
  } = {}
)
   */
  //code to set the cookie
}

setCookie("type", "js", {
  secure: true,
  expires: 60000,
});
