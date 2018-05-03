/*
  SimpleMode
  ----------

  Develope a function called SimpleMode(arr) that takes an array of
  integers and returns the number that appears most frequently (the mode).
  For example: if arr contains:

    [10, 4, 5, 2, 4] the output should be 4.
  
  If there is more than one mode return the one that appeared in the
  array first (ie. [5, 10, 10, 6, 5] should return 5 because it appeared first). 
  If there is no mode return -1. The array will not be empty.

*/

const { Box, Left, Right, tryCatch } = require('func')
const { testRunner } = require('testRunner')
/*
  // Note1: Box Left, Right and tryCatch are functional programming structures from
  // the course Professor Frisby Introduces Composable Functional JavaScript.
  // Professor Frisby aka. Brian Lonsdorf uses Box to represent the Identity Functor
  // which, as I interpret, a way of achieving function composition by chaining.
  // Left and Right represent the two sub types of an Either. The function tryCatch
  // takes a function and attempts to run it in a try/catch block; returning a Left
  // if it fails and a Right otherwise.
  // Ref: https://egghead.io/lessons/javascript-combining-things-with-semigroups

  // The point of this exercise is to solve the SimpleMode problem using Functional
  // JavaScript style and practice using Box and the other functor types in the solution.
 */


// areInts :: [] -> Right([]) | Left()
const areInts = arr =>
  tryCatch(() => !arr.some(x => (x % 1 || typeof x !== 'number')) ? arr : [[]])


// SimpleMode :: [Any] -> +Int | -1
function SimpleMode(arr) {
  const r = areInts(arr).fold(err => Box([err]), x => Box(x))
    .map(arr => arr.reduce((p, c) =>
      (p.has(c))
        ? p.set(c, p.get(c)+1)
        : p.set(c, 1), (new Map())))
    .fold(x => Array.from(x).reduce((p, c) =>
      (p[1] >= c[1]) ? p : c ))
  return r[1] === 1 ? -1 : r[0]
}


testRunner(SimpleMode, [
  { actual: [5, 5, 6, 2, 2, 7, 8, 8, 8, 12, 14, 17, 9], expected: 8 },
  { actual: [5,5,6,2,2,7,8,8,8,7,12,14,17,9,12,13,14,24,24,7], expected: 7},
  { actual: [5,5,6,2,2,7,8,8,8,7,12,14,17,9,12,13,14,24,24,7,2], expected: 2},
  { actual: [6,5,5,2,2,7,8,8,8,7,12,14,17,9,12,13,2,14,6,24,6,24,7,6,2,6,2,5,6,5,5,5], expected: 6},
  { actual: [10, 4, 5, 2, 4, 5, 5, 5], expected: 5},
  { actual: [5, 10, 10, 6, 5, 4], expected: 5},
  { actual: [1,2,3,4,5,9,7,8,9], expected: 9},
  { actual: [2,13,4,1,15,5,5,0,1,20], expected: 1},
  { actual: [9, 1, 2, 3, 4, 5, 6, 7, 9], expected: 9 },
  // Test case tests multiple mode values.
  { actual: [9, 2, 2, 4, 4, 6, 7, 9, 6], expected: 9 },
  // Test case resolves to -1; no mode found.
  { actual: [1, 2, 3, 4, 5, 6, 7, 8, 9], expected: -1 },
  // The following test cases resolve to -1; Array contains non integer values.
  { actual: ["apples",1,2,3,4,5,6,7,"apples"], expected: -1},
  { actual: [1,2,3,{},4,5,6,7], expected: -1},
  { actual: [1,2,3,(x=>x*x),4,5,6,7,3], expected: -1},
  { actual: ["apples", "pears", "apples"], expected: -1 },
  // What happens if I pass in a String instead of an Array. Yes! It is
  // handled without it exploding
  { actual: "1, 3, 2, 5, 3, 0", expected: -1 },
  // what about just a number ...
  { actual: 1, expected: -1 },
])
