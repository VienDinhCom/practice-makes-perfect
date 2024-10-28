import { expect } from 'jsr:@std/expect';

function selectionSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  for (let i = 0; i < nums.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [nums[minIndex], nums[i]] = [nums[i], nums[minIndex]];
    }
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_selectionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(selectionSort(input)).toStrictEqual(output);
});
