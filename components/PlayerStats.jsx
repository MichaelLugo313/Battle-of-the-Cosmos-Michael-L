export function PlayerStats({ health, maxHealth }) {
  return (
    <div className="player-stats">
      <div className="player-stats-header">
        <span className="icon">🛡️</span>
        <span>Ship Hull Integrity</span>
      </div>
      <div className="player-stats-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(health / maxHealth) * 100}%` }}
          />
        </div>
        <span className="progress-bar-label">
          {health}%
        </span>
      </div>
    </div>
  );
}