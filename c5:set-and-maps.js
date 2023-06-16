//pre ES6
/* to mimic sets and maps developers were using obj as workaround to implement sets and maps */

`
var set = Object.create(null);
set.foo = true;
// checking for existence
if (set.foo) {
// code to execute
}
`; // to check if property exists

`
var map = Object.create(null);
map.foo = "bar";
// retrieving a value
var value = map.foo;
console.log(value);
`; // maps are frequently used as cache

//Problems with Workarounds
//1. string and number keys are same
var map = Object.create(null);
map[5] = "foo";
console.log(map["5"]); // "foo"

//2. !!!! empty object wil be converted to string "[object Object]" so key1 and key2 is pointing to same object which create confusion.
var map = Object.create(null),
  key1 = {},
  key2 = {};
map[key1] = "foo";
console.log(map[key2]); // "foo"
console.log(map); // "foo"

//3. confusion is created if code is checking for existance of a property or value is truthy or  falsy.
//ex:
var map = Object.create(null);
map.count = 1;
// checking for the existence of "count" or for a nonzero value?
// or checking if count exist(!!!!!! in this case we can use [in] operator which returns in property is present regardless of its value)
if (map.count) {
  // code to execute
}

//---------------------------------------END-----------------------------------------------------

//Sets in ECMAScript 6
//Sets allow fast access to the data they contain, adding a more efficient manner of tracking discrete values

//Creating Sets and Adding Items

// 1. Sets don’t coerce values
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);
console.log(set);

//2. empty objects will remain distinct
let set1 = new Set(),
  key11 = {},
  key22 = {};
set1.add(key11);
set1.add(key22);
console.log(set1.size);
console.log(set1);

//3. If the add() method is called more than once with the same value, all calls after the first one are effectively ignored:
let set3 = new Set();
set3.add(5);
set3.add("5");
set3.add(5); // duplicate - this is ignored

console.log(set3.size); // 2

//4. You can also initialize a set using an array
let set4 = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set4);

//5. You can test which values are in a set using the has() method
let set5 = new Set();
set5.add(5);
set5.add("5");
console.log(set5.has(5)); // true
console.log(set5.has(6)); // false

//Removing Items

//1. remove single item using delete()
set5.delete(5);
console.log(set5.has(5)); // false
// 2. remove all the item using clear()
set5.clear();
console.log(set5); // {}

//---------------------------------------END-----------------------------------------------------

//The forEach() Method for Sets
// the forEach is same as with arrays, but little different in params of cb function. i.e, forEach((value, key, arr)=>{})
// in array version of forEach value is each item, key is index, arr is original arr but,
// in set version of forEach value and key are same, bcz there are no index in in set.

let set6 = new Set([1, 2]);
set6.forEach(function (value, key, ownerSet) {
  console.log(key + " " + value);
  console.log(ownerSet === set6);
});

//Also the same as arrays, you can pass a this value as the second argu-
//ment to forEach() if you need to use this in your callback function

let set7 = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach(function (value) {
      this.output(value);
    }, this);
  },
};
processor.process(set7);

// !!!we can achieve same using arrow function without passing this as second argument.
`
let processor = {
  output(value) {
    console.log(value);
  },
  process(dataSet) {
    dataSet.forEach((value) =>{
      this.output(value);
    });
  },
};
`;

//---------------------------------------END-----------------------------------------------------

//Converting a Set to an Array using spread operator
let set8 = new Set([1, 2, 3, 3, 3, 4, 5]),
  array = [...set8];
console.log(array);

//Weak Sets
// weak sets are only used to to store object references not for primitive value
// the only motivation is to use weak set is to garbage collect objects whose references are removed.
// in regular set even though all references to the obj are removed set will still have the original obj store in the set and can be retried

// using regular set

let set10 = new Set(),
  key12 = { a: "a" };
set10.add(key12);
console.log(set10.size); // 1

// eliminate original reference
key12 = null;
console.log(set10.size); // 1

// get the original reference back
key12 = [...set10][0];
console.log(key12);

//using weak set

let set11 = new WeakSet();
var key = { a: "a" },
  key2 = { b: "b" };
// add the object to the set
console.log(set11.has(key));
set11.add(key);
set11.add(key2);

console.log(set11.has(key)); // true
key = null;
console.log(set11.has(key));

// !!!!! Difference between weak set vs regular set
/*
1. In a WeakSet instance, the add() method, has() method, and delete()
method all throw an error when passed a nonobject.
2. Weak sets aren’t iterables and therefore cannot be used in a for-of loop.
3. Weak sets don’t expose any iterators (such as the keys() and values()
methods), so there is no way to programmatically determine the con-
tents of a weak set.
4. Weak sets don’t have a forEach() method.
5. Weak sets don’t have a size property.
*/
