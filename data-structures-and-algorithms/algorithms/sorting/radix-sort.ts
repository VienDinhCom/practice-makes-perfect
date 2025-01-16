import { expect } from 'jsr:@std/expect';

function getMaxDigits(nums: number[]): number {
  // return Math.max(...nums).toString().length;

  // return Math.floor(Math.log10(Math.max(...nums)) + 1);

  return Math.max(...nums.map((num) => num.toString().length));
}

function getDigit(num: number, place: number): number {
  // return Math.floor(num / Math.pow(10, place)) % 10;

  return Number(num.toString().split('').reverse()[place]) || 0;
}

function radixSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const maxDigits = getMaxDigits(nums);

  for (let place = 0; place < maxDigits; place++) {
    const buckets: number[][] = new Array(10).fill(null).map(() => []);

    for (const num of nums) {
      const digit = getDigit(num, place);

      buckets[digit].push(num);
    }

    nums = buckets.flat();
  }

  return nums;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_radixSort.php

Deno.test('standard array', () => {
  const input = [121, 432, 564, 23, 1, 45, 788];
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
