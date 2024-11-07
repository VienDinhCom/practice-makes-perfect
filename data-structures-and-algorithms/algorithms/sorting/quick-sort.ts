import { expect } from 'jsr:@std/expect';

// Hàm quickSort thực hiện sắp xếp mảng sử dụng thuật toán Quicksort
function quickSort(nums: number[], left: number = 0, right: number = nums.length - 1): number[] {
  // Nếu left < right, tức là mảng con có kích thước lớn hơn 1
  if (left < right) {
    // Tìm chỉ số của pivot sau khi phân chia mảng
    const pivotIndex = partition(nums, left, right);

    // Đệ quy sắp xếp mảng con bên trái của pivot
    quickSort(nums, left, pivotIndex - 1);
    // Đệ quy sắp xếp mảng con bên phải của pivot
    quickSort(nums, pivotIndex + 1, right);
  }

  // Trả về mảng đã sắp xếp
  return nums;
}

// Hàm partition thực hiện phân chia mảng và trả về vị trí của pivot
function partition(nums: number[], left: number, right: number): number {
  // Chọn phần tử cuối cùng của mảng con làm pivot
  const pivot = nums[right];

  // Đặt chỉ số i để theo dõi vị trí sẽ hoán đổi phần tử nhỏ hơn pivot
  let i = left - 1;

  // Lặp qua các phần tử trong mảng con
  for (let j = left; j < right; j++) {
    // Nếu phần tử tại vị trí j nhỏ hơn hoặc bằng pivot
    if (nums[j] <= pivot) {
      // Tăng chỉ số i lên
      i++;

      // Nếu i và j không trùng nhau, hoán đổi các phần tử tại i và j
      if (i !== j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }

  // Xác định vị trí mới cho pivot
  const pivotIndex = i + 1;

  // Nếu vị trí pivotIndex khác right, hoán đổi pivot vào đúng vị trí
  if (pivotIndex !== right) {
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
  }

  // Trả về vị trí của pivot để tiếp tục phân chia mảng
  return pivotIndex;
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
