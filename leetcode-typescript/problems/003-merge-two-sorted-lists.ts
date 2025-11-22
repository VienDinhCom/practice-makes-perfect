import { expect } from "jsr:@std/expect";

// Linked List: https://leetcode.com/problems/merge-two-sorted-lists/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Time: O(n+m) Space: 0(1)
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const merged = new ListNode(0);
  let curr = merged;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }

    curr = curr.next;
  }

  curr.next = list1 !== null ? list1 : list2;

  return merged.next;
}

Deno.test("Two Sorted Lists", async (t) => {
  // Helper to convert array to linked list
  function arrayToList(arr: number[]): ListNode | null {
    const dummy = new ListNode();
    let current = dummy;
    for (const num of arr) {
      current.next = new ListNode(num);
      current = current.next;
    }
    return dummy.next;
  }

  // Helper to convert linked list to array
  function listToArray(node: ListNode | null): number[] {
    const result: number[] = [];
    while (node) {
      result.push(node.val);
      node = node.next;
    }
    return result;
  }

  await t.step("Both lists empty", () => {
    const list1 = arrayToList([]);
    const list2 = arrayToList([]);
    const merged = mergeTwoLists(list1, list2);
    expect(listToArray(merged)).toEqual([]);
  });

  await t.step("One list empty", () => {
    const list1 = arrayToList([]);
    const list2 = arrayToList([0]);
    const merged = mergeTwoLists(list1, list2);
    expect(listToArray(merged)).toEqual([0]);
  });

  await t.step("Both lists have elements", () => {
    const list1 = arrayToList([1, 2, 4]);
    const list2 = arrayToList([1, 3, 4]);
    const merged = mergeTwoLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  await t.step("One list longer than the other", () => {
    const list1 = arrayToList([1, 2, 5, 6]);
    const list2 = arrayToList([3, 4]);
    const merged = mergeTwoLists(list1, list2);
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  await t.step("Lists with negative numbers", () => {
    const list1 = arrayToList([-3, -1, 2]);
    const list2 = arrayToList([-2, 0, 3]);
    const merged = mergeTwoLists(list1, list2);
    expect(listToArray(merged)).toEqual([-3, -2, -1, 0, 2, 3]);
  });
});
