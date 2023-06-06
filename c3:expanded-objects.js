//Object Categories
/**
 * Ordinary Objects: Have all the default behavior of the object.
 * exotic objects: Have internal behavior that differs some defaults.
 * Standard Objects: Defined by ECMAScript 6, such as Array, Date, and so on
 * Built-in objects: Present in a JavaScript execution environment when a script begins to execute.
 */

//Property Initializer Shorthand

function createPerson(name, age) {
  return {
    name: name,
    age: age,
  };
}

// if key and value are same then you avoid keys

function createPerson(name, age) {
  return {
    name,
    age,
  };
}

//Concise Methods
var person = {
  name: "Nicholas",
  sayName: function () {
    console.log(this.name);
  },
};
// now you can directly write sayName as method of an object
//Only difference is that concise methods can access super(will discuss later)
var person = {
  name: "Nicholas",
  sayName() {
    console.log(this.name);
  },
};

//Computed Property Names
//using square brackets [] you can have a name of an Object computed as string
//ex:
let lastName = "last name";
var person = {
  "first name": "Nicholas",
  [lastName]: "Zakas",
  ["middle" + lastName]: "middle last name",
};
console.log(person["first name"]);
console.log(person[lastName]);
console.log(person["middle" + lastName]);

//---------------------------------------END-----------------------------------------------------

//New Methods
// Object.is(op1, op2)
// is used to compare two operands like === but with more concise manner
//ex:
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); //false

console.log(NaN === NaN); //false
console.log(Object.is(NaN, NaN)); //true

//The Object.assign() Method
/*The Object.assign() method accepts any number of suppliers, and the
receiver receives the properties in the order in which the suppliers are spec­ified

warning: that means second supplier can overwrite the values from first 
ex:


*/

var receiver = {};
Object.assign(
  receiver,
  {
    type: "js",
    name: "file.js",
  },
  {
    type: "css",
  }
);
console.log(receiver.type); // "css"
console.log(receiver.name); // "file.js"

//Duplicate value property
`
"use strict";
var person = {
name: "Nicholas",
name: "Greg" // syntax error in ES5 strict mode
};
`; // in ES5 duplicate value property would throw error in strict mode,
//but in ES6 this check is removed instead the last property would overwrite the value

//---------------------------------------END-----------------------------------------------------

//Own Property Enumeration Order

/*
The basic order for own property enumeration is:
1.All numeric keys in ascending order
2.All string keys in the order in which they were added to the object
3.All symbol keys (covered in Chapter 6) in the order in which they were
added to the object

ex:
*/

var obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  b: 1,
  1: 1,
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"

//---------------------------------------END-----------------------------------------------------

//Enhancements for Prototypes
//Changing an Object’s Prototype

//Object.setPrototypeOf()

var person = {
  getGreeting() {
    return "Hello";
  },
};
let dog = {
  getGreeting() {
    return "Woof";
  },
};
// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === person); // "Hello"
// true
// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === dog); // "Woof"
// true

//Easy Prototype Access with Super References
//in ES5 method override and multi level inheritance was buggy and confusing
//ex:
`
let person = {
  getGreeting() {
    return "Hello";
  },
};
// prototype is person
let friend = {
  getGreeting() {
    //this === relative
    //Object.getPrototypeOf(this) === friend
    // so friend.getGreeting will go into infinite recursive method and error
    //relative.get
    return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
  },
};
Object.setPrototypeOf(friend, person);
// prototype is friend
let relative = Object.create(friend);
console.log(person.getGreeting());
console.log(friend.getGreeting());
console.log(relative.getGreeting());
`;

//using super we can fix above code easily as super will alway point to the parent(base class)
let person1 = {
  getGreeting() {
    return "Hello";
  },
};
// prototype is person
let friend1 = {
  getGreeting() {
    return super.getGreeting() + ", hi!";
  },
};
Object.setPrototypeOf(friend1, person1);
// prototype is friend
let relative = Object.create(friend1);
console.log(person.getGreeting());
console.log(friend1.getGreeting());
console.log(relative.getGreeting());
// only catch is that super can only be used in concise methods not in named methods.
