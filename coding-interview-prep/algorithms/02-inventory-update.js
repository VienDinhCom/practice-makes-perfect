function updateInventory(arr1, arr2) {
  const temp = {};

  arr1.forEach(([quantity, name]) => (temp[name] = quantity));

  arr2.forEach(([quantity, name]) => {
    if (temp[name] === undefined) {
      temp[name] = quantity;
    } else {
      temp[name] += quantity;
    }
  });

  const updatedInv = Object.entries(temp).map(([name, quantity]) => [quantity, name]);

  return updatedInv.sort((a, b) => {
    const aName = a[1].toLowerCase();
    const bName = b[1].toLowerCase();

    return aName.localeCompare(bName);
  });
}

const curInv = [
  [21, 'Bowling Ball'],
  [2, 'Dirty Sock'],
  [1, 'Hair Pin'],
  [5, 'Microphone'],
];

const newInv = [
  [2, 'Hair Pin'],
  [3, 'Half-Eaten Apple'],
  [67, 'Bowling Ball'],
  [7, 'Toothpaste'],
];

updateInventory(curInv, newInv);
