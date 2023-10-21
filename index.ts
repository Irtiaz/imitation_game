import { Tape, Direction } from './Tape';
import readline from 'readline';

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function main() {
  try {
    const blankSymbol = await question('Blank Symbol: ');
    const intialTapeContents = await question('Initial Tape Content: ');

    const tape = new Tape(intialTapeContents, blankSymbol);

    while (true) {
      tape.print();

      const command = await question('');
      if (command == '') break;
      const replacer = command[0];
      const directionString = command[1];

      tape.write(
        replacer,
        directionString == '<' ? Direction.LEFT : Direction.RIGHT
      );
    }
  } catch (e) {
    console.error(e);
  }
}

main();
