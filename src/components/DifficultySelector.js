import React from 'react';
import { DIFFICULTY_LEVELS } from '../constants/difficulty';

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
    return (
        <div className="difficulty-selector">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                <button
                    key={key}
                    className={`difficulty-button ${currentDifficulty === key ? 'active' : ''}`}
                    onClick={() => onDifficultyChange(key)}
                >
                    {level.label}
                </button>
            ))}
        </div>
    );
};

export default DifficultySelector; 