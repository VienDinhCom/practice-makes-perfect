import { expect } from 'jsr:@std/expect';

function quickSort(nums: number[], left: number = 0, right: number = nums.length - 1): number[] {
  if (left < right) {
    const pivotIndex = partition(nums, left, right);

    quickSort(nums, left, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, right);
  }

  return nums;
}

function partition(nums: number[], left: number, right: number): number {
  const pivot = nums[right];

  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (nums[j] <= pivot) {
      i++;

      if (i !== j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }

  const pivotIndex = i + 1;

  if (pivotIndex !== right) {
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
  }

  return pivotIndex;
}

// https://visualgo.net/en/sorting
// https://www.youtube.com/watch?v=WprjBK0p6rw
// https://www.w3schools.com/dsa/dsa_algo_quickSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('empty array', () => {
  const input: number[] = [];
  const output: number[] = [];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('array with negative numbers', () => {
  const input = [-3, 15, -7, 1, 12, -19, 5, 8, 2, -10];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});
