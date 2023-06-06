class Wordle {
    private wordArray: string[];
    private success: string;
    private yellow: string;
  
    constructor(startingWord: string) {
      this.wordArray = startingWord.toUpperCase().split("");
      this.success = "🟩";
      this.yellow = "🟨";
    }
  
    guess(guessString: string): string {
      const result: string[] = ["⬜", "⬜", "⬜", "⬜", "⬜"];
      const guessArray = guessString.toUpperCase().split("");
  
      for (let i = 0; i < guessArray.length; i++) {
        const c = guessArray[i];
        if (this.wordArray[i] == c) {
          result[i] = this.success;
          this.wordArray[i] = " ";
        } else if (this.wordArray.includes(c)) {
          result[i] = this.yellow;
          this.wordArray[this.wordArray.findIndex((e) => e == c)] = " ";
        }
      }
  
      return result.join(" ");
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