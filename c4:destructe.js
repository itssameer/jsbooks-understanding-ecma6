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

//waring
// no variables declared!
let {
  loc: {},
} = node;
