import { expect } from 'jsr:@std/expect';

function bubbleSort(arr = []) {
  let swapped;

  for (let i = 0; i < arr.length; i++) {
    swapped = false;

    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}

Deno.test('test', () => {
  const input = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
  const output = input.toSorted((a, b) => a - b);

  expect(bubbleSort(input)).toStrictEqual(output);
});
