import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/no-repeats-please

function getPerms(str: string): string[] {
  if (str.length === 1) {
    return [str];
  }

  const perms: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainChars = str.slice(0, i) + str.slice(i + 1);
    const remainPerms = getPerms(remainChars);

    for (const remainPerm of remainPerms) {
      perms.push(char + remainPerm);
    }
  }

  return perms;
}

function permAlone(str: string): number {
  const perms = getPerms(str);

  const alonePerms = perms.filter((perm) => {
    for (const char of str) {
      if (perm.includes(char + char)) {
        return false;
      }
    }

    return true;
  });

  return alonePerms.length;
}

Deno.test('permAlone function tests', async (t) => {
  await t.step('should return a number for "aab"', () => {
    expect(typeof permAlone('aab')).toBe('number');
  });

  await t.step('should return 2 for "aab"', () => {
    expect(permAlone('aab')).toBe(2);
  });

  await t.step('should return 0 for "aaa"', () => {
    expect(permAlone('aaa')).toBe(0);
  });

  await t.step('should return 8 for "aabb"', () => {
    expect(permAlone('aabb')).toBe(8);
  });

  await t.step('should return 3600 for "abcdefa"', () => {
    expect(permAlone('abcdefa')).toBe(3600);
  });

  await t.step('should return 2640 for "abfdefa"', () => {
    expect(permAlone('abfdefa')).toBe(2640);
  });

  await t.step('should return 0 for "zzzzzzzz"', () => {
    expect(permAlone('zzzzzzzz')).toBe(0);
  });

  await t.step('should return 1 for "a"', () => {
    expect(permAlone('a')).toBe(1);
  });

  await t.step('should return 0 for "aaab"', () => {
    expect(permAlone('aaab')).toBe(0);
  });

  await t.step('should return 12 for "aaabb"', () => {
    expect(permAlone('aaabb')).toBe(12);
  });
});
