// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter

import { expect } from 'jsr:@std/expect';

function convertToRoman(num: number): string {
  const romanNumerals: [string, number][] = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];

  let result = '';
  let remainder = num;

  for (const [roman, value] of romanNumerals) {
    const neededRoman = Math.floor(remainder / value);
    const neededValue = neededRoman * value;

    remainder -= neededValue;
    result += roman.repeat(neededRoman);
  }

  return result;
}

Deno.test('convertToRoman(2) should return the string II', () => {
  expect(convertToRoman(2)).toStrictEqual('II');
});

Deno.test('convertToRoman(3) should return the string III', () => {
  expect(convertToRoman(3)).toStrictEqual('III');
});

Deno.test('convertToRoman(4) should return the string IV', () => {
  expect(convertToRoman(4)).toStrictEqual('IV');
});

Deno.test('convertToRoman(5) should return the string V', () => {
  expect(convertToRoman(5)).toStrictEqual('V');
});

Deno.test('convertToRoman(9) should return the string IX', () => {
  expect(convertToRoman(9)).toStrictEqual('IX');
});

Deno.test('convertToRoman(12) should return the string XII', () => {
  expect(convertToRoman(12)).toStrictEqual('XII');
});

Deno.test('convertToRoman(16) should return the string XVI', () => {
  expect(convertToRoman(16)).toStrictEqual('XVI');
});

Deno.test('convertToRoman(29) should return the string XXIX', () => {
  expect(convertToRoman(29)).toStrictEqual('XXIX');
});

Deno.test('convertToRoman(44) should return the string XLIV', () => {
  expect(convertToRoman(44)).toStrictEqual('XLIV');
});

Deno.test('convertToRoman(45) should return the string XLV', () => {
  expect(convertToRoman(45)).toStrictEqual('XLV');
});

Deno.test('convertToRoman(68) should return the string LXVIII', () => {
  expect(convertToRoman(68)).toStrictEqual('LXVIII');
});

Deno.test('convertToRoman(83) should return the string LXXXIII', () => {
  expect(convertToRoman(83)).toStrictEqual('LXXXIII');
});

Deno.test('convertToRoman(97) should return the string XCVII', () => {
  expect(convertToRoman(97)).toStrictEqual('XCVII');
});

Deno.test('convertToRoman(99) should return the string XCIX', () => {
  expect(convertToRoman(99)).toStrictEqual('XCIX');
});

Deno.test('convertToRoman(400) should return the string CD', () => {
  expect(convertToRoman(400)).toStrictEqual('CD');
});

Deno.test('convertToRoman(500) should return the string D', () => {
  expect(convertToRoman(500)).toStrictEqual('D');
});

Deno.test('convertToRoman(501) should return the string DI', () => {
  expect(convertToRoman(501)).toStrictEqual('DI');
});

Deno.test('convertToRoman(649) should return the string DCXLIX', () => {
  expect(convertToRoman(649)).toStrictEqual('DCXLIX');
});

Deno.test('convertToRoman(798) should return the string DCCXCVIII', () => {
  expect(convertToRoman(798)).toStrictEqual('DCCXCVIII');
});

Deno.test('convertToRoman(891) should return the string DCCCXCI', () => {
  expect(convertToRoman(891)).toStrictEqual('DCCCXCI');
});

Deno.test('convertToRoman(1000) should return the string M', () => {
  expect(convertToRoman(1000)).toStrictEqual('M');
});

Deno.test('convertToRoman(1004) should return the string MIV', () => {
  expect(convertToRoman(1004)).toStrictEqual('MIV');
});

Deno.test('convertToRoman(1006) should return the string MVI', () => {
  expect(convertToRoman(1006)).toStrictEqual('MVI');
});

Deno.test('convertToRoman(1023) should return the string MXXIII', () => {
  expect(convertToRoman(1023)).toStrictEqual('MXXIII');
});

Deno.test('convertToRoman(2014) should return the string MMXIV', () => {
  expect(convertToRoman(2014)).toStrictEqual('MMXIV');
});

Deno.test('convertToRoman(3999) should return the string MMMCMXCIX', () => {
  expect(convertToRoman(3999)).toStrictEqual('MMMCMXCIX');
});
