import { expect } from 'jsr:@std/expect';

function selectionSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let minj = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minj]) {
        minj = j;
      }
    }

    if (minj !== i) {
      [arr[i], arr[minj]] = [arr[minj], arr[i]];
    }
  }

  return arr;
}

Deno.test('test', () => {
  const input = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
  const output = input.toSorted((a, b) => a - b);

  expect(selectionSort(input)).toStrictEqual(output);
});
