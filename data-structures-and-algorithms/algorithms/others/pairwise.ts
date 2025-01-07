import { expect } from 'jsr:@std/expect';

function pairwise(nums: number[], sum: number): number {
  const indices = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] + nums[j] === sum) {
        if (!indices.has(i) && !indices.has(j)) {
          indices.add(i);
          indices.add(j);
        }
      }
    }
  }

  return Array.from(indices).reduce((sum, curr) => sum + curr, 0);
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
