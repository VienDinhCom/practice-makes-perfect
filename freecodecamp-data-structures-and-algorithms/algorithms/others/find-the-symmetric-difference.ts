import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference

function symmetricDifference(...args: number[][]): number[] {
  const symDiff = args.reduce((left, right) => {
    const leftDiff = left.filter((v) => !right.includes(v));
    const rightDiff = right.filter((v) => !left.includes(v));

    return Array.from(new Set([...leftDiff, ...rightDiff]));
  }, []);

  return symDiff.sort((a, b) => a - b);
}

Deno.test('Symmetric Difference Test Suite', async (t) => {
  await t.step('Test case 1 & 2: Basic two array comparison', () => {
    const result = symmetricDifference([1, 2, 3], [5, 2, 1, 4]);
    expect(result).toStrictEqual([3, 4, 5]);
    expect(result).toHaveLength(3);
  });

  await t.step('Test case 3 & 4: Two arrays with duplicates in first array', () => {
    const result = symmetricDifference([1, 2, 3, 3], [5, 2, 1, 4]);
    expect(result).toStrictEqual([3, 4, 5]);
    expect(result).toHaveLength(3);
  });

  await t.step('Test case 5 & 6: Two arrays with duplicates in second array', () => {
    const result = symmetricDifference([1, 2, 3], [5, 2, 1, 4, 5]);
    expect(result).toStrictEqual([3, 4, 5]);
    expect(result).toHaveLength(3);
  });

  await t.step('Test case 7 & 8: Three arrays comparison', () => {
    const result = symmetricDifference([1, 2, 5], [2, 3, 5], [3, 4, 5]);
    expect(result).toStrictEqual([1, 4, 5]);
    expect(result).toHaveLength(3);
  });

  await t.step('Test case 9 & 10: Three arrays with multiple duplicates', () => {
    const result = symmetricDifference([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
    expect(result).toStrictEqual([1, 4, 5]);
    expect(result).toHaveLength(3);
  });

  await t.step('Test case 11 & 12: Four arrays with multiple duplicates', () => {
    const result = symmetricDifference([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);
    expect(result).toStrictEqual([2, 3, 4, 6, 7]);
    expect(result).toHaveLength(5);
  });

  await t.step('Test case 13 & 14: Six arrays with multiple duplicates', () => {
    const result = symmetricDifference([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);
    expect(result).toStrictEqual([1, 2, 4, 5, 6, 7, 8, 9]);
    expect(result).toHaveLength(8);
  });
});
