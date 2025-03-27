import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

function rot13(str: string): string {
  const ACode = 65;
  const ZCode = 90;

  let result = '';

  for (const char of str) {
    if (/[a-z]/i.test(char)) {
      const currentCode = char.charCodeAt(0);
      const shiftedCode = currentCode + 13;

      result += String.fromCharCode(shiftedCode <= ZCode ? shiftedCode : shiftedCode - ZCode + ACode - 1);
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
