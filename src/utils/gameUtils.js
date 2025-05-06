export const getAdjacentCells = (index, width, height) => {
    const row = Math.floor(index / width);
    const col = index % width;
    const adjacent = [];

    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
                adjacent.push(newRow * width + newCol);
            }
        }
    }

    return adjacent;
};

export const calculateNumbers = (mineBoard, width, height) => {
    const newNumbers = Array(width * height).fill(0);

    for (let i = 0; i < width * height; i++) {
        if (!mineBoard[i]) {
            const adjacent = getAdjacentCells(i, width, height);
            newNumbers[i] = adjacent.filter(adj => mineBoard[adj]).length;
        }
    }

    return newNumbers;
};

export const createSafeBoard = (firstClickIndex, width, height, numMines) => {
    const newBoard = Array(width * height).fill(false);
    let minesPlaced = 0;
    const safeZone = new Set([firstClickIndex, ...getAdjacentCells(firstClickIndex, width, height)]);

    while (minesPlaced < numMines) {
        const randomIndex = Math.floor(Math.random() * (width * height));
        if (!newBoard[randomIndex] && !safeZone.has(randomIndex)) {
            newBoard[randomIndex] = true;
            minesPlaced++;
        }
    }

    return newBoard;
};

export const revealAdjacentCells = (index, newRevealed, currentBoard, currentNumbers, width, height) => {
    const adjacent = getAdjacentCells(index, width, height);

    for (const adjIndex of adjacent) {
        if (!newRevealed[adjIndex] && !currentBoard[adjIndex]) {
            newRevealed[adjIndex] = true;

            if (currentNumbers[adjIndex] === 0) {
                revealAdjacentCells(adjIndex, newRevealed, currentBoard, currentNumbers, width, height);
            }
        }
    }
}; 