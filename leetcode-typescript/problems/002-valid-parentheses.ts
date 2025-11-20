import { expect } from "jsr:@std/expect";

// Stack: https://leetcode.com/problems/valid-parentheses/

function isValid(string: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of string) {
    if (char in pairs) {
      // char is a closing bracket
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // char is an opening bracket
      stack.push(char);
    }
  }

  return stack.length === 0;
}

Deno.test("Valid Parentheses", async (t) => {
  await t.step("single pair of parentheses", () => {
    expect(isValid("()")).toBe(true);
    expect(isValid("[]")).toBe(true);
    expect(isValid("{}")).toBe(true);
  });

  await t.step("multiple types of brackets", () => {
    expect(isValid("()[]{}")).toBe(true);
  });

  await t.step("mismatched pair", () => {
    expect(isValid("(]")).toBe(false);
  });

  await t.step("nested brackets", () => {
    expect(isValid("([])")).toBe(true);
  });

  await t.step("incorrect nesting", () => {
    expect(isValid("([)]")).toBe(false);
  });

  await t.step("Single opening bracket -> false", () => {
    expect(isValid("(")).toBe(false);
  });

  await t.step("Single closing bracket -> false", () => {
    expect(isValid("]")).toBe(false);
  });

  await t.step("Nested deep valid", () => {
    expect(isValid("{[()()]}")).toBe(true);
  });

  await t.step("Long invalid – missing close", () => {
    expect(isValid("(((()")).toBe(false);
  });

  await t.step("Long valid", () => {
    expect(isValid("()(){}[]((){})")).toBe(true);
  });
});
