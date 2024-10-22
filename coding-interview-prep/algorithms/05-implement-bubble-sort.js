import { expect } from 'jsr:@std/expect';

function bubbleSort(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
  }

  return arr;
}

const r = bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);

console.log(r);

Deno.test('test', () => {
  const input = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
  const output = input.toSorted((a, b) => a - b);

  expect(bubbleSort(input)).toStrictEqual(output);
});
