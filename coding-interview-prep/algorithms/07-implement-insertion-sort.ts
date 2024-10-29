import { expect } from 'jsr:@std/expect';

function insertionSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  for (let i = 1; i < nums.length; i++) {
    const tmp = nums[i];

    let j = i - 1;

    while (nums[j] > tmp && j >= 0) {
      nums[j + 1] = nums[j];
      j--;
    }

    nums[j + 1] = tmp;
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('empty array', () => {
  const input: number[] = [];
  const output: number[] = [];
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('array with negative numbers', () => {
  const input = [-3, 15, -7, 1, 12, -19, 5, 8, 2, -10];
  const output = input.toSorted((a, b) => a - b);
  expect(insertionSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(insertionSort(input)).toStrictEqual(output);
});
