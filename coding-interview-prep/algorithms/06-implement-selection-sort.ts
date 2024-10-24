import { expect } from 'jsr:@std/expect';

function selectionSort(array: number[]) {
  return array;
}

Deno.test('test', () => {
  const input = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
  const output = input.toSorted((a, b) => a - b);

  expect(selectionSort(input)).toStrictEqual(output);
});
