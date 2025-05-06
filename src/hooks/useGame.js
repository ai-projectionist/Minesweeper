import { useState, useEffect } from 'react';
import { DIFFICULTY_LEVELS } from '../constants/difficulty';
import { getAdjacentCells, calculateNumbers, createSafeBoard, revealAdjacentCells } from '../utils/gameUtils';

export const useGame = (difficulty) => {
    const [width, setWidth] = useState(DIFFICULTY_LEVELS[difficulty].width);
    const [height, setHeight] = useState(DIFFICULTY_LEVELS[difficulty].height);
    const [numMines, setNumMines] = useState(DIFFICULTY_LEVELS[difficulty].mines);
    const [board, setBoard] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [flagged, setFlagged] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [firstClick, setFirstClick] = useState(true);

    useEffect(() => {
        initializeBoard();
    }, [difficulty]);

    const checkWinCondition = (newRevealed) => {
        const revealedSafeCells = newRevealed.filter((isRevealed, index) => isRevealed && !board[index]).length;
        const totalSafeCells = width * height - numMines;

        if (revealedSafeCells === totalSafeCells) {
            setGameWon(true);
            const newFlagged = board.map((isMine, index) => isMine || flagged[index]);
            setFlagged(newFlagged);
        }
    };

    const initializeBoard = () => {
        const level = DIFFICULTY_LEVELS[difficulty];
        setWidth(level.width);
        setHeight(level.height);
        setNumMines(level.mines);
        setBoard(Array(level.width * level.height).fill(false));
        setNumbers(Array(level.width * level.height).fill(0));
        setRevealed(Array(level.width * level.height).fill(false));
        setFlagged(Array(level.width * level.height).fill(false));
        setGameOver(false);
        setGameWon(false);
        setFirstClick(true);
    };

    const handleCellClick = (index) => {
        if (gameOver || gameWon || flagged[index]) return;

        let currentBoard = board;
        let currentNumbers = numbers;

        if (firstClick) {
            currentBoard = createSafeBoard(index, width, height, numMines);
            currentNumbers = calculateNumbers(currentBoard, width, height);
            setBoard(currentBoard);
            setNumbers(currentNumbers);
            setFirstClick(false);
        }

        const newRevealed = [...revealed];

        // If clicking a revealed number cell, check for auto-reveal
        if (revealed[index] && currentNumbers[index] > 0) {
            const adjacent = getAdjacentCells(index, width, height);
            const adjacentFlags = adjacent.filter(adj => flagged[adj]).length;

            if (adjacentFlags === currentNumbers[index]) {
                // Auto-reveal adjacent cells that aren't flagged
                for (const adjIndex of adjacent) {
                    if (!flagged[adjIndex] && !newRevealed[adjIndex]) {
                        if (currentBoard[adjIndex]) {
                            // If we hit a mine, game over
                            setGameOver(true);
                            const allRevealed = currentBoard.map((isMine, idx) => isMine || revealed[idx]);
                            setRevealed(allRevealed);
                            return;
                        }
                        newRevealed[adjIndex] = true;
                        if (currentNumbers[adjIndex] === 0) {
                            revealAdjacentCells(adjIndex, newRevealed, currentBoard, currentNumbers, width, height);
                        }
                    }
                }
                setRevealed(newRevealed);
                checkWinCondition(newRevealed);
                return;
            }
        }

        // Normal cell reveal logic
        if (!revealed[index]) {
            newRevealed[index] = true;

            if (currentBoard[index]) {
                setGameOver(true);
                const allRevealed = currentBoard.map((isMine, idx) => isMine || revealed[idx]);
                setRevealed(allRevealed);
            } else {
                if (currentNumbers[index] === 0) {
                    revealAdjacentCells(index, newRevealed, currentBoard, currentNumbers, width, height);
                }
                setRevealed(newRevealed);
                checkWinCondition(newRevealed);
            }
        }
    };

    const handleRightClick = (e, index) => {
        e.preventDefault(); // Prevent context menu
        if (gameOver || gameWon || revealed[index]) return;

        const newFlagged = [...flagged];
        newFlagged[index] = !newFlagged[index];
        setFlagged(newFlagged);
    };

    return {
        width,
        height,
        board,
        revealed,
        flagged,
        numbers,
        gameOver,
        gameWon,
        handleCellClick,
        handleRightClick,
        initializeBoard
    };
}; 