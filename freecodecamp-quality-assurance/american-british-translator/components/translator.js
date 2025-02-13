'use strict';

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  // Combine American-only words with American-to-British spelling differences.
  americanToBritish(text) {
    const dictionary = { ...americanOnly, ...americanToBritishSpelling };
    const titles = americanToBritishTitles;

    return this.translate(text, dictionary, titles, 'americanToBritish');
  }

  // Flip the spelling and title objects to go from British-to-American.
  britishToAmerican(text) {
    const dictionary = { ...britishOnly, ...this.flipObject(americanToBritishSpelling) };
    const titles = this.flipObject(americanToBritishTitles);

    return this.translate(text, dictionary, titles, 'britishToAmerican');
  }

  translate(text, dictionary, titles, direction) {
    let translated = text;
    const lowerText = text.toLowerCase();

    // Replace titles first.
    Object.entries(titles).forEach(([key, value]) => {
      const regex = new RegExp(key, 'gi');

      if (regex.test(lowerText)) {
        translated = translated.replace(regex, `<span class="highlight">${this.capitalizeFirstLetter(value)}</span>`);
      }
    });

    // Replace time format.
    // This regex matches times in formats like "12:30" or "12.30".
    const timeRegex = /([0-1]?[0-9]|2[0-3])([:.])([0-5][0-9])/g;

    translated = translated.replace(timeRegex, (match, hour, separator, minutes) => {
      let newTime = match;

      if (direction === 'americanToBritish' && separator === ':') {
        newTime = `${hour}.${minutes}`;
      } else if (direction === 'britishToAmerican' && separator === '.') {
        newTime = `${hour}:${minutes}`;
      }

      return `<span class="highlight">${newTime}</span>`;
    });

    // Replace words and spelling differences.
    Object.entries(dictionary).forEach(([word, replacement]) => {
      // Use word boundaries to avoid partial matches.
      const regex = new RegExp(`\\b${word}\\b`, 'gi');

      if (regex.test(lowerText)) {
        translated = translated.replace(regex, `<span class="highlight">${replacement}</span>`);
      }
    });

    return translated;
  }

  // Flip keys and values of an object.
  flipObject(obj) {
    return Object.entries(obj).reduce((flipped, [key, value]) => {
      flipped[value] = key;

      return flipped;
    }, {});
  }

  // Capitalize the first character of a word.
  capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

module.exports = Translator;
