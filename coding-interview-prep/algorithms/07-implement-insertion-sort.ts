import { expect } from 'jsr:@std/expect';

function insertionSort(arr: number[]): number[] {
  // Mark the first element as sorted
  for (let i = 1; i < arr.length; i++) {
    // Extract the element X
    const X = arr[i];
    let j: number;

    // Start from the last sorted index
    for (j = i - 1; j >= 0; j--) {
      // If current element j > X, move sorted element to the right by 1
      if (arr[j] > X) {
        arr[j + 1] = arr[j]; // Move element to the right
      } else {
        break; // Break loop and insert X here
      }
    }

    // Insert X at the correct position
    arr[j + 1] = X;
  }

  return arr;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(insertionSort(input)).toStrictEqual(output);
});
