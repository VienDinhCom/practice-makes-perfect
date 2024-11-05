import { expect } from 'jsr:@std/expect';

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const sortedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift()!);
    } else {
      sortedArr.push(right.shift()!);
    }
  }

  return [...sortedArr, ...left, ...right];
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
