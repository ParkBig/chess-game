import { Board } from "../types/interface";
import bishopAlgorithm from "./bishopAlgorithm";
import rookAlgorithm from "./rookAlgorithm";

const queenAlgorithm = (pickedBlock: Board, pickedIndex: number, board: Board[]) => {
  const canMoveArea: number[] = [];

  canMoveArea.push(...rookAlgorithm(pickedBlock, pickedIndex, board));
  canMoveArea.push(...bishopAlgorithm(pickedBlock, pickedIndex, board));

  return canMoveArea;
};

export default queenAlgorithm;
