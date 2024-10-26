import { expect } from 'jsr:@std/expect';

function insertionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    const tmp = arr[i];

    let j = i - 1;

    while (arr[j] > tmp && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = tmp;
  }

  return arr;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(insertionSort(input)).toStrictEqual(output);
});
