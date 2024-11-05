import { expect } from 'jsr:@std/expect';

function mergeSort(nums: number[]): number[] {
  // Nếu mảng có độ dài 1 hoặc nhỏ hơn, trả về mảng (đã được sắp xếp)
  if (nums.length <= 1) return nums;

  // Xác định vị trí giữa của mảng
  const midIndex = Math.floor(nums.length / 2);

  // Chia mảng thành hai nửa: bên trái và bên phải, sau đó sắp xếp đệ quy
  const left = mergeSort(nums.slice(0, midIndex));
  const right = mergeSort(nums.slice(midIndex));

  // Kết hợp hai mảng đã sắp xếp thành một mảng đã sắp xếp hoàn chỉnh
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  // Mảng kết quả để lưu trữ các phần tử đã sắp xếp
  const result: number[] = [];

  // Chỉ số hiện tại của mảng left
  let leftIndex = 0;

  // Chỉ số hiện tại của mảng right
  let rightIndex = 0;

  // Lặp qua các phần tử của cả hai mảng cho đến khi một trong hai mảng hết phần tử
  while (leftIndex < left.length && rightIndex < right.length) {
    // So sánh các phần tử ở chỉ số hiện tại của left và right
    if (left[leftIndex] < right[rightIndex]) {
      // Thêm phần tử nhỏ hơn vào mảng kết quả
      result.push(left[leftIndex]);

      // Tăng chỉ số của mảng left
      leftIndex++;
    } else {
      // Thêm phần tử nhỏ hơn vào mảng kết quả
      result.push(right[rightIndex]);

      // Tăng chỉ số của mảng right
      rightIndex++;
    }
  }

  // Kết hợp các phần tử còn lại từ mảng bên trái và bên phải vào kết quả
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// https://visualgo.net/en/sorting
// https://www.youtube.com/watch?v=WprjBK0p6rw
// https://www.w3schools.com/dsa/dsa_algo_mergeSort.php

Deno.test('standard array', () => {
  const input = [3, 15, 7, 1, 12, 19, 5, 8, 2, 10];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('empty array', () => {
  const input: number[] = [];
  const output: number[] = [];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('single element', () => {
  const input = [42];
  const output = [42];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('already sorted array', () => {
  const input = [1, 2, 3, 4, 5];
  const output = [1, 2, 3, 4, 5];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('reverse sorted array', () => {
  const input = [5, 4, 3, 2, 1];
  const output = [1, 2, 3, 4, 5];
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('array with negative numbers', () => {
  const input = [-3, 15, -7, 1, 12, -19, 5, 8, 2, -10];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});

Deno.test('array with duplicates', () => {
  const input = [5, 3, 8, 5, 2, 8, 1, 3];
  const output = input.toSorted((a, b) => a - b);
  expect(mergeSort(input)).toStrictEqual(output);
});
