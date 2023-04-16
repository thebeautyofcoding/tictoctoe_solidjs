import { Component } from "solid-js"

type BoardProps = {
    board: string[][];
    onMove: (i: number, j: number) => void;
}


const Board: Component<BoardProps> = (props: BoardProps) => {
    const handleClick = (i: number, j: number) => {

        props.onMove(i, j)
    }

    return (
        <div class="grid grid-cols-3 gap-2">
            {
                props.board.map((row, rowindex) =>
                (
                    row.map((cell, cellIndex) => (
                        <button
                            class="w-28 h-28 border border-gray-300" onClick={
                                () => handleClick( rowindex,cellIndex)} >
                            <div class={(cell === 'X' ? 'text-red-500' : 'text-green-500') + ' text-6xl font-bold'}>
                                {cell}

                            </div>
                        </button>
                    ))
                ))
            }
        </div>
    );

};
export default Board