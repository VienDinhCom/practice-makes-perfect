import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/inventory-update

type Inventory = [number, string][];

function updateInventory(curInv: Inventory, newInv: Inventory): Inventory {
  const upInvObj: Record<string, number> = {};

  curInv.forEach(([quant, item]) => {
    upInvObj[item] = quant;
  });

  newInv.forEach(([quant, item]) => {
    upInvObj[item] ??= 0;
    upInvObj[item] += quant;
  });

  const upInv: Inventory = Object.entries(upInvObj).map(([item, quant]) => [quant, item]);

  return upInv.sort((a, b) => a[1].localeCompare(b[1]));
}

Deno.test('Inventory update tests', async (t) => {
  await t.step('should return an array', () => {
    const result = updateInventory([], []);
    expect(Array.isArray(result)).toBe(true);
  });

  await t.step('should return array with correct length when merging inventories', () => {
    const curInv: Inventory = [
      [21, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [1, 'Hair Pin'],
      [5, 'Microphone'],
    ];
    const newInv: Inventory = [
      [2, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [67, 'Bowling Ball'],
      [7, 'Toothpaste'],
    ];
    const result = updateInventory(curInv, newInv);
    expect(result.length).toBe(6);
  });

  await t.step('should correctly merge and sort inventories', () => {
    const curInv: Inventory = [
      [21, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [1, 'Hair Pin'],
      [5, 'Microphone'],
    ];
    const newInv: Inventory = [
      [2, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [67, 'Bowling Ball'],
      [7, 'Toothpaste'],
    ];
    const expected: Inventory = [
      [88, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [3, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [5, 'Microphone'],
      [7, 'Toothpaste'],
    ];
    const result = updateInventory(curInv, newInv);
    expect(result).toEqual(expected);
  });

  await t.step('should return unchanged inventory when new inventory is empty', () => {
    const curInv: Inventory = [
      [21, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [1, 'Hair Pin'],
      [5, 'Microphone'],
    ];
    const newInv: Inventory = [];
    const result = updateInventory(curInv, newInv);
    expect(result).toEqual([
      [21, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [1, 'Hair Pin'],
      [5, 'Microphone'],
    ]);
  });

  await t.step('should return new inventory when current inventory is empty', () => {
    const curInv: Inventory = [];
    const newInv: Inventory = [
      [2, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [67, 'Bowling Ball'],
      [7, 'Toothpaste'],
    ];
    const result = updateInventory(curInv, newInv);
    expect(result).toEqual([
      [67, 'Bowling Ball'],
      [2, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [7, 'Toothpaste'],
    ]);
  });

  await t.step('should correctly handle zero quantities', () => {
    const curInv: Inventory = [
      [0, 'Bowling Ball'],
      [0, 'Dirty Sock'],
      [0, 'Hair Pin'],
      [0, 'Microphone'],
    ];
    const newInv: Inventory = [
      [1, 'Hair Pin'],
      [1, 'Half-Eaten Apple'],
      [1, 'Bowling Ball'],
      [1, 'Toothpaste'],
    ];
    const expected: Inventory = [
      [1, 'Bowling Ball'],
      [0, 'Dirty Sock'],
      [1, 'Hair Pin'],
      [1, 'Half-Eaten Apple'],
      [0, 'Microphone'],
      [1, 'Toothpaste'],
    ];
    const result = updateInventory(curInv, newInv);
    expect(result).toEqual(expected);
  });
});
