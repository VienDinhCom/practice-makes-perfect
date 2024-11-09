import { expect } from 'jsr:@std/expect';

function linearSearch(nums: number[], target: number): number {}

// https://www.w3schools.com/dsa/dsa_algo_linearsearch.php

Deno.test('found', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];

  expect(linearSearch(input, 1)).toStrictEqual(3);
});

Deno.test('not found', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];

  expect(linearSearch(input, 4)).toStrictEqual(-1);
});

Deno.test('target at the beginning of the array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  expect(linearSearch(input, 3)).toStrictEqual(0); // target at index 0
});

Deno.test('target at the end of the array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  expect(linearSearch(input, 10)).toStrictEqual(9); // target at index 9
});

Deno.test('target not in the array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  expect(linearSearch(input, 4)).toStrictEqual(-1); // target not in array
});

Deno.test('empty array', () => {
  const input: number[] = [];
  expect(linearSearch(input, 5)).toStrictEqual(-1); // empty array, should return -1
});

Deno.test('single element array, target present', () => {
  const input = [5];
  expect(linearSearch(input, 5)).toStrictEqual(0); // target is present
});

Deno.test('single element array, target absent', () => {
  const input = [5];
  expect(linearSearch(input, 3)).toStrictEqual(-1); // target is absent
});

Deno.test('array with multiple occurrences of target', () => {
  const input = [3, 15, 7, 15, 1, 15, 12];
  expect(linearSearch(input, 15)).toStrictEqual(1); // first occurrence at index 1
});

Deno.test('large array', () => {
  const input = Array.from({ length: 1000 }, (_, i) => i);
  expect(linearSearch(input, 500)).toStrictEqual(500); // large array, target in middle
});

Deno.test('negative numbers in array', () => {
  const input = [-10, -5, 0, 5, 10];
  expect(linearSearch(input, -5)).toStrictEqual(1); // target is a negative number
});

Deno.test('target as zero', () => {
  const input = [-10, -5, 0, 5, 10];
  expect(linearSearch(input, 0)).toStrictEqual(2); // target is zero
});
