import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/pairwise

function pairwise(nums: number[], targetSum: number): number {
  const indices = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];

      if (sum === targetSum) {
        if (!indices.has(i) && !indices.has(j)) {
          indices.add(i);
          indices.add(j);
        }
      }
    }
  }

  return Array.from(indices).reduce((prev, curr) => prev + curr, 0);
}

Deno.test('pairwise function test cases', async (t) => {
  await t.step('should return 11 for [1, 4, 2, 3, 0, 5] with sum 7', () => {
    expect(pairwise([1, 4, 2, 3, 0, 5], 7)).toBe(11);
  });

  await t.step('should return 1 for [1, 3, 2, 4] with sum 4', () => {
    expect(pairwise([1, 3, 2, 4], 4)).toBe(1);
  });

  await t.step('should return 1 for [1, 1, 1] with sum 2', () => {
    expect(pairwise([1, 1, 1], 2)).toBe(1);
  });

  await t.step('should return 10 for [0, 0, 0, 0, 1, 1] with sum 1', () => {
    expect(pairwise([0, 0, 0, 0, 1, 1], 1)).toBe(10);
  });

  await t.step('should return 0 for empty array with any sum', () => {
    expect(pairwise([], 100)).toBe(0);
  });
});
