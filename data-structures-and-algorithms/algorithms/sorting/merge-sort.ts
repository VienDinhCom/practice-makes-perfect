import { expect } from 'jsr:@std/expect';

// Hàm mergeSort nhận một mảng đầu vào nums và trả về mảng đã được sắp xếp
function mergeSort(nums: number[]): number[] {
  // Nếu mảng chỉ có 1 phần tử hoặc không có phần tử nào, trả về mảng như ban đầu (đã được sắp xếp)
  if (nums.length <= 1) return nums;

  // Xác định chỉ số giữa của mảng để chia mảng thành hai phần
  const midIndex = Math.floor(nums.length / 2);

  // Gọi đệ quy hàm mergeSort cho nửa bên trái của mảng
  const left = mergeSort(nums.slice(0, midIndex));
  // Gọi đệ quy hàm mergeSort cho nửa bên phải của mảng
  const right = mergeSort(nums.slice(midIndex));

  // Gọi hàm merge để trộn hai nửa đã sắp xếp lại với nhau
  return merge(left, right);
}

// Hàm merge để trộn hai mảng con đã sắp xếp (left và right) thành một mảng lớn duy nhất, được sắp xếp
function merge(left: number[], right: number[]): number[] {
  // Tạo một mảng mới để chứa các giá trị đã sắp xếp
  const sortedNums: number[] = [];

  // So sánh từng phần tử của hai mảng con và đưa phần tử nhỏ hơn vào mảng kết quả
  while (left.length && right.length) {
    // Nếu phần tử đầu tiên của mảng left nhỏ hơn phần tử đầu tiên của mảng right
    if (left[0] < right[0]) {
      // Lấy phần tử đầu tiên từ left và thêm vào mảng kết quả sortedNums
      sortedNums.push(left.shift()!);
    } else {
      // Ngược lại, lấy phần tử đầu tiên từ right và thêm vào mảng kết quả sortedNums
      sortedNums.push(right.shift()!);
    }
  }

  // Ghép các phần tử còn lại của left và right vào cuối mảng kết quả
  // Trong trường hợp một trong hai mảng left hoặc right đã rỗng
  return [...sortedNums, ...left, ...right];
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
