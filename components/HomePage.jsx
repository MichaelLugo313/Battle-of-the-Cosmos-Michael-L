import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { hasContinueState, loadContinueState, saveContinueState } from '../utils/saveLoadUtils';
import { useGameState } from '../contexts/GameStateContext';

export function HomePage() {
  const navigate = useNavigate();
  const [canContinue, setCanContinue] = useState(false);
  const { loadGameState, saveGameState } = useGameState();

  // Check if continue state exists on mount
  useEffect(() => {
    setCanContinue(hasContinueState());
  }, []);

  const handleContinue = () => {
    const continueState = loadContinueState();
    
    if (continueState) {
      // Save to in-memory context as well
      saveGameState(continueState);
      // Navigate to story page with loaded continue state
      navigate('/story', { state: { loadedGame: continueState } });
    } else {
      // If no continue state exists, start from beginning
      navigate('/story', { state: { reset: true } });
    }
  };

  const handleStartNew = () => {
    // Clear in-memory state when starting new game
    navigate('/story', { state: { reset: true } });
  };

  return (
    <div className="home-content space-y-6">
      {/* Hero Image */}
      <div className="image-container">
        <img
          src="/images/Homepage.jpg"
          alt="Battle of the Cosmos"
        />
      </div>

      {/* Welcome Content */}
      <div className="home-welcome space-y-4">
        <h2>Welcome to Battle of the Cosmos</h2>
        
        <div className="space-y-3">
          <p className="home-text">
            The year is 2189. Man has gradually begun to explore the solar system and beyond, but recent events
            on Earth yield foreboding tidings. Crime and war grow on nearly a daily basis. Could the reason that
            no alien life has been detected among the stars be because intelligent life always destroys itself?
          </p>

          <p className="home-text">
            Embark on an epic journey through the vast expanse of space in this interactive story-based game. 
            As the captain of a spacecraft, you'll navigate through uncharted nebulas, explore mysterious alien 
            planets, and uncover the secrets of the stars.
          </p>
          
          <p className="home-text">
            Your decisions matter. Each choice you make will shape your journey and determine the fate of your 
            crew. Manage your ship's resources, maintain hull integrity, and keep your crew safe as you venture 
            deeper into the unknown regions of the cosmos.
          </p>
          
          <p className="home-text">
            With a dedicated crew at your side, a cargo bay full of essential equipment, and the mysteries of 
            the universe awaiting discovery, your adventure begins now.
          </p>
        </div>

        <div className="home-buttons">
          <button 
            onClick={handleStartNew} 
            className="btn btn-primary btn-lg"
          >
            Start Your Journey from the Beginning
          </button>
          <button 
            onClick={handleContinue} 
            className="btn btn-outline btn-lg"
            disabled={!canContinue}
          >
            Continue Your Journey
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3 className="feature-title">Explore the Unknown</h3>
          <p className="feature-description">
            Venture through nebulas, alien worlds, and ancient space stations.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3 className="feature-title">Manage Your Crew</h3>
          <p className="feature-description">
            Lead your diverse crew of specialists and make critical decisions together.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3 className="feature-title">Collect Resources</h3>
          <p className="feature-description">
            Gather items, manage inventory, and use tools to overcome challenges.
          </p>
        </div>
      </div>

      {/* News & Release Schedule */}
      <div className="news-section space-y-4">
        <h2>News & Upcoming Chapters</h2>
        
        <div className="space-y-4">
          {/* News Item 1 */}
          <div className="news-item">
            <div className="news-item-header">
              <h3>Prologue: The News From Beyond</h3>
              <span className="badge badge-blue">Coming Soon</span>
            </div>
            <p className="news-description">
              A signal from the edge of the solar system reaches the Earth! What could it possibly portend? Take to the
              stars and explore this new wrinkle in current events.
            </p>
            <p className="news-date">Planned Release: December 1, 2025</p>
          </div>

          {/* News Item 2 */}
          <div className="news-item">
            <div className="news-item-header">
              <h3>Chapter 1: New Friends, New Frontiers</h3>
              <span className="badge badge-purple">In Development</span>
            </div>
            <p className="news-description">
              Discover the the secrets of an ancient civilization. Experience new puzzles, alien encounters, 
              and story branches that will change the course of your journey.
            </p>
            <p className="news-date">Planned Release: TBD</p>
          </div>

          {/* News Item 3 */}
          <div className="news-item">
            <div className="news-item-header">
              <h3>Chapter 2: Interdiction</h3>
              <span className="badge badge-gray">Planned</span>
            </div>
            <p className="news-description">
              The conflict escalates as cosmic factions clash for control of the gateway. Your choices will determine 
              which side prevails in this epic confrontation.
            </p>
            <p className="news-date">Planned Release: TBD</p>
          </div>
        </div>

        <div className="news-footer">
          Stay tuned for more updates! Release dates are subject to change as we refine each chapter to deliver the best experience possible.
        </div>
      </div>
    </div>
  );
}