import React, { useState } from 'react';
import './App.css';
import { useGame } from './hooks/useGame';
import DifficultySelector from './components/DifficultySelector';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';

function App() {
  const [difficulty, setDifficulty] = useState('beginner');
  const {
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
  } = useGame(difficulty);

  return (
    <div className="App">
      <header className="App-header">
        <div className="game-header">
          <h1>Minesweeper</h1>
          <DifficultySelector
            currentDifficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        </div>
        <GameStatus
          gameOver={gameOver}
          gameWon={gameWon}
          onRestart={initializeBoard}
        />
        <GameBoard
          width={width}
          height={height}
          board={board}
          revealed={revealed}
          flagged={flagged}
          numbers={numbers}
          onCellClick={handleCellClick}
          onRightClick={handleRightClick}
        />
      </header>
    </div>
  );
}

export default App;
