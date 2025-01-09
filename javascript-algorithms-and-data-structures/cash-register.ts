// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

import { expect } from 'jsr:@std/expect';

const denomination: Record<string, number> = {
  'ONE HUNDRED': 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

type Cash = [string, number][];

interface Result {
  status: 'INSUFFICIENT_FUNDS' | 'CLOSED' | 'OPEN';
  change: Cash;
}

function checkCashRegister(price: number, cash: number, drawer: Cash): Result {
  const drawerObj: Record<string, number> = {};
  const drawerAmount = caculate(
    drawer.reduce((prev, curr) => {
      drawerObj[curr[0]] = curr[1];

      return prev + curr[1];
    }, 0)
  );

  const changeDue = caculate(cash - price);

  if (drawerAmount < changeDue) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  if (drawerAmount === changeDue) {
    return { status: 'CLOSED', change: drawer };
  }

  const changeObj: Record<string, number> = {};

  console.log({ drawerObj });

  for (const key in denomination) {
    while (drawerObj[key] > 0) {
      changeObj[key] ??= 0;
      changeObj[key] = caculate(changeObj[key] + denomination[key]);

      drawerObj[key] = caculate(drawerObj[key] - denomination[key]);

      const nextChange = caculate(Object.values(changeObj).reduce((prev, curr) => prev + curr, 0) + denomination[key]);

      if (nextChange > changeDue) {
        return { status: 'OPEN', change: Object.entries(changeObj) };
      }
    }
  }

  console.log({ drawerObj });

  return { status: 'INSUFFICIENT_FUNDS', change: [] };
}

function caculate(expression: number) {
  return Number(expression.toFixed(2));
}

const r = checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);

console.log(r);

Deno.test('Test 1: Should return an object', () => {
  const result = checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ]);
  expect(typeof result).toBe('object');
});

Deno.test('Test 2: Should return correct change for $0.50', () => {
  const result = checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ]);
  expect(result).toStrictEqual({
    status: 'OPEN',
    change: [['QUARTER', 0.5]],
  });
});

Deno.test('Test 3: Should return correct change for $96.74', () => {
  const result = checkCashRegister(3.26, 100, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ]);
  expect(result).toStrictEqual({
    status: 'OPEN',
    change: [
      ['TWENTY', 60],
      ['TEN', 20],
      ['FIVE', 15],
      ['ONE', 1],
      ['QUARTER', 0.5],
      ['DIME', 0.2],
      ['PENNY', 0.04],
    ],
  });
});

Deno.test('Test 4: Should return INSUFFICIENT_FUNDS with only pennies', () => {
  const result = checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]);
  expect(result).toStrictEqual({
    status: 'INSUFFICIENT_FUNDS',
    change: [],
  });
});

Deno.test('Test 5: Should return INSUFFICIENT_FUNDS with penny and dollar', () => {
  const result = checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 1],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]);
  expect(result).toStrictEqual({
    status: 'INSUFFICIENT_FUNDS',
    change: [],
  });
});

Deno.test('Test 6: Should return CLOSED when drawer empties exactly', () => {
  const result = checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]);
  expect(result).toStrictEqual({
    status: 'CLOSED',
    change: [
      ['PENNY', 0.5],
      ['NICKEL', 0],
      ['DIME', 0],
      ['QUARTER', 0],
      ['ONE', 0],
      ['FIVE', 0],
      ['TEN', 0],
      ['TWENTY', 0],
      ['ONE HUNDRED', 0],
    ],
  });
});
