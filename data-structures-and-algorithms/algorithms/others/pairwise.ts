import { expect } from 'jsr:@std/expect';

function pairwise(numbers: number[], targetSum: number): number {
  const usedIndices = new Set<number>();

  for (let i = 0; i < numbers.length; i++) {
    if (usedIndices.has(i)) continue;

    for (let j = i + 1; j < numbers.length; j++) {
      if (usedIndices.has(j)) continue;

      if (numbers[i] + numbers[j] === targetSum) {
        usedIndices.add(i);
        usedIndices.add(j);
        break;
      }
    }
  }

  return Array.from(usedIndices).reduce((sum, index) => sum + index, 0);
}

Deno.test('pairwise([7, 9, 11, 13, 15], 20) === 6', () => {
  expect(pairwise([7, 9, 11, 13, 15], 20)).toBe(6);
});

Deno.test('pairwise([1, 1, 1], 2) === 1', () => {
  expect(pairwise([1, 1, 1], 2)).toBe(1);
});
