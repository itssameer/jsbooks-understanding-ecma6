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
