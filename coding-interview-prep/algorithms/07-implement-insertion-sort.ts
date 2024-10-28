import { expect } from 'jsr:@std/expect';

function insertionSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  for (let i = 1; i < nums.length; i++) {
    const currentValue = nums[i];

    let currentIndex = i - 1;

    while (nums[currentIndex] > currentValue && currentIndex >= 0) {
      nums[currentIndex + 1] = nums[currentIndex];
      currentIndex--;
    }

    nums[currentIndex + 1] = currentValue;
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(insertionSort(input)).toStrictEqual(output);
});
