// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

import { expect } from 'jsr:@std/expect';

function rot13(str: string): string {
  const ACode = 65;
  const ZCode = 90;

  const chars = str.split('');

  return chars
    .map((char) => {
      const charCode = char.charCodeAt(0);

      if (charCode < ACode || charCode > ZCode) return char;

      let shiftedCode = charCode + 13;

      if (shiftedCode > ZCode) {
        shiftedCode = shiftedCode - ZCode + ACode - 1;
      }

      return String.fromCharCode(shiftedCode);
    })
    .join('');
}

Deno.test("rot13('SERR PBQR PNZC') should decode to 'FREE CODE CAMP'", () => {
  expect(rot13('SERR PBQR PNZC')).toStrictEqual('FREE CODE CAMP');
});

Deno.test("rot13('SERR CVMMN!') should decode to 'FREE PIZZA!'", () => {
  expect(rot13('SERR CVMMN!')).toStrictEqual('FREE PIZZA!');
});

Deno.test("rot13('SERR YBIR?') should decode to 'FREE LOVE?'", () => {
  expect(rot13('SERR YBIR?')).toStrictEqual('FREE LOVE?');
});

Deno.test(
  "rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.') should decode to 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.'",
  () => {
    expect(rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.')).toStrictEqual(
      'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.'
    );
  }
);
