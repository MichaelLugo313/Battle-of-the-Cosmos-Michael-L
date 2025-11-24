export function StoryPage({ image, title, text, choices, inventory = [] }) {
  const hasQuantumScanner = inventory.some(item => item.name === 'Quantum Scanner');
  return (
    <div>
      {/* Image Section */}
      <div className="image-container">
        <img
          src={image}
          alt={title}
        />
      </div>

      {/* Story Content */}
      <div className="story-content">
        <h2>{title}</h2>
        <p>{text}</p>

        {/* Choice Buttons (if any) */}
        {choices && choices.length > 0 && (
          <div className="story-choices">
            <p>What do you do?</p>
            <div className="choices-list">
              {choices.map((choice, index) => {
                const isScanChoice = choice.text.toLowerCase().includes('scan');
                const shouldHighlight = isScanChoice && hasQuantumScanner;
                const shouldRedTint = isScanChoice && !hasQuantumScanner;
                
                let buttonClass = 'choice-button';
                if (shouldHighlight) {
                  buttonClass += ' highlight-green';
                } else if (shouldRedTint) {
                  buttonClass += ' highlight-red';
                }
                
                return (
                  <button
                    key={index}
                    className={buttonClass}
                  >
                    {choice.text}
                    {isScanChoice && hasQuantumScanner && (
                      <span className="choice-indicator-green">[ Use the Quantum Scanner ]</span>
                    )}
                    {isScanChoice && !hasQuantumScanner && (
                      <span className="choice-indicator-red">[ Missing: Quantum Scanner ]</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
