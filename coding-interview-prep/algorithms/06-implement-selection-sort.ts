import { expect } from 'jsr:@std/expect';

function selectionSort(arr: number[]) {
  return arr;
}

// https://visualgo.net/en/sorting
// https://www.w3schools.com/dsa/dsa_algo_selectionsort.php

Deno.test('test', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);

  expect(selectionSort(input)).toStrictEqual(output);
});
