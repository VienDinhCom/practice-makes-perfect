import { expect } from "jsr:@std/expect";

// Array: https://leetcode.com/problems/two-sum/

// Time: O(n) Space: O(n)
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // num => index

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(num, i);
  }

  return [];
}

// Time: O(n2) Space: O(1)
// function twoSum(nums: number[], target: number): number[] {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (i !== j && nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }

//   return [];
// }

Deno.test("Two Sum", async (t) => {
  await t.step("Finds a valid pair", () => {
    const result = twoSum([2, 7, 11, 15], 9);
    expect(result).toEqual([0, 1]);
  });

  await t.step("Finds another valid pair", () => {
    const result = twoSum([3, 2, 4], 6);
    expect(result).toEqual([1, 2]);
  });

  await t.step("Handles duplicates correctly", () => {
    const result = twoSum([3, 3], 6);
    expect(result).toEqual([0, 1]);
  });

  await t.step("Returns empty array if no pair is found", () => {
    const result = twoSum([1, 2, 3], 7);
    expect(result).toEqual([]);
  });

  await t.step("Works with negative numbers", () => {
    const result = twoSum([-1, -2, -3, -4, -5], -8);
    expect(result).toEqual([2, 4]);
  });

  await t.step("Handles target as zero", () => {
    const result = twoSum([1, -1, 2, -2], 0);
    expect(result).toEqual([0, 1]);
  });

  await t.step("Works with an empty array", () => {
    const result = twoSum([], 10);
    expect(result).toEqual([]);
  });

  await t.step("Works with a single element array", () => {
    const result = twoSum([5], 5);
    expect(result).toEqual([]);
  });
});
