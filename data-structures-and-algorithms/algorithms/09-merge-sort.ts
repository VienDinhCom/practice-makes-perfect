import { expect } from 'jsr:@std/expect';

// Function to perform merge sort on an array
function mergeSort(arr: number[]): number[] {
  // Base case: if the array has 1 or 0 elements, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the midpoint of the array to divide it into two halves
  const mid = Math.floor(arr.length / 2);

  // Recursively sort the left and right halves
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge the sorted halves and return the sorted array
  return merge(left, right);
}

// Helper function to merge two sorted arrays into one sorted array
function merge(left: number[], right: number[]): number[] {
  const result: number[] = []; // Array to store the merged result

  let leftIndex = 0; // Index for traversing the left array
  let rightIndex = 0; // Index for traversing the right array

  // Continue merging until one of the arrays is fully traversed
  while (leftIndex < left.length && rightIndex < right.length) {
    // Compare the elements at the current indices of both arrays
    if (left[leftIndex] < right[rightIndex]) {
      // If left element is smaller, add it to the result array and move the left index forward
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      // If right element is smaller or equal, add it to the result array and move the right index forward
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate any remaining elements from either array to the result
  return result
    .concat(left.slice(leftIndex)) // Add remaining elements from the left array (if any)
    .concat(right.slice(rightIndex)); // Add remaining elements from the right array (if any)
}

// https://visualgo.net/en/sorting
// https://www.youtube.com/watch?v=WprjBK0p6rw
// https://www.w3schools.com/dsa/dsa_algo_mergeSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('empty array', () => {
  const input: number[] = [];
  const output: number[] = [];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('array with negative numbers', () => {
  const input = [-3, 15, -7, 1, 12, -19, 5, 8, 2, -10];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});
