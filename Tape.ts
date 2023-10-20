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

  constructor(intialTapeContents: string, blankSymbol: string) {
    if (intialTapeContents.length > 0)
      this.maxIndex = intialTapeContents.length - 1;

    for (let i = 0; i < intialTapeContents.length; ++i) {
      this.tapeContent[i] = intialTapeContents[i];
    }

    this.blankSymbol = blankSymbol;
  }

  read() {
    return this.tapeContent[this.tapeHead] == undefined
      ? this.blankSymbol
      : this.tapeContent[this.tapeHead];
  }

  write(ch: string, direction: Direction) {
    if (ch.length != 1) throw 'Can only write a character in tape';
    this.tapeContent[this.tapeHead] = ch;

    if (this.tapeHead == this.minIndex && ch == this.blankSymbol)
      ++this.minIndex;
    else if (this.tapeHead < this.minIndex && ch != this.blankSymbol)
      this.minIndex = this.tapeHead;

    if (this.tapeHead == this.maxIndex && ch == this.blankSymbol)
      --this.maxIndex;
    else if (this.tapeHead > this.maxIndex && ch != this.blankSymbol)
      this.maxIndex = this.tapeHead;

    this.tapeHead += direction == Direction.RIGHT ? 1 : -1;
  }

  print() {
    let str: string = '';
    let cursrorLine: string = '';

    for (let i = this.tapeHead; i < this.minIndex; ++i) {
      str += this.blankSymbol;
      cursrorLine += i == this.tapeHead ? '^' : ' ';
    }

    for (let i = this.minIndex; i <= this.maxIndex; ++i) {
      str +=
        this.tapeContent[i] == undefined
          ? this.blankSymbol
          : this.tapeContent[i];

      cursrorLine += i == this.tapeHead ? '^' : ' ';
    }

    for (let i = this.maxIndex + 1; i <= this.tapeHead; ++i) {
      str += this.blankSymbol;
      cursrorLine += i == this.tapeHead ? '^' : ' ';
    }

    console.log(str);
    console.log(cursrorLine);
  }
}

export { Tape, Direction };
