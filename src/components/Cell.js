import React from 'react';

const Cell = ({
    index,
    isMine,
    isRevealed,
    isFlagged,
    number,
    onLeftClick,
    onRightClick
}) => {
    const getCellClassName = () => {
        let className = 'cell';
        if (isRevealed) {
            className += ' revealed';
            if (isMine) {
                className += ' mine';
            } else if (number > 0) {
                className += ` number-${number}`;
            }
        }
        if (isFlagged) {
            className += ' flagged';
        }
        return className;
    };

    const getCellContent = () => {
        if (!isRevealed) return '';
        if (isMine) return '';  // The mine emoji is handled by CSS
        return number || '';
    };

    return (
        <div
            className={getCellClassName()}
            onClick={() => onLeftClick(index)}
            onContextMenu={(e) => onRightClick(e, index)}
        >
            {getCellContent()}
        </div>
    );
};

export default Cell; 