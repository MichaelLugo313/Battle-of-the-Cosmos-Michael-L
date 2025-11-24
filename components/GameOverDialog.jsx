import { useNavigate } from 'react-router-dom';

export function GameOverDialog({ open, message, onStartOver }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleStartOver = () => {
    onStartOver();
  };

  const handleLoadGame = () => {
    navigate('/load');
  };

  return (
    <div className="game-over-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="game-over-dialog">
        <div className="game-over-header">
          <h2 className="game-over-title">
            <span className="game-over-icon">💀</span>
            Game Over
          </h2>
        </div>
        <p className="game-over-message">{message}</p>
        <div className="game-over-actions">
          <button 
            className="game-over-button game-over-button-primary"
            onClick={handleStartOver}
          >
            Start Over
          </button>
          <button 
            className="game-over-button game-over-button-secondary"
            onClick={handleLoadGame}
          >
            Load Game
          </button>
        </div>
      </div>
    </div>
  );
}
