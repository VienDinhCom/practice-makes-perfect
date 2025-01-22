import { expect } from 'jsr:@std/expect';

// Animation: https://www.youtube.com/watch?v=WprjBK0p6rw

function quickSort(nums: number[], leftIndex: number = 0, rightIndex: number = nums.length - 1): number[] {
  if (leftIndex >= rightIndex) return nums;

  const pivotIndex = partition(nums, leftIndex, rightIndex);

  quickSort(nums, leftIndex, pivotIndex - 1);
  quickSort(nums, pivotIndex + 1, rightIndex);

  return nums;
}

function partition(nums: number[], leftIndex: number, rightIndex: number): number {
  const pivotValue = nums[rightIndex];

  let trackIndex = leftIndex - 1;

  for (let i = leftIndex; i < rightIndex; i++) {
    if (nums[i] <= pivotValue) {
      trackIndex++;

      if (i !== trackIndex) {
        [nums[i], nums[trackIndex]] = [nums[trackIndex], nums[i]];
      }
    }
  }

  const pivotIndex = trackIndex + 1;

  [nums[pivotIndex], nums[rightIndex]] = [nums[rightIndex], nums[pivotIndex]];

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
