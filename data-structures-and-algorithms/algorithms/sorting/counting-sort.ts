import { expect } from 'jsr:@std/expect';

function countingSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const max = Math.max(...nums);

  const count = new Array(max + 1).fill(0);

  for (const num of nums) {
    count[num]++;
  }

  const sortedNums: number[] = [];

  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sortedNums.push(i);
      count[i]--;
    }
  }

  return sortedNums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_countingSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(countingSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(countingSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(countingSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(countingSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(countingSort(input)).toStrictEqual(output);
});
