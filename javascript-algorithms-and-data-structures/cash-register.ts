// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

import { expect } from 'jsr:@std/expect';

type Cash = [string, number][];

interface Result {
  status: 'INSUFFICIENT_FUNDS' | 'CLOSED' | 'OPEN';
  change: Cash;
}

function checkCashRegister(price: number, cash: number, drawer: Cash): Result {
  const currencyMap = new Map<string, number>([
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01],
  ]);

  const changeDue = calculate(cash - price);
  const drawerMap = new Map(drawer);
  const totalInDrawer = calculate(drawer.reduce((sum, [_, amount]) => sum + amount, 0));

  if (totalInDrawer === changeDue) {
    return { status: 'CLOSED', change: drawer };
  }

  let remainingChange = changeDue;
  const changeGiven: Cash = [];

  for (const [currency, value] of currencyMap) {
    const neededUnits = Math.floor(remainingChange / value);

    if (neededUnits === 0) continue;

    const availableUnits = Math.floor((drawerMap.get(currency) || 0) / value);
    let availableAmount = 0;

    if (availableUnits <= neededUnits) {
      availableAmount = calculate(availableUnits * value);
    } else {
      availableAmount = calculate(neededUnits * value);
    }

    changeGiven.push([currency, availableAmount]);
    remainingChange = calculate(remainingChange - availableAmount);
  }

  if (remainingChange === 0) {
    return { status: 'OPEN', change: changeGiven };
  }

  return { status: 'INSUFFICIENT_FUNDS', change: [] };
}

function calculate(expression: number): number {
  return Number(expression.toFixed(2));
}

// const r = checkCashRegister(3.26, 100, [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100],
// ]);

// console.log(r);

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
