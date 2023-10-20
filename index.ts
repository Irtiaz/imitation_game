import { Tape, Direction } from './Tape';
import * as readline from 'readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  try {
    const blankSymbol = await rl.question('Blank Symbol: ');
    const intialTapeContents = await rl.question('Initial Tape Content: ');

    const tape = new Tape(intialTapeContents, blankSymbol);

    while (true) {
      tape.print();

      const command = await rl.question('');
      if (command == '') break;
      const replacer = command[0];
      const directionString = command[1];

      tape.write(
        replacer,
        directionString == '<' ? Direction.LEFT : Direction.RIGHT
      );
    }

    rl.close();
  } catch (e) {
    console.error(e);
  }
}

main();
