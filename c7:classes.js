//JS classes
//JS classes are just syntax sugar for organizing the code in function manner.

/*
 * why classes.
 * 1. class declarations are not hoisted.
 * 2. all code inside class runs under strict mode.
 * 3. all methods are non-enumerable.
 * 4. all methods lack [[construct]] methods.
 * 5. all objects has to instantiated by using new keyword or else it will throw an error.
 * 6. class name can not be changed from inside but you can changed the class name from outside
 * ex:
class foo {
  constructor() {
    console.log(this.constructor.name);
  }

  static getClassName() {
    return this.constructor.name;
  }
  //...
}

const o = new foo();

foo = "baz"; // its valid

console.log(foo);

 *
 */

//class Expressions
//1. basic class expressions:
let BasicPersonClass = class {
  //code here
};

console.log(BasicPersonClass.name);

//2. named class expression:
/*named class has two names: 
a. PersonClass --> name used to create objects
b. NamedClassExpression --> name only accessible inside class
*/
let PersonClass = class NamedClassExpression {
  //code here
};

console.log(PersonClass.name); //NamedClassExpression
// console.log(NamedClassExpression.name); // error

//---------------------------------------END-----------------------------------------------------

//Classes as First-Class Citizens
// 1.you can pass and return classes as you would normally with functions.
//ex:

function createObjectsForGivenClass(classRef) {
  return new classRef();
}

const personClassObject = createObjectsForGivenClass(PersonClass);

console.log(personClassObject instanceof PersonClass); //true

//2. creating singleton class instance ex:
//once sayHelloSamObj is created class reference is lost to create any more objects

let sayHelloSamObj = new (class {
  constructor(name) {
    this.name = name;
  }

  sayHell() {
    return "Hello " + this.name + "!!!";
  }
})("Sam");

console.log(sayHelloSamObj.sayHell());

//---------------------------------------END-----------------------------------------------------

//Accessor Properties

/* class customHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get HTML() {
    return this.element;
  }

  set HTML(value) {
    this.element.innerHTML = value;
  }
}
 */

//---------------------------------------END-----------------------------------------------------

//Computed Member Names
// you can have property names like methods can be dynamically computed in class
//ex:

let dynamicMethodName = "sayMyName";
let a = "age";
class ComputedMemberNames {
  constructor(name) {
    this.name = name;
    this.ageAsNumber = 19; //

    /*  computedValue and actual property name can not be same as it triggers infinite loop
    This is because accessing or setting the property would trigger the getter or setter, 
    which in turn tries to access or set the property again, leading to an endless cycle. */
  }

  // dynamic methods
  [dynamicMethodName]() {
    return this.name;
  }

  //dynamic getters and setters
  get [a]() {
    return this.ageAsNumber;
  }

  set [a](value) {
    this.ageAsNumber = value;
  }
}

const CMNObj = new ComputedMemberNames("Sameer!!");

console.log(CMNObj[dynamicMethodName]());
console.log(CMNObj.sayMyName());
CMNObj.age = 20;

console.log(CMNObj.age);

//Generator Methods

//1. defining a generator method inside the class
class ClassGen {
  *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
}

let ClassGenIns = new ClassGen();
const classIterator = ClassGenIns.createIterator();

console.log(classIterator.next());
console.log(typeof classIterator[Symbol.iterator] === "function");

//2. making a class a Iterable using [Symbol.iterator]

class UnoCards {
  constructor() {
    this.numberCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.colors = ["red", "green", "yellow", "blue"];
    this.specialCards = ["reverse", "Draw 2", "Draw 4", "skip"];
  }

  *numberCombinatorGen() {
    for (const num of this.numberCards) {
      for (const color of this.colors) {
        yield `${color} - ${num}`;
      }
    }
  }

  *specialCardCombinatorGen() {
    for (const sc of this.specialCards) {
      for (const color of this.colors) {
        yield `${color} -  ${sc}`;
      }
    }
  }

  *[Symbol.iterator]() {
    yield* this.numberCombinatorGen();
    yield* this.specialCardCombinatorGen();
  }
}

const unoCardCollection = new UnoCards();
unoCardCollection.colors.push("black");

for (const card of unoCardCollection) {
  console.log(card);
}

console.log([...unoCardCollection]);

//---------------------------------------END-----------------------------------------------------

//Static Members

//Function program way

function PersonType() {}

PersonType.myName = "Sameer"; // static member it can be a property / function

PersonType.prototype.getAge = function () {
  return 12;
};

console.log(PersonType.myName);
console.log(PersonType.getAge); //undefined

const newPersonIns = new PersonType();

console.log(newPersonIns.getAge());
console.log(newPersonIns.myName); //undefined

//OOP way

class PersonTypeClass {
  static myName = "sameer"; // static member it can be property / method

  getAge() {
    return 12;
  }
}

console.log(PersonTypeClass.myName);
console.log(PersonTypeClass.getAge); //undefined

const newPersonClassIns = new PersonTypeClass();

console.log(newPersonClassIns.getAge());
console.log(newPersonClassIns.myName); //undefined

//Static members are not accessible from instances. You must always access static members from the class directly and voice versa..

//---------------------------------------END-----------------------------------------------------

//Inheritance with Derived Classes

//FP way:

function FunRectangle(width, height) {
  this.width = width;
  this.height = height;
}

FunRectangle.prototype.getArea = function () {
  return this.width * this.height;
};

function Square(length) {
  FunRectangle.call(this, length, length); // ==> this{ width:10, height:10}
}

Square.prototype = Object.create(FunRectangle.prototype); // ==> add the prototype of FunRectangle to Square prototype

const SO = new Square(10);

console.log(SO instanceof Square);
console.log(SO instanceof FunRectangle);
console.log(SO.getArea());

//OOP way

class ClassRectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class SquareClass extends ClassRectangle {
  constructor(length) {
    super(length, length);
  }
}
const SOC = new SquareClass(10);

console.log(SOC instanceof SquareClass);
console.log(SOC instanceof FunRectangle);
console.log(SOC.getArea());

//Note: if you don't specify constructor in derived class then by default[default constructor]
//constructor(...args){super(...args)} will be applied

/*
Notes on Using super( )
Keep the following key points in mind when you’re using super():
•You can only use super() in a derived class constructor. If you try to use it
in a non­derived class (a class that doesn’t use extends) or a function, it will
throw an error.
•You must call super() before accessing this in the constructor. Because
super() is responsible for initializing this, attempting to access this
before calling super() results in an error.
•The only way to avoid calling super() is to return an object from the class
constructor.
*/

//shadowing class method

class A {
  methodA() {
    //...
  }
}

class B extends A {
  methodA() {
    //methodA from class A will never be called by any instance of B
    //...
  }
}
/* 
in order to use super class of methodA we can do something like this
class B extends A {
  methodA(){
    return super.methodA() // 'this' is calculated correctly so we can directly call methodA()
  }
} */

//Inheritance of static Members: those members also available in derived classes.

//Inheritance from expressions[dynamic inheritance]:
//1. we can inherit function - class as long as function has prototype and [[construct]] method
//ex:

function AB() {
  //code here..
}

class BA extends AB {
  //code here..
}

//!!!!2. we can inherit dynamically.
//ex: based on the type derived class will inherit the function
//Keep in mind that if multiple mixins have the same property, only the last property added will remain

function ABC() {}
function BCA() {}
function CAB() {}

function getBaseClass(type) {
  switch (type) {
    case "ABC":
      return ABC;
    case "BCA":
      return BCA;
    case "CAB":
      return CAB;
  }
}

class derivedClass extends getBaseClass("ABC") {
  //
}

// with this functionality we can have a mixin which will return a base class with more than one function prototype
//which can be seen as multiple inheritance
//EX;

function mixin(...mixin) {
  const base = function () {};

  Object.assign(base.prototype, ...mixin);
  return base;
}

class MultipleInheritance extends mixin(ABC, BCA, CAB) {
  //this class all the capabilities of functions ABC, BCA, CAB
}

//Inheritance from Built-in classes
class MyArray extends Array {}

//The Symbol.species Property
//gives ability to create objects of a different species or subtype

class MyArrayWithSpecies extends Array {
  static get [Symbol.species]() {
    return Array; // Use the Array constructor for creating new objects
  }
}

const myArray = new MyArrayWithSpecies(1, 2, 3);
const newArray = myArray.map((item) => item * 2);

console.log(newArray instanceof MyArrayWithSpecies); // false
console.log(newArray instanceof Array); // true

//---------------------------------------END-----------------------------------------------------

//Using new.target in Class Constructors
