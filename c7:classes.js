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
