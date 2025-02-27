import { expect } from 'jsr:@std/expect';

// https://viendinh.com/posts/zzzt-sap-xep-tron/

function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const midIndex = Math.floor(nums.length / 2);

  const leftHalf = mergeSort(nums.slice(0, midIndex));
  const rightHalf = mergeSort(nums.slice(midIndex));

  return merge(leftHalf, rightHalf);
}

function merge(leftHalf: number[], rightHalf: number[]): number[] {
  const sortedNums: number[] = [];

  while (leftHalf.length && rightHalf.length) {
    if (leftHalf[0] < rightHalf[0]) {
      sortedNums.push(leftHalf.shift()!);
    } else {
      sortedNums.push(rightHalf.shift()!);
    }
  }

  return [...sortedNums, ...leftHalf, ...rightHalf];
}

// https://visualgo.net/en/sorting
// https://www.youtube.com/watch?v=WprjBK0p6rw
// https://www.w3schools.com/dsa/dsa_algo_mergeSort.php

// Animation: https://www.youtube.com/watch?v=5Z9dn2WTg9o

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
