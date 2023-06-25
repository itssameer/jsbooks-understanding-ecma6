/*
1. Iterators directly returns next item from the data, where as in traditional for loops require maintaining variables.
2. for of loop spread operator works on the iterators.

why Iterators? 
1. the loop problem.
need variable management to loop over the data.
/*
Chat-GPT: uses of Genertors
Generators in JavaScript provide a way to create iterable objects that can be lazily evaluated. They allow you to define functions that can be paused and resumed, enabling you to generate a series of values over time. Generators have several use cases in the real world, including:

1. Iteration control: Generators are commonly used for controlling the flow of iteration. They allow you to define custom iteration logic by yielding values one at a time. This can be useful when dealing with large collections or infinite sequences where you don't want to generate all the values upfront.

2. Asynchronous programming: Generators can be combined with promises or other asynchronous patterns to simplify asynchronous programming. They provide a convenient way to write asynchronous code in a synchronous style using the `yield` keyword. This is often used with libraries like `co` or frameworks like Koa.js.

3. Data stream processing: Generators can be used to process streams of data efficiently. You can use a generator to represent a data stream, and then consume it using the `for...of` loop or other iterator methods. This allows you to process data on-the-fly without loading everything into memory at once.

4. Stateful iterators[state machines]: Generators can maintain internal state, making them suitable for implementing complex iterators. You can use generator functions to create iterators that remember their current state between iterations. This can be helpful when implementing algorithms like tree traversal or parsing.

5. Infinite sequences: Generators can be used to represent and generate infinite sequences of values. For example, you can create a generator that produces an infinite sequence of random numbers, prime numbers, or Fibonacci numbers. Since the values are generated lazily, you can consume them as needed without worrying about memory limitations.

6. Cooperative multitasking: Generators can be used for cooperative multitasking or coroutines. By pausing and resuming the execution of a generator, you can switch between different tasks or computations. This can be beneficial in scenarios where you need to manage concurrent operations without using heavy threads or callbacks.

Overall, generators provide a powerful mechanism for controlling iteration and managing asynchronous or sequential computations in JavaScript. They offer flexibility and efficiency in handling various real-world use cases. */

/*
Video resources to watch:

https://www.youtube.com/watch?v=gu3FfmgkwUc&ab_channel=JSConf
https://www.youtube.com/watch?v=MR-87Fwoq2A&ab_channel=JSHeroes

what are Iterators?
Iterators are objects with a specific interface designed for iteration i.e.,
1. it contains next() which returns an object which has two properties a. value, b. done
2. for last item in data the next() will return { done: true, value: undefined}
*/

// custom iterator function
const customIterator = (items) => {
  let i = 0;
  return {
    next: function () {
      const done = i >= items.length;
      const value = !done ? items[i++] : undefined;
      return {
        done,
        value,
      };
    },
  };
};

const iterator = customIterator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// as we have seen making iterator function is tedious so to over come this we have generators

//What are Generators?
//1. A generator is a function that returns an iterator
//2. Generators are indicated by *.
//3. most interesting aspect of generator is that they stop execution in middle, i.e., when first time next() is call it will wait on yield 2 and so on..
//4. yield can only be used inside the GF, attempting to use yield in side other functions will throw error
`
function *createIterator1(items) {
    items.forEach(function(item) {
    // syntax error
    yield item + 1;
});
}
`;
//Ex: we can convert above function to iterator using generator like:
// !!!each time yield is encountered the loop is stopped.

function* createIterator(items) {
  for (let item of items) {
    yield item;
  }
}

const genIterator = createIterator([1, 2, 3]);

console.log(genIterator.next());
console.log(genIterator.next());
console.log(genIterator.next());
console.log(genIterator.next());
// using functions expression
const createIterator1 = function* (items) {
  for (let item of items) {
    yield item;
  }
};
// fat arrow functions are not supported to create generators.

// creating generator functions in object es5
const o = {
  createIterator: function* () {
    //code here
  },
};

//using es6
const ob = {
  *createIterator() {
    //code here
  },
};

//---------------------------------------END-----------------------------------------------------

//Iterables and for-of Loops
// Iterables: this is close to iterators and all Arrays, set, map, strings are iterables by default,
//as by default symbol.iterator function is assigned to them.
//Generator assigns the symbol.iterator manually to functions.

//for-of loops eliminate the need of variable to track indexes.

//---------------------------------------END-----------------------------------------------------

//accessing the default iterator method

let values = [1, 2, 3];
let iterator1 = values[Symbol.iterator]();
console.log(iterator1.next());

//so using this you can check wether given object is iterable or not

function checkIfIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}

console.log(checkIfIterable([1, 2, 3]));
console.log(checkIfIterable({ a: "a", b: "b" }));
console.log(checkIfIterable("sameer"));
console.log(checkIfIterable(new Map()));
console.log(checkIfIterable(new Set()));
console.log(checkIfIterable(new WeakMap()));
console.log(checkIfIterable(new WeakSet()));

//Creating Iterables
//as we know user defined Objects ([object:Object]) are not iterable but we can make it iterable manually by adding generators.
//Ex:

const colorObj = {
  colors: ["red", "green", "blue"],
  *[Symbol.iterator]() {
    for (let color of this.colors) {
      yield color;
    }
  },
};

colorObj.colors.push("Black");

for (let clr of colorObj) {
  console.log(clr);
}

//---------------------------------------END-----------------------------------------------------

//Built-in Iterators:

//  Collection Iterators
//  In Js we have 3 types of Iterator Objects a.Array, b.Map, c.Set
//  All these objects have following Iterators to navigate through them.
//  1. entries: returns an Iterator whose values are key value pair.
// EX:

const IteratorArray = [1, 2, 3];
const IteratorMap = new Map([
  ["title", "Understanding ES6"],
  ["Edition", "1st Edition"],
]);
const IteratorSet = new Set(["red", "green", "blue"]);

function IteratorMethodToUse(methodToUse = "default", IteratorObject) {
  const result = [];
  let resultOfMethod;
  if (methodToUse !== "default") {
    resultOfMethod = IteratorObject[methodToUse]();
  } else {
    resultOfMethod = IteratorObject;
  }
  for (let item of resultOfMethod) {
    result.push(item);
  }
  return result;
}
//1. entries
console.log(IteratorMethodToUse("entries", IteratorArray));
console.log(IteratorMethodToUse("entries", IteratorMap));
console.log(IteratorMethodToUse("entries", IteratorSet));

//2. values
console.log(IteratorMethodToUse("values", IteratorArray));
console.log(IteratorMethodToUse("values", IteratorMap));
console.log(IteratorMethodToUse("values", IteratorSet));

//3. keys
console.log(IteratorMethodToUse("keys", IteratorArray));
console.log(IteratorMethodToUse("keys", IteratorMap));
console.log(IteratorMethodToUse("keys", IteratorSet));

//4. default access
console.log(IteratorMethodToUse(undefined, IteratorArray)); // default method for array is 'values()'
console.log(IteratorMethodToUse(undefined, IteratorMap)); // default method for array is 'entries()'
console.log(IteratorMethodToUse(undefined, IteratorSet)); // default method for array is 'values()'

//Note: destructing map in for-of loop
for (let [key, value] of IteratorMap) {
  console.log(key, value);
}

//string Iterator
const str = "Sameer";
for (let char of str) {
  console.log(char);
}

//nodeList Iterator:
//Dom nodes are stored as nodeList which is same as array but limited when compared to Array.
//nodeList is live nodes of the Dom if changes are made in nodeList will reflect in dom.
//nodeList only has, length property, for, for-of and forEach on it.

`var divs = document.getElementsByTagName("div");
for (let div of divs) {
  console.log(div.id);
}`;

//spread operator uses Iterator to copy values using default methods for respective data structures.

//---------------------------------------END-----------------------------------------------------

//Advanced Iterator Functionality
//1. passing arguments to iterator
//as we know RHS is executed first so when yield is encountered the execution stops so const zero is executed when call next() second time
// what ever you pass value in next() acts as return to the previous yield statement
// so rule of thumb is that passing value in next() for the first time will be lost always.

function* advanceGenerator() {
  const zero = yield 1;
  const first = yield zero + 1;
  console.log(zero, first);
  const second = yield first + 2;
  console.log(first, second);
  const third = yield second + 3;
  console.log(first, second, third);
  const fourth = yield third + 4;
  console.log(zero, first, second, third, fourth);
}

const advanceIterator = advanceGenerator();
console.log(advanceIterator.next(1000));
console.log(advanceIterator.next(2000));
console.log(advanceIterator.next(3000));
console.log(advanceIterator.next(4000));
console.log(advanceIterator.next(5000));
console.log(advanceIterator.next(6000));

//Throwing Errors in Iterators
// when you pass Error object in next() method the iterator will be exited

const advanceIteratorWithError = advanceGenerator();
console.log(advanceIteratorWithError.next(1000));
console.log(advanceIteratorWithError.next(2000));
// console.log(advanceIteratorWithError.throw(new Error("Something Went wrong")));
// console.log(advanceIteratorWithError.next(3000)); // this code will not executed. program exited abruptly.

// we can use try-catch block to handle errors and code will run smoothly.
//Ex:
function* generatorWithTryCatch() {
  const first = yield 1;
  let second;
  try {
    second = yield first + 2; // when error is thrown at 3rd statement
    // error actually occurred when assigning the second variable so flow went to catch, there we assigned the variable second
  } catch (e) {
    console.log(e);
    second = 3;
  }

  const three = yield second + 4;
}

const IterateWithError = generatorWithTryCatch();

console.log(IterateWithError.next());
console.log(IterateWithError.next(2)); //{value:4, done: false}
console.log(IterateWithError.throw(new Error("Something went wrong"))); // observe here!! we got value so next and throw works same i.e., if generator handles error correctly.
console.log(IterateWithError.next(4));

//generator return statement:
//return statement returns the value and mark this instance of the function to complete so subsequent calls will always return value undefined
//Ex

function* generatorWithReturn() {
  yield 1;
  return 2;
  yield 3; //code is unreachable
  yield 4; //code is unreachable
}

const iteratorWithReturn = generatorWithReturn();
console.log(iteratorWithReturn.next());
console.log(iteratorWithReturn.next());
console.log(iteratorWithReturn.next());

/*
spead and for-of will ignore the value returned by return statement
ex:

for (let itrr of iteratorWithReturn) {
  console.log(itrr); //1
}

console.log([...iteratorWithReturn]) // [1]

it will console log only value 1 and ignores 2, because when done is true it will ignore its value and exits

*/

//Delegating Generators
// generators can delegate to other generators using special form of yield => yield*
// we can also use returned value from the Generators.
//ex:

function* generatorOne() {
  yield 1;
  yield 2;
}

function* generatorTwo() {
  yield 3;
  yield 4;
  return 5;
}

function* combineGenerator() {
  yield* generatorOne();
  const result = yield* generatorTwo();
  console.log(result); // 5

  yield* "SAM"; // yield* can be used on string, in this case default iterator is used on string
}

const cg = combineGenerator();

console.log(cg.next());
console.log(cg.next());
console.log(cg.next());
console.log(cg.next());
console.log(cg.next());
console.log(cg.next());
console.log(cg.next());
console.log(cg.next());

// Generator for async task
//will be added later
