enum Direction {
  RIGHT,
  LEFT,
}

class Tape {
  private minIndex: number = 0;
  private maxIndex: number = 0;
  private tapeHead: number = 0;

  private readonly blankSymbol: string;
  readonly tapeContent: { [key: number]: string } = {};

  constructor(blankSymbol: string) {
    this.blankSymbol = blankSymbol;
  }

  read() {
    return this.tapeContent[this.tapeHead] == undefined
      ? this.blankSymbol
      : this.tapeContent[this.tapeHead];
  }

  write(char: string, direction: Direction) {
    if (char.length != 1) throw 'Can only write a character in tape';
    this.tapeContent[this.tapeHead] = char;

    this.tapeHead += direction == Direction.RIGHT ? 1 : -1;
    if (this.tapeHead < this.minIndex) this.minIndex = this.tapeHead;
    if (this.tapeHead > this.maxIndex) this.maxIndex = this.tapeHead;
  }

  print() {
    let str: string = '';
    let cursrorLine: string = '';
    for (let i = this.minIndex; i <= this.maxIndex; ++i) {
      str +=
        this.tapeContent[i] == undefined
          ? this.blankSymbol
          : this.tapeContent[i];

      cursrorLine += i == this.tapeHead ? '^' : ' ';
    }

    console.log(str);
    console.log(cursrorLine);
  }
}

const tape = new Tape('B');
tape.write('A', Direction.LEFT);
tape.write('C', Direction.RIGHT);
tape.print();
