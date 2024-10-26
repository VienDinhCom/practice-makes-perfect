import { expect } from 'jsr:@std/expect';

function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swapped = true;

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

    if (swapped === false) break;
  }

  return arr;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_bubblesort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(bubbleSort(input)).toStrictEqual(output);
});
