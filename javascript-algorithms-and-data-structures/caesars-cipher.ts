// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

import { expect } from 'jsr:@std/expect';

function rot13(str: string): string {
  const ACode = 65;
  const ZCode = 90;

  let result = '';

  for (const char of str) {
    if (/[A-Z]/i.test(char)) {
      let code = char.charCodeAt(0) + 13;

      if (code > ZCode) {
        code = code - ZCode + ACode - 1;
      }

      result += String.fromCharCode(code);
    } else {
      result += char;
    }
  }

  return result;
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
