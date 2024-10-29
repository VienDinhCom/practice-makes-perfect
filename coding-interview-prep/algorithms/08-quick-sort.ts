import { expect } from 'jsr:@std/expect';

function quickSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(quickSort(input)).toStrictEqual(output);
});
