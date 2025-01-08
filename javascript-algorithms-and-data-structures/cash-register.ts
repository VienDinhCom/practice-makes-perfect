// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

import { expect } from 'jsr:@std/expect';

type CashInDrawer = [string, number][];

interface Result {
  status: 'INSUFFICIENT_FUNDS' | 'CLOSED' | 'OPEN';
  change: [string, number][];
}

function checkCashRegister(price: number, cash: number, cid: CashInDrawer): Result {
  const denomination: Record<string, number> = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100,
  };

  const cashInDrawer: Record<string, number> = {};

  const drawerAmount = cid.reduce((prev, curr) => {
    cashInDrawer[curr[0]] = curr[1];

    return Number((prev + curr[1]).toFixed(2));
  }, 0);

  const changeAmount = Number((cash - price).toFixed());

  if (changeAmount > drawerAmount) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  return { status: 'CLOSED', change: [] };

  console.log({ denomination, cashInDrawer, drawerAmount, changeAmount });
}

checkCashRegister(19.5, 20, [
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
