import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayerStats } from './PlayerStats';
import { Inventory } from './Inventory';
import { CrewMembers } from './CrewMembers';
import { Notes } from './Notes';
import { storyPages } from '../data/storyPages';
import { Loader2 } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { ItemDescriptionDialog } from './ItemDescriptionDialog';
import { GameOverDialog } from './GameOverDialog';
import { getUsableItemsForPage, formatChoiceTextWithItem } from './UsableItemHighlight';
import { saveContinueState, loadContinueState } from '../utils/saveLoadUtils';
import { useGameState } from '../contexts/GameStateContext';

export function StoryGamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveGameState, loadGameState, clearGameState } = useGameState();
  
  // Ref for scrolling to top
  const pageTopRef = useRef(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState('On Foot'); // 'Ship' or 'On Foot'
  const [hullIntegrity, setHullIntegrity] = useState(100);
  const [maxHullIntegrity] = useState(100);
  const [health, setHealth] = useState(4);
  const [maxHealth] = useState(4);
  const [showInventoryFullAlert, setShowInventoryFullAlert] = useState(false);
  const [rejectedItems, setRejectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemDescriptionOpen, setItemDescriptionOpen] = useState(false);
  const [itemToShow, setItemToShow] = useState(null);
  const [gameOverOpen, setGameOverOpen] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [flags, setFlags] = useState({}); // Story flags that persist through page changes
  const [hasLoadedInitialState, setHasLoadedInitialState] = useState(false);
  
  const [inventory, setInventory] = useState([]);
  const [crew, setCrew] = useState([]);

  // Crew mapping - centralized to avoid duplication
  const CREW_MAP = {
    gerald: 'Gerald Lossoth',
    clovis: 'Clovis Dyne',
  };

  // Item mapping - centralized to avoid duplication
  const ITEM_MAP = {
    'gyro-pistol': 'Gyro Pistol',
    scanner: 'Quantum Scanner',
    'ship-keys': 'Ship Keys',
    'ancient-data': 'Ancient Files',
    'gateway-key': 'Gateway Key'
  };

  // Helper function to get crew name
  const getCrewName = (crewId) => CREW_MAP[crewId] || crewId;

  // Helper function to get item name
  const getItemName = (itemId) => {
    const item = inventory.find(i => i.id === itemId);
    return item ? item.name : (ITEM_MAP[itemId] || itemId);
  };

  // Get current story page
  const currentStory = storyPages.find(page => page.id === currentPage) || storyPages[0];

  // Update mode based on current page
  useEffect(() => {
    setMode(currentStory.mode);
  }, [currentPage, currentStory.mode]);

  // Scroll to top when page changes using React ref
  useEffect(() => {
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  // Save current game state to both in-memory and localStorage
  useEffect(() => {
    if (!hasLoadedInitialState) return; // Don't save until initial load is complete
    
    const gameState = {
      currentPage,
      mode,
      hullIntegrity,
      maxHullIntegrity,
      health,
      maxHealth,
      inventory,
      crew,
      flags
    };
    
    // Save to in-memory context (for navigation within session)
    saveGameState(gameState);
    
    // Save to localStorage (for "Continue" button across sessions)
    saveContinueState(gameState);
  }, [currentPage, mode, hullIntegrity, maxHullIntegrity, health, maxHealth, inventory, crew, flags, hasLoadedInitialState]); // Removed saveGameState from dependencies

  // Load game state from location or continue state on mount
  useEffect(() => {
    // Priority 1: Check if we're loading a saved game
    if (location.state?.loadedGame) {
      const loadedGame = location.state.loadedGame;
      setCurrentPage(loadedGame.currentPage || 1);
      setMode(loadedGame.mode || 'On Foot');
      setHullIntegrity(loadedGame.hullIntegrity || 100);
      setHealth(loadedGame.health || 4);
      setInventory(loadedGame.inventory || []);
      setCrew(loadedGame.crew || []);
      setFlags(loadedGame.flags || {});
      
      // Clear the state so it doesn't reload on subsequent renders
      window.history.replaceState({}, document.title);
      setHasLoadedInitialState(true);
      return;
    }
    
    // Priority 2: Check if we're resetting the game
    if (location.state?.reset) {
      setCurrentPage(1);
      setMode('On Foot');
      setHullIntegrity(100);
      setHealth(4);
      setInventory([]);
      setCrew([]);
      setFlags({});
      // Clear the state so it doesn't reset on subsequent renders
      window.history.replaceState({}, document.title);
      setHasLoadedInitialState(true);
      return;
    }
    
    // Priority 3: Only load continue state on initial mount (when no game state exists yet)
    if (!hasLoadedInitialState) {
      const continueState = loadGameState();
      if (continueState && continueState.currentPage !== 1) {
        setCurrentPage(continueState.currentPage || 1);
        setMode(continueState.mode || 'On Foot');
        setHullIntegrity(continueState.hullIntegrity || 100);
        setHealth(continueState.health || 4);
        setInventory(continueState.inventory || []);
        setCrew(continueState.crew || []);
        setFlags(continueState.flags || {});
      }
      setHasLoadedInitialState(true);
    }
  }, [location, hasLoadedInitialState]); // Removed loadGameState from dependencies

  // Check for game over conditions
  useEffect(() => {
    // Check if health is zero (on foot mode)
    if (mode === 'On Foot' && health <= 0) {
      setGameOverMessage('Your life force has faded. The cosmos claims another soul.');
      setGameOverOpen(true);
      return;
    }

    // Check if hull integrity is zero (ship mode)
    if (mode === 'Ship' && hullIntegrity <= 0) {
      setGameOverMessage('Critical hull failure. The ship breaks apart in the void of space.');
      setGameOverOpen(true);
      return;
    }
  }, [currentPage, health, hullIntegrity, mode]);

  const handleStartOver = () => {
    setGameOverOpen(false);
    setCurrentPage(1);
    setMode('On Foot');
    setHullIntegrity(100);
    setHealth(4);
    setInventory([]);
    setCrew([]);
    setFlags({});
  };

  const handleUseItem = (id) => {
    // Add item use logic here
  };

  const handleDeleteItem = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      setInventory(inventory.filter(item => item.id !== itemToDelete));
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleChoice = (choice) => {
    // Check if this choice navigates to a different page
    if (choice.navigateTo) {
      navigate(choice.navigateTo);
      return;
    }

    // Check if this choice triggers game over
    if (choice.gameOver) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setGameOverMessage(choice.gameOverMessage || 'Your journey has come to an end.');
        setGameOverOpen(true);
      }, 1000);
      return;
    }

    // Show loading screen
    setIsLoading(true);

    // Wait 2 seconds before processing the choice
    setTimeout(() => {
      // Add items if choice includes them
      if (choice.addItems) {
        const newItems = choice.addItems.filter(
          newItem => !inventory.some(existingItem => existingItem.id === newItem.id)
        );
        
        if (newItems.length > 0 && inventory.length + newItems.length > 6) {
          setIsLoading(false);
          setShowInventoryFullAlert(true);
          setRejectedItems(newItems);
          // Don't navigate to the next page if inventory is full
          return;
        }
        
        if (newItems.length > 0) {
          setInventory(prev => [...prev, ...newItems]);
        }
      }

      // Add crew members if choice includes them
      if (choice.addCrew) {
        setCrew(prev => {
          const newCrew = choice.addCrew.filter(
            newMember => !prev.some(existingMember => existingMember.id === newMember.id)
          );
          return [...prev, ...newCrew];
        });
      }

      // Set flags if choice includes them
      if (choice.setFlags) {
        setFlags(prev => ({ ...prev, ...choice.setFlags }));
      }

      // Apply health change if choice includes it (for on-foot mode)
      if (choice.healthChange) {
        setHealth(prev => Math.max(0, Math.min(maxHealth, prev + choice.healthChange)));
      }

      // Apply hull integrity change if choice includes it (for ship mode)
      if (choice.hullChange) {
        setHullIntegrity(prev => Math.max(0, Math.min(maxHullIntegrity, prev + choice.hullChange)));
      }

      // Navigate to next page
      setCurrentPage(choice.nextPage);
      setIsLoading(false);
    }, 1000);
  };

  // Check if player has specific crew member
  const hasCrewMember = (crewId) => crew.some(member => member.id === crewId);

  // Check if player has specific item
  const hasItem = (itemId) => inventory.some(item => item.id === itemId);

  // Check if player has specific flag
  const hasFlag = (flagKey) => flags[flagKey] === true;

  // Check if health requirement is met
  const meetsHealthRequirement = (healthReq) => {
    if (!healthReq) return true;
    const currentHealth = mode === 'Ship' ? hullIntegrity : health;
    const { operator, value } = healthReq;
    
    switch (operator) {
      case '<': return currentHealth < value;
      case '>': return currentHealth > value;
      case '<=': return currentHealth <= value;
      case '>=': return currentHealth >= value;
      case '==': return currentHealth === value;
      default: return true;
    }
  };

  // Check if all required crew members are present for a choice
  const hasRequiredCrew = (requiredCrew) => {
    if (!requiredCrew || requiredCrew.length === 0) return true;
    return requiredCrew.every(crewId => hasCrewMember(crewId));
  };

  // Check if all required items are present for a choice
  const hasRequiredItems = (requiredItems) => {
    if (!requiredItems || requiredItems.length === 0) return true;
    return requiredItems.every(itemId => hasItem(itemId));
  };

  // Check if all required flags are present for a choice
  const hasRequiredFlags = (requiredFlags) => {
    if (!requiredFlags || requiredFlags.length === 0) return true;
    return requiredFlags.every(flagKey => hasFlag(flagKey));
  };

  // Get usable items for current page
  const usableItems = getUsableItemsForPage(currentPage, currentStory.choices);
  const usableItemIds = usableItems.map(item => item.itemId);

  return (
    <div className="space-y-6" ref={pageTopRef}>
      {/* Player Stats - Only show when on Ship */}
      {mode === 'Ship' && (
        <PlayerStats health={hullIntegrity} maxHealth={maxHullIntegrity} />
      )}

      {/* Main Story Content */}
      <div>
        {/* Image Section */}
        <div className="image-container">
          <img
            src={currentStory.image}
            alt={currentStory.title}
          />
        </div>

        {/* Story Content */}
        <div className="story-content">
          <h2>{currentStory.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: currentStory.text }} />

          {/* Choice Buttons */}
          {currentStory.choices && currentStory.choices.length > 0 && (
            <div className="story-choices">
              <p>What do you do?</p>
              <div className="choices-list">
                {currentStory.choices
                  .filter((choice) => {
                    // Hide choice if hideIfMissingItems is true and items are missing
                    if (choice.hideIfMissingItems && choice.requiredItems) {
                      const hasMissingItems = !hasRequiredItems(choice.requiredItems);
                      if (hasMissingItems) return false;
                    }
                    
                    // Hide choice if hideIfHasItems is true and player has those items
                    if (choice.hideIfHasItems) {
                      const hasAnyOfTheseItems = choice.hideIfHasItems.some(itemId => hasItem(itemId));
                      if (hasAnyOfTheseItems) return false;
                    }
                    
                    // Hide choice if hideIfMissingFlags is true and flags are missing
                    if (choice.hideIfMissingFlags && choice.requiredFlags) {
                      const hasMissingFlags = !hasRequiredFlags(choice.requiredFlags);
                      if (hasMissingFlags) return false;
                    }
                    
                    // Hide choice if hideIfHasFlags is true and player has those flags
                    if (choice.hideIfHasFlags) {
                      const hasAnyOfTheseFlags = choice.hideIfHasFlags.some(flagKey => hasFlag(flagKey));
                      if (hasAnyOfTheseFlags) return false;
                    }
                    
                    // Hide choice if health requirement is not met
                    if (choice.healthRequirement && !meetsHealthRequirement(choice.healthRequirement)) {
                      return false;
                    }
                    
                    return true;
                  })
                  .map((choice, index) => {
                  // Check if choice has a usable item
                  const usableItem = choice.usableItem ? inventory.find(item => item.id === choice.usableItem) : null;
                  const hasUsableItem = !!usableItem;
                  
                  // Check if crew requirements are met
                  const crewRequirementsMet = hasRequiredCrew(choice.requiredCrew);
                  
                  // Get present crew names
                  const presentCrewNames = choice.requiredCrew && crewRequirementsMet
                    ? choice.requiredCrew
                        .filter(crewId => hasCrewMember(crewId))
                        .map(getCrewName)
                    : [];
                  
                  // Get missing crew names
                  const missingCrewNames = choice.requiredCrew && !crewRequirementsMet
                    ? choice.requiredCrew
                        .filter(crewId => !hasCrewMember(crewId))
                        .map(getCrewName)
                    : [];
                  
                  // Check if item requirements are met
                  const itemRequirementsMet = hasRequiredItems(choice.requiredItems);
                  
                  // Get present item names
                  const presentItemNames = choice.requiredItems && itemRequirementsMet
                    ? choice.requiredItems
                        .filter(itemId => hasItem(itemId))
                        .map(getItemName)
                    : [];
                  
                  // Get missing item names
                  const missingItemNames = choice.requiredItems && !itemRequirementsMet
                    ? choice.requiredItems
                        .filter(itemId => !hasItem(itemId))
                        .map(getItemName)
                    : [];
                  
                  // Check if flag requirements are met
                  const flagRequirementsMet = hasRequiredFlags(choice.requiredFlags);
                  
                  // Get present flag names
                  const presentFlagNames = choice.requiredFlags && flagRequirementsMet
                    ? choice.requiredFlags
                        .filter(flagKey => hasFlag(flagKey))
                        .map(flagKey => flagKey)
                    : [];
                  
                  // Get missing flag names
                  const missingFlagNames = choice.requiredFlags && !flagRequirementsMet
                    ? choice.requiredFlags
                        .filter(flagKey => !hasFlag(flagKey))
                        .map(flagKey => flagKey)
                    : [];
                  
                  let buttonClass = 'choice-button';
                  const allRequirementsMet = crewRequirementsMet && itemRequirementsMet && flagRequirementsMet;
                  
                  // Only consider crew and items for highlighting (not flags)
                  const crewAndItemRequirementsMet = crewRequirementsMet && itemRequirementsMet;
                  
                  // Highlight green if all requirements met and there are requirements (but not for flags)
                  if (crewAndItemRequirementsMet && (presentItemNames.length > 0 || presentCrewNames.length > 0)) {
                    buttonClass += ' highlight-green';
                  } else if (!crewAndItemRequirementsMet) {
                    buttonClass += ' highlight-red';
                  }
                  
                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleChoice(choice)}
                      disabled={!crewAndItemRequirementsMet}
                    >
                      {choice.text}
                      {presentItemNames.length > 0 && (
                        <span className="choice-indicator-green"> [ Item: {presentItemNames.join(', ')} ]</span>
                      )}
                      {presentCrewNames.length > 0 && (
                        <span className="choice-indicator-green"> [ Crew: {presentCrewNames.join(', ')} ]</span>
                      )}
                      {missingItemNames.length > 0 && (
                        <span className="choice-indicator-red"> [ Missing Item: {missingItemNames.join(', ')} ]</span>
                      )}
                      {missingCrewNames.length > 0 && (
                        <span className="choice-indicator-red"> [ Missing Crew: {missingCrewNames.join(', ')} ]</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory */}
      <Inventory 
        items={inventory} 
        onUseItem={handleUseItem}
        onDeleteItem={handleDeleteItem}
        health={health}
        maxHealth={maxHealth}
        mode={mode}
        currentPage={currentPage}
        usableItemIds={usableItemIds}
        onShowDescription={(item) => {
          setItemToShow(item);
          setItemDescriptionOpen(true);
        }}
      />

      {/* Crew Members */}
      <CrewMembers members={crew} currentPageDialogue={currentStory.crewDialogue || {}} />

      {/* Notes */}
      <Notes />

      {/* Inventory Full Alert */}
      {showInventoryFullAlert && (
        <div className="inventory-full-dialog" onClick={() => setShowInventoryFullAlert(false)}>
          <div className="inventory-full-content" onClick={(e) => e.stopPropagation()}>
            <div className="inventory-full-header">
              <h2 className="inventory-full-title">
                <span className="inventory-full-icon">⚠️</span>
                Inventory Full
              </h2>
            </div>
            <p className="inventory-full-description">
              You have no room for the {rejectedItems.map(item => item.name).join(', ')}.
            </p>
            <div className="inventory-full-footer">
              <button 
                className="inventory-full-button"
                onClick={() => setShowInventoryFullAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteItem}
        title="Delete Item?"
        description={`Are you sure you want to delete "${inventory.find(item => item.id === itemToDelete)?.name || 'this item'}"? This action cannot be undone.`}
        icon="🗑️"
      />

      {/* Item Description Dialog */}
      <ItemDescriptionDialog
        open={itemDescriptionOpen}
        onOpenChange={setItemDescriptionOpen}
        item={itemToShow}
      />

      {/* Game Over Dialog */}
      <GameOverDialog
        open={gameOverOpen}
        onOpenChange={setGameOverOpen}
        message={gameOverMessage}
        onStartOver={handleStartOver}
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <Loader2 className="loading-icon" />
          <p className="loading-text">Processing...</p>
        </div>
      )}
    </div>
  );
}