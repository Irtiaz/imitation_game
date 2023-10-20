import { Tape, Direction } from './Tape';

const tape = new Tape('B');
tape.write('A', Direction.LEFT);
tape.write('C', Direction.RIGHT);
tape.print();
