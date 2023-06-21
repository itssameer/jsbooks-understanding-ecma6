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
method all throw an error when passed a non-object.
2. Weak sets aren’t iterables and therefore cannot be used in a for-of loop.
3. Weak sets don’t expose any iterators (such as the keys() and values()
methods), so there is no way to programmatically determine the con-
tents of a weak set.
4. Weak sets don’t have a forEach() method.
5. Weak sets don’t have a size property.
*/
//---------------------------------------END-----------------------------------------------------

//Maps
//The ECMAScript 6 Map type is an ordered list of key-value pairs, where the key and value can be any type.
//1. adding items to the Map using set(), if you add same keys then last call will override the existing value.
let map1 = new Map();
map1.set("title", "Understanding ECMAScript 6");
map1.set("year", 2016);
map1.set("title", "value22222222"); // it will override the title to value2222222

//2. retrieve items from Map
console.log(map1.get("title"));
console.log(map1.entries().next().value); // to get the first item from the Map
// to get the last item from the Map you can use Array.from() to convert it to an array then get the last item.

//3. maps can store objects as keys which is not possible in ordinary Objects
// keys can be any type numbers or strings obj.
let objKey = { a: "a" };
map1.set(objKey, { b: "b" });
console.log(map1.get(objKey));

//Map Methods
//1. has(key) Determines if the given key exists in the map.

//2. delete(key) Removes the key and its associated value from the map.

//3. clear() Removes all the keys and values from the map.

//4. map has 'size' property which indicates home many key-value pair it holds.
console.log(map1.size);

//Map Initialization
//similar to set, map can be initialized with any array but its 2D array.
let map2 = new Map([
  ["key1", "value1"],
  ["key2", 2],
  ["key3", { a: "a" }],
  [{ b: "b" }, { c: "c" }],
  ["a", "b"],
]);

console.log(map2);

// we can also destructure values like objects but, only with order not with keys like in object because its ordered list.
const [[a, b]] = map2;
console.log(a, b); // key1 value1

//---------------------------------------END-----------------------------------------------------

//The forEach() Method for Maps

//1. syntax
map2.forEach((value, key, originalMap) => {
  console.log(key, value);

  console.log(map2 === originalMap);
});

//2. you can also pass 'this' as 2nd arg
map2.forEach(() => {}, this);

/*

Weak Maps

Weak maps are to maps what weak sets are to sets: they’re a way to store
weak object references. In weak maps, every key must be an object (an error
is thrown if you try to use a nonobject key), and those object references are
held weakly so they don’t interfere with garbage collection.

ex: from chat GPT
Certainly! Here are code examples illustrating the use cases mentioned earlier for `WeakMap`:

1. Private Data Storage:
```javascript
const privateData = new WeakMap();

class MyClass {
  constructor() {
    privateData.set(this, { privateProperty: 'secret value' });
  }

  getPrivateProperty() {
    return privateData.get(this).privateProperty;
  }
}

const instance = new MyClass();
console.log(instance.getPrivateProperty()); // Output: 'secret value'
```

In this example, `WeakMap` is used to store private data associated with instances of the `MyClass` class. The `privateData` map is used to map each instance of `MyClass` to its corresponding private data object. This allows the `getPrivateProperty` method to retrieve the private property value for the instance.

2. Object-Related Data:
```javascript
const cache = new WeakMap();

function calculateExpensiveResult(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = // perform expensive computation
  cache.set(obj, result);
  return result;
}
```

In this example, `WeakMap` is used to cache expensive computations associated with specific objects. The `cache` map associates objects with their computed results. When `calculateExpensiveResult` is called multiple times with the same object, it first checks if the result is already cached in the `cache` map before performing the expensive computation again.

3. Encapsulation and Information Hiding:
```javascript
const internalData = new WeakMap();

class MyModule {
  constructor() {
    internalData.set(this, {
      // internal state and data
    });
  }

  // ... methods and logic ...
}
```

In this example, `WeakMap` is used to encapsulate and hide the internal state and data of the `MyModule` module. The `internalData` map maps each instance of `MyModule` to its corresponding internal data object, ensuring that the internal state is not directly accessible from external code.

4. Custom Data Storage:
```javascript
const customData = new WeakMap();

const obj1 = { name: 'Object 1' };
const obj2 = { name: 'Object 2' };

customData.set(obj1, 'Custom data for obj1');
customData.set(obj2, 'Custom data for obj2');

console.log(customData.get(obj1)); // Output: 'Custom data for obj1'
console.log(customData.get(obj2)); // Output: 'Custom data for obj2'
```

In this example, `WeakMap` is used to associate custom data with arbitrary objects (`obj1` and `obj2`). The `customData` map stores the custom data, allowing retrieval of the associated data using the respective objects as keys.

These examples demonstrate the versatility of `WeakMap` in various scenarios where you need to associate data with objects while ensuring memory management and encapsulation.

*/

//1.weakMaps can not be iterated.
//2.weakMaps do not have size property hence there is no way whether it is empty or not.
//3.weakMap do not have clear() method.

const weakMap = new WeakMap();

const weakObj1 = {};
weakMap.set(weakObj1, "something about weakObj1");

console.log(weakMap.has(weakObj1));
// weakMap.clear(); // Error

//---------------------------------------END-----------------------------------------------------

//Weak Map Uses and Limitations
//best choice to use weakmaps when you want to use objects as keys.
//you can  not iterate or clear or use size property in weakmaps.
