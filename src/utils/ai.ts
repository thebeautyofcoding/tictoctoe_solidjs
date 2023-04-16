import { BoardType } from "../components/Game";



export function getRandomEmptyCell(board: BoardType): [number, number] | null {


    const emptyCells: [number, number][] = [];

    for (let i = 0; i < 3; i++){       
            for (let j = 0; j < 3; j++){
                if (!board[i][j]){
                    emptyCells.push([i, j]);
                }

            }
    }
    if(emptyCells.length === 0){
        return null;
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];


}



