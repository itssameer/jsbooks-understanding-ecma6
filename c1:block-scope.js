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

  ```var count = 30;

  let count = 40;
  // throws an error```


  //it doesn't throws error if same variable declared outside the scope
  //ex:

  //in the below example the count variable inside if shadows the global count variable.

  ```
  var count = 30;
  if (condition) {
  // doesn't throw an error
  let count = 40;
  // more code
  }```



//const
//these variable signifies as constants and their values can not be changed once declared.
//initialization is compulsory at the time to declaring the variable

//ex:
```
// valid constant
const maxItems = 30;
// syntax error: missing initialization
const name;
```


//const vs let

//both doesn't let re-declare the variable

```
var message = "Hello!";
let age = 25;
// each of these throws an error
const message = "Goodbye!";
const age = 30;
```