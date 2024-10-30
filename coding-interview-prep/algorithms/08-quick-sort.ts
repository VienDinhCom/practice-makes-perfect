import { expect } from 'jsr:@std/expect';

function quickSort(arr: number[], left: number = 0, right: number = arr.length - 1): number[] {
  // Nếu chỉ số left nhỏ hơn right, nghĩa là còn phần tử để sắp xếp.
  if (left < right) {
    //  Gọi hàm partition để chia mảng thành hai phần dựa trên giá trị chốt (pivot).

    console.log('Before: ', arr);
    const pivotIndex = partition(arr, left, right);
    console.log('After: ', arr, '\n');

    // Đệ quy sắp xếp các phần tử bên trái của pivot
    quickSort(arr, left, pivotIndex - 1);

    // Đệ quy sắp xếp các phần tử bên phải của pivot
    quickSort(arr, pivotIndex + 1, right);
  }

  // Trả về mảng đã được sắp xếp
  return arr;
}

// Hàm partition chia mảng thành hai phần dựa trên pivot
function partition(arr: number[], left: number, right: number): number {
  // Chọn phần tử cuối cùng làm pivot
  const pivot = arr[right];

  // Biến i được khởi tạo để theo dõi vị trí mà các phần tử nhỏ hơn hoặc bằng pivot sẽ được đặt.
  let i = left - 1;

  // Duyệt qua các phần tử từ left đến right - 1 (trước pivot)
  for (let j = left; j < right; j++) {
    // Nếu phần tử hiện tại nhỏ hơn hoặc bằng pivot
    if (arr[j] <= pivot) {
      // Tăng chỉ số i
      i++;

      // Hoán đổi arr[i] và arr[j]
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  // Hoán đổi phần tử ngay sau i với pivot để đưa pivot về đúng vị trí
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

  // Trả về chỉ số của pivot sau khi đã được đặt đúng vị trí
  return i + 1;
}

quickSort([3, 15, 7, 1, 12, 19, 5, 8, 2, 10]);

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
