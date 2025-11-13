export function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-content space-y-6">
        <h2>About Battle of the Cosmos</h2>
        
        <div className="space-y-4">
          <section className="about-section">
            <h3>Game Overview</h3>
            <p>
              Battle of the Cosmos is an interactive, story-driven space adventure game where every choice 
              shapes your journey. Experience the thrill of space exploration, the challenge of resource 
              management, and the weight of command decisions as you lead your crew through the unknown 
              reaches of the galaxy.
            </p>
          </section>

          <section className="about-section">
            <h3>How to Play</h3>
            <ul>
              <li>Read each story segment and make choices that will determine your path</li>
              <li>Monitor your ship's hull integrity and manage your resources wisely</li>
              <li>Use inventory items strategically to overcome obstacles</li>
              <li>Listen to your crew members' advice - they each bring unique perspectives</li>
              <li>Save your progress to continue your adventure later</li>
            </ul>
          </section>

          <section className="about-section">
            <h3>Game Features</h3>
            <ul>
              <li>Branching narrative with multiple story paths</li>
              <li>Dynamic crew member interactions and dialogue</li>
              <li>Inventory management system</li>
              <li>Hull integrity tracking</li>
              <li>Save and load game functionality</li>
              <li>Immersive space-themed visuals</li>
            </ul>
          </section>

          <section className="about-section">
            <h3>Development</h3>
            <p>
              This game was created as an interactive storytelling experience, combining elements of 
              visual novels, resource management, and choose-your-own-adventure narratives.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
