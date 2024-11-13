import { expect } from 'jsr:@std/expect';

function radixSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const maxDigits = getMaxDigits(nums);

  for (let k = 0; k <= maxDigits; k++) {
    const buckets: number[][] = new Array(10).fill(0).map(() => []);

    for (const num of nums) {
      const digit = getDigit(num, k);

      buckets[digit].push(num);
    }

    nums = buckets.flat();
  }

  return nums;
}

function getMaxDigits(nums: number[]): number {
  let maxDigits = 0;

  for (const num of nums) {
    // maxDigits = Math.max(maxDigits, Math.floor(Math.log10(num) + 1));

    const digits = String(num).length;

    if (digits > maxDigits) {
      maxDigits = digits;
    }
  }

  return maxDigits;
}

function getDigit(num: number, place: number): number {
  // const digit = Math.floor(num / Math.pow(10, place)) % 10;

  // console.log({ num, place, digit });

  // return digit;

  const str = String(num);
  const digit = Number(str[str.length - 1 - place]) || 0;

  // console.log({ num, str, place, digit });

  return digit;
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
