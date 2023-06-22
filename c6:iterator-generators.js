/*
1. Iterators directly returns next item from the data, where as in traditional for loops require maintaining variables.
2. for of loop spread operator works on the iterators.

why Iterators? 
1. the loop problem.
need variable management to loop over the data.

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
