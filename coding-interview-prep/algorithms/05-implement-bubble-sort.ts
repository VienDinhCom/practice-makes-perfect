import { expect } from 'jsr:@std/expect';

function bubbleSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  for (let i = 0; i < nums.length; i++) {
    let swapped = false;

    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];

        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_bubblesort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(bubbleSort(input)).toStrictEqual(output);
});
