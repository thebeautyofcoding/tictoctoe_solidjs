import { createSignal, onCleanup } from 'solid-js';
import Board from './Board';
import checkWinner from '../utils/checkWinner';
import { getRandomEmptyCell } from '../utils/ai';

export type BoardType = string[][];

export default function Game() {
  const [player, setPlayer] = createSignal('X');
  const [board, setBoard] = createSignal([['', '', ''], ['', '', ''], ['', '', '']]);
  const [winner, setWinner] = createSignal<string | null>(null);
  const [moveCount, setMoveCount] = createSignal(0);
const [aiPlayer, setAiPlayer] = createSignal<'X' | 'O' | null>(null);
    
    const showAlert = (message: string) => {
        alert(message);
      };

  const handleMove = (i: number, j: number) => {
    if (!aiPlayer() || winner() || board()[i][j]) return;

    const newBoard = board().map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === i && colIdx === j ? player() : cell))
    );
    setBoard(newBoard);

    setMoveCount(moveCount() + 1);
    setWinner(checkWinner(newBoard));

    if (!checkWinner(newBoard) && moveCount() < 8) {
      aiMove();
    } else {
      setPlayer(player() === 'X' ? 'O' : 'X');
      }
      
      if (winner()) {
        showAlert(`Winner: ${winner()}`);
      } else if (moveCount() === 8) {
        showAlert('Draw');
      }

  };

  const aiMove = () => {
    const emptyCell = getRandomEmptyCell(board());

    if (emptyCell) {
      const [i, j] = emptyCell;
      setBoard(
        board().map((row, rowIdx) =>
          row.map((cell, colIdx) => (rowIdx === i && colIdx === j ? aiPlayer() : cell))
        )
        );
        
        if (winner()) {
            showAlert(`Winner: ${winner()}`);
          } else if (moveCount() === 9) {
            showAlert('Draw');
          }

      setMoveCount(moveCount() + 1);
      setWinner(checkWinner(board()));
    }
  };

  const chooseSide = (side: 'X' | 'O') => {
    setPlayer(side);
    setAiPlayer(side === 'X' ? 'O' : 'X');

    if (side === 'O') {
      aiMove();
    }
  };

  const resetGame = () => {
    setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
    setPlayer('X');
    setWinner(null);
    setMoveCount(0);
    setAiPlayer(null);
  };

  let status: string;
  if (winner()) {
    status = `Winner: ${winner()}`;
} else if (moveCount() === 9) {
    status = 'Draw';
  } else if (aiPlayer()) {
    status = `Current player: ${player()} | AI player: ${aiPlayer()}`;
  } else {
    status = 'Choose a side';
  }
console.log(status)
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-3xl mb-4">Tic Tac Toe</h1>
      <Board board={board()} onMove={handleMove} />
   
      {!aiPlayer() ? (
        <div class="mt-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => chooseSide('X')}>
            Play as X
          </button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => chooseSide('O')}>
            Play as O
          </button>
        </div>
      ) : (
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
}
