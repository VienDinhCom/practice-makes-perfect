// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker

import { expect } from 'jsr:@std/expect';

// review
function palindrome(str: string) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  return cleanedStr === cleanedStr.split('').reverse().join('');
}

Deno.test('palindrome should return a boolean', () => {
  expect(typeof palindrome('eye')).toStrictEqual('boolean');
});

Deno.test('palindrome("eye") should return true', () => {
  expect(palindrome('eye')).toStrictEqual(true);
});

Deno.test('palindrome("_eye") should return true', () => {
  expect(palindrome('_eye')).toStrictEqual(true);
});

Deno.test('palindrome("race car") should return true', () => {
  expect(palindrome('race car')).toStrictEqual(true);
});

Deno.test('palindrome("not a palindrome") should return false', () => {
  expect(palindrome('not a palindrome')).toStrictEqual(false);
});

Deno.test('palindrome("A man, a plan, a canal. Panama") should return true', () => {
  expect(palindrome('A man, a plan, a canal. Panama')).toStrictEqual(true);
});

Deno.test('palindrome("never odd or even") should return true', () => {
  expect(palindrome('never odd or even')).toStrictEqual(true);
});

Deno.test('palindrome("nope") should return false', () => {
  expect(palindrome('nope')).toStrictEqual(false);
});

Deno.test('palindrome("almostomla") should return false', () => {
  expect(palindrome('almostomla')).toStrictEqual(false);
});

Deno.test('palindrome("My age is 0, 0 si ega ym.") should return true', () => {
  expect(palindrome('My age is 0, 0 si ega ym.')).toStrictEqual(true);
});

Deno.test('palindrome("1 eye for of 1 eye.") should return false', () => {
  expect(palindrome('1 eye for of 1 eye.')).toStrictEqual(false);
});

Deno.test('palindrome("0_0 (: /-\\ :) 0-0") should return true', () => {
  expect(palindrome('0_0 (: /-\\ :) 0-0')).toStrictEqual(true);
});

Deno.test('palindrome("five|\\_/|four") should return false', () => {
  expect(palindrome('five|\\_/|four')).toStrictEqual(false);
});
