import { expect } from 'jsr:@std/expect';

function quickSort(nums: number[], left: number = 0, right: number = nums.length - 1): number[] {
  // Kiểm tra điều kiện dừng của đệ quy: nếu left >= right, đoạn này đã sắp xếp xong
  if (left < right) {
    // Phân đoạn mảng và tìm vị trí của pivot
    const pivotIndex = partition(nums, left, right);

    // Sắp xếp phần bên trái của pivot
    quickSort(nums, left, pivotIndex - 1);

    // Sắp xếp phần bên phải của pivot
    quickSort(nums, pivotIndex + 1, right);
  }

  // Trả về mảng đã sắp xếp
  return nums;
}

// Hàm partition chọn một phần tử làm pivot và sắp xếp các phần tử xung quanh nó
function partition(nums: number[], left: number, right: number): number {
  // Chọn phần tử cuối cùng trong đoạn làm pivot
  const pivot = nums[right];

  // Khởi tạo chỉ số i để đánh dấu vị trí phần tử cuối cùng <= pivot
  let i = left - 1;

  // Duyệt qua các phần tử từ left đến right - 1 để sắp xếp quanh pivot
  for (let j = left; j < right; j++) {
    // Nếu phần tử hiện tại nhỏ hơn hoặc bằng pivot, hoán đổi nó về vị trí "nhỏ hơn pivot"
    if (nums[j] <= pivot) {
      // Tăng chỉ số i để mở rộng vùng các phần tử nhỏ hơn hoặc bằng pivot
      i++;

      // Hoán đổi phần tử tại nums[i] và nums[j] để đảm bảo các phần tử nhỏ hơn pivot nằm bên trái
      if (j !== i) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
      }
    }
  }

  // Đưa pivot về vị trí chính xác (i + 1) bằng cách hoán đổi với phần tử tại nums[right]
  if (i + 1 !== right) {
    [nums[right], nums[i + 1]] = [nums[i + 1], nums[right]];
  }

  // Trả về vị trí cuối cùng của pivot sau khi đã phân chia mảng
  return i + 1;
}

// https://visualgo.net/en/sorting
// https://www.youtube.com/watch?v=WprjBK0p6rw
// https://www.w3schools.com/dsa/dsa_algo_quickSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('empty array', () => {
  const input: number[] = [];
  const output: number[] = [];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('array with negative numbers', () => {
  const input = [-3, 15, -7, 1, 12, -19, 5, 8, 2, -10];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(quickSort(input)).toStrictEqual(output);
});
