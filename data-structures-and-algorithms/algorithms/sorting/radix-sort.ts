import { expect } from 'jsr:@std/expect';

function getDigit(num: number, place: number): number {
  return Math.floor(num / Math.pow(10, place)) % 10;
}

function getMaxDigits(nums: number[]): number {
  let maxDigits = 0;

  for (const num of nums) {
    maxDigits = Math.max(maxDigits, Math.floor(Math.log10(num) + 1));
  }

  return maxDigits;
}

// Radix Sort implementation
function radixSort(nums: number[]): number[] {
  const maxDigits = getMaxDigits(nums);

  // Loop over each digit position (from least significant to most significant)
  for (let k = 0; k < maxDigits; k++) {
    // Create buckets for each digit (0 to 9)
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    // Place each number in the appropriate bucket based on the current digit
    for (let i = 0; i < nums.length; i++) {
      const digit = getDigit(nums[i], k);
      buckets[digit].push(nums[i]);
    }

    // Reassemble the array from the buckets
    nums = ([] as number[]).concat(...buckets);
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_radixSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(radixSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(radixSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(radixSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(radixSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(radixSort(input)).toStrictEqual(output);
});
