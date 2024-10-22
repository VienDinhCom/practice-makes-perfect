import { expect } from 'jsr:@std/expect';

function pairwise(arr, arg) {
  const indices = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (indices.has(i)) continue;

    for (let j = i + 1; j < arr.length; j++) {
      if (indices.has(j)) continue;

      if (arr[i] + arr[j] === arg) {
        indices.add(i);
        indices.add(j);
        break;
      }
    }
  }

  return Array.from(indices).reduce((sum, index) => sum + index, 0);
}

const r = pairwise([7, 9, 11, 13, 15], 20);

console.log(r);

Deno.test('pairwise([7, 9, 11, 13, 15], 20) === 6', () => {
  expect(pairwise([7, 9, 11, 13, 15], 20)).toBe(6);
});

Deno.test('pairwise([1, 1, 1], 2) === 1', () => {
  expect(pairwise([1, 1, 1], 2)).toBe(1);
});
