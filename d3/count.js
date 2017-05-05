/* array of all lowercase letters */
var letters = "12".split("");

/*
 * try this out in the console! you can access any variable or function
 * defined globally in the console
 *
 * and, you can right-click output in the console to make it global too!
 */

/*
 * removes any character (including spaces) that is not a letter, and
 * that is not a letter, and converts all letters to lowercase
 */
var onlyLetters = function(text) {
  /*
   * regular expressions:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
   */
  var notLetter = /[^a-z]/g;
  return text.toLowerCase().replace(notLetter, "");
};

/*
 * counts all of the letters in the input text and stores the counts as
 * object properties
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 */
var countLetters = function(input) {
  var text = input;
  console.log(input);
  var count = {};

  /*
   * we want 0s for letters that aren't present, so we will go ahead
   * and initialize that now
   */
  // for (var i = 0; i < letters.length; i++) {
  //   count[letters[i]] = 0;
  // }

  /*
   * you can loop through strings as if they are arrays
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
   */
  for (var i = 0; i < text.length; i++) {
    var letter = text[i];
    console.log(letter);
    // check if we have seen this letter before
    if (count.hasOwnProperty(letter)) {
      count[letter] += 1;
    }
    else {
      count[letter] = 1;
    }
  }
  console.log(count);
  return count;
};