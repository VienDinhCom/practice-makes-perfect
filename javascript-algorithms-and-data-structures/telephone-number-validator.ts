// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator

import { expect } from 'jsr:@std/expect';

function telephoneCheck(str: string) {
  const regexs: RegExp[] = [
    /^1 \d{3}-\d{3}-\d{4}$/,
    /^1 \(\d{3}\) \d{3}-\d{4}$/,
    /^\d{10}$/,
    /^\d{3}-\d{3}-\d{4}$/,
    /^\(\d{3}\)\d{3}-\d{4}$/,
    /^1 \d{3} \d{3} \d{4}$/,
    /^1\(\d{3}\)\d{3}-\d{4}$/,
  ];

  return regexs.some((regex) => regex.test(str));
}

Deno.test("telephoneCheck('555-555-5555') should return a boolean", () => {
  expect(typeof telephoneCheck('555-555-5555')).toStrictEqual('boolean');
});

Deno.test("telephoneCheck('1 555-555-5555') should return true", () => {
  expect(telephoneCheck('1 555-555-5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('1 (555) 555-5555') should return true", () => {
  expect(telephoneCheck('1 (555) 555-5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('5555555555') should return true", () => {
  expect(telephoneCheck('5555555555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('555-555-5555') should return true", () => {
  expect(telephoneCheck('555-555-5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('(555)555-5555') should return true", () => {
  expect(telephoneCheck('(555)555-5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('1(555)555-5555') should return true", () => {
  expect(telephoneCheck('1(555)555-5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('555-5555') should return false", () => {
  expect(telephoneCheck('555-5555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('5555555') should return false", () => {
  expect(telephoneCheck('5555555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('1 555)555-5555') should return false", () => {
  expect(telephoneCheck('1 555)555-5555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('1 555 555 5555') should return true", () => {
  expect(telephoneCheck('1 555 555 5555')).toStrictEqual(true);
});

Deno.test("telephoneCheck('1 456 789 4444') should return true", () => {
  expect(telephoneCheck('1 456 789 4444')).toStrictEqual(true);
});

Deno.test("telephoneCheck('123**&!!asdf#') should return false", () => {
  expect(telephoneCheck('123**&!!asdf#')).toStrictEqual(false);
});

Deno.test("telephoneCheck('55555555') should return false", () => {
  expect(telephoneCheck('55555555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('(6054756961)') should return false", () => {
  expect(telephoneCheck('(6054756961)')).toStrictEqual(false);
});

Deno.test("telephoneCheck('2 (757) 622-7382') should return false", () => {
  expect(telephoneCheck('2 (757) 622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('0 (757) 622-7382') should return false", () => {
  expect(telephoneCheck('0 (757) 622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('-1 (757) 622-7382') should return false", () => {
  expect(telephoneCheck('-1 (757) 622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('2 757 622-7382') should return false", () => {
  expect(telephoneCheck('2 757 622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('10 (757) 622-7382') should return false", () => {
  expect(telephoneCheck('10 (757) 622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('27576227382') should return false", () => {
  expect(telephoneCheck('27576227382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('(275)76227382') should return false", () => {
  expect(telephoneCheck('(275)76227382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('2(757)6227382') should return false", () => {
  expect(telephoneCheck('2(757)6227382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('2(757)622-7382') should return false", () => {
  expect(telephoneCheck('2(757)622-7382')).toStrictEqual(false);
});

Deno.test("telephoneCheck('555)-555-5555') should return false", () => {
  expect(telephoneCheck('555)-555-5555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('(555-555-5555') should return false", () => {
  expect(telephoneCheck('(555-555-5555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('(555)5(55?)-5555') should return false", () => {
  expect(telephoneCheck('(555)5(55?)-5555')).toStrictEqual(false);
});

Deno.test("telephoneCheck('55 55-55-555-5') should return false", () => {
  expect(telephoneCheck('55 55-55-555-5')).toStrictEqual(false);
});

Deno.test("telephoneCheck('11 555-555-5555') should return false", () => {
  expect(telephoneCheck('11 555-555-5555')).toStrictEqual(false);
});
