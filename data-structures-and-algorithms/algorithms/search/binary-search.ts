import { expect } from 'jsr:@std/expect';

function binarySearch(nums: number[], target: number): number {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);

    if (target === nums[midIndex]) {
      return midIndex;
    }

    if (target < nums[midIndex]) {
      rightIndex = midIndex - 1;
    } else {
      leftIndex = midIndex + 1;
    }
  }

  return -1;
}

// https://www.w3schools.com/dsa/dsa_algo_binarysearch.php

Deno.test('found', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19];

  expect(binarySearch(input, 7)).toStrictEqual(4);
});

Deno.test('not found', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19];

  expect(binarySearch(input, 4)).toStrictEqual(-1);
});

Deno.test('found at the beginning', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19];
  expect(binarySearch(input, 1)).toStrictEqual(0); // First element
});

Deno.test('found at the end', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19];
  expect(binarySearch(input, 19)).toStrictEqual(9); // Last element
});

Deno.test('empty array', () => {
  const input: number[] = [];
  expect(binarySearch(input, 5)).toStrictEqual(-1); // Target not found in empty array
});

Deno.test('single element array - found', () => {
  const input = [3];
  expect(binarySearch(input, 3)).toStrictEqual(0); // Target is the only element
});

Deno.test('single element array - not found', () => {
  const input = [3];
  expect(binarySearch(input, 5)).toStrictEqual(-1); // Target is not found
});

Deno.test('found in a larger array', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19, 25, 30, 40, 50, 60];
  expect(binarySearch(input, 25)).toStrictEqual(10); // Middle of the array
});

Deno.test('not found in a larger array', () => {
  const input = [1, 2, 3, 5, 7, 8, 10, 12, 15, 19, 25, 30, 40, 50, 60];
  expect(binarySearch(input, 35)).toStrictEqual(-1); // Target not found
});

Deno.test('negative numbers', () => {
  const input = [-10, -5, 0, 5, 10, 20];
  expect(binarySearch(input, -5)).toStrictEqual(1); // Target is in the middle
});

Deno.test('floating point numbers', () => {
  const input = [0.1, 0.5, 1.2, 3.3, 4.4, 5.5];
  expect(binarySearch(input, 3.3)).toStrictEqual(3); // Exact match with float
});

Deno.test('found when array has large numbers', () => {
  const input = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  expect(binarySearch(input, 7000)).toStrictEqual(6); // Middle of large numbers
});

function binarySearchFCC(nums: number[], target: number) {
  const path = [];

  let leftIndex = 0;
  let rightIndex = nums.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);

    path.push(nums[midIndex]);

    if (nums[midIndex] === target) {
      return path;
    }

    if (target > nums[midIndex]) {
      leftIndex = midIndex + 1;
    } else {
      rightIndex = midIndex - 1;
    }
  }

  return 'Value Not Found';
}
