import { Tetromino } from "./tetromino.js";
export class TetrominoT extends Tetromino {
  activeTetromino?: TetrominoT;
  constructor(idNum: number[]) {
    super(idNum);
  }
}
