class Wordle {
  private wordArray: string[];
  private success: string;
  private yellow: string;
  private blank: string;

  constructor(startingWord: string) {
    this.wordArray = startingWord.toUpperCase().split("");
    this.success = "🟩";
    this.yellow = "🟨";
    this.blank = "⬜";

  }

  guess(guessString: string): string {
    // create list of guess characters
    let guessArray = guessString.toUpperCase().split("");

    // if guess[i] == word[i]
    // 1. set guess character to green
    // 2. remove word[i] from word, character has been used
    guessArray = guessArray.map((c, i) => {
      if (this.wordArray[i] == c) {
        this.wordArray[i] = ''
        return this.success
      } else return c
    })

    // if guess[i] in word
    // 1. set guess character to yello
    // 2. find and remove c from word, character has been used
    guessArray = guessArray.map((c, i) => {
      if (this.wordArray.includes(c)) {
        this.wordArray[this.wordArray.findIndex(e => e==c)] = ''
        return this.yellow
      } else return c
    })

    // convert all unused/not found characters to a blank
    guessArray = guessArray.map((c, i) => {
      if (![this.success, this.yellow].includes(c)) {
        return this.blank
      } else {
        return c
      }
    })

    return guessArray.join(" ");
  }
}

let wordle = new Wordle("EARTH");
console.log(`TEST_1: ${wordle.guess("CRANE") == '⬜ 🟨 🟨 ⬜ 🟨'}`);

wordle = new Wordle("EARTH");
console.log(`TEST_2: ${wordle.guess("EERIE") == '🟩 ⬜ 🟩 ⬜ ⬜'}`);

wordle = new Wordle("EARTH");
console.log(`TEST_3: ${wordle.guess("ONION") == '⬜ ⬜ ⬜ ⬜ ⬜'}`);

wordle = new Wordle("EARTH");
console.log(`TEST_4: ${wordle.guess("WATER") == '⬜ 🟩 🟨 🟨 🟨'}`);

wordle = new Wordle("EARTH");
console.log(`TEST_5: ${wordle.guess("EARTH") == '🟩 🟩 🟩 🟩 🟩'}`);

wordle = new Wordle("ESRIE");
console.log(`TEST_6: ${wordle.guess("EAEEH") == '🟩 ⬜ 🟨 ⬜ ⬜'}`);

wordle = new Wordle("EERIE");
console.log(`TEST_7: ${wordle.guess("EAEEH") == '🟩 ⬜ 🟨 🟨 ⬜'}`);

wordle = new Wordle("EARTH");
console.log(`TEST_*: ${wordle.guess("ERROR") == '🟩 ⬜ 🟩 ⬜ ⬜'}`);