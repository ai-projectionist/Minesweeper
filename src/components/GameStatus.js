import React from 'react';

const GameStatus = ({ gameOver, gameWon, onRestart }) => {
    return (
        <div className="game-status">
            {gameOver && (
                <div className="status-container">
                    <div className="game-over">Game Over!</div>
                    <button onClick={onRestart} className="restart-button">
                        Play Again
                    </button>
                </div>
            )}
            {gameWon && (
                <div className="status-container">
                    <div className="game-won">You Won! 🎉</div>
                    <button onClick={onRestart} className="restart-button">
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameStatus; 