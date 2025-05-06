import React from 'react';
import Cell from './Cell';

const GameBoard = ({
    width,
    height,
    board,
    revealed,
    flagged,
    numbers,
    onCellClick,
    onRightClick
}) => {
    return (
        <div className="minesweeper-board">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${width}, 1fr)`,
                    gridTemplateRows: `repeat(${height}, 1fr)`
                }}
            >
                {board.map((isMine, index) => (
                    <Cell
                        key={index}
                        index={index}
                        isMine={isMine}
                        isRevealed={revealed[index]}
                        isFlagged={flagged[index]}
                        number={numbers[index]}
                        onLeftClick={onCellClick}
                        onRightClick={onRightClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard; 